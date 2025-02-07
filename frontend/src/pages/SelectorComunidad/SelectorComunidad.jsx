import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CommunitySelector = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    if (!authToken) {
      alert("No tienes una sesión activa");
      return;
    }
    try {
      await axios.patch(`${import.meta.env.VITE_COMMUNITY_JOIN}/${id}`, {}, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      localStorage.setItem("communityId", id);
      navigate("/home");
    } catch (err) {
      navigate("/home");
      localStorage.setItem("communityId", id);
      console.log("Error al unirse a la comunidad, redirigiendo si ya tiene una comunidad seleccionada");
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
