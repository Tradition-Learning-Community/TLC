"use client";
import { useState, type ChangeEvent } from "react";
import { ImagePlus, Link2, LoaderCircle } from "lucide-react";

const formats = "image/jpeg,image/png,image/webp,image/avif";
type Props = { label: string; value: string; onChange: (url: string) => void; title?: string; disabled?: boolean };
export default function ImageField({label,value,onChange,title,disabled=false}:Props) {
  const [showLink,setShowLink] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const validPreview = /^https:\/\//i.test(value) || (value.startsWith("/") && !value.startsWith("//"));
  async function choose(event:ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];event.target.value="";
    if(!file)return;
    setError("");
    if(file.size>4_000_000){setError("Cette image dépasse 4 Mo. Choisissez un fichier plus léger.");return;}
    if(!["image/jpeg","image/png","image/webp","image/avif"].includes(file.type)) {
      setError("Formats acceptés : JPEG, PNG, WebP et AVIF.");return;
    }
    setBusy(true);
    try {
      const data=new FormData();
      data.append("file",file);
      data.append("title",title?.trim()||file.name);
      data.append("alt",title?.trim()||file.name);
      const response=await fetch("/api/media/upload",{method:"POST",body:data});
      const record=await response.json().catch(()=>null);
      if(!response.ok || typeof record?.url!=="string")
        throw new Error(record?.error||"Impossible d'importer cette image.");
      onChange(record.url);
    }catch(caught){setError(caught instanceof Error?caught.message:"Échec de l'import.");}
    finally{setBusy(false);}
  }
  return <div className="space-y-3">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <button type="button" onClick={()=>setShowLink(current=>!current)}
        className="inline-flex items-center gap-1.5 text-xs text-[#e6c879] hover:underline">
        <Link2 size={14}/>{showLink?"Masquer le lien":"Utiliser un lien"}
      </button>
    </div>
    <label className={"flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#d4af37]/45 bg-[#d4af37]/[0.04] px-4 py-5 text-center transition hover:bg-[#d4af37]/10 "+(disabled||busy?"pointer-events-none opacity-60":"")}>
      {busy?<LoaderCircle className="animate-spin text-[#d4af37]" size={24}/>:<ImagePlus className="text-[#d4af37]" size={25}/>}
      <strong className="text-sm font-medium text-white">{busy?"Import en cours…":"Choisir une image sur cet appareil"}</strong>
      <span className="text-xs text-slate-400">Téléphone ou ordinateur · JPEG, PNG, WebP, AVIF · 4 Mo maximum</span>
      <input type="file" accept={formats} disabled={disabled||busy} onChange={e=>void choose(e)}
        className="sr-only" aria-label={"Choisir une image pour "+label}/>
    </label>
    {showLink&&<label className="block space-y-1 text-xs text-slate-300">Adresse HTTPS de l'image (facultatif)
      <input type="url" value={value.startsWith("/")?"":value} onChange={e=>onChange(e.target.value)}
        placeholder="https://exemple.org/photo.jpg" disabled={busy||disabled}
        className="w-full rounded-xl border border-white/15 bg-[#07111f] px-3 py-3 text-sm text-white"/>
    </label>}
    {error&&<p role="alert" className="rounded-lg bg-red-950/30 p-3 text-sm text-red-200">{error}</p>}
    {validPreview&&<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <img src={value} alt="Aperçu du média sélectionné" className="h-20 w-24 shrink-0 rounded-lg object-cover"/>
      <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-emerald-300">Image sélectionnée</p>
        <p className="mt-1 truncate text-xs text-slate-400">{value}</p>
        <button type="button" onClick={()=>onChange("")} className="mt-2 text-xs text-rose-300">Retirer l'image</button>
      </div>
    </div>}
  </div>;
}
