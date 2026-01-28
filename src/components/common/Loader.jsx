import React from "react";
import logo from "../../assets/images/logo.png";

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm">
            <div className="relative flex flex-col items-center">
                {/* Animated Ring */}
                <div className="absolute w-32 h-32 border-4 border-yellow-400/30 rounded-full animate-ping opacity-20"></div>
                <div className="absolute w-32 h-32 border-t-4 border-yellow-400 rounded-full animate-spin"></div>

                {/* Logo Container */}
                <div className="relative w-28 h-28 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                    <img
                        src={logo}
                        alt="Loading..."
                        className="w-16 h-auto object-contain animate-pulse"
                    />
                </div>

                {/* Text */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <h3 className="text-2xl font-black text-white tracking-widest uppercase italic">
                        Land <span className="text-yellow-400">Roys</span>
                    </h3>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
