import FeatureGrid from "@/components/feature-grid";
import Logo from "@/components/seetula/logo";

export default function AboutPage() {
  return (
    <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-5xl font-bold">About</h1>
        <Logo size="xl" excludeLogo />
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
        {/* <div className=" px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-blue-600 dark:text-blue-400">
            Why Another Checklist?
          </h2>
          <p>
            There is no shortage of places to create checklists. You can use any
            of the note taking apps and there are a number of dedicated
            checklist apps. But each of those options was missing a few features
            that I really wanted. I probably could have written an extension to
            add the functionality I wanted, but it was way more fun to start
            from scratch.
          </p>
        </div> */}
        <FeatureGrid />
      </section>
      {/* 
      <div className="mt-12">
        <h2 className="text-2xl font-bold capitalize">
          Technologies and Techniques
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-4 text-left">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div> */}
    </section>
  );
}

// function FeatureCard({
//   title,
//   description,
// }: {
//   title: ReactNode;
//   description: string;
// }) {
//   return (
//     <div>
//       <h2 className="text-xl font-bold">{title}</h2>
//       <div>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// const FEATURES = [
//   {
//     title: "typescript",
//     description: "",
//   },
//   {
//     title: "prisma",
//     description: `Managing the DB directly was not scaling well. Prisma seems to
//                   be the most common ORM so I gave it a try.`,
//   },
//   {
//     title: "zod",
//     description: `Data entry (and editing) is one of the keep features of many
//             apps. Validating the data from the forms is key.`,
//   },
//   {
//     title: "ShadCN",
//     description: `There are a lot of component libraries each with pros and cons.`,
//   },
//   {
//     title: "Forms",
//     description: `Data input through forms is important is most of the apps I do.
//       I wanted to come up with a good template that I could use.`,
//   },
//   {
//     title: "Drag and Drop (DnD)",
//     description: `DnD can really enhance the user experience. Figuring out how to
//       use it well is imporant.`,
//   },
// ];
