import { Logo } from "@/components/logo";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin, Slack } from "lucide-react";

const links = [
  {
    group: "Projet",
    items: [
      {
        title: "Qu’est-ce que le Tradition Learning ?",
            href: "/about#what-is",
      },
      {
        title: "Vision & Mission",
            href: "/about#vision",
      },
      {
        title: "Valeurs & Éthique",
            href: "/about#values",
      },
      {
        title: "L’Équipe",
            href: "/about#team",
      },
      {
        title: "Roadmap",
            href: "/about#roadmap",
      },
      {
        title: "FAQ",
            href: "/about#faq",
      },
    ],
  },
  {
    group: "Solution",
    items: [
      {
        title: "Startup",
        href: "/projects",
      },
      {
        title: "Freelancers",
        href: "/community",
      },
      {
        title: "Organizations",
        href: "/community",
      },
      {
        title: "Students",
        href: "/community",
      },
      {
        title: "Collaboration",
        href: "/community",
      },
      {
        title: "Design",
        href: "/resources",
      },
      {
        title: "Management",
        href: "/resources",
      },
    ],
  },
  {
    group: "Communauté",
    items: [
      {
        title: "Comment contribuer",
        href: "/about#team",
      },
      {
        title: "Événements",
        href: "/events",
      },
      {
        title: "Blog",
        href: "/resources",
      },
      {
        title: "Témoignages",
        href: "/community",
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
        href: "/resources#statuts-asbl",
      },
      {
        title: "Charte communautaire",
        href: "/resources#charte-communautaire",
      },
      {
        title: "Politique de confidentialité",
        href: "/resources#politique-confidentialite",
      },
      {
        title: "Cookies",
        href: "/resources#cookies",
      },
      {
        title: "Licence open-source",
        href: "/resources#licence-open-source",
      },
      {
        title: "Sécurité",
        href: "/resources#securite",
      },
      {
        title: "Contact presse",
        href: "/contact",
      },
    ],
  },
];

const socialLinks = [
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Slack", href: "#", icon: Slack },
  { label: "Instagram", href: "#", icon: Instagram },
];

export default function FooterSection() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-[#d4af37]/20 bg-gradient-to-b from-[#06142d] via-[#071a33] to-[#051225] pt-14 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#0b3d91]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 h-56 w-56 rounded-full bg-[#d4af37]/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <Link href="/" aria-label="go home" className="inline-flex w-fit rounded-xl border border-white/10 bg-white/5 p-3">
              <Logo uniColor className="h-20" />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
              Tradition Learning Community, la plateforme collaborative pour une IA
              plus sobre, plus lisible et plus utile.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs font-medium text-[#d4af37]">
                Open-source
              </span>
              <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs font-medium text-[#d4af37]">
                Communauté
              </span>
              <span className="rounded-full border border-[#d4af37]/25 bg-[#d4af37]/10 px-3 py-1 text-xs font-medium text-[#d4af37]">
                Recherche
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-8 lg:col-span-9">
            {links.map((link, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 text-xs"
              >
                <span className="mb-4 block font-semibold uppercase tracking-[0.14em] text-white/90">
                  {link.group}
                </span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group/item flex items-center justify-between gap-2 py-1.5 text-[13px] text-slate-300 hover:text-[#f0d87f]"
                  >
                    <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 group-hover/item:after:w-full">
                      {item.title}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6">
          <span className="order-last block text-center text-sm text-slate-400 md:order-first">
            © {new Date().getFullYear()} TLC, Tous droits réservés
          </span>
          <div className="order-first flex flex-wrap justify-center gap-3 md:order-last">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group/social relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 text-slate-300"
                >
                      <span className="absolute inset-0 bg-gradient-to-br from-[#0b3d91]/0 via-[#0b3d91]/0 to-[#d4af37]/0" />
                  <Icon className="relative h-4.5 w-4.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
