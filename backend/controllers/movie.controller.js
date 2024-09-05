import { getFromIMDB } from "../services/tmdb.service.js";
import { IDS_TO_EXCULDE } from "../../frontend/src/utils/constants.js";

export const getTrendingMovie = async (req, res) => {
	try {
		const data = await getFromIMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

		data.results = data.results.filter((movie) => 
			!movie?.adult && 
			!IDS_TO_EXCULDE.includes(movie?.id)
		);

		const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

		res.status(200).json({ success: true, content: randomMovie });
	} catch (error) {
		console.error("Error in getTrendingMovie controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getMovieTrailers = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

		if (IDS_TO_EXCULDE.includes(data.id)) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Trailer not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getMovieDetails = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

		if (IDS_TO_EXCULDE.includes(data.id)) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}

		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Movie not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getSimilarMovies = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`);

		data.results = data.results.filter((movie) => 
			!movie?.adult && 
			!IDS_TO_EXCULDE.includes(movie?.id)
		);

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Movies not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getMoviesByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);

		data.results = data.results.filter((movie) => 
			!movie?.adult && 
			!IDS_TO_EXCULDE.includes(movie?.id)
		);

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Movies not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};