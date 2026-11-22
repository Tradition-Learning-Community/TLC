"use client";

import { useRef, useId } from "react";
import { X } from "lucide-react";
import InquiryForm from "@/components/inquiry-form";
import type { TLCEvent } from "@/lib/public-content";

export default function EventInquiry({ event }: { event: TLCEvent }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  return <>
    <button className="button button-dark" onClick={() => dialog.current?.showModal()}>Se renseigner<span className="sr-only"> sur {event.title}</span></button>
    <dialog ref={dialog} className="event-inquiry-dialog" aria-labelledby={`${id}-title`} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="event-inquiry-content"><button className="modal-close" onClick={() => dialog.current?.close()} aria-label="Fermer"><X size={24}/></button><span className="eyebrow">Événement TLC</span><h2 id={`${id}-title`}>{event.title}</h2><p>Adressez votre demande d’information à l’équipe TLC.</p><InquiryForm kind="event" context={event.title} idPrefix={id}/></div>
    </dialog>
  </>;
}
