import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import MyContext from "../context/MyContext";
import "../style/Login.css";

const Login = () => {
	const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);

	const loginToAdmin = () => {
		let email = document.getElementById("email").value;
		let password = document.getElementById("pass").value;
		if (
			email === process.env.REACT_APP_EMAIL &&
			password === process.env.REACT_APP_PASSWORD
		) {
			// set isAuthenticated to true
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Logged in Successfully",
				showConfirmButton: false,
				timer: 1500,
			});
			setIsAuthenticated(true);
		} else {
			Swal.fire({
				title: "Oops...",
				text: "Email or Password is invalid",
				icon: "error",
			});
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
