"use client";

import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
});

import { Highlight, themes } from "prism-react-renderer"

import CopyButton from "./CopyButton"

export default function PrismCodeblock({ children }: { children: any }) {
  const className = children.props.className || '';
  const language = className.replace(/language-/, '');

  const code = children.props.children.trim();

  return (
    <Highlight
      theme={themes.dracula}
      code={code.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style} className={"text-sm relative font-mono max-w-2xl w-full p-4 rounded mb-8 bg-white overflow-x-auto " + firaCode.className}>
          {/* <CopyButton code={code} /> */}
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <div className="pl-8 flex items-center">
                <span className="text-xs absolute select-none w-8 text-right left-0">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}