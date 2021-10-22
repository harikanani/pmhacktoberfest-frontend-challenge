import React from "react";
const MyContext = React.createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
});
export default MyContext;
