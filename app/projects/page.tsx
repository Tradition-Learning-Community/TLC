import ReferenceDirectory from "@/components/reference-directory";

export const metadata = { title: "Projets — TLC", description: "Tradition Learning, tllib et TL Studio : les trois projets scientifiques et logiciels portés par TLC." };

export default function Page() {
  return <ReferenceDirectory mode="projects" />;
}
