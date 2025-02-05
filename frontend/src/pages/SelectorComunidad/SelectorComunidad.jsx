import { useEffect, useState } from "react";
import axios from "axios";

const CommunitySelector = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_COMMUNITY_GET);
        setCommunities(response.data);
      } catch (err) {
        setError("Error al cargar las comunidades");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleJoinCommunity = async (id) => {
    const authToken = localStorage.getItem("authToken");
    console.log("TOKEN->",authToken);
    if (!authToken) {
      alert("No tienes una sesión activa");
      return;
    }
    try {
      await axios.patch(`${import.meta.env.VITE_COMMUNITY_JOIN}/${id}`, {}, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      alert("Te has unido a la comunidad exitosamente");
    } catch (err) {
      alert("Error al unirse a la comunidad");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-lime-600 mb-6">Seleccione su comunidad</h1>
      {loading && <p className="text-gray-600">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg">
        <ul>
          {communities.map((community) => (
            <li
              key={community.id}
              className="p-4 flex justify-between items-center border-b hover:bg-gray-200 cursor-pointer"
              onClick={() => handleJoinCommunity(community.id)}
            >
              <span className="text-lg font-medium">{community.name}</span>
              <span className="text-gray-600">{community.members} miembros</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunitySelector;
