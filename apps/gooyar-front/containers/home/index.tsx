"use client";
import Layout from "@/components/layout/Layout";
import Video from "@/components/sections/Video";
import Banner1 from "@/components/sections/Banner1";
import Counter1 from "@/components/sections/Counter1";
import Writing from "@/components/sections/Writing";
import UseCases from "@/components/sections/UseCases";
import Roadmap from "@/components/sections/Roadmap";
import Pricing1 from "@/components/sections/Pricing1";
import Tools from "@/components/sections/Tools";
import Testimonial1 from "@/components/sections/Testimonial1";

export default function Home() {
  return (
    <>
      <Layout
        mainCls="main-content fix"
        headerStyle={1}
        footerStyle={1}
        headTitle={undefined}
        breadcrumbTitle={undefined}
      >
        <Banner1 />
        {/* <Video /> */}
        <Counter1 />
        <Writing />
        <UseCases />
        <Roadmap />
        <Pricing1 />
        <Tools />
        <Testimonial1 />
      </Layout>
    </>
  );
}
