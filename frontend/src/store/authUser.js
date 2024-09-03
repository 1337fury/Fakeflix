import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
	user: null,
	isSigninUp: false,
	isCheckingAuth: true,
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
	login: async () => {},
	Logout: async () => {},
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get('/api/v1/auth/authCheck');
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			console.error('Error in authCheck:', error.message);
		}
	},
}))
