import { siteConfig } from "@/config/site";
import { CheckCircle } from "lucide-react";

function Logo({ size, excludeLogo }: { size?: string; excludeLogo?: boolean }) {
  let cn =
    "text-2xl font-semibold flex items-center text-purple-800 dark:text-purple-400";
  if (size === "xl") {
    cn =
      "text-5xl font-semibold flex items-center text-purple-800 dark:text-purple-400";
  }
  return (
    <div className={cn}>
      {!excludeLogo && <CheckCircle className="h-6 w-6 mr-2" />}
      <span className="">Seetula</span>
      <div className="capitalize text-black dark:text-foreground">
        {siteConfig.name}
      </div>
    </div>
  );
}
export default Logo;
