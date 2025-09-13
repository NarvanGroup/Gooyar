"use client";
import { useEffect, useState } from "react";

import PageContainer from "@/components/container/PageContainer";

import Agents from "@/containers/dashboard/agents";
import AppCard from "@/components/shared/AppCard";
import Breadcrumb from "@/components/layout/Breadcrumb";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Shop",
  },
];

export default function AgentsPage() {
  return (
    <PageContainer title="Shop" description="this is Shop">
      {/* breadcrumb */}
      {/* <Breadcrumb title="Shop" items={BCrumb} /> */}
      <AppCard>
        <Agents />
      </AppCard>
    </PageContainer>
  );
}
