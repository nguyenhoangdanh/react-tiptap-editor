# React TipTap Editor

A fully customizable and extensible React editor built on TipTap with drag-and-drop images, complete TypeScript support, and modern UI components.

## ✨ Features

- 🎨 **Fully Customizable** - Override any component, extension, or behavior
- 🖼️ **Drag & Drop Images** - Built-in image upload with drag-and-drop positioning
- 🔧 **TypeScript First** - Complete type safety and IntelliSense support
- 🧩 **Extensible Architecture** - Add custom extensions, commands, and UI components
- 🎯 **Multiple Presets** - Minimal, Basic, Rich Text, and Full-Featured configurations
- 🎨 **Theme Support** - Light/dark themes with CSS custom properties
- ⚡ **Performance Optimized** - Tree-shakable exports and lazy loading
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ♿ **Accessibility** - WCAG compliant with keyboard navigation
- 🧪 **Well Tested** - Comprehensive test suite included

## 🚀 Quick Start

### Installation

```bash
npm install react-richtext-tiptap
# or
yarn add react-richtext-tiptap
# or
pnpm add react-richtext-tiptap
```

### Basic Usage

```tsx
import { Editor } from 'react-richtext-tiptap'

function MyApp() {
  const [content, setContent] = useState('')

  return (
    <Editor
      content={content}
      onChange={setContent}
      placeholder="Start writing something amazing..."
    />
  )
}
```

### With Image Upload

```tsx
import { Editor, handleImageDrop } from 'react-richtext-tiptap'

function MyApp() {
  const [content, setContent] = useState('')

  const uploadImage = async (file: File) => {
    // Upload to your server
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    
    const { url } = await response.json()
    return url
  }

  return (
    <Editor
      content={content}
      onChange={setContent}
      config={{
        onImageDrop: (editor, files) => {
          return handleImageDrop(editor, files, {
            onUpload: uploadImage,
            maxSize: 10 * 1024 * 1024, // 10MB
            alignment: 'center',
          })
        }
      }}
    />
  )
}
```

## 📚 API Reference

### Components

#### `<Editor>`

Main editor component with full functionality.

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
  children?: ReactNode
}
```

#### `<Toolbar>`

Customizable toolbar component.

```tsx
interface ToolbarConfig {
  showBold?: boolean
  showItalic?: boolean
  showUnderline?: boolean
  showStrike?: boolean
  showCode?: boolean
  showHighlight?: boolean
  showLink?: boolean
  showImage?: boolean
  showHeadings?: boolean
  showLists?: boolean
  showQuote?: boolean
  showCodeBlock?: boolean
  showTable?: boolean
  showTextAlign?: boolean
  showTextColor?: boolean
  showDivider?: boolean
  customButtons?: ToolbarButton[]
}
```

#### `<BubbleMenu>`

Context-sensitive bubble menu for text selection.

```tsx
interface BubbleMenuConfig {
  enabled?: boolean
  showTextFormatting?: boolean
  showLinkControls?: boolean
  showColorControls?: boolean
  customButtons?: ToolbarButton[]
  placement?: 'top' | 'bottom' | 'auto'
}
```

### Hooks

#### `useEditor`

Main hook for editor functionality.

```tsx
const {
  editor,
  commands,
  state,
  content,
  isEmpty,
  isFocused
} = useEditor(content, config, onChange)
```

#### `useEditorCommands`

Hook for editor commands only.

```tsx
const commands = useEditorCommands(editor)

// Available commands
commands.bold()
commands.italic()
commands.toggleHeading(2)
commands.setTextAlign('center')
commands.addImage('https://example.com/image.jpg')
// ... and many more
```

#### `useEditorState`

Hook for editor state only.

```tsx
const state = useEditorState(editor)

// Check if formatting is active
if (state.isActive.bold) {
  console.log('Bold is active')
}
```

### Extensions

#### Preset Extensions

```tsx
import {
  MinimalExtensions,
  BasicExtensions,
  RichTextExtensions,
  FullFeaturedExtensions
} from 'react-richtext-tiptap'

// Use a preset
<Editor
  config={{
    extensions: FullFeaturedExtensions
  }}
/>
```

#### Custom Extensions

```tsx
import {
  createExtensionSet,
  mergeExtensions,
  overrideExtensions
} from 'react-richtext-tiptap'

// Create custom extension set
const customExtensions = mergeExtensions(
  BasicExtensions,
  [MyCustomExtension]
)

