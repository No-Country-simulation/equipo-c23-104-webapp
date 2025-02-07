import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig.js"; // Importa tu configuración de Axios
import fondo from "../../assets/fondo.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

        if (!email) {
            newErrors.email = "El correo electrónico es obligatorio.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Por favor, ingresa un correo electrónico válido.";
            isValid = false;
        }

        if (!password) {
            newErrors.password = "La contraseña es obligatoria.";
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(import.meta.env.VITE_LOGIN_USER, {
                    identifier: email,
                    password,
                });

                const { token } = response.data;
                if (token) {
                    localStorage.setItem("authToken", token);
                    navigate("/comunidades");
                }
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                setErrorMessage("Correo o contraseña incorrectos.");
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
                <img
                    src={fondo}
                    alt="Login Image"
                    className="w-full h-full object-center object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-10">
                <div className="w-full max-w-md p-8">
                    <div className="mb-32 flex items-center gap-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 66 66" fill="none">
                                <rect width="66" height="66" rx="6" fill="#202427" />
                                <path
                                    d="M16 54L25.9264 33M25.9264 33L35.8527 12C52.6034 20.6471 50.7422 26.2059 44.5383 35.4706C39.5751 42.8824 30.0623 36.9118 25.9264 33Z"
                                    stroke="#65A30D"
                                    strokeWidth="5"
                                />
                            </svg>
                        </div>
                        <div>
                            <span className="text-2xl font-bold mb-2 text-lime-600">Parolu!</span>
                            <p className="text-gray-600">Aprende idiomas con gente</p>
                        </div>
                    </div>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-4xl mb-4">Login</h2>
                        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-3 py-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-3 py-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-lime-600 text-white py-2 rounded hover:bg-lime-700"
                        >
                            Login
                        </button>
                        <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-lime-600 hover:underline">Forgot password?</Link>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-gray-700">¿No tienes cuenta? </span>
                            <Link to="/registrar" className="text-lime-600 hover:underline">Regístrate</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
