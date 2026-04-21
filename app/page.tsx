"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SquadPage() {
  const { data: session } = useSession();
  const [members, setMembers] = useState<any[]>([]);

  const squad = [
    { name: "Miwusa", id: "691934684032139274", slug: "miwusa" },
    { name: "Rétsu", id: "1105544144358739968", slug: "retsu" },
    { name: "Mishlia", id: "218886873093767169", slug: "mishlia" }
  ];

  useEffect(() => {
    Promise.all(
      squad.map(u => fetch(`https://api.lanyard.rest/v1/users/${u.id}`).then(r => r.json()))
    ).then(results => setMembers(results.map(r => r.data)));
  }, []);

  if (members.length === 0) return <div className="main-wrapper" style={{color: '#ff69b4', fontWeight: 900, fontSize: '20px', letterSpacing: '2px'}}>YÜKLENİYOR...</div>;

  return (
    <>
      <div className="top-nav">
        {session ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '8px 15px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}>
              {session.user?.image && <img src={session.user.image} style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid #ff69b4' }} alt="profile" />}
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>{session.user?.name}</span>
            </div>
            <button onClick={() => signOut()} style={{ background: 'none', border: 'none', color: '#ff69b4', fontSize: '12px', fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>Log Out</button>
          </div>
        ) : (
          <button onClick={() => signIn('discord')} className="btn-discord-login">
            <svg viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
            Login with Discord
          </button>
        )}
      </div>

      <div className="main-wrapper">
        <div className="squad-container">
          {members.map((user, i) => {
            const globalName = user.discord_user.global_name || user.discord_user.username;
            const username = user.discord_user.username;
            const statusColors: any = { online: "#23a559", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e" };
            const currentStatusColor = statusColors[user.discord_status] || "#80848e";

            return (
              <div key={i} className="glass-card">
                <div className="avatar-wrapper">
                  <img src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png?size=512`} className="avatar" alt="avatar"/>
                  <div className="status-dot" style={{ backgroundColor: currentStatusColor }}></div>
                </div>
                <Link href={`/${squad[i].slug}`}>
                  <h1 className="display-name">{globalName}</h1>
                  <p className="username" style={{ marginBottom: '25px' }}>@{username}</p>
                </Link>

                {user.listening_to_spotify ? (
                  <div className="spotify-box">
                    <img src={user.spotify.album_art_url} className="spotify-img" alt="album art" />
                    <div style={{ overflow: 'hidden' }}>
                      <span className="spotify-label">ŞU AN DİNLİYOR</span>
                      <p className="spotify-song">{user.spotify.song}</p>
                      <p className="spotify-artist">{user.spotify.artist}</p>
                    </div>
                  </div>
                ) : (
                  <div style={{ height: '71px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '12px', letterSpacing: '2px', fontStyle: 'italic', marginBottom: '20px' }}>
                    SESSİZLİK...
                  </div>
                )}
                <a href={`https://discord.com/users/${user.discord_user.id}`} target="_blank" className="btn-look">Profile Look</a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}