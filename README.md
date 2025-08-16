# React TipTap Editor

A comprehensive, fully customizable React editor library built on TipTap with advanced drag-and-drop image functionality, complete TypeScript support, and modern UI components.

![React TipTap Editor Demo](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=React+TipTap+Editor)

## 🚀 Features

- **🎯 Drag & Drop Images** - Upload and position images anywhere in your content with smart text wrapping
- **🔧 Fully Extensible** - Override any extension, component, or behavior without touching library code
- **📝 Rich Text Editing** - Complete formatting tools including tables, lists, code blocks, and more
- **🎨 Customizable UI** - Styled with Tailwind CSS but completely themeable and overridable
- **📱 Responsive Design** - Mobile-first design with touch-friendly controls
- **⚡ Performance Optimized** - Built for fast, smooth editing experiences
- **🔍 TypeScript First** - Complete type safety with comprehensive IntelliSense support
- **🧩 Component Library** - Pre-built UI components that can be used independently

## 📦 Installation

```bash
npm install react-richtext-tiptap
# or
yarn add react-richtext-tiptap
# or
pnpm add react-richtext-tiptap
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react react-dom @tiptap/react @tiptap/starter-kit
```

## 🚀 Quick Start

### Basic Usage

```tsx
import { Editor } from 'react-richtext-tiptap'

function App() {
  const [content, setContent] = useState('<p>Hello world!</p>')

  return (
    <Editor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  )
}
```

### With Custom Extensions

```tsx
import { 
  Editor, 
  createDraggableImageExtensions,
  StarterKit,
  Color,
  TextStyle
} from 'react-richtext-tiptap'

const customExtensions = [
  StarterKit,
  TextStyle,
  Color,
  ...createDraggableImageExtensions({
    allowDrag: true,
    maxWidth: 800,
    textWrapMode: 'css'
  })
]

function CustomEditor() {
  return (
    <Editor
      config={{ extensions: customExtensions }}
      toolbar={{ showImage: true, showTextColor: true }}
    />
  )
}
```

### With Image Upload

```tsx
import { Editor, handleImageDrop } from 'react-richtext-tiptap'

function EditorWithUpload() {
  const uploadImage = async (file: File): Promise<string> => {
    // Upload to your server
    const formData = new FormData()
    formData.append('image', file)
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    
    const { url } = await response.json()
    return url
  }

  const handleDrop = (editor, files) => {
    handleImageDrop(editor, files, {
      onUpload: uploadImage,
      alignment: 'center',
      maxSize: 5 * 1024 * 1024 // 5MB
    })
  }

  return <Editor onImageDrop={handleDrop} />
}
```

## 🎛️ API Reference

### Editor Component

The main editor component with full customization options.

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

### Hooks

#### useEditor

The main hook for editor functionality with commands and state.

```tsx
const { editor, commands, state, content, isEmpty, isFocused } = useEditor(
  initialContent,
  config,
  onChange
)
```

#### useEditorCommands

Access editor commands independently.

```tsx
const commands = useEditorCommands(editor)

// Available commands:
commands.bold()
commands.italic()
commands.addImage('url', 'alt text', 400, 300)
commands.setTextAlign('center')
commands.insertTable(3, 3)
// ... and many more
```

#### useEditorState

Reactive editor state information.

```tsx
const state = useEditorState(editor)

// Available state:
state.isActive.bold
state.canUndo
state.isEmpty
state.selection
// ... and more
```

### Extension Presets

Pre-configured extension sets for different use cases:

```tsx
import {
  MinimalExtensions,    // Basic text formatting only
  BasicExtensions,      // Essential formatting tools
  RichTextExtensions,   // Advanced formatting without tables
  FullFeaturedExtensions // Everything including drag-and-drop images
} from 'react-richtext-tiptap'
```

### Drag-and-Drop Images

#### Creating Draggable Images

```tsx
import { createDraggableImageExtensions } from 'react-richtext-tiptap'

const imageExtensions = createDraggableImageExtensions({
  allowDrag: true,
  textWrapMode: 'css', // or 'custom'
  alignmentOptions: ['left', 'center', 'right', 'inline'],
  maxWidth: 800,
  maxHeight: 600,
  minWidth: 50,
  minHeight: 50,
  maintainAspectRatio: true
})
```

#### Image Upload Handler

```tsx
import { handleImageDrop } from 'react-richtext-tiptap'

await handleImageDrop(editor, files, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  alignment: 'center',
  onUpload: async (file) => {
    // Your upload logic here
    return await uploadToServer(file)
  }
})
```

### Toolbar Configuration

Customize which buttons appear in the toolbar:

```tsx
const toolbarConfig: ToolbarConfig = {
  showBold: true,
  showItalic: true,
  showUnderline: true,
  showStrike: true,
  showCode: true,
  showHighlight: true,
  showLink: true,
  showImage: true,
  showHeadings: true,
  showLists: true,
  showQuote: true,
  showCodeBlock: true,
  showTable: true,
  showTextAlign: true,
  showTextColor: true,
  customButtons: [
    {
      name: 'my-button',
      icon: <MyIcon />,
      tooltip: 'Custom Action',
      action: (editor) => {
        editor.chain().focus().insertContent('Custom!').run()
      }
    }
  ]
}

<Editor toolbar={toolbarConfig} />
```

