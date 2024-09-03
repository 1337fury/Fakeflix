import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authUser';

const SignupPage = () => {

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { signup } = useAuthStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup({ email, username, password });
	}

	useEffect(() => {
		const queryParams = new URLSearchParams(window.location.search);
		const emailFormUrl = queryParams.get('email');
		if (emailFormUrl) {
			setEmail(emailFormUrl);
		}
	}, []);

	return (
		<div className="h-screen w-full hero-bg">
			<header className="max-w-6xl mx-auto flex items-center justify-between p-4">
				<Link to={"/"}>
					<img src="/netflix-logo.png" alt="Netflix Logo" className="w-52" />
				</Link>
			</header>

			<div className="flex justify-center items-center mt-20 mx-3">
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className="text-2xl text-center text-white font-bold mb-4">Sign Up</h1>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
							<input 
								type="email" 
								id="email" 
								name="email" 
								className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
								placeholder="example@gmail.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="username" className="text-sm font-medium text-gray-300 block">Username</label>
							<input 
								type="username" 
								id="username" 
								name="username" 
								className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
								placeholder="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="password" className="text-sm font-medium text-gray-300 block">Password</label>
							<input 
								type="password" 
								id="password" 
								name="password" 
								className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
								placeholder="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
								className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'
							>
								Sign Up
						</button>

						<div className="text-center text-gray-400">
							Already have an account? {' '}
							<Link to={"/login"} className="text-red-500 hover:underline">Login</Link>
						</div>
					
					</form>
				</div>
			</div>
		</div>
	)
}

export default SignupPage
