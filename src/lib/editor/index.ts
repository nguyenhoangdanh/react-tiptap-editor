// Main Editor component and ref interface
export { Editor, EditorRef } from './components/Editor'
export { default as EditorComponent } from './components/Editor'

// UI Components
export { Toolbar } from './components/Toolbar'
export { BubbleMenu } from './components/BubbleMenu'
export { FloatingMenu } from './components/FloatingMenu'

// Hooks
export {
  useEditor,
  useEditorCommands,
  useEditorState,
  useEditorContent,
  useEditorSelection,
  useEditorCore,
} from './hooks'

// Core functionality
export {
  createDefaultExtensions,
  createEditorConfig,
} from './core'

// Extensions - All tiptap extensions
export {
  // Core extensions
  StarterKit,
  Color,
  TextStyle,
  Highlight,
  TextAlign,
  FontFamily,
  Link,
  Image,
  Table,
  TableRow,
  TableHeader,
  TableCell,
  BulletList,
  OrderedList,
  ListItem,
  Blockquote,
  CodeBlock,
  HorizontalRule,
  Dropcursor,
  Gapcursor,
  History,
  
  // Individual StarterKit extensions
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Strike,
  Code,
  Heading,
  HardBreak,
  
  // Extension presets
  MinimalExtensions,
  BasicExtensions,
  RichTextExtensions,
  FullFeaturedExtensions,
  
  // Extension utilities
  createExtensionSet,
  mergeExtensions,
  overrideExtensions,
  configureStarterKit,
  configureLinkExtension,
  configureImageExtension,
  configureTableExtensions,
  configureTextStylingExtensions,
} from './extensions'

// Utilities
export {
  // Color utilities
  DEFAULT_TEXT_COLORS,
  DEFAULT_HIGHLIGHT_COLORS,
  
  // Text formatting utilities
  isFormatActive,
  toggleFormat,
  setTextAlign,
  getCurrentTextAlign,
  setTextColor,
  getCurrentTextColor,
  
  // Link utilities
  setLink,
  unsetLink,
  
  // Image utilities
  insertImage,
  
  // Table utilities
  insertTable,
  
  // History utilities
  undo,
  redo,
  
  // Content utilities
  clearContent,
  setContent,
  getSelection,
  focusEditor,
  blurEditor,
  isEmpty,
  isFocused,
  getWordCount,
  getCharacterCount,
  exportToHTML,
  exportToText,
  exportToJSON,
} from './utils'

// TypeScript types
export type {
  EditorConfig,
  ToolbarConfig,
  ToolbarButton,
  BubbleMenuConfig,
  FloatingMenuConfig,
  EditorTheme,
  EditorProps,
  EditorCommands,
  EditorState,
  UseEditorReturn,
} from './types'

// Re-export tiptap core types that users might need
export type {
  Editor as TiptapEditor,
  EditorOptions,
  Extension,
  Mark,
  Node,
  Command,
} from '@tiptap/react'

// Default configurations for easy setup
export const defaultToolbarConfig: ToolbarConfig = {
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
  showDivider: true,
}

export const defaultBubbleMenuConfig: BubbleMenuConfig = {
  enabled: true,
  showTextFormatting: true,
  showLinkControls: true,
  showColorControls: true,
  placement: 'auto',
}

export const defaultFloatingMenuConfig: FloatingMenuConfig = {
  enabled: true,
  showHeadings: true,
  showLists: true,
  showMedia: true,
  placement: 'auto',
}

export const defaultEditorConfig: EditorConfig = {
  placeholder: 'Start writing...',
  editable: true,
  autofocus: false,
}

// Theme presets
export const lightTheme: EditorTheme = {
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
    fontFamily: 'system-ui, sans-serif',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
}

export const darkTheme: EditorTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#0f172a',
    foreground: '#f8fafc',
    muted: '#1e293b',
    border: '#334155',
  },
  borderRadius: '0.5rem',
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
}

// Quick setup functions
export const createMinimalEditor = (content?: string, onChange?: (content: string) => void) => {
  return useEditor(content || '', {
    extensions: MinimalExtensions,
  }, onChange)
}

export const createBasicEditor = (content?: string, onChange?: (content: string) => void) => {
  return useEditor(content || '', {
    extensions: BasicExtensions,
  }, onChange)
}

export const createRichTextEditor = (content?: string, onChange?: (content: string) => void) => {
  return useEditor(content || '', {
    extensions: RichTextExtensions,
  }, onChange)
}

export const createFullFeaturedEditor = (content?: string, onChange?: (content: string) => void) => {
  return useEditor(content || '', {
    extensions: FullFeaturedExtensions,
  }, onChange)
}

// Version info (this would typically come from package.json)
export const version = '1.0.0'

// Library info
export const libraryInfo = {
  name: 'react-tiptap-editor',
  version,
  description: 'A fully customizable and extensible React editor built on TipTap',
  author: 'React TipTap Team',
  license: 'MIT',
}
