import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [anime, setAnime] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchList();
  }, [q, page, status]);

  function fetchList(){
    const params = new URLSearchParams();
    params.set('page', page);
    params.set('limit', limit);
    if (q) params.set('q', q);
    if (status) params.set('status', status);
    api.get(`/anime?${params.toString()}`)
      .then(res => setAnime(res.data))
      .catch(err => console.error(err));
  }

  return (
    <div className="p-6 min-h-screen bg-[#090914] text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 mb-4">
          <input value={q} onChange={e=>{setQ(e.target.value); setPage(1);}} placeholder="Search title..." className="p-2 rounded bg-gray-800 flex-1" />
          <select value={status} onChange={e=>{setStatus(e.target.value); setPage(1);}} className="p-2 rounded bg-gray-800">
            <option value="">All status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="TBA">TBA</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {anime.map(a => (
            <Link to={`/anime/${a.slug}`} key={a._id} className="bg-gray-800 rounded p-2 hover:bg-gray-700">
              <div className="aspect-[2/3] overflow-hidden rounded">
                <img src={a.coverUrl || '/default-cover.png'} alt={a.title} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-semibold mt-2">{a.title}</h2>
              <p className="text-sm text-gray-400">{a.genres?.join(", ")}</p>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-6 gap-2">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 bg-gray-800 rounded">Prev</button>
          <div className="px-3 py-1 bg-gray-700 rounded">Page {page}</div>
          <button onClick={()=>setPage(p=>p+1)} className="px-3 py-1 bg-gray-800 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
