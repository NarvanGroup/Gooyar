"use client";
import { useCustomizingStore } from "@/store/useCustomizerStore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

type Props = {
  title: string;
  children: React.ReactNode;
};

const BaseCard = ({ title, children }: Props) => {
  const { customizer } = useCustomizingStore();
  return (
    <Card
      sx={{ padding: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? "outlined" : undefined}
    >
      <CardHeader title={title} />
      <Divider />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
