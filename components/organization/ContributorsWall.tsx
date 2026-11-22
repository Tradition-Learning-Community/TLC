"use client";

import { useState } from "react";
import "@/components/editorial/editorial-pages.css";

export type PublicContributor = { id: string; name: string; avatar?: string; github: string };

function profileUrl(value: string) {
  if (value.startsWith("https://")) {
    try { const url = new URL(value); return url.hostname && !url.username && !url.password ? url.href : null; } catch { return null; }
  }
  const handle = value.replace(/^@/, "");
  return /^[a-z\d](?:[a-z\d-]{0,38})$/i.test(handle) ? `https://github.com/${handle}` : null;
}

function ContributorProfile({ person }: { person: PublicContributor }) {
  const [imageFailed, setImageFailed] = useState(false);
  const url = profileUrl(person.github);
  const suppliedAvatar = person.avatar && (person.avatar.startsWith("https://") || (person.avatar.startsWith("/") && !person.avatar.startsWith("//"))) ? person.avatar : "";
  const avatar = suppliedAvatar || (url?.startsWith("https://github.com/") ? `${url.replace(/\/$/, "")}.png?size=96` : "");
  const initials = person.name.trim().split(/\s+/).slice(0, 2).map(value => value[0]).join("");
  const content = <><span className="contributor-wall-avatar">{avatar && !imageFailed ? <img src={avatar} alt="" width={52} height={52} loading="lazy" onError={() => setImageFailed(true)} /> : <span aria-hidden="true">{initials}</span>}</span><span className="contributor-wall-name">{person.name}<small>{url ? "Profil de contribution" : "Contributeur TLC"}</small></span></>;
  return <li>{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="contributor-wall-profile">{content}<span className="sr-only"> (nouvel onglet)</span></a> : <div className="contributor-wall-profile">{content}</div>}</li>;
}

export default function ContributorsWall({ people, limit }: { people: readonly PublicContributor[]; limit?: number }) {
  const displayed = limit === undefined ? people : people.slice(0, Math.max(0, limit));
  if (!displayed.length) return null;
  return <ul className="contributors-wall" aria-label="Contributeurs référencés">{displayed.map(person => <ContributorProfile key={person.id} person={person} />)}</ul>;
}
