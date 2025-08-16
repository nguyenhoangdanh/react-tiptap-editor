import { Editor as TiptapEditor, EditorOptions, Extensions } from '@tiptap/react'
import { ReactNode } from 'react'

export interface EditorConfig extends Partial<EditorOptions> {
  extensions?: Extensions;
  placeholder?: string
  className?: string
  theme?: 'light' | 'dark' | 'auto'
  editable?: boolean
  autofocus?: boolean | 'start' | 'end' | number
}

export interface ToolbarConfig {
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

export interface ToolbarButton {
  name: string
  icon: ReactNode
  tooltip?: string
  action: (editor: TiptapEditor) => void
  isActive?: (editor: TiptapEditor) => boolean
  isDisabled?: (editor: TiptapEditor) => boolean
}

export interface BubbleMenuConfig {
  enabled?: boolean
  showTextFormatting?: boolean
  showLinkControls?: boolean
  showColorControls?: boolean
  customButtons?: ToolbarButton[]
  placement?: 'top' | 'bottom' | 'auto'
}

export interface FloatingMenuConfig {
  enabled?: boolean
  showHeadings?: boolean
  showLists?: boolean
  showMedia?: boolean
  customButtons?: ToolbarButton[]
  placement?: 'left' | 'right' | 'auto'
}

export interface EditorTheme {
  colors?: {
    primary?: string
    secondary?: string
    background?: string
    foreground?: string
    muted?: string
    border?: string
  }
  borderRadius?: string
  spacing?: {
    xs?: string
    sm?: string
    md?: string
    lg?: string
  }
  typography?: {
    fontFamily?: string
    fontSize?: string
    lineHeight?: string
  }
}

export interface EditorProps {
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

export interface EditorCommands {
  bold: () => boolean
  italic: () => boolean
  underline: () => boolean
  strike: () => boolean
  code: () => boolean
  highlight: (color?: string) => boolean
  toggleHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => boolean
  toggleBulletList: () => boolean
  toggleOrderedList: () => boolean
  toggleBlockquote: () => boolean
  toggleCodeBlock: () => boolean
  setTextAlign: (alignment: 'left' | 'center' | 'right' | 'justify') => boolean
  setTextColor: (color: string) => boolean
  setLink: (url: string, text?: string) => boolean
  unsetLink: () => boolean
  addImage: (src: string, alt?: string, width?: number, height?: number) => boolean
  insertTable: (rows?: number, cols?: number) => boolean
  addHorizontalRule: () => boolean
  undo: () => boolean
  redo: () => boolean
  focus: () => boolean
  blur: () => boolean
  clearContent: () => boolean
  setContent: (content: string) => boolean
}

export interface EditorState {
  isActive: {
    bold: boolean
    italic: boolean
    underline: boolean
    strike: boolean
    code: boolean
    highlight: boolean
    heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => boolean
    bulletList: boolean
    orderedList: boolean
    blockquote: boolean
    codeBlock: boolean
    link: boolean
  }
  canUndo: boolean
  canRedo: boolean
  isEmpty: boolean
  isFocused: boolean
  selection: {
    from: number
    to: number
    empty: boolean
  }
  currentTextColor?: string
  currentHighlightColor?: string
  currentTextAlign?: 'left' | 'center' | 'right' | 'justify'
}

export interface UseEditorReturn {
  editor: TiptapEditor | null
  commands: EditorCommands
  state: EditorState
  content: string
  isEmpty: boolean
  isFocused: boolean
}

export * from '@tiptap/react'
