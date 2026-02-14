import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider, useSelector } from "react-redux";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connnections from "./components/Connnections";

function App() {
	const user = useSelector((store) => store.user);
	return (
		<>
			<Provider store={store}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<Body />}>
							<Route path="/" element={<Feed />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/connections" element={<Connnections />} />
							<Route path="/about" element={<div>About Page</div>} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
