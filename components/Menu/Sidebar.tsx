"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { navLinks, socialMedia } from "@/constans";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import NavLinks from "./NavLinks";
import SocialMedia from "./SocialMedia";
import { Badge } from "../ui/badge";
import { Card, CardHeader } from "../ui/card";
import { useAuthContext } from "@/context/AuthContext"; // AuthContext import edildi
import { User } from "@/types/quizTypes";

const Sidebar = () => {
  const pathname = usePathname();
  const { currentUser } = useAuthContext() as { currentUser: User | null }; // User tipi uygulandı

  return (
    <aside
      className="hidden lg:flex h-screen w-72 bg-mycolor-400
     dark:bg-mycolor-100 border-r-2 dark:border-r-mycolor-400/30 fixed"
    >
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <div className="mx-auto ml-14 justify-center items-center mt-12">
          <Link href="/">
            <Image
              alt="Logo"
              src="/melo_avatar.jpg"
              className="rounded-full"
              width={160}
              height={160}
            />
          </Link>
          <Card>
            <CardHeader>
              <Badge>meltem teacher</Badge>
            </CardHeader>
          </Card>
          <div className="mt-6 text-center">
            <ModeToggle />
          </div>
        </div>

        <nav className="w-[90%] h-full flex-col justify-between md:flex gap-3">
          <ul className="hidden md:flex w-full flex-col items-start gap-4 mt-14">
            {navLinks.map((link) => {
              const IsActive = link.route === pathname;
              const IconComponent = link.icon;

              if (
                currentUser &&
                currentUser.is_staff &&
                link.label.startsWith("Admin")
              ) {
                return (
                  <NavLinks
                    key={link.route}
                    IsActive={IsActive}
                    icon={link.icon}
                    label={link.label}
                    route={link.route}
                  />
                );
              } else if (!link.label.startsWith("Admin")) {
                return (
                  <NavLinks
                    key={link.route}
                    IsActive={IsActive}
                    icon={link.icon}
                    label={link.label}
                    route={link.route}
                  />
                );
              }

              return null; // Hiçbir koşula uymuyorsa null döndür
            })}
          </ul>

          <ul className="hidden md:flex w-full flex-wrap items-start gap-2">
            <div className="w-full relative">
              <Input className="w-full rounded-full" />
              <Button variant="link" className="absolute right-0 top-0">
                <Search width={15} height={15} />
              </Button>
            </div>

            {socialMedia.map((link) => {
              const IconComponent = link.icon;

              return (
                <SocialMedia
                  icon={link.icon}
                  route={link.route}
                  key={link.route}
                />
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
