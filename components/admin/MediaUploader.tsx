"use client";
import { useRef, useState, type FormEvent } from "react";
import { ImagePlus, UploadCloud } from "lucide-react";

export default function MediaUploader({onUploaded}:{onUploaded:()=>void|Promise<void>}) {
  const fileRef=useRef<HTMLInputElement>(null);
  const [file,setFile]=useState<File|null>(null);
  const [title,setTitle]=useState("");const [credit,setCredit]=useState("");const [alt,setAlt]=useState("");
  const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [success,setSuccess]=useState("");
  async function send(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();setBusy(true);setError("");setSuccess("");
    try {
      if(!file)throw new Error("Choisissez une image.");
      if(file.size>4_000_000)throw new Error("Le fichier dépasse 4 Mo.");
      const form=new FormData();form.append("file",file);form.append("title",title.trim()||file.name);
      form.append("alt",alt.trim()||title.trim()||file.name);form.append("credit",credit);
      const response=await fetch("/api/media/upload",{method:"POST",body:form});
      const result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.error||"Impossible de transférer l'image.");
      setSuccess("Image enregistrée dans la médiathèque. Elle reste non publiée jusqu'à votre validation.");
      setFile(null);setTitle("");setCredit("");setAlt("");
      if(fileRef.current)fileRef.current.value="";
      await onUploaded();
    }catch(caught){setError(caught instanceof Error?caught.message:"Échec du transfert.");}
    finally{setBusy(false);}
  }
  const className="w-full rounded-xl border border-white/15 bg-[#07111f] px-3 py-2.5 text-sm text-white";
  return <form onSubmit={e=>void send(e)} className="space-y-4 rounded-2xl border border-[#d4af37]/20 bg-[#0b1827] p-4 sm:p-6">
    <div><h3 className="flex items-center gap-2 font-semibold text-white"><ImagePlus size={20} className="text-[#d4af37]"/> Importer depuis votre appareil</h3>
      <p className="mt-2 text-sm text-slate-400">Choisissez une photo ou un visuel sur votre téléphone ou ordinateur. JPEG, PNG, WebP, AVIF · 4 Mo maximum.</p></div>
    <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#d4af37]/50 bg-[#d4af37]/[0.04] p-5 text-center hover:bg-[#d4af37]/10">
      <UploadCloud size={28} className="text-[#d4af37]"/>
      <span className="text-sm font-semibold text-white">{file ? file.name : "Sélectionner une image"}</span>
      <span className="text-xs text-slate-400">{file ? (file.size/1024/1024).toFixed(2)+" Mo · Choisir une autre image" : "Choisir un fichier dans les photos ou fichiers de l’appareil"}</span>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif"
        disabled={busy} className="sr-only" aria-label="Sélectionner une image sur cet appareil"
        onChange={event=>{setFile(event.target.files?.[0]||null);setError("");setSuccess("");}}/>
    </label>
    {file&&<div className="grid gap-3 sm:grid-cols-2">
      <label className="block text-xs text-slate-300">Titre<input maxLength={160} value={title} onChange={e=>setTitle(e.target.value)} className={className} placeholder={file.name}/></label>
      <label className="block text-xs text-slate-300">Crédit / auteur (facultatif)<input maxLength={250} value={credit} onChange={e=>setCredit(e.target.value)} className={className}/></label>
      <label className="block text-xs text-slate-300 sm:col-span-2">Description de l’image<input maxLength={200} value={alt} onChange={e=>setAlt(e.target.value)} className={className} placeholder="Texte alternatif décrivant l’image"/></label>
    </div>}
    {error&&<p role="alert" className="rounded-lg border border-red-400/25 bg-red-950/30 p-3 text-sm text-red-200">{error}</p>}
    {success&&<p role="status" className="rounded-lg border border-emerald-400/20 bg-emerald-900/20 p-3 text-sm text-emerald-200">{success}</p>}
    <button disabled={busy||!file} className="w-full rounded-xl bg-[#d4af37] px-4 py-3 font-semibold text-[#07111f] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
      {busy?"Transfert en cours…":"Importer l’image"}</button>
  </form>;
}
