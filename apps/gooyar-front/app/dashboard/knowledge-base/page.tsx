"use client";

import PageContainer from "@/components/container/PageContainer";
import AppCard from "@/components/shared/AppCard";
import KnowledgeBase from "@/containers/dashboard/knowledgeBase";

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

export default function KnowledgeBasePage() {
  return (
    <PageContainer title="Agent Detail" description="Agent detail page">
      <AppCard>
        <KnowledgeBase />
      </AppCard>
    </PageContainer>
  );
}
