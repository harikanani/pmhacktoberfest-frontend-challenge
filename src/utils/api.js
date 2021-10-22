import axios from "axios";

export const api = async ({ method, url, headers, data }) => {
	const baseurl = process.env.REACT_APP_API_URL;
	const response = await axios({
		method,
		url: `${baseurl}${url}`,
		data: data ? data : null,
	});
	return response;
};
