"use client";

import { useState } from 'react';
import { Command } from 'cmdk';
import { Copy, Search, ChevronDown, ChevronUp, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CodeBlock } from './CodeBlock';
import { snippets } from '@/lib/data';

interface CodeBlockProps {
  code: string;
  expanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
}

export function CodeSnippets() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Navigation');
  const [expandedCodes, setExpandedCodes] = useState<Record<string, boolean>>({});

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Copied to clipboard!');
  };

  const toggleExpanded = (snippetId: string) => {
    setExpandedCodes(prev => ({
      ...prev,
      [snippetId]: !prev[snippetId]
    }));
  };

  const filteredSnippets = snippets.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
        <Command className="rounded-lg border border-zinc-200 dark:border-zinc-700">
          <input
            className="w-full px-12 h-12 bg-transparent focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
            placeholder="Search snippets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Command>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full justify-start border-b mb-6 space-x-2 sm:space-x-4 lg:space-x-6 pb-2 overflow-x-auto overflow-y-hidden">
          {snippets.map((category) => (
            <TabsTrigger
              key={category.category}
              value={category.category}
              className="text-base sm:text-lg font-medium whitespace-nowrap data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
            >
              {category.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredSnippets.map((category) => (
          <TabsContent key={category.category} value={category.category}>
            <div className="grid gap-6">
              {category.items.map((snippet, index) => {
                const snippetId = `${category.category}-${index}`;
                return (
                  <CodeBlock
                    code={snippet.code}
                    title={snippet.title}
                    description={snippet.description}
                  />
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}