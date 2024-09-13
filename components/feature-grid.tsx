// 'use client'

import { CheckCircle, Zap, Variable, Boxes, Share2 } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Reusable Lists",
    description: `Many lists, such as a packing list, get used over and over. The addition of
      a reset button make this simple.`,
  },
  {
    icon: <Boxes className="h-6 w-6" />,
    title: "Categories",
    description: `Each list can be divided into one or more categories. On a shopping list
      you could group all the produce into a category. You can divide a packing list
      into clothes and electronics, etc.`,
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Collaborative Lists (roadmap)",
    description: `Multiple people can work on the same list.`,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Templates (roadmap)",
    description: `There are 2 different ways to share a list. People can work collaboratively on
      a single list. But another type of sharing is when one person creates a list, but
      each person gets their own copy. Many people might have a packing list. Instead
      of each person creating their own from scratch they can use a template created
      once.`,
  },
  {
    icon: <Variable className="h-6 w-6" />,
    title: "Parameterizable Lists (roadmap)",
    description: `Allows quick creation of variations of a list. For example, a packing list
    might have a parameter for the number of days.`,
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-white py-12 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Unique Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A few features make a big difference.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  {feature.icon}
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
