import { useState } from 'react';
import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';
import toast from "react-hot-toast";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState('movie');
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const { setContentType } = useContentStore();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === 'movie' ? setContentType('movie') : setContentType("tv");
		setSearchResults([]);
	}

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!searchTerm) {
			toast.error("Please enter a search term");
			return;
		}
		try {
			const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
			setSearchResults(res.data.content);
		} catch (error) {
			if (error.response.status === 404) {
				toast.error(error.response.data.message);
			} else {
				toast.error("An error occurred, please try again later");
			}
		}
		console.log(searchResults);
	}

	return (
		<div className='bg-black min-h-screen text-white'>
			<Navbar />
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-center gap-3 mb-4'>
					
					<button onClick={() => handleTabClick('movie')}
					        className = {`
								px-4 py-2 
								${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'} 
								rounded`
							}
					>
						Movies
					</button>
					<button onClick={() => handleTabClick('tv')} 
							className = {
								`px-4 py-2 
								${activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'} 
								rounded`
							}
					>
						Series
					</button>
					<button onClick={() => handleTabClick('person')} 
							className={
								`px-4 py-2 
								${activeTab === 'person' ? 'bg-red-600' : 'bg-gray-800'} 
								rounded`}
					>
						People
					</button>

				</div>

				<form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 rounded bg-gray-800 text-white'
					/>
					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
						<Search className='size-6' />
					</button>
				</form>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{searchResults.length === 0 ? null : searchResults.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;
						
						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>

			</div>
		</div>
	)
}

export default SearchPage
