import { Keyword } from "../models/filter.model.js";
import { Exclusion } from "../models/filter.model.js";

const filterContent = async (content) => {

	let KEYWORDS = await Keyword.findOne({ name: 'KEYWORDS' }) || [];
	let IDS_TO_EXCLUDE = await Exclusion.findOne({ name: 'IDS_TO_EXCLUDE' }) || [];

	const words = KEYWORDS.words || [];
	const ids = IDS_TO_EXCLUDE.ids || [];

	return content.filter(item => {
		const title = (item.title || item.name || item.original_name || '').toLowerCase();
		const overview = (item.overview || '').toLowerCase();

		if (!title || !overview) {
			return false;
		}

		if (item.original_language === 'ja' || item.original_language === 'fr') {
			return false;
		}

		for (const word of words) {
			if (title.includes(word) || 
				overview.includes(word) || 
				ids.includes(item.id)) {
				return false;
			}
		}

		if (item.adult) {
			return false;
		}

		return true;
	});
}

export { filterContent };