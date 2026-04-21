"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const PlatformIcons: { [key: string]: React.ReactNode } = {
  instagram: <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z"/></svg>,
  twitter: <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  github: <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  youtube: <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  pinterest: <svg viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345l-.288 1.138c-.034.149-.122.189-.285.113-1.06-.491-1.737-2.059-1.737-3.322 0-2.703 1.965-5.186 5.663-5.186 3.012 0 5.352 2.143 5.352 5.011 0 2.996-1.888 5.411-4.512 5.411-.882 0-1.71-.458-1.993-.997l-.545 2.071c-.197.747-.732 1.686-1.089 2.261 1.314.404 2.709.624 4.147.624 6.621 0 11.988-5.367 11.988-11.987C24.004 5.367 18.638 0 12.017 0z"/></svg>,
  discord: <svg viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>,
  spotify: <svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.56.3z"/></svg>,
  tiktok: <svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.66-.46 3.32-1.35 4.74-1.41 2.24-3.8 3.73-6.49 3.94-2.82.22-5.71-.62-7.85-2.58-2.02-1.85-3.15-4.58-3.04-7.36.08-2.09.9-4.14 2.34-5.71 1.44-1.57 3.44-2.59 5.58-2.84v4.04c-1.39.11-2.73.81-3.6 1.91-.84 1.05-1.15 2.45-.92 3.76.24 1.34 1.01 2.53 2.14 3.23 1.17.72 2.65.91 3.97.55 1.34-.37 2.47-1.33 3.01-2.6.45-.98.63-2.07.63-3.15v-13.9z"/></svg>,
  twitch: <svg viewBox="0 0 24 24"><path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.806-6.806v-14.149h-21.851zm19.164 13.075l-4.299 4.299h-4.657l-3.045 3.045v-3.045h-4.836v-15.045h16.836v10.746zm-5.015-5.373h-2.149v5.015h2.149v-5.015zm-4.657 0h-2.149v5.015h2.149v-5.015z"/></svg>,
  steam: <svg viewBox="0 0 24 24"><path d="M11.979 0C5.353 0 0 5.385 0 11.979c0 3.197 1.258 6.108 3.322 8.27l3.6-5.174c-.035-.183-.06-.37-.06-.559 0-1.84 1.492-3.333 3.333-3.333 1.054 0 1.98.487 2.584 1.246l3.626-5.32c.22-.321.439-.636.67-.936-1.579-1.282-3.568-2.05-5.746-2.05zm4.846 6.848l-3.352 4.908c.594.502.973 1.25.973 2.086 0 1.503-1.218 2.721-2.721 2.721-.497 0-.961-.137-1.365-.373l-4.426 6.368c1.93.992 4.155 1.562 6.516 1.562 7.734 0 14-6.266 14-14 0-4.041-1.722-7.68-4.472-10.228-1.527 2.028-3.09 4.125-5.153 6.956zm-6.666 5.86c-1.155 0-2.091.936-2.091 2.091 0 1.155.936 2.091 2.091 2.091s2.091-.936 2.091-2.091c0-1.155-.936-2.091-2.091-2.091zm.771 2.923c-.456.456-1.196.456-1.652 0-.456-.456-.456-1.196 0-1.652.456-.456 1.196-.456 1.652 0 .456.456.456 1.196 0 1.652z"/></svg>,
  default: <svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
};

