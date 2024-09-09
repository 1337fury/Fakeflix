import { getFromIMDB } from "../services/tmdb.service.js";
import { filterContent } from "../utils/helpers.js";

export const getTrendingTv = async (req, res) => {
	try {
		const data = await getFromIMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");

		if (data.results.length > 0) {
			const filteredResults = await filterContent(data.results);
	  
			if (filteredResults.length === 0)
				return res.status(404).json({ success: false, message: "No appropriate tv found" });

			const randomTv = filteredResults[Math.floor(Math.random() * filteredResults.length)];

			res.status(200).json({ success: true, content: randomTv });
		} else
			res.status(404).json({ success: false, message: "Tv not found" });
	} catch (error) {
		console.error("Error in getTrendingTvs controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getTvTrailers = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

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

		if (data.results.length > 0) {
			const filteredResults = await filterContent(data.results);
	  
			if (filteredResults.length === 0)
				return res.status(404).json({ success: false, message: "No appropriate tvs found" });

			return res.status(200).json({ success: true, content: filteredResults });
		} else
			return res.status(404).json({ success: false, message: "Tv not found" });
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

		if (data.results.length > 0) {
			const filteredResults = await filterContent(data.results);
	  
			if (filteredResults.length === 0)
				return res.status(404).json({ success: false, message: "No appropriate tvs found" });

			return res.status(200).json({ success: true, content: filteredResults });
		} else
			return res.status(404).json({ success: false, message: "Tv not found" });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Tvs not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};