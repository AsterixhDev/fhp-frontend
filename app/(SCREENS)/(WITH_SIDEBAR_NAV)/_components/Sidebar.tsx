"use client";
import { usePathname } from "next/navigation";
import { ChevronRight, Compass, Film, Heart, Home, User } from "lucide-react";
import Link from "next/link";
import appConfig from "@/config/app.info.config";

const navigations = [
  { icon: Home, label: "Home", url: "/" },
  { icon: Film, label: "Reels", url: "/reels" },
  { icon: Compass, label: "Discover", url: "/discover" },
  { icon: User, label: "Profile", url: "/profile" },
  { icon: Heart, label: "Favorites", url: "/favorites" },
];

const Sidebar = ({ initialPathname }: { initialPathname: string }) => {
  const clientPathname = usePathname();
  const activePathname = clientPathname ?? initialPathname; // use client path if available

  const { app_name } = appConfig;

  return (
    <>
      <aside className="hidden md:flex size-full rounded-xl bg-black text-white flex-col justify-between p-6 border-r border-white/10">
        <header className="flex items-center justify-start mb-10">
          <h1 className="text-2xl font-bold tracking-tight">{app_name}</h1>
        </header>

        <nav aria-label="Primary Navigation">
          <ul className="flex flex-col gap-6" role="menu">
            {navigations.map(({ icon: Icon, label, url }, i) => {
              const isActive = activePathname === url;
              return (
                <li key={i} role="none">
                  <Link
                    href={url}
                    role="menuitem"
                    aria-label={label}
                    className={`flex items-center gap-3 text-base font-medium transition-colors
                      focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md
                      ${isActive ? "text-red-500" : "text-white hover:text-red-500"}`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <footer className="mt-10">
          <button
            type="button"
            aria-label="Go to account"
            className="w-full flex items-center justify-between bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <div className="flex items-center gap-3">
              <span
                className="size-10 rounded-full bg-neutral-700 overflow-hidden shrink-0"
                role="img"
                aria-label="User Avatar"
              />
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold">Username</span>
                <span className="text-xs text-white/60">Go to account</span>
              </div>
            </div>
            <ChevronRight
              className="w-4 h-4 text-white/60"
              aria-hidden="true"
            />
          </button>
        </footer>
      </aside>

      <nav
        aria-label="Mobile Navigation"
        className="md:hidden z-50  h-16 bg-black border-t border-white/10 flex items-center justify-around text-white"
      >
        {navigations.map(({ icon: Icon, label, url }, i) => {
          const isActive = activePathname === url;
          return (
            <Link
              href={url}
              key={i}
              aria-label={label}
              className={`flex flex-col items-center justify-center p-1
                focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md
                ${isActive ? "text-red-500" : "text-white"}`}
            >
              <Icon className="w-6 h-6" aria-hidden="true" />
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
