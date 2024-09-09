import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
	user: null,
	isSigninUp: false,
	isCheckingAuth: true,
	isLoginOut: false,
	isLoggingIn: false,
	signup: async ( credentials ) => {
		set({ isSigninUp: true });
		try {
			const response = await axios.post('/api/v1/auth/signup', credentials);
			set({ user: response.data.user, isSigninUp: false });
			toast.success('Signup successful');
		} catch (error) {
			toast.error(error.response.data.message || 'Something went wrong');
			set({ isSigninUp: false, user: null });
		}
	},
	login: async ( credentials ) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post('/api/v1/auth/signin', credentials);
			set({ user: response.data.user, isLoggingIn: false });
			toast.success('Login successful');
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			console.error('Error in signin:', error.message);
			toast.error(error.response.data.message || 'Something went wrong');
		}
	},
	logout: async () => {
		try {
			await axios.post('/api/v1/auth/signout');
			set({ user: null });
			toast.success('Logout successful');
		} catch (error) {
			console.error('Error in signout:', error.message);
			toast.error(error.response.data.message || 'Something went wrong');
		}
	},
	authCheck: async () => {
		// print with color
		console.log('%cChecking auth...', 'color: orange');
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get('/api/v1/auth/authCheck');
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			console.error('Error in authCheck:', error.message);
		}
	},
}))
