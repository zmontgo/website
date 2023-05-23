"use client";

import { useState } from "react";
import type { AccessibilityOptions } from "./PostLayout";

export default function AccessibilityPanel({ accessibilityOptions, onOptionsChange }: { accessibilityOptions: AccessibilityOptions, onOptionsChange: (options: AccessibilityOptions) => void }) {
  const [options, setOptions] = useState<AccessibilityOptions>(accessibilityOptions);

  const handleOptionChange = (key: keyof AccessibilityOptions, value: boolean) => {
    setOptions(prevOptions => ({
      ...prevOptions,
      [key]: value
    }));

    onOptionsChange(options);
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        {Object.entries(options).map(([key, value]) => {
          return (
            <div key={key} className="flex items-center justify-center">
              <input type="checkbox" checked={value === "" ? false : true} onChange={(e) => handleOptionChange(key as keyof AccessibilityOptions, e.target.checked)} />
              <label>{value}</label>
            </div>
          )
        })}
    </div>
  </div>
  )
}