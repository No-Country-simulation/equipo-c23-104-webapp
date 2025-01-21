import  { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Formulario válido:', { email, password });
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                <img
                    src="../src/assets/fondo.jpg"
                    alt="Login Image"
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="w-1/2 flex items-start justify-center bg-white pt-10">
                <div className="w-full max-w-md p-8">
                    <div className="mb-32 flex items-center gap-2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 66 66" fill="none">
                                <rect width="66" height="66" rx="6" fill="#202427" />
                                <g clipPath="url(#clip0_1520_319)">
                                    <g clipPath="url(#clip1_1520_319)">
                                        <path
                                            d="M16 54L25.9264 33M25.9264 33L35.8527 12C52.6034 20.6471 50.7422 26.2059 44.5383 35.4706C39.5751 42.8824 30.0623 36.9118 25.9264 33Z"
                                            stroke="#65A30D"
                                            strokeWidth="5"
                                        />
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1520_319">
                                        <rect x="8" y="8" width="50" height="50" rx="6" fill="white" />
                                    </clipPath>
                                    <clipPath id="clip1_1520_319">
                                        <rect width="50" height="50" fill="white" transform="translate(8 8)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <span className="text-2xl font-bold mb-2 text-lime-600">Parolu!</span>
                            <p className="text-gray-600">Aprende idiomas con gente</p>
                        </div>
                    </div>

                    <form className="w-full" onSubmit={handleSubmit}>
                        <h2 className="text-4xl mb-4">Login</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-3 py-2 border rounded ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
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
                                className={`w-full px-3 py-2 border rounded ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
