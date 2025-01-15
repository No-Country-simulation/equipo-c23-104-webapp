import  { useState } from "react";

function Welcome() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleValidation = (e) => {
    e.preventDefault();
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Por favor, introduce tu correo electrónico.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!password) {
      newErrors.password = "Por favor, introduce tu contraseña.";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      alert("Formulario enviado con éxito");
    }
  };

  return (
    
    <form
      className="max-w-sm mx-auto p-6 rounded-lg shadow-lg mt-40  shadow-lime-600 bg-white"
      onSubmit={handleValidation}
    >
      <h2 className="text-6xl font-bold text-lime-600 text-center mb-6">
        Parolu!
      </h2>

      {/* Campo de Email */}
      <div className="mb-4">
        <label
          htmlFor="email-address-icon"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Tu Correo
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="email-address-icon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="name@flowbite.com"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Campo de Contraseña */}
      <div className="mb-4">
        <label
          htmlFor="password-icon"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Contraseña
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M5 8V6a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1zm6-2a3 3 0 1 0-6 0v2h6V6z" />
            </svg>
          </div>
          <input
            type="password"
            id="password-icon"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Introduce tu contraseña"
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="block w-full p-2.5 bg-lime-600 text-white rounded-lg font-bold hover:bg-lime-700"
      >
        Registrate
      </button>
    </form>

  );
}

export default Welcome;
