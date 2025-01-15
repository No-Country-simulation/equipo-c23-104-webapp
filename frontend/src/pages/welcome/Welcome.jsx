import React from 'react';
import capture from '../../assets/capture.png';
import fondo from '../../assets/fondo.jpg';
import fotoP from '../../assets/fotoP.jpg';
import { TypeAnimation } from 'react-type-animation';
import './Marque.css';


const Welcome = () => {

    return (
        <>
            <section className="text-center h-full">
                <div className="h-full w-full">
                <div className='grid sm:grid-cols-1 md:grid-cols1 lg:grid-cols-2 gap-2 h-full'>
                    <div className='p-10 lg:p-16 text-start bg-white h-full flex flex-col justify-center'>
                        <h2 className="text-7xl lg:text-9xl font-bold text-lime-600 text-center lg:text-left">Parolu!</h2>
                        <h2 className="text-2xl text-gray-800 text-center text-gray-800 lg:text-left md:text-4xl sm:text-4xl lg:text-7xl font-bold">Practicá tu nuevo idioma</h2>
                        <p className="lg:text-2xl text-slate-600 mt-4 mb-10 text-justify">Sumérgete en un mundo de aprendizaje interactivo donde puedes conversar con nativos y otros estudiantes de tu nueva lengua. Mejora tus habilidades mientras haces nuevos amigos, todo en un ambiente amigable y relajado. ¡Únete a Parolu y lleva tu práctica al siguiente nivel! 🌍💬</p>
                        <div className='m-auto'>
                            <a href="" className='h-10 p-3 font-semibold rounded-md bg-lime-600 text-white mr-5'>Registrarse</a>
                            <a href="" className='h-10 p-3 font-semibold rounded-md bg-white text-lime-600 border boder-lime-600'>Iniciar sesión</a>
                        </div>
                    </div>

                    <div className='py-40 flex justify-center rounded-md ml-3 bg-gradient-to-r from-emerald-200 to-lime-600'>
                        <div className="flex justify-center flex-col w-full mx-10 p-8 bg-white rounded-md shadow-lg h-56 my-auto">
                            <div className="flex items-center content-center justify-start border-b-2 border-gray-300 pb-4">
                                <img src={fotoP} alt="" className="w-16 h-16 rounded-full" />
                                <p className="text-2xl font-bold text-gray-700 w-2/3 text-left ml-4">
                                    Lucas G. Ybañez
                                </p>
                            </div>
                            <TypeAnimation className="text-3xl text-gray-700 mt-5 text-start"
                                sequence={[
                                    'Saluton! Mia nomo estas Lucas.',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Hello! My name is Lucas.',
                                    1000,
                                    'Hola! Mi nombre es Lucas.',
                                    1000
                                ]}
                                wrapper="span"
                                speed={10}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                                repeat={Infinity}
                            />
                        </div>
                        
                    </div>
                </div>
                </div>

            </section>
            
            <section className="bg-white py-20">
            <div className="container mx-auto">
                <div className="marquee">
                    <div className="marquee-content">
                        <p className="text-5xl font-bold text-lime-600">
                            Hola · Hello · Bonjour · Saluton · Ciao · Hallo · 你好 · नमस्ते · Привет · Olá · مرحبا
                        </p>
                    </div>
                </div>
            </div>
            </section>

{/* Sección ¿Por qué Parolu? */}
<section className="bg-white py-20">
    <div>
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10">¿Por qué Parolu?</h2>
            <p className="text-xl text-gray-700 mb-10">Parolu es la plataforma perfecta para mejorar tus habilidades lingüísticas. Con nuestra comunidad global, podrás:</p>
            </div>
    </div>
</section>

{/* Sección Imágenes de Beneficios */}
<section className="bg-gray-200 py-20">
    <div className="container mx-auto grid grid-cols-3 gap-10">
        <div className="text-center">
            <img src={fondo} alt="Beneficio 1" className="rounded-md mb-5"/>
            <h3 className="text-2xl font-bold">Conversa en Tiempo Real</h3>
            <p className="text-gray-700">Aprende con conversaciones en tiempo real con hablantes nativos.</p>
        </div>
        <div className="text-center">
            <img src={fotoP} alt="Beneficio 2" className="rounded-md mb-5"/>
            <h3 className="text-2xl font-bold">Mejora tus Habilidades</h3>
            <p className="text-gray-700">Perfecciona tu gramática, vocabulario y pronunciación.</p>
        </div>
        <div className="text-center">
            <img src={capture} alt="Beneficio 3" className="rounded-md mb-5"/>
            <h3 className="text-2xl font-bold">Haz Nuevos Amigos</h3>
            <p className="text-gray-700">Conéctate con personas de todo el mundo y crea nuevas amistades.</p>
        </div>
    </div>
</section>

{/* Sección Casos de Éxito */}
<section className="bg-white py-20">
    <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Casos de Éxito</h2>
        <p className="text-xl text-gray-700 mb-5">Miles de estudiantes han alcanzado sus metas con Parolu. ¡Conoce sus historias de éxito!</p>
        <div className="grid grid-cols-2 gap-10">
            <div className="bg-gray-100 p-8 rounded-md shadow-md">
                <p className="text-gray-700">"Gracias a Parolu, ahora puedo conversar con confianza en mi nuevo idioma. ¡Es una experiencia maravillosa!"</p>
                <p className="text-lime-600 font-bold mt-4">- María García</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-md shadow-md">
                <p className="text-gray-700">"El aprendizaje en Parolu es divertido y efectivo. He mejorado mucho más rápido de lo que esperaba."</p>
                <p className="text-lime-600 font-bold mt-4">- John Doe</p>
            </div>
        </div>
    </div>
</section>

{/* Sección de Usuarios Totales y Puntuación Media */}
<section className="bg-white py-20">
    <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">Nuestra Comunidad</h2>
        <div className="grid grid-cols-2 gap-10">
            <div>
                <h3 className="text-6xl font-bold text-lime-600">1M+</h3>
                <p className="text-xl text-gray-700">Usuarios Totales</p>
            </div>
            <div>
                <h3 className="text-6xl font-bold text-lime-600">4.8/5</h3>
                <p className="text-xl text-gray-700">Puntuación Media</p>
            </div>
        </div>
    </div>
</section> 

{/* Sección de Llamada a la Acción */}
<section className="bg-gradient-to-r from-emerald-700 to-lime-700 py-20">
    <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-5">¡Únete a Parolu Hoy!</h2>
        <p className="text-xl text-white mb-10">Empieza a mejorar tus habilidades lingüísticas con nuestra comunidad global. ¡No esperes más!</p>
        <a href="" className='h-10 px-6 py-4 font-semibold rounded-md bg-white text-lime-600 mr-5'>Registrarse</a>
        <a href="" className='h-10 px-6 py-4 font-semibold rounded-md bg-transparent text-white border border-white'>Iniciar sesión</a>
    </div>
</section>
        </>
    );
}

export default Welcome;