import PageTitle from "@/components/page-title";
import NewList from "@/components/form/new-list";

// interface FormData {
//   title: string;
//   description: string;
//   private: string;
//   template: string;
// }

export default function NewListPage() {
  return (
    <div className="flex flex-col w-full items-center">
      <PageTitle title="New List" />
      <NewList />
    </div>
  );
}
