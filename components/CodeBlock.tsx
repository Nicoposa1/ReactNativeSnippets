import { Button } from '@/components/ui/button';
import { Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  expanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, expanded, onToggle, onCopy }) => {

  const preview = code.split('\n').slice(0, 5).join('\n');

  return (
    <div className="relative">
      <pre className={`bg-zinc-950 text-zinc-50 p-4 rounded-lg overflow-x-auto ${expanded ? '' : 'max-h-[160px]'}`}>
        <code className="text-sm">
          {expanded ? code : preview + '\n...'}
        </code>
      </pre>
      <div className="absolute right-2 top-2 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCopy}
          className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700"
        >
          <Copy className="w-4 h-4 text-zinc-400" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8 bg-zinc-800 hover:bg-zinc-700"
        >
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </Button>
      </div>
    </div>
  );
}
