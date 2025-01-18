import perfilImagen from "../assets/perfil-icono.png";

const TarjetaSeguidor = ({boton}) => {
    return (
        <div className="flex gap-x-2 items-center justify-center">
            <div className="w-16 min-w-16">
                <img src={perfilImagen} alt="foto-de-perfil" />
            </div>
            <div className="mr-4">
                <h3>Pedro Jose Martinez Martinez</h3>
                <p>@Martinez_P</p>
            </div>
            {boton ? <button className="h-8 px-2 flex items-center justify-center text-white whitespace-nowrap font-medium bg-[#06BF00] rounded-3xl">Dejar de seguir</button> : ""}
        </div>
    )
};

export default TarjetaSeguidor;