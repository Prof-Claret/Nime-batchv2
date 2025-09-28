import React, { useState } from "react";
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function EpisodeForm(){
  const { id } = useParams(); // anime id
  const nav = useNavigate();
  const [ep, setEp] = useState({ episodeNumber: 1, title: '', downloadLinks: [{ name: '', url: '', quality: '' }] });

  function setLink(i, field, val){
    const links = [...ep.downloadLinks];
    links[i][field] = val;
    setEp({...ep, downloadLinks: links});
  }
  function addLink(){ setEp({...ep, downloadLinks: [...ep.downloadLinks, {name:'',url:'',quality:''}]}); }

  async function submit(e){
    e.preventDefault();
    try {
      await api.post(`/admin/anime/${id}/episode`, ep);
      nav('/admin/dashboard');
    } catch(err){ alert('Error'); }
  }

  return (
    <div className="min-h-screen p-6 bg-[#070812] text-white">
      <form onSubmit={submit} className="max-w-2xl mx-auto bg-[#0b1220] p-6 rounded">
        <h2 className="text-xl mb-4">Tambah Episode</h2>
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Episode Number" value={ep.episodeNumber} onChange={e=>setEp({...ep, episodeNumber: Number(e.target.value)})} />
        <input className="w-full p-2 mb-2 rounded bg-gray-800" placeholder="Title" value={ep.title} onChange={e=>setEp({...ep, title: e.target.value})} />
        <div>
          {ep.downloadLinks.map((l,i)=>(
            <div key={i} className="mb-2 bg-gray-900 p-2 rounded">
              <input placeholder="Name" value={l.name} onChange={e=>setLink(i,'name',e.target.value)} className="w-full p-1 mb-1 rounded bg-gray-800" />
              <input placeholder="URL" value={l.url} onChange={e=>setLink(i,'url',e.target.value)} className="w-full p-1 mb-1 rounded bg-gray-800" />
              <input placeholder="Quality" value={l.quality} onChange={e=>setLink(i,'quality',e.target.value)} className="w-full p-1 mb-1 rounded bg-gray-800" />
            </div>
          ))}
          <button type="button" onClick={addLink} className="mb-4 underline">Tambah Link</button>
        </div>
        <button className="bg-indigo-600 px-4 py-2 rounded">Create Episode</button>
      </form>
    </div>
  );
}
