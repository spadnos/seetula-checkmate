import { title } from "@/components/primitives";

import { ReactNode } from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className={title()}>About SeetulaChecklists</h1>

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
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: ReactNode;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "typescript",
    description: "",
  },
  {
    title: "prisma",
    description: `Managing the DB directly was not scaling well. Prisma seems to
                  be the most common ORM so I gave it a try.`,
  },
  {
    title: "zod",
    description: `Data entry (and editing) is one of the keep features of many
            apps. Validating the data from the forms is key.`,
  },
  {
    title: "ShadCN",
    description: `There are a lot of component libraries each with pros and cons.`,
  },
  {
    title: "Forms",
    description: `Data input through forms is important is most of the apps I do.
      I wanted to come up with a good template that I could use.`,
  },
  {
    title: "Drag and Drop (DnD)",
    description: `DnD can really enhance the user experience. Figuring out how to 
      use it well is imporant.`,
  },
];
