import React from "react";
const MyContext = React.createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	upvotedContestants: {},
	setUpvotedContestants: () => {},
});
export default MyContext;
