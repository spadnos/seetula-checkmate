import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-blue-50 dark:bg-gray-700">
      <Icon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
}
