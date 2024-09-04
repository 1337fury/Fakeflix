import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authUser';
import Navbar  from '../../components/Navbar';
import { Play, Info } from 'lucide-react';

export default function HomeScreen() {
	const { Logout } = useAuthStore();
	return (
		<>
			<div className='relative h-screen w-full text-white'>
				<Navbar />

				<img src='/3wiwel.webp' alt='Hero Background' 
				     className='absolute top-0 left-0 w-full h-full object-cover -z-50 ' />

				<div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden="true" />

				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
					<div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

					<div className='max-w-2xl'>
						<h1 className='mt-4 text-6xl font-extrabold text-balance'>
							1337 MED
						</h1>
						<p className='mt-4 text-lg'>
							2022 | 18+
						</p>
						<p className='mt-4 text-lg'>
						1337 is the first to provide IT training in Morocco, completely free of charge, open and accessible to anyone between the ages of 18 and 30. No need for an IT degree, or of having undergone extensive IT training. The only criteria for admission in Treize, Trente-Sept is CREATIVITY.
						</p>
					</div>

					<div className='mt-8 flex'>
						<Link
								to={`/watch/100`}
								className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
								items-center'
							>
								<Play className='size-6 mr-2 fill-black' />
								Play
							</Link>

							<Link
								to={`/watch/100`}
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
