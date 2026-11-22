import { readCollection } from "./database";
export type TLCEvent = {
  id: string;
  title: string;
  date: string;
  type: string;
  description?: string;
  time?: string;
  location?: string;
  registrationUrl?: string;
  image?: string;
  published?: boolean;
};
export type TLCResource = { id: string; title: string; category: string; url?: string; description?: string; published?: boolean };
export type TLCOrganization = { id: string; name: string; category: string; logo?: string; url?: string; description?: string; published?: boolean };
export type TLCProject = { id?: string; title: string; description?: string; published?: boolean; status?: string; url?: string };
export async function publishedEvents(): Promise<TLCEvent[]> {
  const list = await readCollection<TLCEvent>("events");
  return list.filter((item) => item.published === true && /^\d{4}-\d{2}-\d{2}$/.test(item.date))
    .sort((a,b) => a.date.localeCompare(b.date));
}
export async function upcomingEvents(): Promise<TLCEvent[]> {
  const today = new Date().toISOString().slice(0, 10);
  return (await publishedEvents()).filter((item) => item.date >= today);
}
export async function publishedResources(): Promise<TLCResource[]> {
  return (await readCollection<TLCResource>("resources"))
    .filter((item) => item.published === true && typeof item.url === "string" && (item.url.startsWith("https://") || item.url.startsWith("/")));
}
export async function publishedOrganizations(): Promise<TLCOrganization[]> {
  return (await readCollection<TLCOrganization>("organizations")).filter(item => item.published === true);
}
export async function publishedProjects(): Promise<TLCProject[]> {
  return (await readCollection<TLCProject>("projects")).filter(item => item.published === true);
}

export type TLCMedia = { id: string; title: string; alt?: string; credit?: string; url: string; published?: boolean; createdAt?: string };
export async function publishedMedia(): Promise<TLCMedia[]> {
  return (await readCollection<TLCMedia>("media"))
    .filter(item => item.published === true && typeof item.url === "string" &&
      (item.url.startsWith("https://") || (item.url.startsWith("/") && !item.url.startsWith("//"))));
}
