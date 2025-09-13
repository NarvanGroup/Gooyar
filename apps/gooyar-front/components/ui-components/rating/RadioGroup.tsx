"use client";

import * as React from "react";
import { Rating } from "@mui/material";
import ChildCard from "@/components/shared/ChildCard";
import { IconContainerProps } from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { Icon123 } from "@tabler/icons-react";

const RadioRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));
const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <Icon123 color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <Icon123 color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <Icon123 color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <Icon123 color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <Icon123 color="success" />,
    label: "Very Satisfied",
  },
};
function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;

  return <span {...other}>{customIcons[value].icon}</span>;
}

const RadioGroup = () => {
  return (
    <ChildCard title="Radio Group">
      <RadioRating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
    </ChildCard>
  );
};
export default RadioGroup;
