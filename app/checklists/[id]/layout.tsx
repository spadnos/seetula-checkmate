import SideNav from "@/components/sidenav";
import { fetchChecklists } from "@/lib/checklist";

export default async function ChecklistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const checklists = await fetchChecklists({
    includeCategories: false,
    includeItems: false,
  });

  return (
    <div className="flex gap-4">
      <SideNav checklists={checklists} />
      {children}
    </div>
  );
}
