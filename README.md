# React TipTap Editor

A fully customizable and extensible React editor library built on TipTap with complete TypeScript support.

[![npm version](https://badge.fury.io/js/react-tiptap-editor.svg)](https://badge.fury.io/js/react-tiptap-editor)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **Lightning Fast** - Built on TipTap's performant core
- 🎨 **Fully Customizable** - Override any component, extension, or behavior
- 🔧 **Extensible Architecture** - Add custom extensions and commands easily
- 💎 **Beautiful UI** - Modern design with dark mode support
- 📝 **TypeScript First** - Complete type safety and IntelliSense
- 🎯 **Developer Friendly** - Intuitive API with excellent documentation

## 🚀 Quick Start

### Installation

```bash
npm install react-tiptap-editor

# or with yarn
yarn add react-tiptap-editor

# or with pnpm
pnpm add react-tiptap-editor
```

### Basic Usage

```tsx
import { Editor } from 'react-tiptap-editor'
import { useState } from 'react'

function MyEditor() {
  const [content, setContent] = useState('<p>Start typing...</p>')
  
  return (
    <Editor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  )
}
```

### Advanced Usage with Hooks

```tsx
import { useEditor, Toolbar, BubbleMenu } from 'react-tiptap-editor'

function AdvancedEditor() {
  const { editor, commands, state } = useEditor(
    initialContent,
    {
      placeholder: "Tell your story...",
      autofocus: true
    },
    handleChange
  )
  
  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor} />
    </div>
  )
}
```

## 📚 Documentation

### Core Components

#### `<Editor />`

The main editor component with built-in toolbar, bubble menu, and floating menu.

```tsx
interface EditorProps {
  content?: string
  onChange?: (content: string) => void
  onUpdate?: (editor: TiptapEditor) => void
  onSelectionUpdate?: (editor: TiptapEditor) => void
  onFocus?: (editor: TiptapEditor) => void
  onBlur?: (editor: TiptapEditor) => void
  config?: EditorConfig
  toolbar?: ToolbarConfig | boolean
  bubbleMenu?: BubbleMenuConfig | boolean
  floatingMenu?: FloatingMenuConfig | boolean
  theme?: EditorTheme
  className?: string
}
```

#### `<Toolbar />`

Customizable toolbar with all formatting options.

```tsx
<Toolbar 
  editor={editor}
  config={{
    showBold: true,
    showItalic: true,
    showLink: true,
    customButtons: [myCustomButton]
  }}
/>
```

#### `<BubbleMenu />`

Context menu that appears when text is selected.

```tsx
<BubbleMenu 
  editor={editor}
  config={{
    showTextFormatting: true,
    showLinkControls: true,
    showColorControls: true
  }}
/>
```

#### `<FloatingMenu />`

Menu that appears on empty lines for quick formatting.

```tsx
<FloatingMenu 
  editor={editor}
  config={{
    showHeadings: true,
    showLists: true,
    showMedia: true
  }}
/>
```

### Hooks

#### `useEditor()`

Main hook for editor functionality.

```tsx
const { editor, commands, state, content, isEmpty, isFocused } = useEditor(
  content,
  config,
  onChange
)
```

#### `useEditorCommands()`

Access to all editor commands.

```tsx
const commands = useEditorCommands(editor)

// Use commands
commands.bold()
commands.setLink('https://example.com')
commands.insertImage('image-url.jpg')
```

#### `useEditorState()`

Access to editor state information.

```tsx
const state = useEditorState(editor)

// Check active states
if (state.isActive.bold) {
  // Bold is active
}
```

### Extensions

#### Presets

```tsx
import { 
  MinimalExtensions,
  BasicExtensions, 
  RichTextExtensions,
  FullFeaturedExtensions 
} from 'react-tiptap-editor'

// Use preset
<Editor config={{ extensions: RichTextExtensions }} />
```

#### Custom Extensions

```tsx
import { 
  configureStarterKit,
  configureLinkExtension,
  mergeExtensions 
} from 'react-tiptap-editor'

const customExtensions = mergeExtensions(
  [
    configureStarterKit({
      heading: { levels: [1, 2, 3] }
    }),
    configureLinkExtension({
      openOnClick: true
    })
  ],
  [MyCustomExtension]
)

<Editor config={{ extensions: customExtensions }} />
```

### Theming

```tsx
import { lightTheme, darkTheme } from 'react-tiptap-editor'

// Use built-in themes
<Editor theme={lightTheme} />

// Custom theme
const customTheme = {
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    foreground: '#0f172a'
  },
  borderRadius: '0.5rem',
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
}

<Editor theme={customTheme} />
```

## 🎯 Examples

### Minimal Editor

```tsx
import { Editor, MinimalExtensions } from 'react-tiptap-editor'

function MinimalEditor() {
  return (
    <Editor
      config={{ extensions: MinimalExtensions }}
      toolbar={false}
      bubbleMenu={false}
      floatingMenu={false}
      placeholder="Simple editor..."
    />
  )
}
```

### Blog Editor

```tsx
import { Editor, RichTextExtensions } from 'react-tiptap-editor'

function BlogEditor() {
  const [content, setContent] = useState('')
  
  return (
    <Editor
      content={content}
      onChange={setContent}
      config={{ 
        extensions: RichTextExtensions,
        placeholder: "Write your blog post..."
      }}
      toolbar={{
        showHeadings: true,
        showLists: true,
        showQuote: true,
        showImage: true,
        showLink: true
      }}
    />
  )
}
```

### Custom Toolbar

```tsx
import { Editor, useEditor, Toolbar } from 'react-tiptap-editor'

function CustomEditor() {
  const { editor } = useEditor()
  
  const customButtons = [
    {
      name: 'save',
      icon: <SaveIcon />,
      action: (editor) => saveContent(editor.getHTML()),
      tooltip: 'Save content'
    }
  ]
  
  return (
    <div>
      <Toolbar 
        editor={editor}
        config={{
          showBold: true,
          showItalic: true,
          customButtons
        }}
      />
      <EditorContent editor={editor} />
    </div>
  )
}
```

## 🔧 API Reference

### Types

```tsx
interface EditorConfig {
  placeholder?: string
  className?: string
  theme?: 'light' | 'dark' | 'auto'
  editable?: boolean
  autofocus?: boolean | 'start' | 'end' | number
  extensions?: Extension[]
}

interface EditorCommands {
  bold: () => boolean
  italic: () => boolean
  setLink: (url: string, text?: string) => boolean
  insertImage: (src: string, alt?: string) => boolean
  toggleHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => boolean
  // ... and many more
}

interface EditorState {
  isActive: {
    bold: boolean
    italic: boolean
    heading: (level: number) => boolean
    // ... and more
  }
  canUndo: boolean
  canRedo: boolean
  isEmpty: boolean
  isFocused: boolean
}
```

## 🎨 Styling

The editor comes with beautiful default styles, but you can customize everything:

### CSS Variables

```css
:root {
  --editor-primary: #3b82f6;
  --editor-background: #ffffff;
  --editor-foreground: #0f172a;
  --editor-border: #e2e8f0;
  --editor-radius: 0.5rem;
}
```

### Custom Classes

```tsx
<Editor 
  className="my-editor"
  config={{
    className: "my-editor-content"
  }}
/>
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev/) - The amazing editor framework this library is built on
- [Radix UI](https://www.radix-ui.com/) - For the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - For the styling system

## 📞 Support

- 📖 [Documentation](https://react-tiptap-editor.vercel.app)
- 🐛 [Issue Tracker](https://github.com/your-org/react-tiptap-editor/issues)
- 💬 [Discussions](https://github.com/your-org/react-tiptap-editor/discussions)
- 🐦 [Twitter](https://twitter.com/react-tiptap-editor)

---

Made with ❤️ by the React TipTap Editor team
