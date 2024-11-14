import { CodeSnippets } from '@/components/code-snippets';
import { GithubIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
              React Native Snippets
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              A curated collection of reusable React Native components and patterns
            </p>
          </div>
          <a
            href="https://github.com/stackblitz/react-native-snippets"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 transition-colors dark:bg-zinc-700 dark:hover:bg-zinc-600"
          >
            <GithubIcon className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
        <CodeSnippets />
      </div>
    </main>
  );
}