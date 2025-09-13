"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageContainer from "@/components/container/PageContainer";
import AppCard from "@/components/shared/AppCard";
import AgentDetail from "@/containers/dashboard/agents/detail";

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

export default function AgentDetailPage() {
  const params = useParams();
  const agentId = params.agentId as string;

  return (
    <PageContainer title="Agent Detail" description="Agent detail page">
      <AppCard>
        <AgentDetail agentId={agentId} />
      </AppCard>
    </PageContainer>
  );
}
