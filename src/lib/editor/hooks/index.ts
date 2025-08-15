import { useCallback, useMemo } from 'react'
import { Editor } from '@tiptap/react'
import { useEditorCore } from '../core'
import { EditorConfig, EditorCommands, EditorState, UseEditorReturn } from '../types'
import {
  isFormatActive,
  toggleFormat,
  setTextAlign,
  getCurrentTextAlign,
  setTextColor,
  getCurrentTextColor,
  setLink,
  unsetLink,
  insertImage,
  insertTable,
  undo,
  redo,
  clearContent,
  setContent,
  getSelection,
  focusEditor,
  blurEditor,
  isEmpty,
  isFocused,
} from '../utils'

// Main hook for editor functionality
export const useEditor = (
  content: string = '',
  config: EditorConfig = {},
  onChange?: (content: string) => void,
  onUpdate?: (editor: Editor) => void,
  onSelectionUpdate?: (editor: Editor) => void,
  onFocus?: (editor: Editor) => void,
  onBlur?: (editor: Editor) => void
): UseEditorReturn => {
  // Create editor instance using core
  const editor = useEditorCore(
    content,
    config,
    onChange,
    onUpdate,
    onSelectionUpdate,
    onFocus,
    onBlur
  )

  // Memoized commands object
  const commands = useMemo((): EditorCommands => ({
    bold: () => toggleFormat(editor, 'bold'),
    italic: () => toggleFormat(editor, 'italic'),
    underline: () => toggleFormat(editor, 'underline'),
    strike: () => toggleFormat(editor, 'strike'),
    code: () => toggleFormat(editor, 'code'),
    highlight: (color?: string) => toggleFormat(editor, 'highlight', color ? { color } : undefined),
    toggleHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => toggleFormat(editor, 'heading', { level }),
    toggleBulletList: () => toggleFormat(editor, 'bulletList'),
    toggleOrderedList: () => toggleFormat(editor, 'orderedList'),
    toggleBlockquote: () => toggleFormat(editor, 'blockquote'),
    toggleCodeBlock: () => toggleFormat(editor, 'codeBlock'),
    setTextAlign: (alignment: 'left' | 'center' | 'right' | 'justify') => setTextAlign(editor, alignment),
    setTextColor: (color: string) => setTextColor(editor, color),
    setLink: (url: string, text?: string) => setLink(editor, url, text),
    unsetLink: () => unsetLink(editor),
    addImage: (src: string, alt?: string, width?: number, height?: number) => 
      insertImage(editor, src, alt, width, height),
    insertTable: (rows?: number, cols?: number) => insertTable(editor, rows, cols),
    addHorizontalRule: () => {
      if (!editor) return false
      try {
        return editor.chain().focus().setHorizontalRule().run()
      } catch {
        return false
      }
    },
    undo: () => undo(editor),
    redo: () => redo(editor),
    focus: () => focusEditor(editor),
    blur: () => blurEditor(editor),
    clearContent: () => clearContent(editor),
    setContent: (content: string) => setContent(editor, content),
  }), [editor])

  // Memoized state object
  const state = useMemo((): EditorState => ({
    isActive: {
      bold: isFormatActive(editor, 'bold'),
      italic: isFormatActive(editor, 'italic'),
      underline: isFormatActive(editor, 'underline'),
      strike: isFormatActive(editor, 'strike'),
      code: isFormatActive(editor, 'code'),
      highlight: isFormatActive(editor, 'highlight'),
      heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => isFormatActive(editor, 'heading', { level }),
      bulletList: isFormatActive(editor, 'bulletList'),
      orderedList: isFormatActive(editor, 'orderedList'),
      blockquote: isFormatActive(editor, 'blockquote'),
      codeBlock: isFormatActive(editor, 'codeBlock'),
      link: isFormatActive(editor, 'link'),
    },
    canUndo: editor?.can().undo() || false,
    canRedo: editor?.can().redo() || false,
    isEmpty: isEmpty(editor),
    isFocused: isFocused(editor),
    selection: getSelection(editor),
    currentTextColor: getCurrentTextColor(editor),
    currentTextAlign: getCurrentTextAlign(editor),
  }), [editor])

  // Get current content
  const currentContent = useMemo(() => {
    return editor?.getHTML() || ''
  }, [editor])

  return {
    editor,
    commands,
    state,
    content: currentContent,
    isEmpty: isEmpty(editor),
    isFocused: isFocused(editor),
  }
}

