const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Configuration
const BASE_URL = "http://localhost:7777/api";
const PASSWORD = "Password123!";

// Mock user data - realistic developer profiles
const mockUsers = [
	{
		firstName: "Sarah",
		lastName: "Chen",
		email: "sarah.chen@example.com",
		age: 28,
		gender: "female",
		skills: ["React.js", "Node.js", "TypeScript", "MongoDB"],
		photoUrl: "https://i.pravatar.cc/500?img=5",
		about:
			"Full-stack developer passionate about building scalable web applications. Love working with modern JavaScript frameworks.",
	},
	{
		firstName: "Marcus",
		lastName: "Johnson",
		email: "marcus.j@example.com",
		age: 32,
		gender: "male",
		skills: ["Python", "Django", "PostgreSQL", "Docker"],
		photoUrl: "https://i.pravatar.cc/500?img=12",
		about:
			"Backend engineer with 8+ years experience. Specialized in API design and microservices architecture.",
	},
	{
		firstName: "Priya",
		lastName: "Sharma",
		email: "priya.sharma@example.com",
		age: 26,
		gender: "female",
		skills: ["Vue.js", "Express.js", "AWS", "Redis"],
		photoUrl: "https://i.pravatar.cc/500?img=9",
		about:
			"Cloud engineer and full-stack developer. Building efficient, user-friendly applications is my passion.",
	},
	{
		firstName: "Alex",
		lastName: "Rodriguez",
		email: "alex.rod@example.com",
		age: 30,
		gender: "male",
		skills: ["Java", "Spring Boot", "Kubernetes", "MySQL"],
		photoUrl: "https://i.pravatar.cc/500?img=15",
		about:
			"Senior backend developer focused on enterprise solutions. Love mentoring junior developers.",
	},
	{
		firstName: "Emily",
		lastName: "Watson",
		email: "emily.w@example.com",
		age: 24,
		gender: "female",
		skills: ["React Native", "JavaScript", "Firebase", "GraphQL"],
		photoUrl: "https://i.pravatar.cc/500?img=20",
		about:
			"Mobile-first developer creating beautiful cross-platform apps. Always learning new technologies.",
	},
	{
		firstName: "David",
		lastName: "Kim",
		email: "david.kim@example.com",
		age: 35,
		gender: "male",
		skills: ["Go", "Rust", "Kafka", "Elasticsearch"],
		photoUrl: "https://i.pravatar.cc/500?img=33",
		about:
			"Systems programmer with expertise in high-performance computing. Open source contributor.",
	},
	{
		firstName: "Nina",
		lastName: "Patel",
		email: "nina.patel@example.com",
		age: 27,
		gender: "female",
		skills: ["Angular", "C#", ".NET Core", "Azure"],
		photoUrl: "https://i.pravatar.cc/500?img=26",
		about:
			"Full-stack .NET developer working on enterprise web applications. Passionate about clean code.",
	},
	{
		firstName: "Jake",
		lastName: "Morrison",
		email: "jake.m@example.com",
		age: 29,
		gender: "male",
		skills: ["PHP", "Laravel", "Vue.js", "MySQL"],
		photoUrl: "https://i.pravatar.cc/500?img=51",
		about:
			"Web developer specializing in e-commerce platforms. Building robust backend systems for 6+ years.",
	},
];

// Store created users and their tokens
const createdUsers = [];
const connectionRequests = [];

// Axios instance with cookie support
const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Helper: Delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Step 1: Create users via signup
async function createUsers() {
	console.log("\n🚀 Creating mock users...\n");

	for (const userData of mockUsers) {
		try {
			const response = await api.post("/auth/signup", {
				...userData,
				password: PASSWORD,
			});

			if (response.data.success) {
				const user = response.data.user;
				createdUsers.push({
					id: user._id,
					email: userData.email,
					password: PASSWORD,
					firstName: user.firstName,
					lastName: user.lastName,
					skills: user.skills,
				});
				console.log(
					`✅ Created: ${user.firstName} ${user.lastName} (${userData.email})`,
				);
			}

			await delay(500); // Rate limiting
		} catch (error) {
			// If user already exists, try to get their info by logging in
			if (
				error.response?.status === 500 &&
				error.response?.data?.message === "Internal server error"
			) {
				console.log(
					`⚠️  ${userData.firstName} already exists, fetching existing user...`,
				);

				// Try to login to get user ID
				try {
					const loginResponse = await api.post("/auth/login", {
						email: userData.email,
						password: PASSWORD,
					});

					if (loginResponse.data.success) {
						const user = loginResponse.data.user;
						createdUsers.push({
							id: user._id,
							email: userData.email,
							password: PASSWORD,
							firstName: user.firstName,
							lastName: user.lastName,
							skills: user.skills,
						});
						console.log(
							`✅ Loaded existing: ${user.firstName} ${user.lastName} (${userData.email})`,
						);
					}
				} catch (loginError) {
					console.error(
						`❌ Failed to load existing user ${userData.firstName}:`,
						loginError.response?.data?.message || loginError.message,
					);
				}
			} else {
				console.error(
					`❌ Failed to create ${userData.firstName}:`,
					error.response?.data?.message || error.message,
				);
			}
		}
	}

	console.log(`\n✨ Loaded ${createdUsers.length} users successfully!\n`);
}

