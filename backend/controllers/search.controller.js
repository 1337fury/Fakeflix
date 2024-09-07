import { getFromIMDB }	from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";
import { filterContent } from "../utils/helpers.js";

export const searchPerson = async (req, res) => {
	try {
		const { query } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US`);

		if (data.results.length > 0)
			data.results = data.results.filter((person) => person.gender === 2);

		if (data.results.length === 0) {
			return res.status(404).json({ success: false, message: "Person not found" });
		}

		await User.findByIdAndUpdate(req.user._id, {
			$push: // $push is a MongoDB operator that adds a value to an array field
			{
				searchHistory: {
					id: data.results[0].id,
					name: data.results[0].name,
					image: data.results[0].profile_path,
					type: "person",
					createdAt: new Date(),
				},
			}
		});

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		if (error.response.status === 404) {
			return res.status(404).json({ success: false, message: "Person not found" });
		}

		res.status(500).json({ success: false, message: "Internal server error" });
	}
};

export const searchMovie = async (req, res) => {
	try {
		const { query } = req.params;
		const data = await getFromIMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-AR`);
	
		if (data.results.length > 0) {
		  // Filter out movies with adult content and apply additional filtering
		  const filteredResults = filterContent(data.results);
	
		  if (filteredResults.length === 0)
			return res.status(404).json({ success: false, message: "No appropriate movies found" });
	
		  // Use the first filtered result for search history
		  const firstResult = filteredResults[0];
	
		  await User.findByIdAndUpdate(req.user._id, {
			$push: {
			  searchHistory: {
				id: firstResult.id,
				name: firstResult.title,
				image: firstResult.poster_path,
				type: "movie",
				createdAt: new Date(),
			  },
			}
		  });
	
		  res.status(200).json({ success: true, content: filteredResults });
		} else {
		  return res.status(404).json({ success: false, message: "Movie not found" });
		}
	  } catch (error) {
		if (error.response && error.response.status === 404) {
		  return res.status(404).json({ success: false, message: "Movie not found" });
		}
		res.status(500).json({ success: false, message: "Internal server error" });
	  }
};

export const searchTv = async (req, res) => {
	try {
		const { query } = req.params;
    const data = await getFromIMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US`);

    if (data.results.length > 0) {
      const filteredResults = filterContent(data.results);

      if (filteredResults.length === 0)
        return res.status(404).json({ success: false, message: "No appropriate TV shows found" });

      const firstResult = filteredResults[0];

      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: firstResult.id,
            name: firstResult.name,
            image: firstResult.poster_path,
            type: "tv",
            createdAt: new Date(),
          },
        }
      });

      res.status(200).json({ success: true, content: filteredResults });
    } else {
      return res.status(404).json({ success: false, message: "TV show not found" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ success: false, message: "TV show not found" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const searchHistory = async (req, res) => {
	try {
		const history = req.user.searchHistory || [];
		res.status(200).json({ success: true, history });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export const deleteSearchHistory = async (req, res) => {
	try {
		let { id } = req.params;
		id = parseInt(id); // Convert id to integer
		await User.findByIdAndUpdate(req.user._id, {
			$pull: // $pull is a MongoDB operator that removes a value from an array field
			{
				searchHistory: { id },
			}
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

