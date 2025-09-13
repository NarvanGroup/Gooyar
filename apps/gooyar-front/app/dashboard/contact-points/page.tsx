"use client";

import PageContainer from "@/components/container/PageContainer";
import AppCard from "@/components/shared/AppCard";
import ContactPoints from "@/containers/dashboard/contacPointes";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    to: "/dashboard/agents",
    title: "Agents",
  },
  {
    title: "Agent Detail",
  },
];

export default function ContactPointsPage() {
  return (
    <PageContainer title="Agent Detail" description="Agent detail page">
      <AppCard>
        <ContactPoints />
      </AppCard>
    </PageContainer>
  );
}
