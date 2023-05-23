"use client";

import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
});

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button onClick={onClick} className={"absolute top-0 right-0 mt-2 mr-2 p-1 rounded text-xs bg-secondary text-white " + firaCode.className}>
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}