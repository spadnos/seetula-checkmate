import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-6",
    "col-span-10",
    "row-span-2",
    "row-span-3",
    "row-span-4",
    "z-100",
    "grid-cols-[repeat(1,30px)]",
    "grid-cols-[repeat(3,30px)]",
    "grid-cols-[repeat(6,30px)]",
    "grid-cols-[repeat(10,30px)]",
    "grid-rows-[repeat(1,30px)]",
    "grid-rows-[repeat(3,30px)]",
    "grid-rows-[repeat(4,30px)]",
    "grid-rows-[repeat(10,30px)]",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        sage: {
          50: "#F1F3F2",
          100: "#E4E7E4",
          200: "#C5CEC7",
          300: "#AAB6AC",
          400: "#8C9C8E",
          500: "#718474",
          600: "#59685C",
          700: "#445046",
          800: "#2D342E",
          900: "#181B18",
          950: "#0C0E0C",
        },
        burntorange: {
          50: "#FBEDE4",
          100: "#F8DECE",
          200: "#F1BA98",
          300: "#EA9966",
          400: "#E37530",
          500: "#C15A1A",
          600: "#994715",
          700: "#753610",
          800: "#4C240A",
          900: "#281305",
          950: "#120802",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
