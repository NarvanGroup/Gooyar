import PageContainer from "@/components/container/PageContainer";
import Calendars from "@/components/apps/calendar/Calendars";
import React from "react";
import Breadcrumb from "@/app/dashboard/layout/shared/breadcrumb/Breadcrumb";

const page = () => {
  return (
    <>
      <PageContainer title="تقویم ها" description="this is Calendar">
        {/* <Breadcrumb title="Calendar" subtitle="App" /> */}
        <Calendars />
      </PageContainer>
    </>
  );
};

export default page;
