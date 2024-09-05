import { getFromIMDB } from "../services/tmdb.service.js";
import { IDS_TO_EXCULDE } from "../../frontend/src/utils/constants.js";

export const getTrendingTv = async (req, res) => {
	try {
		const data = await getFromIMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

		data.results = data.results.filter((tv) => 
			!tv?.adult && 
			!IDS_TO_EXCULDE.includes(tv?.id)
		);

		const ranomTv = data.results[Math.floor(Math.random() * data.results.length)];

		res.status(200).json({ success: true, content: ranomTv });
	} catch (error) {
		console.error("Error in getTrendingTvs controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getTvTrailers = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

		if (IDS_TO_EXCULDE.includes(data.id)) {
			return res.status(404).json({ success: false, message: "Tv not found" });
		}

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Trailer not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getTvDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

		if (IDS_TO_EXCULDE.includes(data.id)) {
			return res.status(404).json({ success: false, message: "Tv not found" });
		}

		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Tv not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getSimilarTvs = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`);

		data.results = data.results.filter((tv) => 
			!tv?.adult && 
			!IDS_TO_EXCULDE.includes(tv?.id)
		);

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Tvs not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getTvsByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);

		data.results = data.results.filter((tv) => 
			!tv?.adult && 
			!IDS_TO_EXCULDE.includes(tv?.id)
		);

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Tvs not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};