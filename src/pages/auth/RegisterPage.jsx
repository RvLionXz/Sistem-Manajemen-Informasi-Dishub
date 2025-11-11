import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ActivitySquare, User, Mail, Lock } from "lucide-react";

const RegisterPage = () => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Pendaftaran berhasil! Anda akan diarahkan ke halaman login.");
		navigate("/login");
	};

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
			<div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
				<div className="flex justify-center mb-6">
					<ActivitySquare size={40} className="text-sky-500" />
					<h1 className="text-3xl font-bold ml-2 text-gray-800">
						<span className="text-sky-500">Sistem</span>Info
					</h1>
				</div>
				<h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
					Buat Akun Baru Anda
				</h2>

				<form onSubmit={handleSubmit}>
					<div className="mb-4 relative">
						<label
							className="block text-gray-600 mb-2 font-medium"
							htmlFor="name"
						>
							Nama Lengkap
						</label>
						<User size={20} className="absolute left-3 top-10 text-gray-400" />
						<input
							id="name"
							type="text"
							className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
							required
						/>
					</div>
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
							className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
							required
						/>
					</div>
					<div className="mb-4 relative">
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
							className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full mt-6 bg-sky-600 text-white py-3 rounded-md hover:bg-sky-700 transition-colors font-semibold shadow-md"
					>
						Daftar
					</button>
				</form>
				<p className="text-center text-sm text-gray-500 mt-6">
					Sudah punya akun?{" "}
					<Link
						to="/login"
						className="text-sky-600 hover:underline font-medium"
					>
						Login di sini
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
