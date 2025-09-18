"use client";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardHeader, Tooltip, Divider, IconButton } from "@mui/material";
import { IconDownload } from "@tabler/icons-react";
import { useCustomizingStore } from "@/store/useCustomizerStore";

const DownloadCard = ({ title, children, onDownload }: any) => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;
  const { customizer } = useCustomizingStore();
  return (
    <Card
      sx={{
        padding: 0,
        border: !customizer.isCardShadow ? `1px solid ${borderColor}` : "none",
      }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      <CardHeader
        sx={{
          padding: "16px",
        }}
        title={title}
        action={
          <Tooltip title="دانلود" placement="left">
            <IconButton onClick={onDownload}>
              <IconDownload />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      {children}
    </Card>
  );
};

export default DownloadCard;
