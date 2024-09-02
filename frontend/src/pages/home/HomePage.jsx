import React from 'react'
import AuthScreen from './AuthScreen'
import HomeScreen from './HomeScreen'

export default function HomePage() {
	const user = false;
	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
}
