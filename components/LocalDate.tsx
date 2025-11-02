"use client";
import { useEffect, useState } from "react";

interface Props {
  timezoneOffset?: number;
}

export default function CityTime({ timezoneOffset = 0 }: Props) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const nowUTC = new Date();
      const localTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);

      if (isNaN(localTime.getTime())) return;

      setTime(
        localTime.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [timezoneOffset]);

  return <span>{time}</span>;
}
