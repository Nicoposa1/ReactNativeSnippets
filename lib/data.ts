export const snippets = [
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
        libraries: ['@react-navigation/native', '@react-navigation/stack'],
        image: '../images/circle.png'
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
import { Animated, StyleSheet, View } from 'react-native';

const FadeInView = ({ children }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -150, 
          duration: 500, 
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500, 
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ translateY: bounceAnim }] }]} />
    </View>
  );
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 25,
  },
});

};`,
        libraries: ['react-native'],
        image: '/images/circle.png'
      }
    ]
  },
  {
    "category": "UI Components",
    "items": [
      {
        "title": "Custom Button",
        "description": "A reusable button component with customizable styles.",
        "code": "import React from 'react';\nimport { TouchableOpacity, Text, StyleSheet } from 'react-native';\n\nconst CustomButton = ({ onPress, title }) => (\n  <TouchableOpacity style={styles.button} onPress={onPress}>\n    <Text style={styles.text}>{title}</Text>\n  </TouchableOpacity>\n);\n\nconst styles = StyleSheet.create({\n  button: {\n    backgroundColor: '#007bff',\n    padding: 10,\n    borderRadius: 5,\n  },\n  text: {\n    color: '#fff',\n    textAlign: 'center',\n  },\n});\n\nexport default CustomButton;",
        "libraries": ["react-native"],
        "image": "../images/circle.png"
      },
      {
        "title": "Search Input",
        "description": "A simple TextInput component to capture search queries.",
        "code": "import React, { useState } from 'react';\nimport { TextInput, StyleSheet } from 'react-native';\n\nconst SearchInput = ({ placeholder, onSearch }) => {\n  const [query, setQuery] = useState('');\n\n  const handleChange = (text) => {\n    setQuery(text);\n    onSearch(text);\n  };\n\n  return (\n    <TextInput\n      style={styles.input}\n      placeholder={placeholder}\n      value={query}\n      onChangeText={handleChange}\n    />\n  );\n};\n\nconst styles = StyleSheet.create({\n  input: {\n    height: 40,\n    borderColor: '#ccc',\n    borderWidth: 1,\n    borderRadius: 5,\n    paddingLeft: 10,\n  },\n});\n\nexport default SearchInput;",
        "libraries": ["react-native"],
        "image": "../images/circle.png"
      }
    ]
  },
  {
    "category": "API Integration",
    "items": [
      {
        "title": "Gemini Image Recognition",
        "description": "This service uploads an image and uses the Gemini API to analyze and generate content based on the provided image, specifically focusing on recognizing and describing the image.",
        "code": "const apiKey = process.env.EXPO_PUBLIC_API_KEY;\nconst apiUrl = process.env.EXPO_PUBLIC_API_URL;\n\n\nexport const uploadImage = async (imageUri: string) => {\n  const response = await fetch(imageUri);\n  const blob = await response.blob();\n\n  const mimeType = 'image/jpeg'; \n\n  const uploadResponse = await fetch(`${apiUrl}/upload/v1beta/files?key=${apiKey}`, {\n    method: 'POST',\n    headers: {\n      'X-Goog-Upload-Protocol': 'resumable',\n      'X-Goog-Upload-Command': 'start',\n      'X-Goog-Upload-Header-Content-Length': blob.size.toString(),\n      'X-Goog-Upload-Header-Content-Type': mimeType,\n      'Content-Type': 'application/json',\n    },\n    body: JSON.stringify({\n      file: {\n        display_name: 'uploaded_image',\n      },\n    }),\n  });\n\n  const uploadHeaders = await uploadResponse.headers.get('x-goog-upload-url');\n\n  \n  const uploadUrl = uploadHeaders;\n\n  const finalUploadResponse = await fetch(uploadUrl, {\n    method: 'POST',\n    headers: {\n      'Content-Length': blob.size.toString(),\n      'X-Goog-Upload-Offset': '0',\n      'X-Goog-Upload-Command': 'upload, finalize',\n    },\n    body: blob,\n  });\n\n  const fileInfo = await finalUploadResponse.json();\n  return fileInfo.file.uri; \n};\n\nexport const postContent = async (image: string, setResponseText: (text: string) => void) => {\n  if (!image) {\n    return;\n  }\n\n  try {\n    const fileUri = await uploadImage(image);\n\n    const response = await fetch(`${apiUrl}/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json',\n      },\n      body: JSON.stringify({\n        contents: [{\n          parts: [\n            { text: 'Your promp' },\n            {\n              file_data: {\n                mime_type: 'image/jpeg',\n                file_uri: fileUri, \n              }\n            }\n          ]\n        }]\n      }),\n    });\n\n    if (!response.ok) {\n      const errorData = await response.json(); \n      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);\n    }\n\n    const data = await response.json();\n\n    \n\n    if (data.candidates && data.candidates.length > 0) {\n      data.candidates.forEach(candidate => {\n        if (candidate.content && candidate.content.parts) {\n          candidate.content.parts.forEach(part => {\n            if (part.text) {\n              setResponseText(part.text);\n            }\n          });\n        }\n      });\n    } else {\n    }\n  } catch (error) {\n  }\n};",
        "libraries": ["react-native"],
        "image": "../images/circle.png"
      }
    ]
  }


];
