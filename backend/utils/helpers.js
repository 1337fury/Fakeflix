import { KEYWORDS, IDS_TO_EXCULDE } from './constants.js';

const filterContent = (content) => {
  return content.filter(item => {
    const title = (item.title || item.name || item.original_name || '').toLowerCase();
    const overview = (item.overview || '').toLowerCase();

    if (!title || !overview) {
      return false;
    }

    if (item.original_language === 'ja' || item.original_language === 'fr') {
      return false;
    }

    for (const keyword of KEYWORDS) {
      if (title.includes(keyword) || 
          overview.includes(keyword) || 
          IDS_TO_EXCULDE.includes(item.id)) {
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