import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axiosConfig.js"; // Asegúrate de tener configurada la base URL en axiosConfig
const apiRegister = import.meta.env.VITE_REGISTER_USER;

const Register = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = {};
        if (!formValues.name) newErrors.name = "El nombre completo es obligatorio";
        if (!formValues.username) newErrors.username = "El nombre de usuario es obligatorio";
        if (!formValues.email) {
            newErrors.email = "El email es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            newErrors.email = "Por favor ingrese un email válido";
        }
        if (!formValues.password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (formValues.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        } else if (!/[A-Z]/.test(formValues.password)) {
            newErrors.password = "La contraseña debe contener al menos una letra mayúscula";
        } else if (!/[^A-Za-z0-9]/.test(formValues.password)) {
            newErrors.password = "La contraseña debe contener al menos un carácter especial";
        }
        return newErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await axios.post(apiRegister, formValues);  
                setSuccessMessage("Usuario registrado con éxito");
                setErrorMessage("");
                try {
                    const response = await axios.post(import.meta.env.VITE_LOGIN_USER, {
                        identifier: formValues.email,
                        password: formValues.password,
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
            } catch (error) {
                console.error("Error al registrar usuario:", error);
                if (error.response?.data?.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("Hubo un error al registrar. Intenta de nuevo.");
                }
            }
        }
    };
    
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="hidden md:flex w-1/2 bg-gray-200 items-center justify-center">
                <img src="../src/assets/fondo.jpg" alt="Register Image" className="w-full h-full object-center object-cover" />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white py-10">
                <div className="w-full max-w-md p-8">
            <div className="w-full max-w-md px-8">
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
            </div>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-4xl mb-4">Register</h2>
                        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                        <div className="mb-4">
                            <label className="block text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
                                placeholder="Ingrese su nombre completo"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Nombre de Usuario</label>
                            <input
                                type="text"
                                name="username"
                                value={formValues.username}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded`}
                                placeholder="Ingrese su nombre de usuario"
                            />
                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
                                placeholder="Ingrese su email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded`}
                                placeholder="Ingrese su contraseña"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <button type="submit" className="w-full bg-lime-600 text-white py-2 rounded hover:bg-lime-700">
                            Registrar
                        </button>
                        <div className="mt-4 text-center">
                            <span className="text-gray-700">¿Ya tienes cuenta? </span>
                            <Link to="/login" className="text-lime-600 hover:underline">Inicia sesión</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
