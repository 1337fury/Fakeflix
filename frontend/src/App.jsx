import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchPage from "./pages/WatchPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { Loader } from "lucide-react";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/404";

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className="h-screen flex justify-center items-center bg-black">
				<Loader className="size-10 text-red-500 animate-spin" />
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
				<Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				<Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				<Route path="/history" element={user ? <HistoryPage /> : <Navigate to={"/login"} />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />

			<Toaster />
		</>
	)
}

export default App

