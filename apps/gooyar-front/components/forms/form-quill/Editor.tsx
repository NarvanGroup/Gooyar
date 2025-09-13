"use client";

import React from "react";

// import ParentCard from "@/components/shared/ParentCard";
import QuillEdit from "./QuillEdit";
import ParentCard from "@/components/shared/ParentCard";

const Editor = () => {
  return (
    <ParentCard title="Quill Editor">
      <QuillEdit />
    </ParentCard>
  );
};

export default Editor;
