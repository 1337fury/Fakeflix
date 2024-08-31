import { getFromIMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
	try {
		const data = await getFromIMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		const ranomMovie = data.results[Math.floor(Math.random() * data.results.length)];

		res.status(200).json({ success: true, movie: ranomMovie });
	} catch (error) {
		console.error("Error in getTrendingMovies controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const getMovieTrailers = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

		res.status(200).json({ success: true, trailer: data.results });
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

		res.status(200).json({ success: true, details: data });
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

		res.status(200).json({ success: true, movies: data.results });
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

		res.status(200).json({ success: true, movies: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Movies not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};