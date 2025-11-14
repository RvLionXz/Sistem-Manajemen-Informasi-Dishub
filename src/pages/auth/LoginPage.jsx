import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAppContext();

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");

		if (email === "admin@mail.com" && password === "password") {
			const userData = { name: "Admin Dishub", email: "admin@mail.com" };
			login(userData);
			navigate("/dashboard");
		} else {
			setError("Email atau password yang Anda masukkan salah.");
		}
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
			<div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
				<div className="flex justify-center items-center mb-6">
					<img src="/logo-dishub.png" alt="Logo SIMADA" className="h-12 w-12" />
					<h1 className="text-3xl font-bold ml-3 text-gray-800">SIMADA</h1>
				</div>
				<h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
					Selamat Datang
				</h2>
				<p className="text-center text-gray-500 mb-8">
					Sistem Manajemen Data Dinas Perhubungan
				</p>

				{error && (
					<div
						className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md"
						role="alert"
					>
						<p>{error}</p>
					</div>
				)}

				<form onSubmit={handleSubmit} noValidate>
					<div className="mb-4 relative">
						<label
							className="block text-gray-600 mb-2 font-medium"
							htmlFor="email"
						>
							Email
						</label>
						<Mail size={20} className="absolute left-3 top-10 text-gray-400" />
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
							placeholder="contoh: admin@mail.com"
							required
						/>
					</div>
					<div className="mb-6 relative">
						<label
							className="block text-gray-600 mb-2 font-medium"
							htmlFor="password"
						>
							Password
						</label>
						<Lock size={20} className="absolute left-3 top-10 text-gray-400" />
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition"
							placeholder="Ketik password Anda"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors font-semibold shadow-md"
					>
						Login
					</button>
				</form>
				<p className="text-center text-sm text-gray-500 mt-6">
					Belum punya akun?{" "}
					<Link
						to="/register"
						className="text-primary hover:underline font-medium"
					>
						Daftar di sini
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
