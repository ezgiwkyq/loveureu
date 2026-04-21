"use client";
import { useState } from "react";

export default function ProfileEditor({ profileName, initialData }: any) {
  const [bio, setBio] = useState(initialData?.bio || "");
  const [bg, setBg] = useState(initialData?.background || "#080808");

  const save = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileName, bio, background: bg }),
    });
    if(res.ok) alert("Profil güncellendi!");
  };

  return (
    <div className="bg-neutral-900/80 border border-white/5 p-6 rounded-3xl backdrop-blur-md">
      <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Düzenleme Paneli</h2>
      <textarea 
        value={bio} 
        onChange={(e) => setBio(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white mb-3 outline-none focus:border-pink-500/50 transition-all"
        placeholder="Biyografin..."
        rows={3}
      />
      <input 
        value={bg} 
        onChange={(e) => setBg(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-white mb-4 outline-none focus:border-pink-500/50 transition-all"
        placeholder="Arka plan rengi (Hex: #000)"
      />
      <button onClick={save} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-pink-500 hover:text-white transition-all text-sm uppercase tracking-widest">
        Değişiklikleri Kaydet
      </button>
    </div>
  );
}