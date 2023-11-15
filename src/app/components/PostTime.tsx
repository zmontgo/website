"use client";

import { useEffect, useState, useCallback } from "react";

export default function PostTime({ date }: { date: Date }) {
  const formatDate = useCallback(() => {
    const now = new Date();
    const difference = now.getTime() - date.getTime();
  
    // If this post was written less than a day ago, show the greatest unit of time, ceil. [Eg. 2 hours ago, or 3 minutes ago, or 1 second ago]
    if (difference < 1000 * 60 * 60 * 24) {
      const seconds = Math.ceil(difference / 1000);
      const minutes = Math.ceil(seconds / 60);
      const hours = Math.ceil(minutes / 60);
  
      if (hours > 1) {
        return `${hours} hours ago`;
      } else if (minutes > 1) {
        return `${minutes} minutes ago`;
      } else {
        return `${seconds} seconds ago`;
      }
    }
  
    // Otherwise the format is August 1, 2021
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    return `${month} ${day}, ${year}`;
  }, [date]);
  
  const [ formattedDate, setFormattedDate ] = useState(formatDate());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFormattedDate(formatDate());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [formatDate]);

  return <>{formattedDate ? `${formattedDate}` : <div className="w-32 h-4 rounded-md bg-stone-500/20 animate-pulse"></div>}</>;
}