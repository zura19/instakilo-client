"use client";
import { Heart, Lock, SunMoon, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Edit Profile",
    href: "/settings/edit",
  },
  {
    name: "Notifications",
    href: "/settings/notifications",
  },
  {
    name: "Update password",
    href: "/settings/updatePassword",
  },
  {
    name: "Theme",
    href: "/settings/theme",
  },
];

type linkProps = { name: string; href: string };

export default function SettingsSidebar() {
  return (
    <div className="flex flex-col gap-1 px-2 sm:px-4 md:px-6 py-4 border border-l-0 h-dvh">
      {links.map((link, i) => (
        <SettingSidebarLink name={link.name} href={link.href} key={i} />
      ))}
    </div>
  );
}

function SettingSidebarLink({ name, href }: linkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive ? "bg-accent/50 text-accent-foreground" : "";

  const iconSize = 20;
  const iconClass = "text-primary ";

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-2 md:px-4 py-3 rounded-sm text-sm hover:bg-accent/50 transition-all duration-300 ${activeClass}`}
    >
      {name === "Edit Profile" && (
        <UserCircle2 size={iconSize} className={iconClass} />
      )}

      {name === "Notifications" && (
        <Heart size={iconSize} className={iconClass} />
      )}

      {name === "Update password" && (
        <Lock size={iconSize} className={iconClass} />
      )}

      {name === "Theme" && <SunMoon size={iconSize} className={iconClass} />}

      <p className="text-primary text-sm hidden md:block">{name}</p>
    </Link>
  );
}
