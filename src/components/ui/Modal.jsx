import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-in-out]"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white rounded-lg shadow-xl w-full max-w-lg"
			>
				<div className="flex justify-between items-center p-4 border-b">
					<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 rounded-full p-1 transition-colors"
					>
						<X size={24} />
					</button>
				</div>
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
