import { siteConfig } from "@/config/site";
import { CheckCircle } from "lucide-react";

function Logo() {
  return (
    <div className="text-2xl font-semibold flex items-center text-purple-800 dark:text-purple-400">
      <CheckCircle className="h-6 w-6 mr-2" />
      <span className="">Seetula</span>
      <div className="capitalize text-black dark:text-foreground">
        {siteConfig.name}
      </div>
    </div>
  );
}
export default Logo;
