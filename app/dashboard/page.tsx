"use client";

import { title } from "@/components/primitives";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ReactNode } from "react";

function FeatureCard({
  title,
  description,
}: {
  title: ReactNode;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <section className=" mx-auto flex flex-col items-center">
      <h1 className={title()}>Dashboard</h1>

      <div className="mt-16">
        <h2 className="text-2xl font-bold capitalize">Mini Apps</h2>
        <div className="grid grid-cols-3 mt-4 w-full justify-left gap-4">
          <FeatureCard
            title={<Link href="/checklists">Checklists</Link>}
            description={`More than just a simple checklist`}
          />
          <FeatureCard
            title={<Link href="/polls">Polls</Link>}
            description={`Rank choice voting.`}
          />
        </div>
      </div>
    </section>
  );
}