// Override specific extensions
const modifiedExtensions = overrideExtensions(
  FullFeaturedExtensions,
  {
    'heading': Heading.configure({ levels: [1, 2, 3] }),
    'link': Link.configure({ openOnClick: true })
  }
)
```

### Utilities

#### Image Handling

```tsx
import {
  insertDraggableImage,
  updateImageAlignment,
  handleImageDrop
} from 'react-richtext-tiptap'

// Insert image programmatically
insertDraggableImage(editor, 'https://example.com/image.jpg', {
  alt: 'My image',
  alignment: 'center',
  width: 400,
  height: 300
})

// Handle drag and drop
await handleImageDrop(editor, files, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png'],
  onUpload: uploadFunction
})
```

#### Content Management

```tsx
import {
  exportToHTML,
  exportToText,
  exportToJSON,
  setContent,
  clearContent
} from 'react-richtext-tiptap'

// Export content
const html = exportToHTML(editor)
const text = exportToText(editor)
const json = exportToJSON(editor)

// Manage content
setContent(editor, '<p>New content</p>')
clearContent(editor)
```

## 🎨 Theming

### CSS Custom Properties

The editor uses CSS custom properties for theming:

```css
:root {
  --editor-background: #ffffff;
  --editor-foreground: #0f172a;
  --editor-primary: #3b82f6;
  --editor-secondary: #8b5cf6;
  --editor-muted: #f8fafc;
  --editor-border: #e2e8f0;
  --editor-radius: 0.5rem;
}
```

### Theme Object

```tsx
const customTheme: EditorTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f8fafc',
    border: '#e2e8f0',
  },
  borderRadius: '0.5rem',
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
}

<Editor theme={customTheme} />
```

## 🔧 Advanced Usage

### Custom Toolbar Button

```tsx
import { Bold } from 'lucide-react'

const customButton: ToolbarButton = {
  name: 'custom-action',
  icon: <Bold />,
  tooltip: 'Custom Action',
  action: (editor) => {
    // Your custom logic
    editor.chain().focus().toggleBold().run()
  },
  isActive: (editor) => editor.isActive('bold'),
  isDisabled: (editor) => !editor.can().toggleBold(),
}

<Editor
  toolbar={{
    customButtons: [customButton]
  }}
/>
```

### Custom Extension

```tsx
import { Extension } from '@tiptap/core'

const CustomExtension = Extension.create({
  name: 'customExtension',
  
  addCommands() {
    return {
      customCommand: () => ({ commands }) => {
        // Your custom command logic
        return true
      },
    }
  },
})

<Editor
  config={{
    extensions: mergeExtensions(BasicExtensions, [CustomExtension])
  }}
/>
```

### Image Upload with Progress

```tsx
const uploadWithProgress = async (file: File) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const xhr = new XMLHttpRequest()
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100
        console.log(`Upload progress: ${progress}%`)
      }
    }
    
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        resolve(response.url)
      } else {
        reject(new Error('Upload failed'))
      }
    }
    
    xhr.onerror = () => reject(new Error('Upload failed'))
    
    xhr.open('POST', '/api/upload')
    xhr.send(formData)
  })
}
```

## 🧪 Testing

### Built-in Test Suite

The library includes a comprehensive test suite. Run tests with:

```bash
npm test
```

### Feature Testing Component

Import the built-in feature testing component:

```tsx
import { FeatureTest } from 'react-richtext-tiptap/testing'

function TestPage() {
  return <FeatureTest />
}
```

## 📦 Bundle Size

The library is optimized for tree-shaking. Import only what you need:

```tsx
// Import everything (not recommended for production)
import * from 'react-richtext-tiptap'

// Import only specific components (recommended)
import { Editor, Toolbar, useEditor } from 'react-richtext-tiptap'

// Import specific extensions
import { 
  BasicExtensions, 
  insertDraggableImage 
} from 'react-richtext-tiptap'
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/react-richtext-tiptap.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build library
npm run build
```

## 📄 License

MIT © [React TipTap Team](https://github.com/your-org/react-richtext-tiptap)

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev/) - The amazing editor framework this library is built on
- [ProseMirror](https://prosemirror.net/) - The robust editing toolkit powering TipTap
- [Radix UI](https://radix-ui.com/) - Accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library

## 📊 Stats

![npm](https://img.shields.io/npm/v/react-richtext-tiptap)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-richtext-tiptap)
![npm downloads](https://img.shields.io/npm/dm/react-richtext-tiptap)
![GitHub stars](https://img.shields.io/github/stars/your-org/react-richtext-tiptap)
![GitHub license](https://img.shields.io/github/license/your-org/react-richtext-tiptap)