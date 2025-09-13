import PageContainer from "@/components/container/PageContainer";
import React from "react";
import Processes from "@/containers/dashboard/processes";

const page = () => {
  return (
    <>
      <PageContainer title="Processes" description="this is Processes">
        {/* <Breadcrumb title="Calendar" subtitle="App" /> */}
        <Processes />
      </PageContainer>
    </>
  );
};

export default page;
