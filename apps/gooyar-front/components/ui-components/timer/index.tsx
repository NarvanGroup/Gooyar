import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Timer = (props: any) => {
  const { mins, onSendOTP, setTimeRemained } = props;
  const [time, setTime] = useState<string | null>(null);

  const showTimer = (end: any) => {
    let x = setInterval(() => {
      const now = new Date().getTime();
      var timeLeft = end - now;
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      if (timeLeft < 0) {
        setTime(null);
        clearInterval(x);
        setTimeRemained(null);
      } else {
        setTime(`${minutes}:${seconds}`);
      }
    }, 1000);
    return x;
  };

  useEffect(() => {
    if (mins !== null && mins > 0) {
      let end = new Date(new Date().getTime() + mins * 60000);
      showTimer(end);
    }
  }, [mins]);

  if (time !== null && mins !== null && mins > 0) {
    return (
      <Typography ml={1} color="primary">
        {time}
      </Typography>
    );
  } else if (mins === null) {
    return (
      <Button onClick={onSendOTP} color="secondary">
        ارسال مجدد
      </Button>
    );
  } else {
    return null;
  }
};
