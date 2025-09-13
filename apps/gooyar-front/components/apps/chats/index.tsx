"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const ChatsApp = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Left part */}
      {/* ------------------------------------------- */}

      {/* <ChatSidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      /> */}
      {/* ------------------------------------------- */}
      {/* Right part */}
      {/* ------------------------------------------- */}

      {/* <Box flexGrow={1}>
        <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
        <Divider />
        <ChatMsgSent />
      </Box> */}
    </>
  );
};

export default ChatsApp;
