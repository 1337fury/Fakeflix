import { useEffect, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';

const useTrContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const fetchTrContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/trending`);
			setTrendingContent(res.data.content);
		};
		
		fetchTrContent();
	}, [contentType]);

	return { trendingContent };
}

export default useTrContent;
