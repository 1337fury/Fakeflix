import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Trash2 } from 'lucide-react';

const HistoryPage = () => {
	const [history, setHistory] = useState(Array(0)) ;

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const res = await axios.get('/api/v1/search/history');
				setHistory(res.data.history);
				setHistory((prev) => prev.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
			} catch (error) {
				console.error(error.message);
				setHistory([]);
			}
		}
		fetchHistory();
		console.log(history);
	}, [])

	const handleDelete = async (id) => {
		try {
		  await axios.delete(`/api/v1/search/history/${id}`)
		  setHistory((prev) => prev.filter((item) => item.id !== id))
		} catch (error) {
		  console.error(error)
		}
	}

	if (history?.length === 0) {
		return (
			<div className="min-h-screen bg-black text-white">
				<Navbar />
				<div className='max-w-6xl mx-auto px-4 py-8'>
					<h1 className='text-3xl font-bold mb-8'>Search History</h1>
					<div className='flex justify-center items-center h-96'>
						<p className='text-xl'>No search history</p>
					</div>
				</div>
			</div>
		)
	} 

	return (
		<div className='bg-black text-white min-h-screen'>
			<Navbar />

			<div className='max-w-6xl mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-8'>Search History</h1>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{history?.map((item) => (
						<div key={item.id} className='bg-gray-800 p-4 rounded flex items-start relative'>
							<img
								src={SMALL_IMG_BASE_URL + item.image}
								alt='History image'
								className='size-16 rounded-full object-cover mr-4'
							/>
							<div className='flex flex-col'>
								<span className='text-white text-lg'>{item.title}</span>
								<span className='text-gray-400 text-sm'>{new Date(item.createdAt).toLocaleString()}</span>
							</div>

							<span
								className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
									item.type === "movie"
										? "bg-red-600"
										: item.type === "tv"
										? "bg-blue-600"
										: "bg-green-600"
								}`}
							>
								{item.type[0].toUpperCase() + item.type.slice(1)}
							</span>
							<div className="absolute right-[8px] bottom-0">
								<button
								className="p-2 rounded-full hover:bg-gray-700 text-white"
								onClick={(e) => {
									e.stopPropagation()
									handleDelete(item.id)
								}}
								>
								<Trash2 className="w-5 h-5" />
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default HistoryPage