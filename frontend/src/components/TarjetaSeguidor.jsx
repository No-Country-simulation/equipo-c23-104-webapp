import perfilImagen from "../assets/perfil-icono.png";

const TarjetaSeguidor = ({seguidor, boton}) => {
    return (
        <div className="grid grid-cols-[_min-content,_2fr,_min-content] gap-x-2 items-center">
            <div className="w-16 min-w-16">
                <img src={perfilImagen} alt="foto-de-perfil" />
            </div>
            <div className="mr-4">
                <h3>{seguidor.nombre}</h3>
                <p>@{seguidor.nombreUsuario}</p>
            </div>
            {boton ? <button className="h-8 px-2 flex items-center justify-center text-white whitespace-nowrap font-medium bg-[#06BF00] rounded-3xl max-[550px]:text-xs">Dejar de seguir</button> : ""}
        </div>
    )
};

export default TarjetaSeguidor;