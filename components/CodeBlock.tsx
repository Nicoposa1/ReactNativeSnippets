"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  title: string;
  description: string;
  libraries?: string[];
}

export function CodeBlock({ code, title, description, libraries = [] }: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
      <div>
        <h3 className="font-medium text-base sm:text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {libraries.length > 0 && (
        <div className="text-xs sm:text-sm bg-slate-50 p-2.5 sm:p-3 rounded-lg">
          <span className="font-medium text-slate-700">Required Libraries: </span>
          <span className="text-slate-600">{libraries.join(", ")}</span>
        </div>
      )}
      <div className="relative">
        <pre className={`bg-slate-950 rounded-lg p-3 sm:p-4 overflow-x-auto ${!isExpanded && "max-h-48"}`}>
          <code className="text-white text-xs sm:text-sm whitespace-pre-wrap break-words">{code}</code>
        </pre>
        <div className={`absolute bottom-0 left-0 right-0 ${!isExpanded && "h-24"} bg-gradient-to-t from-slate-950 to-transparent pointer-events-none`} />
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 right-2 text-xs sm:text-sm"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
}