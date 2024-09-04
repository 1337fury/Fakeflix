import React from 'react'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'
import { useAuthStore } from '../../store/authUser';

export default function HomePage() {
	const user = useAuthStore(state => state.user);
	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
}
