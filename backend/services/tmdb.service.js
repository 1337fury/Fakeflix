import { ENV_VARS } from "../config/envVars.js";
import axios from "axios";

export const getFromIMDB = async (url) => {
	const options = {
		headers: {
		  accept: 'application/json',
		  Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
		}
	};

	const response = await axios.get(url, options);

	if (response.status !== 200) {
		console.error("Error in getFromIMDB service:", response.data);
		throw new Error("Error fetching data from TMDB API");
	}

	return response.data;
};

