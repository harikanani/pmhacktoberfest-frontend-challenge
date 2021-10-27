import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import MyContext from "../context/MyContext";
import "../style/Login.css";
import pumpkin from "./pumpkin.png";

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
			alert("Email/Password is invalid!");
			console.log("login failed");
		}
	};

	if (isAuthenticated) return <Redirect to="/admin" />;
	return (
		<div className="login-main">
			<div className="login">
				<input type="text" placeholder="Email" id="email" />
				<input type="password" placeholder="Password" id="pass" />
				<button onClick={() => loginToAdmin()}>Login</button>
			</div>
			{/* <img src={pumpkin} alt="pumpkin" className="holloween-right" />
			<img src={pumpkin} alt="pumpkin" className="holloween-left" /> */}
		</div>
	);
};

export default Login;
