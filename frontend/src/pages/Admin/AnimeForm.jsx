import React, { useState, useEffect } from "react";
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function AnimeForm(){
  const { id } = useParams();
  const edit = Boolean(id);
  const [data, setData] = useState({ title:'', slug:'', coverUrl:'', genres:[], status:'', synopsis:'' });
  const nav = useNavigate();

  useEffect(()=> {
    if(edit) api.get(`/anime/${id}`).then(r=>setData(r.data)).catch(()=>{});
  }, [id]);

  async function submit(e){
    e.preventDefault();
    try {
      if(edit) await api.put(`/admin/anime/${id}`, data);
      else await api.post('/admin/anime', data);
      nav('/admin/dashboard');
    } catch(err){ alert('Error'); }
  }

  return (
    <div className="min-h-screen p-6 bg-[#070812] text-white">
      <form onSubmit={submit} className="max-w-2xl mx-auto bg-[#0b1220] p-6 rounded">
        <h2 className="text-xl mb-4">{edit? 'Edit' : 'Tambah'} Anime</h2>
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Title" value={data.title} onChange={e=>setData({...data, title:e.target.value})} />
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Slug" value={data.slug} onChange={e=>setData({...data, slug:e.target.value})} />
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Cover URL" value={data.coverUrl} onChange={e=>setData({...data, coverUrl:e.target.value})} />
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Genres (comma separated)" value={data.genres} onChange={e=>setData({...data, genres: e.target.value.split(',').map(s=>s.trim())})} />
        <textarea className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Synopsis" value={data.synopsis} onChange={e=>setData({...data, synopsis:e.target.value})} />
        <button className="bg-indigo-600 px-4 py-2 rounded">{edit? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
}
