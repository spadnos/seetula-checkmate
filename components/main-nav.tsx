// "use client";

import { cn } from "@/lib/utils";
import CustomLink from "./custom-link";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import React from "react";
import { Button } from "./ui/button";
import Logo from "./seetula/logo";
import { auth } from "@/auth";

const NAVLINKS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    requiresAuth: true,
    hidden: true,
  },
  {
    label: "Checklists",
    href: "/checklists",
    requiresAuth: true,
    hidden: false,
  },
  {
    label: "Polls",
    href: "/polls",
    requiresAuth: true,
    hidden: true,
  },
  {
    label: "About",
    href: "/about",
    requiresAuth: false,
    hidden: false,
  },
];

async function MenuItem({
  label,
  href,
  requiresAuth,
  hidden,
}: {
  label: string;
  href: string;
  requiresAuth: boolean;
  hidden: boolean;
}) {
  const session = await auth();

  if (hidden || (requiresAuth && !session?.user)) {
    return null;
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
        {label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
export function MainNav() {
  return (
    <div className="flex items-center gap-4">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          <Logo />
        </Button>
      </CustomLink>
      <NavigationMenu>
        <NavigationMenuList>
          {NAVLINKS.map((item, index) => {
            return <MenuItem key={index} {...item} />;
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
