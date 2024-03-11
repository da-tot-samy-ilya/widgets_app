import { getCurrTime } from "./utils/time.ts";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./style.scss";

export const Clock = () => {
  const initTime = getCurrTime();

  const [time, setTime] = useState<dayjs.Dayjs>(initTime);

  useEffect(() => {
    setTimeout(() => {
      const seconds = time.second();
      setTime(time.second(seconds + 1));
    }, 1000);
  }, [time]);

  return (
    <div className="clock__container">
      <div className="clock__time">{time.format("HH:mm:ss")}</div>
      <div className="clock__date">{time.format("D of MMMM")}</div>
    </div>
  );
};
