"use client";

import { useEffect, useState } from "react";

export default function PostTime({ date }: { date: Date }) {
  const [ formattedDate, setFormattedDate ] = useState("");
  const [ intervalValue, setIntervalValue ] = useState<number>(1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      formatDate();
    }, intervalValue);

    return () => clearInterval(intervalId);
  }, []);

  function formatDate() {
    const now = new Date();
    const difference = now.getTime() - date.getTime();
  
    // If this post was written less than a day ago, show the greatest unit of time, ceil. [Eg. 2 hours ago, or 3 minutes ago, or 1 second ago]
    if (difference < 1000 * 60 * 60 * 24) {
      const seconds = Math.ceil(difference / 1000);
      const minutes = Math.ceil(seconds / 60);
      const hours = Math.ceil(minutes / 60);
  
      if (hours > 1) {
        setIntervalValue(1000 * 60 * 60);
        setFormattedDate(`${hours} hours ago`);
      } else if (minutes > 1) {
        setIntervalValue(1000 * 60);
        setFormattedDate(`${minutes} minutes ago`);
      } else {
        setIntervalValue(1000);
        setFormattedDate(`${seconds} seconds ago`);
      }

      return;
    }
  
    // Otherwise the format is August 1, 2021
  
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    setFormattedDate(`${month} ${day}, ${year}`);

    // Normalize years, months, and days to 0
    const normalizedNow = new Date();
    normalizedNow.setFullYear(0);
    normalizedNow.setMonth(0);
    normalizedNow.setDate(0);

    const normalizedPost = new Date(date);
    normalizedPost.setFullYear(0);
    normalizedPost.setMonth(0);
    normalizedPost.setDate(0);

    const offset = normalizedNow.getTime() - normalizedPost.getTime();

    // Unless the offset is 0 (the current time is the same as the post time, in which case set the interval to 1 day), set the interval to the offset
    setIntervalValue(offset > 0 ? offset : 1000 * 60 * 60 * 24);
  }

  return <>{formattedDate ? `Posted ${formattedDate}` : "Loading..."}</>;
}