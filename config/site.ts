export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Sophie's Vending Machine",
  description: "Crisp Take Home",
  navItems: [
    {
      label: "Start",
      href: "/",
    },
  ],
  stepItems: [
    {
      label: "Select a Product",
      href: "/step1",
    },
    {
      label: "Deposit Coins",
      href: "/step2",
    },
    {
      label: "Confirm Purchase",
      href: "/step3",
    },
    {
      label: "Enjoy!",
      href: "/step4",
    }
  ],
  links: {
    github: "https://github.com/vusophie/vending-machine",
  },
};