// Hook for just the commands
export const useEditorCommands = (editor: Editor | null): EditorCommands => {
  return useMemo((): EditorCommands => ({
    bold: () => toggleFormat(editor, 'bold'),
    italic: () => toggleFormat(editor, 'italic'),
    underline: () => toggleFormat(editor, 'underline'),
    strike: () => toggleFormat(editor, 'strike'),
    code: () => toggleFormat(editor, 'code'),
    highlight: (color?: string) => toggleFormat(editor, 'highlight', color ? { color } : undefined),
    toggleHeading: (level: 1 | 2 | 3 | 4 | 5 | 6) => toggleFormat(editor, 'heading', { level }),
    toggleBulletList: () => toggleFormat(editor, 'bulletList'),
    toggleOrderedList: () => toggleFormat(editor, 'orderedList'),
    toggleBlockquote: () => toggleFormat(editor, 'blockquote'),
    toggleCodeBlock: () => toggleFormat(editor, 'codeBlock'),
    setTextAlign: (alignment: 'left' | 'center' | 'right' | 'justify') => setTextAlign(editor, alignment),
    setTextColor: (color: string) => setTextColor(editor, color),
    setLink: (url: string, text?: string) => setLink(editor, url, text),
    unsetLink: () => unsetLink(editor),
    addImage: (src: string, alt?: string, width?: number, height?: number) => 
      insertImage(editor, src, alt, width, height),
    insertTable: (rows?: number, cols?: number) => insertTable(editor, rows, cols),
    addHorizontalRule: () => {
      if (!editor) return false
      try {
        return editor.chain().focus().setHorizontalRule().run()
      } catch {
        return false
      }
    },
    undo: () => undo(editor),
    redo: () => redo(editor),
    focus: () => focusEditor(editor),
    blur: () => blurEditor(editor),
    clearContent: () => clearContent(editor),
    setContent: (content: string) => setContent(editor, content),
  }), [editor])
}

// Hook for just the editor state
export const useEditorState = (editor: Editor | null): EditorState => {
  return useMemo((): EditorState => ({
    isActive: {
      bold: isFormatActive(editor, 'bold'),
      italic: isFormatActive(editor, 'italic'),
      underline: isFormatActive(editor, 'underline'),
      strike: isFormatActive(editor, 'strike'),
      code: isFormatActive(editor, 'code'),
      highlight: isFormatActive(editor, 'highlight'),
      heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => isFormatActive(editor, 'heading', { level }),
      bulletList: isFormatActive(editor, 'bulletList'),
      orderedList: isFormatActive(editor, 'orderedList'),
      blockquote: isFormatActive(editor, 'blockquote'),
      codeBlock: isFormatActive(editor, 'codeBlock'),
      link: isFormatActive(editor, 'link'),
    },
    canUndo: editor?.can().undo() || false,
    canRedo: editor?.can().redo() || false,
    isEmpty: isEmpty(editor),
    isFocused: isFocused(editor),
    selection: getSelection(editor),
    currentTextColor: getCurrentTextColor(editor),
    currentTextAlign: getCurrentTextAlign(editor),
  }), [editor])
}

// Hook for content management
export const useEditorContent = (editor: Editor | null) => {
  const getHTML = useCallback(() => {
    return editor?.getHTML() || ''
  }, [editor])

  const getText = useCallback(() => {
    return editor?.getText() || ''
  }, [editor])

  const getJSON = useCallback(() => {
    return editor?.getJSON() || null
  }, [editor])

  const setHTML = useCallback((html: string) => {
    return setContent(editor, html)
  }, [editor])

  const clear = useCallback(() => {
    return clearContent(editor)
  }, [editor])

  const wordCount = useMemo(() => {
    const text = getText()
    if (!text.trim()) return 0
    return text.trim().split(/\s+/).length
  }, [getText])

  const characterCount = useMemo(() => {
    return getText().length
  }, [getText])

  return {
    getHTML,
    getText,
    getJSON,
    setHTML,
    clear,
    wordCount,
    characterCount,
    isEmpty: isEmpty(editor),
  }
}

// Hook for selection management
export const useEditorSelection = (editor: Editor | null) => {
  const selection = useMemo(() => getSelection(editor), [editor])
  
  const selectAll = useCallback(() => {
    if (!editor) return false
    try {
      return editor.chain().focus().selectAll().run()
    } catch {
      return false
    }
  }, [editor])

  const selectNone = useCallback(() => {
    if (!editor) return false
    try {
      return editor.chain().focus().setTextSelection(0).run()
    } catch {
      return false
    }
  }, [editor])

  return {
    selection,
    selectAll,
    selectNone,
    hasSelection: !selection.empty,
  }
}

// Export all hooks
export {
  useEditorCore,
}
