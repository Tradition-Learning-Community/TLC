"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { Logo } from "@/components/logo";
import { ModeToggle } from "./ModeToggle";

const menuItems = [
  { name: "Accueil", href: "/home" },
  { name: "A propos", href: "/about" },
  { name: "Communauté", href: "/community" },
  { name: "Ressources", href: "/resources" },
  { name: "Contact", href: "/contact" },
];

const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/Tradition-Learning-Community";

const Header = () => {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState(false);

  const closeMenu = () => setMenuState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-9 md:px-5 ">
        <nav
          role="navigation"
          aria-label="Main navigation"
          data-state={menuState && "active"}
          className="mx-auto w-full max-w-6xl rounded-2xl border border-[rgba(11,61,145,0.15)] bg-transparent text-[#062147] shadow-[0_14px_35px_rgba(6,33,71,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(7,24,51,0.75)] dark:text-white"
        >
          <div className="relative overflow-hidden px-5 md:px-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent" />

            <div className="flex flex-wrap items-center justify-between gap-4 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full items-center justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="group inline-flex items-center rounded-xl px-2 py-1 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <Logo uniColor size="lg" className="text-[#d4af37] dark:text-white " />
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-controls="site-menu"
                  aria-expanded={menuState}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-1 block cursor-pointer rounded-xl border border-[rgba(11,61,145,0.16)] bg-white/70 p-2.5 shadow-sm transition-colors hover:bg-white lg:hidden dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div
                id="site-menu"
                className="in-data-[state=active]:block mb-4 hidden w-full rounded-2xl border border-[rgba(11,61,145,0.12)] bg-white/90 p-5 shadow-xl shadow-zinc-300/20 md:flex-nowrap lg:mb-0 lg:flex lg:w-auto lg:items-center lg:justify-end lg:gap-5 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:border-white/10 dark:bg-[rgba(7,24,51,0.92)] dark:shadow-none dark:lg:bg-transparent"
              >
                <div className="lg:pr-2">
                  <ul className="space-y-3 text-base lg:flex lg:items-center lg:gap-2 lg:space-y-0 lg:text-sm">
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`group relative inline-flex items-center rounded-full px-3 py-2 font-medium transition-all duration-200 ${
                            pathname === item.href
                              ? "bg-[#0b3d91] text-white shadow-[0_8px_20px_rgba(11,61,145,0.25)]"
                                : "text-[#d4af37] hover:bg-[#0b3d91]/8 hover:text-[#0b3d91] dark:text-white dark:hover:bg-white/10 dark:hover:text-[#d4af37]"
                          }`}
                        >
                          <span className="relative">
                            {item.name}
                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-fit lg:mt-0 lg:border-l lg:border-[rgba(11,61,145,0.14)] lg:pl-5 dark:lg:border-white/15">
                  <ModeToggle />

                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(11,61,145,0.16)] bg-white px-4 py-2 text-sm font-medium text-[#d4af37] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:bg-[#d4af37]/15 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <SiGithub className="text-base" />
                    <span>GitHub</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
