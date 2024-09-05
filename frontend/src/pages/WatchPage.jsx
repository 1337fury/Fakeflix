import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import { useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/helpers";
import { Link } from "react-router-dom";
import Loading  from "../components/Loading";

const WatchPage = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [similar, setSimilar] = useState([]);
	const [details, setDetails] = useState([]);
	const { contentType } = useContentStore();
	const [currTrailerIdx, setCurrTrailerIdx] = useState(0);
	const [loading, setLoading] = useState(true);

	const sliderRef = useRef(null);

	useEffect(() => {
		const fetchTrailers = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				setTrailers(res.data.content);
			} catch (error) {
				setTrailers([]);
			}
		}
		fetchTrailers();
	}, [id, contentType]);

	useEffect(() => {
		const fetchSimilar = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
				setSimilar(res.data.content);
			} catch (error) {
				setSimilar([]);
			}
		}
		fetchSimilar();
	}, [id, contentType]);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
				setDetails(res.data.content);
			} catch (error) {
				if (error.message.includes("404")) {
					setDetails(null);
				}
			} finally {
				setLoading(false);
			}
		}
		fetchDetails();
	}, [id, contentType]);

	const handlePrev = () => {
		if (currTrailerIdx > 0) setCurrTrailerIdx(currTrailerIdx - 1);
	};

	const handleNext = () => {
		if (currTrailerIdx < trailers?.length - 1) setCurrTrailerIdx(currTrailerIdx + 1);
	};

	if (!details) {
		return (
			<div className='bg-black text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}

	const scrollLeft = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	};
	const scrollRight = () => {
		if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<Loading />
			</div>
		);

	return (
		<div className="bg-black min-h-screen text-white">
			<div className="mx-auto container px-4 py-8 h-full">
				<Navbar />

				{trailers.length > 0 && (
					<div className="flex justify-between items-center mb-4">

						<button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
								${currTrailerIdx === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
								disabled = {currTrailerIdx === 0}
								onClick={handlePrev}
						>
							<ChevronLeft size={24} />
						</button>

						<button className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded 
								${currTrailerIdx === trailers?.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
								disabled = {currTrailerIdx === trailers?.length - 1}
								onClick={handleNext}
						>
							<ChevronRight size={24} />
						</button>

					</div>
				)}

				<div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
					{trailers.length > 0 && (
						<ReactPlayer
							url={`https://www.youtube.com/watch?v=${trailers[currTrailerIdx]?.key}`}
							controls={true}
							width={"100%"}
							height={"70vh"}
							className="mx-auto overflow-hidden rounded-lg"
						/>
					)}

					{trailers?.length === 0 && (
						<h2 className='text-xl text-center mt-5'>
							No trailers available for{" "}
							<span className='font-bold text-red-600'>{details?.title || details?.name}</span> 😥
						</h2>
					)}
				</div>

				{/* Movie Details */}
				<div
					className='flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto'
				>
					<div className='mb-4 md:mb-0'>
						<h2 className='text-5xl font-bold text-balance'>{details?.title || details?.name}</h2>

						<p className='mt-2 text-lg'>
							{formatReleaseDate(details?.release_date || details?.first_air_date)} |{" "}
							{details?.adult ? (
								<span className='text-red-600'>18+</span>
							) : (
								<span className='text-green-600'>+13</span>
							)}{" "}
						</p>
						<p className='mt-4 text-lg'>{details?.overview}</p>
					</div>
					<img
						src={ORIGINAL_IMG_BASE_URL + details?.poster_path}
						alt='Poster image'
						className='max-h-[600px] rounded-md'
					/>
				</div>

				{similar.length > 0 && (
					<div className='mt-12 max-w-5xl mx-auto relative'>
						<h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>

						<div className='flex overflow-x-scroll hide-scrollbar gap-4 pb-4 group' ref={sliderRef}>
							{similar.map((details) => {
								if (details.poster_path === null) return null;
								return (
									<Link key={details.id} to={`/watch/${details.id}`} className='w-52 flex-none'>
										<img
											src={SMALL_IMG_BASE_URL + details.poster_path}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{details.title || details.name}</h4>
									</Link>
								);
							})}

							<ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full'
								onClick={scrollLeft}
							/>
						</div>
					</div>
				)}

			</div>
		</div>
	)
}

export default WatchPage
