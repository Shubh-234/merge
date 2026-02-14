const axios = require("axios");

const BASE_URL = "http://localhost:7777/api";

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

const getUsers = async () => {
	try {
		const url = BASE_URL + "/users/";
		console.log("api call url", url);
		const response = await api.get(url);
		console.log("getUsers", response?.data?.users);
		return response?.data?.users;
	} catch (error) {
		console.error("error while getting users", error);
	}
};

const filterUsers = (users) => {
	const usersToBeUpdated = users.filter((user) => {
		return user?.email && user?.email.includes("@example.com");
	});
	console.log("filteredUsers", usersToBeUpdated);
	return usersToBeUpdated;
};

const updateUsersInBatch = async (users) => {
	try {
		const emailDomain = "@gmail.com";
		let updatedUsers = users.map((user) => {
			return {
				...user,
				email: user?.email.replace("@example.com", emailDomain),
			};
		});

		for (let i = 0; i < updatedUsers.length; i++) {
			const userId = updatedUsers[i]?._id;
			const response = await api.patch(
				BASE_URL + `/users/update/${userId}`,
				updatedUsers[i],
			);
			console.log(`updated user ${userId}`, response?.data?.updatedUser);
		}

		console.log("all users updated successfully");
	} catch (error) {
		console.error("Error while updating users", error);
	}
};

async function main() {
	try {
		const users = await getUsers();

		const filteredUsers = filterUsers(users);
		await updateUsersInBatch(filteredUsers);
	} catch (error) {
		console.error("Something broke");
	}
}

main();
