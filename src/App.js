import React, { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import MyContext from "./context/MyContext";

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const [upvotedContestants, setUpvotedContestants] = useState({});
	const isAuthenticatedContext = {
		isAuthenticated,
		setIsAuthenticated,
	};

	return (
		<MyContext.Provider value={isAuthenticatedContext}>
			<div className="app">
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/admin">
							<Admin />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
					</Switch>
				</Router>
			</div>
		</MyContext.Provider>
	);
};

export default App;
