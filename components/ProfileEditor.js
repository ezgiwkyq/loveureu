"use client";
import { useState } from "react";

export default function ProfileEditor({ profileName, initialData }) {
  const [bio, setBio] = useState(initialData?.bio || "");
  const [bg, setBg] = useState(initialData?.background || "#0f0f0f");

  const save = async () => {
    await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ profileName, bio, background: bg }),
    });
    alert("Kaydedildi!");
    window.location.reload();
  };

  return (
    <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-xl">
      <h3 className="text-xl mb-4">Profili Düzenle</h3>
      <textarea className="w-full p-2 bg-neutral-800 rounded mb-4" value={bio} onChange={e => setBio(e.target.value)} />
      <input className="w-full p-2 bg-neutral-800 rounded mb-4" type="text" value={bg} onChange={e => setBg(e.target.value)} />
      <button onClick={save} className="bg-pink-600 px-6 py-2 rounded">Kaydet</button>
    </div>
  );
}