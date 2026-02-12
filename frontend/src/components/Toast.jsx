import { useEffect } from "react";

const Toast = ({ message, onClose, duration = 3000 }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div className="fixed bottom-8 right-8 z-50 animate-slide-up">
			<div className="bg-[#121826] border border-indigo-500/50 rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3 min-w-[300px]">
				<div className="flex-shrink-0">
					<svg
						className="w-5 h-5 text-indigo-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<p className="text-sm text-gray-200 font-medium">{message}</p>
				<button
					onClick={onClose}
					className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-200 transition">
					<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Toast;
