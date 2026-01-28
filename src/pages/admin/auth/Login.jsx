import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logo from "../../../assets/images/logo.png";

const MySwal = withReactContent(Swal);

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState("admin"); // "admin" en minúscula
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(email, password);

            MySwal.fire({
                icon: "success",
                title: "¡Login exitoso!",
                showConfirmButton: false,
                timer: 1200,
            });

            setTimeout(() => navigate("/admin"), 1200);
        } catch (err) {
            MySwal.fire({
                icon: "error",
                title: "Error",
                text: err.message || "Credenciales inválidas",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="flex flex-col items-center gap-2 text-yellow-500">
                        <img src={logo} alt="Land Roys" className="h-24 w-auto object-contain" />
                        <span className="text-3xl font-bold tracking-tight text-black">Land Roys</span>
                    </div>
                </div>

                {/* Selector de rol */}
                <div className="bg-gray-200 p-1 rounded-full flex mb-8 relative">
                    <button
                        onClick={() => setRole("admin")}
                        className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${role === "admin" ? "text-black" : "text-gray-500"}`}
                    >
                        ADMIN
                    </button>
                    <button
                        onClick={() => setRole("assistant")}
                        className={`flex-1 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${role === "assistant" ? "text-black" : "text-gray-500"}`}
                    >
                        ASISTENTE
                    </button>
                    <div
                        className={`absolute top-1 bottom-1 w-[49%] bg-yellow-400 rounded-full transition-transform duration-300 shadow-md ${role === "admin" ? "translate-x-0" : "translate-x-full"}`}
                    />
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-400 z-10">
                            Correo Electrónico
                        </label>
                        <div className="flex items-center border-2 border-yellow-400 rounded-xl p-3 bg-gray-50 shadow-inner">
                            <User className="text-gray-400 mr-2" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ejemplo@gmail.com"
                                className="bg-transparent outline-none w-full text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-400 z-10">
                            Contraseña
                        </label>
                        <div className="flex items-center border-2 border-yellow-400 rounded-xl p-3 bg-gray-50 shadow-inner">
                            <Lock className="text-gray-400 mr-2" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="●●●●●●"
                                className="bg-transparent outline-none w-full text-gray-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <a href="#" className="text-sm text-black hover:underline font-medium">
                            ¿Has olvidado tu contraseña?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 uppercase tracking-wider"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;