### Theming

Customize the editor appearance:

```tsx
const customTheme: EditorTheme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    background: '#FFFFFF',
    foreground: '#1F2937',
    muted: '#F9FAFB',
    border: '#E5E7EB'
  },
  borderRadius: '0.5rem',
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    lineHeight: '1.5'
  }
}

<Editor theme={customTheme} />
```

## 🎨 Styling

The editor is styled with Tailwind CSS but designed to be completely customizable:

### CSS Classes

```css
/* Main wrapper */
.dnd-wrapper { /* Drag and drop container */ }

/* Images */
.image-wrapper { /* Image container with drag handles */ }
.draggable-image { /* The actual image element */ }
.image-drag-handle { /* Drag handle overlay */ }
.image-resize-handle { /* Resize corner handles */ }

/* Editor content */
.prose { /* TailwindCSS typography */ }
.editor-link { /* Link styling */ }
```

### Custom CSS

Add your own styles by overriding the CSS classes:

```css
.my-editor .draggable-image {
  border: 2px solid #3B82F6;
  border-radius: 8px;
}

.my-editor .image-drag-handle {
  background: linear-gradient(45deg, #3B82F6, #8B5CF6);
}
```

## 🔧 Advanced Usage

### Custom Extensions

Create your own TipTap extensions and integrate them:

```tsx
import { Extension } from '@tiptap/core'

const MyCustomExtension = Extension.create({
  name: 'myCustomExtension',
  
  addCommands() {
    return {
      myCommand: (options) => ({ commands }) => {
        // Your custom logic here
        return commands.insertContent('Custom content!')
      }
    }
  }
})

const extensions = [
  ...FullFeaturedExtensions,
  MyCustomExtension
]

<Editor config={{ extensions }} />
```

### Custom Components

Replace built-in UI components with your own:

```tsx
import { EditorContent } from '@tiptap/react'
import { useEditor, DragAndDropWrapper } from 'react-richtext-tiptap'

function MyCustomEditor() {
  const { editor } = useEditor()

  return (
    <DragAndDropWrapper editor={editor}>
      <MyCustomToolbar editor={editor} />
      <EditorContent editor={editor} />
      <MyCustomBubbleMenu editor={editor} />
    </DragAndDropWrapper>
  )
}
```

### Handling Events

Listen to editor events for custom behavior:

```tsx
<Editor
  onUpdate={(editor) => {
    console.log('Content updated:', editor.getHTML())
  }}
  onSelectionUpdate={(editor) => {
    console.log('Selection changed:', editor.state.selection)
  }}
  onFocus={(editor) => {
    console.log('Editor focused')
  }}
  onBlur={(editor) => {
    console.log('Editor blurred')
  }}
/>
```

## 📚 Examples

### Minimal Blog Editor

```tsx
import { Editor, BasicExtensions } from 'react-richtext-tiptap'

function BlogEditor({ post, onSave }) {
  return (
    <div className="max-w-4xl mx-auto">
      <input 
        type="text" 
        placeholder="Post title..."
        className="w-full text-2xl font-bold mb-4 p-2"
      />
      <Editor
        content={post.content}
        onChange={(content) => onSave({ ...post, content })}
        config={{ extensions: BasicExtensions }}
        placeholder="Tell your story..."
        className="min-h-[400px]"
      />
    </div>
  )
}
```

### Documentation Editor

```tsx
import { Editor, FullFeaturedExtensions } from 'react-richtext-tiptap'

function DocsEditor() {
  return (
    <Editor
      config={{ 
        extensions: FullFeaturedExtensions,
        placeholder: 'Start writing your documentation...'
      }}
      toolbar={{
        showHeadings: true,
        showTable: true,
        showCodeBlock: true,
        showImage: true,
        customButtons: [
          {
            name: 'callout',
            icon: <InfoIcon />,
            action: (editor) => {
              editor.chain().focus().insertContent(
                '<blockquote><p>💡 Pro tip: This is a callout!</p></blockquote>'
              ).run()
            }
          }
        ]
      }}
    />
  )
}
```

## 🛠️ Development

### Building the Library

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Run development server
npm run dev

# Run tests
npm run test

# Type checking
npm run type-check
```

### Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT © [React TipTap Team](LICENSE)

## 🙋‍♂️ Support

- 📖 [Documentation](https://react-richtext-tiptap.dev)
- 🐛 [Issues](https://github.com/react-richtext-tiptap/issues)
- 💬 [Discussions](https://github.com/react-richtext-tiptap/discussions)
- 📧 [Email Support](mailto:support@react-richtext-tiptap.dev)

## 🔗 Related Projects

- [TipTap](https://tiptap.dev) - The headless editor framework we're built on
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://radix-ui.com) - Low-level UI primitives
- [@dnd-kit](https://dndkit.com) - Drag and drop toolkit

---

<div align="center">
  <strong>Built with ❤️ by the React TipTap Editor team</strong>
</div>