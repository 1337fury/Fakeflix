import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authUser';
import Navbar  from '../../components/Navbar';
import { Play, Info } from 'lucide-react';
import useTrContent from '../../hooks/useTrContent';
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constants';

export default function HomeScreen() {
	const { Logout } = useAuthStore();
	const { trendingContent } = useTrContent();

	if (!trendingContent)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);

	return (
		<>
			<div className='relative h-screen w-full text-white'>
				<Navbar />

				<img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} 
					alt='Hero Background' 
				    className='absolute top-0 left-0 w-full h-full object-cover -z-50 ' />

				<div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden="true" />

				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
					<div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

					<div className='max-w-2xl'>
						<h1 className='mt-4 text-6xl font-extrabold text-balance'>
							{trendingContent?.title || trendingContent?.name || trendingContent?.original_name}
						</h1>
						<p className='mt-4 text-lg'>
							{trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]} | {trendingContent?.adult ? "18+" : "13+"}
						</p>
						<p className='mt-4 text-lg'>
							{trendingContent?.overview.length > 200
								? trendingContent?.overview.slice(0, 250) + "..."
								: trendingContent?.overview}
						</p>
					</div>

					<div className='mt-8 flex'>
						<Link
								to={`/watch/${trendingContent?.id}`} 
								className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
								items-center'
							>
								<Play className='size-6 mr-2 fill-black' />
								Play
							</Link>

							<Link
								to={`/watch/${trendingContent?.id}`}
								className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
							>
								<Info className='size-6 mr-2' />
								More Info
						</Link>
					</div>

				</div>

			</div>
		</>
	)
}
