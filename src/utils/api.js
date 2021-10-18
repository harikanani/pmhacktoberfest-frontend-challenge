import axios from "axios";

export const api = async ({ method, url, headers, data }) => {
	const baseurl = "https://pmhacktoberfest.herokuapp.com";
	const response = await axios({
		method,
		url: `${baseurl}${url}`,
		data: data ? data : null,
	});
	return response;
};
