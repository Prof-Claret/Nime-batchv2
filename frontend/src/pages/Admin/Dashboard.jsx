import React, { useEffect, useState } from "react";
import api from '../../services/api';
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard(){
  const [anime, setAnime] = useState([]);
  const nav = useNavigate();
  useEffect(()=> {
    api.get('/anime').then(r=>setAnime(r.data)).catch(()=>{});
  }, []);
  function logout(){ localStorage.removeItem('admin_token'); localStorage.removeItem('admin_user'); nav('/'); }
  return (
    <div className="min-h-screen p-6 bg-[#070812] text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Admin Dashboard</h1>
        <div>
          <Link to="/admin/anime/new" className="mr-4 underline">Tambah Anime</Link>
          <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {anime.map(a=>(
          <div key={a._id} className="p-3 bg-[#0b1220] rounded">
            <h3 className="font-semibold">{a.title}</h3>
            <div className="text-sm text-gray-400">{a.genres?.join(', ')}</div>
            <div className="mt-2">
              <Link to={`/anime/${a.slug}`} className="underline mr-2">View</Link>
              <Link to={`/admin/anime/${a._id}/edit`} className="underline mr-2">Edit</Link>
              <Link to={`/admin/anime/${a._id}/episodes/new`} className="underline">Add Ep</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