// Step 2: Login as a user and get auth cookie
async function loginUser(email, password) {
	try {
		const response = await api.post("/auth/login", { email, password });

		if (response.data.success && response.data.token) {
			return {
				token: response.data.token,
				userId: response.data.user._id,
			};
		}
	} catch (error) {
		console.error(
			`❌ Login failed for ${email}:`,
			error.response?.data?.message || error.message,
		);
	}
	return null;
}

// Step 3: Send connection request
async function sendConnectionRequest(fromUserToken, toUserId, status) {
	try {
		const response = await api.post(
			`/request/send/${status}/${toUserId}`,
			{},
			{
				headers: {
					Cookie: `token=${fromUserToken}`,
				},
			},
		);

		return response.data;
	} catch (error) {
		// Silently handle "already exists" errors
		if (
			error.response?.data?.message?.includes("already present") ||
			error.response?.status === 400
		) {
			return null;
		}
		console.error(
			`❌ Connection request failed:`,
			error.response?.data?.message || error.message,
		);
	}
	return null;
}

// Step 4: Review connection request (accept/reject)
async function reviewConnectionRequest(userToken, requestId, status) {
	try {
		const response = await api.post(
			`/request/review/${status}/${requestId}`,
			{},
			{
				headers: {
					Cookie: `token=${userToken}`,
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error(
			`❌ Review failed:`,
			error.response?.data?.message || error.message,
		);
	}
	return null;
}

// Step 5: Get connection requests for a user
async function getConnectionRequests(userToken) {
	try {
		const response = await api.get("/users/requests/receive", {
			headers: {
				Cookie: `token=${userToken}`,
			},
		});

		return response.data.data || [];
	} catch (error) {
		return [];
	}
}

// Step 6: Create connection network
async function createConnectionNetwork() {
	console.log("\n🔗 Creating connection network...\n");

	// Login all users first
	const userSessions = [];
	for (const user of createdUsers) {
		const session = await loginUser(user.email, user.password);
		if (session) {
			userSessions.push({ ...user, token: session.token });
		}
		await delay(300);
	}

	if (userSessions.length < 3) {
		console.error("❌ Not enough users logged in to create connections");
		return;
	}

	// Define connection scenarios
	const connections = [
		// Sarah sends interested to Marcus, Priya, and Alex
		{
			from: 0,
			to: 1,
			status: "interested",
			note: "Sarah → Marcus (interested)",
		},
		{
			from: 0,
			to: 2,
			status: "interested",
			note: "Sarah → Priya (interested)",
		},
		{
			from: 0,
			to: 3,
			status: "interested",
			note: "Sarah → Alex (interested)",
		},

		// Marcus sends interested to Sarah (mutual!) and ignored to Emily
		{
			from: 1,
			to: 0,
			status: "interested",
			note: "Marcus → Sarah (interested, MUTUAL)",
		},
		{
			from: 1,
			to: 4,
			status: "ignored",
			note: "Marcus → Emily (ignored)",
		},

		// Priya sends interested to David and Nina
		{
			from: 2,
			to: 5,
			status: "interested",
			note: "Priya → David (interested)",
		},
		{
			from: 2,
			to: 6,
			status: "interested",
			note: "Priya → Nina (interested)",
		},

		// Alex sends interested to Emily and Jake
		{
			from: 3,
			to: 4,
			status: "interested",
			note: "Alex → Emily (interested)",
		},
		{
			from: 3,
			to: 7,
			status: "interested",
			note: "Alex → Jake (interested)",
		},

		// Emily sends interested to Jake
		{
			from: 4,
			to: 7,
			status: "interested",
			note: "Emily → Jake (interested)",
		},

		// David sends ignored to Nina
		{
			from: 5,
			to: 6,
			status: "ignored",
			note: "David → Nina (ignored)",
		},

		// Nina sends interested to Jake
		{
			from: 6,
			to: 7,
			status: "interested",
			note: "Nina → Jake (interested)",
		},

		// Jake sends interested to Sarah
		{
			from: 7,
			to: 0,
			status: "interested",
			note: "Jake → Sarah (interested)",
		},
	];

	// Send all connection requests
	for (const conn of connections) {
		if (userSessions[conn.from] && userSessions[conn.to]) {
			const result = await sendConnectionRequest(
				userSessions[conn.from].token,
				userSessions[conn.to].id,
				conn.status,
			);

			if (result) {
				connectionRequests.push({
					from: `${userSessions[conn.from].firstName} ${userSessions[conn.from].lastName}`,
					to: `${userSessions[conn.to].firstName} ${userSessions[conn.to].lastName}`,
					status: conn.status,
					note: conn.note,
				});
				console.log(`✅ ${conn.note}`);
			}

			await delay(500);
		}
	}

	console.log(`\n✨ Sent ${connectionRequests.length} connection requests!\n`);

	// Now review some requests (accept/reject)
	console.log("\n📝 Reviewing connection requests...\n");

	// Marcus accepts Sarah's request (making them connected)
	const marcusRequests = await getConnectionRequests(userSessions[1].token);
	const sarahToMarcus = marcusRequests.find(
		(req) => req.fromUserId._id === userSessions[0].id,
	);
	if (sarahToMarcus) {
		await reviewConnectionRequest(
			userSessions[1].token,
			sarahToMarcus._id,
			"accepted",
		);
		console.log("✅ Marcus accepted Sarah's request - CONNECTED!");
		await delay(500);
	}

	// Priya accepts Sarah's request
	const priyaRequests = await getConnectionRequests(userSessions[2].token);
	const sarahToPriya = priyaRequests.find(
		(req) => req.fromUserId._id === userSessions[0].id,
	);
	if (sarahToPriya) {
		await reviewConnectionRequest(
			userSessions[2].token,
			sarahToPriya._id,
			"accepted",
		);
		console.log("✅ Priya accepted Sarah's request - CONNECTED!");
		await delay(500);
	}

	// Alex rejects Sarah's request
	const alexRequests = await getConnectionRequests(userSessions[3].token);
	const sarahToAlex = alexRequests.find(
		(req) => req.fromUserId._id === userSessions[0].id,
	);
	if (sarahToAlex) {
		await reviewConnectionRequest(
			userSessions[3].token,
			sarahToAlex._id,
			"rejected",
		);
		console.log("❌ Alex rejected Sarah's request");
		await delay(500);
	}

	// David accepts Priya's request
	const davidRequests = await getConnectionRequests(userSessions[5].token);
	const priyaToDavid = davidRequests.find(
		(req) => req.fromUserId._id === userSessions[2].id,
	);
	if (priyaToDavid) {
		await reviewConnectionRequest(
			userSessions[5].token,
			priyaToDavid._id,
			"accepted",
		);
		console.log("✅ David accepted Priya's request - CONNECTED!");
		await delay(500);
	}

	// Jake accepts Emily's request
	const jakeRequests = await getConnectionRequests(userSessions[7].token);
	const emilyToJake = jakeRequests.find(
		(req) => req.fromUserId._id === userSessions[4].id,
	);
	if (emilyToJake) {
		await reviewConnectionRequest(
			userSessions[7].token,
			emilyToJake._id,
			"accepted",
		);
		console.log("✅ Jake accepted Emily's request - CONNECTED!");
		await delay(500);
	}

	console.log("\n✨ Connection network created!\n");
}

// Step 7: Generate reports
function generateReports() {
	console.log("\n📊 Generating reports...\n");

	// JSON Report
	const jsonReport = {
		users: createdUsers,
		connections: connectionRequests,
		summary: {
			totalUsers: createdUsers.length,
			totalConnectionRequests: connectionRequests.length,
			interestedRequests: connectionRequests.filter(
				(c) => c.status === "interested",
			).length,
			ignoredRequests: connectionRequests.filter((c) => c.status === "ignored")
				.length,
		},
		testingInfo: {
			baseUrl: BASE_URL,
			commonPassword: PASSWORD,
			note: "Use these credentials to login and test the application manually",
		},
	};

	fs.writeFileSync(
		path.join(__dirname, "seed-report.json"),
		JSON.stringify(jsonReport, null, 2),
	);
	console.log("✅ Generated seed-report.json");

	// Markdown Report
	let markdown = `# Mock Data Seed Report\n\n`;
	markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
	markdown += `---\n\n`;

	markdown += `## 👥 Created Users (${createdUsers.length})\n\n`;
	markdown += `All users have password: \`${PASSWORD}\`\n\n`;
	markdown += `| # | Name | Email | Skills |\n`;
	markdown += `|---|------|-------|--------|\n`;

	createdUsers.forEach((user, idx) => {
		markdown += `| ${idx + 1} | ${user.firstName} ${user.lastName} | ${user.email} | ${user.skills.join(", ")} |\n`;
	});

	markdown += `\n---\n\n`;
	markdown += `## 🔗 Connection Requests (${connectionRequests.length})\n\n`;

	markdown += `### Interested Requests\n\n`;
	const interested = connectionRequests.filter(
		(c) => c.status === "interested",
	);
	interested.forEach((conn) => {
		markdown += `- **${conn.from}** → **${conn.to}**\n`;
	});

	markdown += `\n### Ignored Requests\n\n`;
	const ignored = connectionRequests.filter((c) => c.status === "ignored");
	ignored.forEach((conn) => {
		markdown += `- **${conn.from}** → **${conn.to}**\n`;
	});

	markdown += `\n---\n\n`;
	markdown += `## ✅ Accepted Connections\n\n`;
	markdown += `- **Sarah Chen** ↔ **Marcus Johnson** (Mutual interest, accepted)\n`;
	markdown += `- **Sarah Chen** ↔ **Priya Sharma** (Accepted)\n`;
	markdown += `- **Priya Sharma** ↔ **David Kim** (Accepted)\n`;
	markdown += `- **Emily Watson** ↔ **Jake Morrison** (Accepted)\n\n`;

	markdown += `---\n\n`;
	markdown += `## 🧪 Testing Guide\n\n`;
	markdown += `### Login as any user:\n\n`;
	markdown += `\`\`\`bash\n`;
	markdown += `curl -X POST ${BASE_URL}/auth/login \\\n`;
	markdown += `  -H "Content-Type: application/json" \\\n`;
	markdown += `  -d '{"email": "sarah.chen@example.com", "password": "${PASSWORD}"}'\n`;
	markdown += `\`\`\`\n\n`;

	markdown += `### Key Test Scenarios:\n\n`;
	markdown += `1. **Sarah Chen** - Has 2 accepted connections, 1 rejected, sent multiple requests\n`;
	markdown += `2. **Marcus Johnson** - Mutual connection with Sarah, ignored Emily\n`;
	markdown += `3. **Alex Rodriguez** - Rejected Sarah's request, sent requests to others\n`;
	markdown += `4. **Jake Morrison** - Popular (received multiple requests)\n\n`;

	markdown += `---\n\n`;
	markdown += `## 📝 Connection Summary\n\n`;
	markdown += `- **Total Users:** ${createdUsers.length}\n`;
	markdown += `- **Total Requests Sent:** ${connectionRequests.length}\n`;
	markdown += `- **Interested:** ${interested.length}\n`;
	markdown += `- **Ignored:** ${ignored.length}\n`;
	markdown += `- **Accepted Connections:** 4\n`;
	markdown += `- **Rejected:** 1\n\n`;

	fs.writeFileSync(path.join(__dirname, "seed-report.md"), markdown);
	console.log("✅ Generated seed-report.md");

	console.log("\n📁 Reports saved in backend/scripts/\n");
}

// Main execution
async function main() {
	console.log("\n" + "=".repeat(60));
	console.log("  🌱 MERGE - Data Seeding Script");
	console.log("=".repeat(60));

	try {
		await createUsers();
		await createConnectionNetwork();
		generateReports();

		console.log("\n" + "=".repeat(60));
		console.log("  ✨ Seeding Complete!");
		console.log("=".repeat(60));
		console.log("\n📖 Check seed-report.md for testing guide\n");
	} catch (error) {
		console.error("\n❌ Seeding failed:", error.message);
		process.exit(1);
	}
}

// Run the script
main();
