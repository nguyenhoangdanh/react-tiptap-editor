import { useEditor as useTiptapEditor, EditorOptions } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { FontFamily } from '@tiptap/extension-font-family'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { EditorConfig } from '../types'

// Default extensions that can be overridden
export const createDefaultExtensions = (config?: EditorConfig) => [
  StarterKit.configure({
    history: {
      depth: 50,
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
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
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'editor-link',
    },
    validate: href => /^https?:\/\//.test(href),
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'editor-image',
    },
    allowBase64: true,
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
): EditorOptions => {
  const defaultConfig: EditorOptions = {
    extensions: createDefaultExtensions(config),
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
export { StarterKit, Color, TextStyle, Highlight, TextAlign, FontFamily, Link, Image, Table, TableRow, TableHeader, TableCell }
