import React from 'react';
import capture from '../../assets/capture.png';
import fondo from '../../assets/fondo.jpg';
import fotoP from '../../assets/fotoP.jpg';
const Welcome = () => {

    return (
        <>
            <nav className="bg-white-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                        <h2>Parolu!</h2>
                        </div>
                        <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Home
                            </a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            About
                            </a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Services
                            </a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                            Contact
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Home
                    </a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        About
                    </a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Services
                    </a>
                    <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Contact
                    </a>
                    </div>
                </div>
            </nav>
            <section 
    className="text-center bg-cover bg-center bg-no-repeat h-screen relative" 
    style={{backgroundImage: `url(${fondo})`}}>

                <div className='flex items-center justify-center h-full'>
                    <div className='w-2/3 p-36 text-start bg-white shadow-lg rounded-md h-full'>
                        <h2 className="text-9xl font-bold text-gray-800">Practicá tu nuevo idioma</h2>
                        <h2 className="text-7xl font-bold text-lime-600">Parolu!</h2>
                        <p className="text-2xl text-slate-600 mt-4 mb-10">Sumérgete en un mundo de aprendizaje interactivo donde puedes conversar con nativos y otros estudiantes de tu nueva lengua. Mejora tus habilidades mientras haces nuevos amigos, todo en un ambiente amigable y relajado. ¡Únete a Parolu y lleva tu práctica al siguiente nivel! 🌍💬</p>
                        <a href="" className='h-10 p-4 font-semibold rounded-md bg-lime-600 text-white mr-5'>Registrarse</a>
                        <a href="" className='h-10 p-4 font-semibold rounded-md bg-white text-lime-600 border boder-lime-600'>Iniciar sesión</a>
                    </div>
                    <div className='w-1/3 flex justify-center rounded-md ml-3'>
                        <div className="flex justify-center flex-col w-full mx-10 p-8 bg-white rounded-md">
                            <div className="flex items-center content-center justify-start border-b-2 border-gray-300 pb-4">
                                <img src={fotoP} alt="" className="w-16 h-16 rounded-full" />
                                <p className="text-2xl font-bold text-gray-700 w-2/3 text-left ml-4">
                                    Lucas G. Ybañez
                                </p>
                            </div>
                            <p className="text-3xl text-gray-700 mt-5 text-start">Saluton! Mia nomo estas Lucas</p>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    );
}

export default Welcome;