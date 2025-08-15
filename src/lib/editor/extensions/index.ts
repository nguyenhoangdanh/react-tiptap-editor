// Re-export all tiptap extensions for easy access
export { StarterKit } from '@tiptap/starter-kit'
export { Color } from '@tiptap/extension-color'
export { TextStyle } from '@tiptap/extension-text-style'
export { Highlight } from '@tiptap/extension-highlight'
export { TextAlign } from '@tiptap/extension-text-align'
export { FontFamily } from '@tiptap/extension-font-family'
export { Link } from '@tiptap/extension-link'
export { Image } from '@tiptap/extension-image'
export { Table } from '@tiptap/extension-table'
export { TableRow } from '@tiptap/extension-table-row'
export { TableHeader } from '@tiptap/extension-table-header'
export { TableCell } from '@tiptap/extension-table-cell'
export { BulletList } from '@tiptap/extension-bullet-list'
export { OrderedList } from '@tiptap/extension-ordered-list'
export { ListItem } from '@tiptap/extension-list-item'
export { Blockquote } from '@tiptap/extension-blockquote'
export { CodeBlock } from '@tiptap/extension-code-block'
export { HorizontalRule } from '@tiptap/extension-horizontal-rule'
export { Dropcursor } from '@tiptap/extension-dropcursor'
export { Gapcursor } from '@tiptap/extension-gapcursor'
export { History } from '@tiptap/extension-history'

// Export individual extensions from StarterKit for granular control
export {
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Strike,
  Code,
  Heading,
  HardBreak,
} from '@tiptap/starter-kit'

// Custom extension configurations
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

// Extension presets for different use cases
export const MinimalExtensions = [
  StarterKit.configure({
    history: false,
  }),
]

export const BasicExtensions = [
  StarterKit.configure({
    history: {
      depth: 50,
    },
  }),
  TextStyle,
  Color.configure({
    types: ['textStyle'],
  }),
  Link.configure({
    openOnClick: false,
  }),
]

export const RichTextExtensions = [
  StarterKit.configure({
    history: {
      depth: 50,
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
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
  }),
  FontFamily.configure({
    types: ['textStyle'],
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'editor-link',
    },
  }),
  Image.configure({
    HTMLAttributes: {
      class: 'editor-image',
    },
  }),
]

export const FullFeaturedExtensions = [
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

// Utility function to create custom extension sets
export const createExtensionSet = (preset: 'minimal' | 'basic' | 'rich' | 'full' = 'full') => {
  switch (preset) {
    case 'minimal':
      return MinimalExtensions
    case 'basic':
      return BasicExtensions
    case 'rich':
      return RichTextExtensions
    case 'full':
    default:
      return FullFeaturedExtensions
  }
}

// Helper function to merge custom extensions with presets
export const mergeExtensions = (baseExtensions: any[], customExtensions: any[] = []) => {
  return [...baseExtensions, ...customExtensions]
}

// Helper function to override specific extensions in a set
export const overrideExtensions = (
  baseExtensions: any[], 
  overrides: Record<string, any>
) => {
  return baseExtensions.map(ext => {
    const extensionName = ext.name
    if (overrides[extensionName]) {
      return overrides[extensionName]
    }
    return ext
  })
}

// Extension configuration helpers
export const configureStarterKit = (options: any = {}) => {
  return StarterKit.configure({
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
    ...options,
  })
}

export const configureLinkExtension = (options: any = {}) => {
  return Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: 'editor-link',
    },
    validate: href => /^https?:\/\//.test(href),
    ...options,
  })
}

export const configureImageExtension = (options: any = {}) => {
  return Image.configure({
    HTMLAttributes: {
      class: 'editor-image',
    },
    allowBase64: true,
    ...options,
  })
}

export const configureTableExtensions = (options: any = {}) => {
  return [
    Table.configure({
      resizable: true,
      cellMinWidth: 100,
      ...options.table,
    }),
    TableRow.configure(options.tableRow || {}),
    TableHeader.configure(options.tableHeader || {}),
    TableCell.configure(options.tableCell || {}),
  ]
}

export const configureTextStylingExtensions = (options: any = {}) => {
  return [
    TextStyle.configure(options.textStyle || {}),
    Color.configure({
      types: ['textStyle'],
      ...options.color,
    }),
    Highlight.configure({
      multicolor: true,
      ...options.highlight,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left',
      ...options.textAlign,
    }),
    FontFamily.configure({
      types: ['textStyle'],
      ...options.fontFamily,
    }),
  ]
}
