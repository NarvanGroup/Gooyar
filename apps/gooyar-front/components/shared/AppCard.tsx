"use client";
import { useCustomizingStore } from "@/store/useCustomizerStore";
import Card from "@mui/material/Card";

type Props = {
  children: React.ReactNode;
};

const AppCard = ({ children }: Props) => {
  const { customizer } = useCustomizingStore();
  return (
    <Card
      sx={{ display: "flex", p: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      {children}
    </Card>
  );
};

export default AppCard;
