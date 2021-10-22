import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import MyContext from "../context/MyContext";

const Login = () => {
	const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
	useEffect(() => {
		console.log({ isAuthenticated });
		console.log({ setIsAuthenticated });
	}, [isAuthenticated, setIsAuthenticated]);

	const loginToAdmin = () => {
		let email = document.getElementById("email").value;
		let password = document.getElementById("pass").value;
		if (
			email === process.env.REACT_APP_EMAIL &&
			password === process.env.REACT_APP_PASSWORD
		) {
			// set isAuthenticated to true
			setIsAuthenticated(true);
		} else {
			console.log("login failed");
		}
	};

	if (isAuthenticated) return <Redirect to="/admin" />;
	return (
		<div>
			<div>
				<input type="text" placeholder="email" id="email" />
				<input type="password" placeholder="password" id="pass" />
				<button onClick={() => loginToAdmin()}>Login</button>
			</div>
		</div>
	);
};

export default Login;
