import { useContentStore } from '../store/content';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const MovieSlider = ({ category }) => { 
	const { contentType } = useContentStore();
	const formatedCategory = (category.charAt(0).toUpperCase() + category.slice(1)).replaceAll("_", " ");
	const formatedContentType = contentType === "movie" ? "Movies" : "Tv Shows";

	const [content, setContent] = useState([]);
	const [arrow, setArrow] = useState(false);

	const sliderRef = useRef(null);

	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	useEffect(() => {
		const getContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/${category}`);
			console.log(`/api/v1/${contentType}/${category}`);
			console.log(res.data.content);
			setContent(res.data.content);
		};
		getContent();
	}, [category, contentType]);

	return (
		<div
			className='bg-black text-white relative px-5 md:px-20'
			onMouseEnter={() => setArrow(true)}
			onMouseLeave={() => setArrow(false)}
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{formatedCategory} {formatedContentType}
			</h2>

			<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
				{content.map((item) => (
					<Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
						<div className='rounded-lg overflow-hidden'>
							<img
								src={SMALL_IMG_BASE_URL + item.backdrop_path}
								alt='Movie image'
								className='transition-transform duration-300 ease-in-out group-hover:scale-125'
							/>
						</div>
						<p className='mt-2 text-center'>{item.title || item.name}</p>
					</Link>
				))}
			</div>

			{arrow && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
}

export default MovieSlider;