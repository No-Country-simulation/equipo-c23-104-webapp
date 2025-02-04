import React from 'react';
import capture from '../../assets/capture.png';
import fondo from '../../assets/fondo.jpg';
import fondo1 from '../../assets/fondo1.jpg';
import fotoP from '../../assets/fotoP.jpg';
import picture1 from '../../assets/picture1.png'
import picture2 from "../../assets/picture2.jpg"
import { TypeAnimation } from 'react-type-animation';
import './Marque.css';
import PostAnimated from './components/PostAnimated';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { Link } from "react-router-dom";
import { useEffect } from 'react';


const Welcome = () => {
    
    useEffect(() => {
      AOS.init({
        duration: 1200, // Duración de la animación
      });
    }, []);

    return (
        <div className=''>
            <section className="text-center h-full">
                <div className=" lg:h-screen w-full">
                <div className='grid sm:grid-cols-1 md:grid-cols1 lg:grid-cols-2 gap-2 h-full'  >
                    <div className='p-10 lg:p-16 text-start bg-white h-full flex flex-col align-center justify-center'  data-aos="fade-down">
                        <h2 className="text-7xl lg:text-8xl xl:text-9xl font-bold text-lime-600 text-center lg:text-left" data-aos="zoom-in-down">Parolu!</h2>
                        <h2 className="text-2xl text-gray-800 text-center text-gray-800 lg:text-left md:text-4xl sm:text-4xl lg:text-4xl xl:text-6xl font-bold">Practicá tu nuevo idioma</h2>
                        <p className="lg:text-xl xl:text-2xl text-slate-600 mt-4 mb-10 text-justify">Sumérgete en un mundo de aprendizaje interactivo donde puedes conversar con nativos y otros estudiantes de tu nueva lengua. Mejora tus habilidades mientras haces nuevos amigos, todo en un ambiente amigable y relajado. ¡Únete a Parolu y lleva tu práctica al siguiente nivel! 🌍💬</p>
                        <div className='mx-auto lg:mx-0'>
                            <Link to="/registrar" className='h-10 p-3 font-semibold rounded-md bg-lime-600 text-white mr-5'>Registrarse</Link>
                            <Link to="/login" className='h-10 p-3 font-semibold rounded-md bg-white text-lime-600 border boder-lime-600'>Iniciar sesión</Link>
                        </div>
                    </div>

                    <div className='py-20 lg:py-40 flex justify-center items-center rounded-md bg-gray-200 order-first lg:order-last bg-cover bg-center' style={{ backgroundImage: `url(${fondo1})` }} >
                        <div className="relative w-full mx-10" data-aos="fade-up">
                            {/* Fondo Gradiente Desfasado */}
                            <div className="absolute w-full inset-0 -translate-x-4 translate-y-4 bg-lime-600 rounded-md shadow-lg h-60" ></ div>

                            {/* Contenido Principal */}
                            <div className='relative w-full flex justify-center items-center h-56' data-aos="flip-left">
                                <PostAnimated image={fotoP} nombre={"Lucas G. Ybañez"} textos={["Saluton! Mia nomo estas Lucas","Hello! My name is Lucas","¡Hola! Mi nombre es Lucas"]} />
                            </div>
                        </div>
                    </div>



                </div>
                </div>

            </section>
            


{/* Sección ¿Por qué Parolu? */}
<section className="bg-white pt-20">
    <div>
        <div className="container mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl xl:text-7xl text-lime-600 font-bold mb-10">¿Qué es Parolu?</h2>
            <p className="text-xl text-gray-700 mb-10 px-10">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, quaerat soluta repudiandae ut a adipisci sapiente iusto cupiditate atque amet? Consequatur eveniet dolor sed, nisi beatae error! Quas, et dicta.</p>
            </div>
    </div>
</section>

<section className="bg-white py-20">
            <div className="container mx-auto">
                <div className="marquee">
                    <div className="marquee-content">
                        <p className="lg:text-4xl xl:text-5xl font-bold text-lime-600">
                            Hola · Hello · Bonjour · Saluton · Ciao · Hallo · 你好 · नमस्ते · Привет · Olá · مرحبا
                        </p>
                    </div>
                </div>
            </div>
            </section>

{/* Sección Imágenes de Beneficios */}
<section className="py-20">
    <h2 className="text-4xl text-center lg:text-5xl xl:text-7xl text-lime-600 font-bold mb-10">¿Cómo funciona?</h2>
    <div className="container w-4/5 lg:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Primera Fila: Imagen | Texto */}
        <div className="w-auto order-1" data-aos="flip-up">
            <div className="mx-10 xl:mx-20 relative">
                <div className="absolute w-full inset-0 -translate-x-4 translate-y-4 bg-lime-600 rounded-md shadow-lg"></div>
                <img src={picture1} alt="Beneficio 1" className="relative w-full rounded-md z-10"/>
            </div>
        </div>
        <div className="text-center md:text-left order-2" data-aos="fade-up">
            <h3 className="text-4xl lg:text-3.5xl xl:text-6xl text-lime-600 font-bold mb-10">#1 Crea tu cuenta</h3>
            <p className="text-xl xl:text-3xl text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi molestiae aspernatur exercitationem sequi hic nihil velit dolorem eveniet.</p>
        </div>

        {/* Segunda Fila: Imagen | Texto */}
        <div className="w-auto order-3 md:order-4" data-aos="flip-up">
            <div className="mx-10 xl:mx-20 relative">
                <div className="absolute w-full inset-0 -translate-x-4 translate-y-4 bg-lime-600 rounded-md shadow-lg"></div>
                <img src={picture2} alt="Beneficio 2" className="relative w-full rounded-md z-10 border"/>
            </div>
        </div>
        <div className="text-center md:text-right order-4 md:order-3" data-aos="fade-up">
            <h3 className="text-4xl lg:text-3.5xl xl:text-6xl text-lime-600 font-bold mb-10">#2 Elegí tu idioma</h3>
            <p className="text-xl xl:text-3xl text-gray-700">Perfecciona tu gramática, vocabulario y pronunciación.</p>
        </div>

        {/* Tercera Fila: Imagen | Texto */}
        <div className="w-80 xl:w-full mx-auto my-10 xl:my-20 relative order-5" data-aos="flip-up">
            <div className="absolute w-full inset-0 -translate-x-4 translate-y-4 bg-lime-600 rounded-md shadow-lg"></div>
            <div className="relative">
                <PostAnimated nombre={"Jhon Doe"} textos={["Saluton mondo! Hodiaû la vetero estas tre varma","Hello world! Today the weather is very hot","¡Hola mundo! Hoy el tiempo está re caluroso"]} image={fotoP}/>
            </div>
        </div>
        <div className="text-center md:text-left order-6 pl-8" data-aos="fade-up">
            <h3 className="text-4xl lg:text-3.5xl xl:text-6xl text-lime-600 font-bold mb-10">#3 Parolu!</h3>
            <p className="text-xl xl:text-3xl text-gray-700">Publicá y lee las publicaciones de otros en todas partes del mundo. Escribe sobre lo que haces, lo que te gusta y lo que piensas.</p>
        </div>
    </div>
</section>



{/* Sección Casos de Éxito */}
<section className="bg-white p-10" data-aos="fade-up">
    <div className="container mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl text-lime-600 font-bold mb-10">Casos de Éxito</h2>
        <p className="text-xl text-gray-700 mb-5">Miles de estudiantes han alcanzado sus metas con Parolu. ¡Conoce sus historias de éxito!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
    <div className="container mx-auto text-center px-5 lg:px-40"  data-aos="fade-up">
        <h2 className="text-4xl lg:text-5xl xl:text-6xl text-gray-700 font-bold mb-10">Nuestra Comunidad</h2>
        <div className="grid grid-cols-2 gap-10 px-10">
            <div>
                <h3 className="text-4xl md:text-5xl font-bold text-lime-600">1M+</h3>
                <p className="md:text-xl text-gray-700">Usuarios Totales</p>
            </div>
            <div>
                <h3 className="text-4xl md:text-5xl font-bold text-lime-600">4.8/5</h3>
                <p className="md:text-xl text-gray-700">Puntuación Media</p>
            </div>
        </div>
    </div>
</section> 

{/* Sección de Llamada a la Acción */}
<section className="bg-gradient-to-r from-emerald-700 to-lime-700 py-20">
    <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">¡Únete a Parolu Hoy!</h2>
        <p className="md:text-xl text-white mb-10">Empieza a mejorar tus habilidades lingüísticas con nuestra comunidad global. ¡No esperes más!</p>
        <Link to="/registrar" className='h-10 px-6 py-4 font-semibold rounded-md bg-white text-lime-600 mr-5'>Registrarse</Link>
        <Link to="/login" className='h-10 px-6 py-4 font-semibold rounded-md bg-transparent text-white border border-white'>Iniciar sesión</Link>
    </div>
</section>
        </div>
    );
}

export default Welcome;