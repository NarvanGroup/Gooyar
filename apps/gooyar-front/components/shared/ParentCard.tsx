"use client";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardHeader, CardContent, Divider, Box } from "@mui/material";
import { useCustomizingStore } from "@/store/useCustomizerStore";
type Props = {
  title: string;
  footer?: string | React.ReactNode;
  codeModel?: React.ReactNode;
  children: React.ReactNode;
};

const ParentCard = ({ title, children, footer, codeModel }: Props) => {
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
      <CardHeader title={title} action={codeModel} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ParentCard;
