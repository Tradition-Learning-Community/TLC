import { Logo } from "@/components/logo";
import Link from "next/link";

const links = [
  {
    group: "Projet",
    items: [
      {
        title: "Qu’est-ce que le Tradition Learning ?",
        href: "#",
      },
      {
        title: "Vision & Mission",
        href: "#",
      },
      {
        title: "Valeurs & Éthique",
        href: "#",
      },
      {
        title: "L’Équipe",
        href: "#",
      },
      {
        title: "Roadmap",
        href: "#",
      },
      {
        title: "FAQ",
        href: "#",
      },
    ],
  },
  {
    group: "Solution",
    items: [
      {
        title: "Startup",
        href: "#",
      },
      {
        title: "Freelancers",
        href: "#",
      },
      {
        title: "Organizations",
        href: "#",
      },
      {
        title: "Students",
        href: "#",
      },
      {
        title: "Collaboration",
        href: "#",
      },
      {
        title: "Design",
        href: "#",
      },
      {
        title: "Management",
        href: "#",
      },
    ],
  },
  {
    group: "Communauté",
    items: [
      {
        title: "Comment contribuer",
        href: "#",
      },
      {
        title: "Événements",
        href: "#",
      },
      {
        title: "Blog",
        href: "#",
      },
      {
        title: "Témoignages",
        href: "#",
      },
      {
        title: "Discord",
        href: "#",
      },
      {
        title: "Newsletter",
        href: "#",
      },
    ],
  },
  {
    group: "Légal & Transparence",
    items: [
      {
        title: "Statuts ASBL",
        href: "#",
      },
      {
        title: "Charte communautaire",
        href: "#",
      },
      {
        title: "Politique de confidentialité",
        href: "#",
      },
      {
        title: "Cookies",
        href: "#",
      },
      {
        title: "Licence open-source",
        href: "#",
      },
      {
        title: "Sécurité",
        href: "#",
      },
      {
        title: "Contact presse",
        href: "#",
      },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="mt-auto border-b border-t border-dashed bg-background pt-10 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" aria-label="go home" className="block size-fit">
              {/* <Logo /> */} <h1>TLC</h1>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 text-xs">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} TLC, Tous droits réservés
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X/Twitter"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                ></path>
              </svg>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                ></path>
              </svg>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-slack-icon lucide-slack"
              >
                <rect width="3" height="8" x="13" y="2" rx="1.5" />
                <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
                <rect width="3" height="8" x="8" y="14" rx="1.5" />
                <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
                <rect width="8" height="3" x="14" y="13" rx="1.5" />
                <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
                <rect width="8" height="3" x="2" y="8" rx="1.5" />
                <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
              </svg>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
