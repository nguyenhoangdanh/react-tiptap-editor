import { useEditor as useTiptapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { FontFamily } from '@tiptap/extension-font-family'
import { Link } from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { Underline } from '@tiptap/extension-underline'
import { createDraggableImageExtensions } from '../extensions/draggable-image'
import { EditorConfig } from '../types'

// Default extensions that can be overridden
export const createDefaultExtensions = (config?: EditorConfig) => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: 'tiptap-bullet-list',
      },
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
      HTMLAttributes: {
        class: 'tiptap-ordered-list',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'tiptap-list-item',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'tiptap-blockquote',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'tiptap-code-block',
      },
    },
  }),
  TextStyle,
  Color.configure({
    types: ['textStyle'],
  }),
  Highlight.configure({
    multicolor: true,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left',
  }),
  FontFamily.configure({
    types: ['textStyle'],
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'editor-link',
    },
    validate: href => /^https?:\/\//.test(href),
  }),
  // Enhanced draggable image extensions
  ...createDraggableImageExtensions({
    allowDrag: true,
    allowBase64: true,
    textWrapMode: 'css',
    alignmentOptions: ['left', 'center', 'right', 'inline'],
    maintainAspectRatio: true,
    maxWidth: 800,
    maxHeight: 600,
    minWidth: 50,
    minHeight: 50,
  }),
  Table.configure({
    resizable: true,
    cellMinWidth: 100,
  }),
  TableRow,
  TableHeader,
  TableCell,
]

// Core editor configuration
export const createEditorConfig = (
  content: string = '',
  config: EditorConfig = {},
  onChange?: (content: string) => void,
  onUpdate?: (editor: any) => void,
  onSelectionUpdate?: (editor: any) => void,
  onFocus?: (editor: any) => void,
  onBlur?: (editor: any) => void
): EditorConfig => {
  const defaultConfig: EditorConfig = {
    extensions: config.extensions || createDefaultExtensions(config),
    content,
    editable: config.editable !== false,
    autofocus: config.autofocus || false,
    parseOptions: {
      preserveWhitespace: 'full',
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none ${config.className || ''}`,
        'data-placeholder': config.placeholder || 'Start writing...',
      },
      handleDrop: (view, event, slice, moved) => {
        const hasFiles = event.dataTransfer?.files?.length
        if (hasFiles) {
          event.preventDefault()
          return true
        }
        return false
      },
      handlePaste: (view, event, slice) => {
        const hasFiles = event.clipboardData?.files?.length
        if (hasFiles) {
          event.preventDefault()
          return true
        }
        return false
      },
      // Improve click handling to prevent focus issues
      handleClick: (view, pos, event) => {
        return false // Allow default behavior
      },
      handleDoubleClick: (view, pos, event) => {
        return false // Allow default behavior
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
      onUpdate?.(editor)
    },
    onSelectionUpdate: ({ editor }) => {
      onSelectionUpdate?.(editor)
    },
    onFocus: ({ editor }) => {
      onFocus?.(editor)
    },
    onBlur: ({ editor }) => {
      onBlur?.(editor)
    },
  }

  // Merge with user config, allowing complete override
  return {
    ...defaultConfig,
    ...config,
    extensions: config.extensions || defaultConfig.extensions,
    editorProps: {
      ...defaultConfig.editorProps,
      ...config.editorProps,
      attributes: {
        ...defaultConfig.editorProps?.attributes,
        ...config.editorProps?.attributes,
      },
    },
  }
}

// Utility to create editor instance
export const useEditorCore = (
  content: string = '',
  config: EditorConfig = {},
  onChange?: (content: string) => void,
  onUpdate?: (editor: any) => void,
  onSelectionUpdate?: (editor: any) => void,
  onFocus?: (editor: any) => void,
  onBlur?: (editor: any) => void
) => {
  const editorConfig = createEditorConfig(
    content,
    config,
    onChange,
    onUpdate,
    onSelectionUpdate,
    onFocus,
    onBlur
  )

  return useTiptapEditor(editorConfig)
}

export * from '@tiptap/react'
export { StarterKit, Color, TextStyle, Highlight, TextAlign, FontFamily, Link, Table, TableRow, TableHeader, TableCell, Underline }
