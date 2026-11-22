import ReferenceHome from "@/components/reference-home";
import { publicArticles } from "@/lib/editorial";
import { upcomingEvents, publishedOrganizations } from "@/lib/public-content";
import { readCollection } from "@/lib/database";
import type { Contributor } from "@/lib/types";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "TLC — Tradition Learning Community",
  description: "Découvrez la recherche Tradition Learning, la bibliothèque tllib et les travaux de la communauté TLC.",
};
export default async function HomePage() {
  const [articles, events, people, organizations] = await Promise.all([
    publicArticles(), upcomingEvents(), readCollection<Contributor>("contributors"), publishedOrganizations(),
  ]);
  const contributors = people.map((person) => ({
    id: person.id,
    name: person.name,
    github: person.github,
    avatar: person.avatar || (person.github ? "https://github.com/" + person.github.replace(/^https?:\/\/github.com\//,"").replace(/\/$/,"") + ".png" : "/tlc-logo-hd.png"),
  }));
  return <ReferenceHome articles={articles} events={events.slice(0,4)} contributors={contributors} organizations={organizations} />;
}