function extractYouTubeID(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url?.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

export default function ProfilePage({ params }: { params: Promise<{ kullanici: string }> }) {
  const resolvedParams = React.use(params);
  const kullanici = resolvedParams.kullanici.toLowerCase();

  const { data: session } = useSession(); 
  const [data, setData] = useState<any>(null);
  const [isLoadingDB, setIsLoadingDB] = useState(false);
  
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  
  const ytIframeRef = useRef<HTMLIFrameElement>(null);
  const mp4VideoRef = useRef<HTMLVideoElement>(null);

  const [db, setDb] = useState<any>({
    bioText: "Kibir.love profilime hoşgeldin.",
    bgUrl: "",
    bgType: "image",
    links: [{ platform: "discord", url: "" }] 
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(db);

  const ids: { [key: string]: string } = { 
    miwusa: "691934684032139274",
    mishlia: "218886873093767169",
    retsu: "1105544144358739968"
  };
  const uid = ids[kullanici] || ids.retsu;
  const isOwner = session?.user?.id === uid;

  useEffect(() => {
    if (!uid) return;
    fetch(`https://api.lanyard.rest/v1/users/${uid}`).then(r => r.json()).then(j => setData(j.data));
    
    fetch(`/api/profile?userId=${uid}`)
      .then(r => r.json())
      .then(dbData => {
        if(dbData && Object.keys(dbData).length > 0) {
          setDb(dbData);
          setEditForm(dbData);
        }
      }).catch(err => console.log("DB Çekilemedi", err));
  }, [uid]);

  useEffect(() => {
    if (db.bgType === "youtube" && ytIframeRef.current?.contentWindow) {
      const ytVolume = isMuted ? 0 : volume;
      ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [ytVolume] }), '*');
      if (isMuted) {
        ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'mute', args: [] }), '*');
      } else {
        ytIframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
      }
    } else if (db.bgType === "video" && mp4VideoRef.current) {
      mp4VideoRef.current.muted = isMuted;
      mp4VideoRef.current.volume = volume / 100;
    }
  }, [volume, isMuted, db.bgType]);

  if (!data) return <div className="main-wrapper" style={{color:'#ff69b4', fontWeight: 900, letterSpacing: '2px'}}>YÜKLENİYOR...</div>;

  const globalName = data.discord_user.global_name || data.discord_user.username;
  const username = data.discord_user.username;
  
  const statusColors: any = { online: "#23a559", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e" };
  const currentStatusColor = statusColors[data.discord_status] || "#80848e";

  const handleSaveSettings = async () => {
    setIsLoadingDB(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid, ...editForm })
      });
      
      const responseData = await response.json();

      if (response.ok) {
        setDb(editForm);
        setIsModalOpen(false);
      } else {
        alert(`Hata Çıktı: ${responseData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Sunucuya bağlanılamadı!");
    } finally {
      setIsLoadingDB(false);
    }
  };

  return (
    <>
      <div className="profile-top-bar">
        <Link href="/" className="nav-icon-btn">
          <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Ana Sayfa
        </Link>
        {isOwner && (
          <button onClick={() => { setEditForm(db); setIsModalOpen(true); }} className="nav-icon-btn">
            <svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.32c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
            Ayarlar
          </button>
        )}
      </div>

      {(db.bgType === "youtube" || db.bgType === "video") && db.bgUrl && (
        <div className="audio-controller">
          <button onClick={() => setIsMuted(!isMuted)} className="btn-mute">
            {isMuted ? (
              <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
            ) : (
              <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            )}
          </button>
          {!isMuted && (
            <input 
              type="range" min="0" max="100" 
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))} 
              className="volume-slider"
            />
          )}
        </div>
      )}

      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Profili Düzenle</h2>
            <button onClick={() => setIsModalOpen(false)} className="btn-close">&times;</button>
          </div>
          
          <div className="form-group">
            <label>Biyografi</label>
            <textarea className="form-input" value={editForm.bioText || ""} onChange={e => setEditForm({...editForm, bioText: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Medya Tipi</label>
            <select 
              className="form-select" 
              value={editForm.bgType || "image"} 
              onChange={e => setEditForm({...editForm, bgType: e.target.value, bgUrl: ''})}
            >
              <option value="image">Resim</option>
              <option value="video">Video (MP4)</option>
              <option value="youtube">YouTube Videosu</option>
              <option value="color">Düz Renk (HEX)</option>
            </select>
          </div>

          <div className="form-group">
            <label>{editForm.bgType === 'color' ? 'Renk Kodu (örn: #ff1493)' : 'Arka Plan URL (Medya)'}</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder={editForm.bgType === 'color' ? "#050505" : "https://..."} 
              value={editForm.bgUrl || ""} 
              onChange={e => setEditForm({...editForm, bgUrl: e.target.value})} 
            />
          </div>

          <div className="form-group">
            <label>Sosyal Medya Linkleri</label>
            {editForm.links?.map((link: any, index: number) => (
              <div key={index} className="link-item-edit">
                <select 
                  className="form-select" style={{flex: 1}} value={link.platform}
                  onChange={(e) => {
                    const newLinks = [...editForm.links];
                    newLinks[index].platform = e.target.value;
                    setEditForm({...editForm, links: newLinks});
                  }}
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter (X)</option>
                  <option value="github">GitHub</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitch">Twitch</option>
                  <option value="spotify">Spotify</option>
                  <option value="steam">Steam</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="telegram">Telegram</option>
                  <option value="pinterest">Pinterest</option>
                  <option value="discord">Discord Sunucusu</option>
                  <option value="default">Diğer (Website)</option>
                </select>
                <input 
                  type="text" className="form-input" style={{flex: 2}} value={link.url} placeholder="https://..."
                  onChange={(e) => {
                    const newLinks = [...editForm.links];
                    newLinks[index].url = e.target.value;
                    setEditForm({...editForm, links: newLinks});
                  }}
                />
                <button 
                  style={{background: '#ff1493', color: 'white', border: 'none', borderRadius: '8px', padding: '0 10px', cursor: 'pointer'}}
                  onClick={() => {
                    const newLinks = editForm.links.filter((_: any, i: number) => i !== index);
                    setEditForm({...editForm, links: newLinks});
                  }}
                >X</button>
              </div>
            ))}
            <button 
              onClick={() => setEditForm({...editForm, links: [...(editForm.links || []), {platform: 'instagram', url: ''}]})}
              style={{background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', marginTop: '10px'}}
            >+ Yeni Bağlantı Ekle</button>
          </div>

          <button onClick={handleSaveSettings} disabled={isLoadingDB} className="btn-save">
            {isLoadingDB ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </button>
        </div>
      </div>

      <div style={{position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden'}}>
        {db.bgType === "color" && db.bgUrl ? (
          <div style={{width:'100%', height:'100%', backgroundColor: db.bgUrl}}></div>
        ) : db.bgType === "youtube" && extractYouTubeID(db.bgUrl) ? (
          <iframe 
            ref={ytIframeRef}
            className="yt-bg"
            src={`https://www.youtube.com/embed/${extractYouTubeID(db.bgUrl)}?autoplay=1&mute=1&loop=1&controls=0&enablejsapi=1&playlist=${extractYouTubeID(db.bgUrl)}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
        ) : db.bgType === "video" && db.bgUrl ? (
          <video ref={mp4VideoRef} autoPlay loop muted playsInline style={{width:'100%', height:'100%', objectFit:'cover', opacity: 0.3}}>
            <source src={db.bgUrl} type="video/mp4" />
          </video>
        ) : db.bgUrl && db.bgType !== "color" ? (
          <img src={db.bgUrl} style={{width:'100%', height:'100%', objectFit:'cover', opacity: 0.3}} />
        ) : null}
      </div>

      <div className="main-wrapper">
        <div className="horizontal-card">
          <div className="card-top-section">
            <div className="avatar-wrapper" style={{margin: 0, minWidth: '100px'}}>
              <img src={`https://cdn.discordapp.com/avatars/${uid}/${data.discord_user.avatar}.png?size=512`} className="avatar" alt="avatar"/>
              <div className="status-dot" style={{ backgroundColor: currentStatusColor }}></div>
            </div>
            <div>
              <h1 className="display-name" style={{fontSize: '28px'}}>{globalName}</h1>
              <p className="username" style={{marginBottom: '5px'}}>@{username}</p>
              <p className="bio-text">{db.bioText || "Personal aesthetic profile."}</p>
            </div>
          </div>

          {data.listening_to_spotify && (
            <div className="spotify-box" style={{marginTop: '25px', marginBottom: '0'}}>
              <img src={data.spotify.album_art_url} className="spotify-img" />
              <div style={{overflow:'hidden'}}>
                <span className="spotify-label">ŞU AN DİNLİYOR</span>
                <p className="spotify-song">{data.spotify.song}</p>
                <p className="spotify-artist">{data.spotify.artist}</p>
              </div>
            </div>
          )}

          <div className="card-bottom-icons">
            {db.links?.map((link: any, i: number) => (
              <a key={i} href={link.url} target="_blank" className="social-icon-btn" title={link.platform}>
                {PlatformIcons[link.platform] || PlatformIcons.default}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}