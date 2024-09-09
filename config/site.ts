export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CheckMate",
  description: "Yet another checklist app.",
  navItems: [
    {
      label: "Checklists",
      href: "/checklists",
    },
    {
      label: "Polls",
      href: "/polls",
    },
    {
      label: "Comments",
      href: "/comments",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Checklists",
      href: "/checklists",
    },
    {
      label: "Polls",
      href: "/polls",
    },

    {
      label: "Comments",
      href: "/comments",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
