"use client";

import { useState } from 'react';
import { Command } from 'cmdk';
import { Copy, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

// ... snippets array remains the same ...
const snippets = [
  {
    category: 'Navigation',
    items: [
      {
        title: 'Basic Stack Navigation',
        description: 'A simple stack navigator using React Navigation.',
        code: `import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}`,
        libraries: ['@react-navigation/native', '@react-navigation/stack']
      },
      {
        title: 'Bottom Tab Navigation',
        description: 'Implementing bottom tabs using React Navigation.',
        code: `import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}`,
        libraries: ['@react-navigation/native', '@react-navigation/bottom-tabs']
      }
    ]
  },
  {
    category: 'Animations',
    items: [
      {
        title: 'Fade In Animation',
        description: 'A simple fade-in animation using Animated API.',
        code: `import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';

const FadeInView = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
};`,
        libraries: ['react-native']
      }
    ]
  },
  {
    category: 'UI Components',
    items: [
      {
        title: 'Custom Button',
        description: 'A reusable button component with customizable styles.',
        code: `import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default CustomButton;`,
        libraries: ['react-native']
      }
    ]
  }
];


interface CodeBlockProps {
  code: string;
  expanded: boolean;
  onToggle: () => void;
  onCopy: () => void;
}

function CodeBlock({ code, expanded, onToggle, onCopy }: CodeBlockProps) {
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
        <TabsList className="w-full justify-start border-b mb-6 space-x-6 pb-2">
          {snippets.map((category) => (
            <TabsTrigger
              key={category.category}
              value={category.category}
              className="text-lg font-medium data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
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
                  <Card key={snippetId} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{snippet.title}</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-2">{snippet.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {snippet.libraries.map((lib, i) => (
                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {lib}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CodeBlock
                      code={snippet.code}
                      expanded={!!expandedCodes[snippetId]}
                      onToggle={() => toggleExpanded(snippetId)}
                      onCopy={() => copyToClipboard(snippet.code)}
                    />
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}