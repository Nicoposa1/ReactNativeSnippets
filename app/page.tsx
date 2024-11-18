import { CodeSnippets } from '@/components/code-snippets';
import { GithubIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
              RN Snippets
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              A curated collection of reusable React Native components and patterns
            </p>
          </div>
        </div>
        <CodeSnippets />
      </div>
    </main>
  );
}