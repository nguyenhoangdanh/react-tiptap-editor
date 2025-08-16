import { Editor } from '@tiptap/react'

// Color utilities
export const DEFAULT_TEXT_COLORS = [
  '#000000', '#374151', '#6B7280', '#9CA3AF',
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
]

export const DEFAULT_HIGHLIGHT_COLORS = [
  '#FEF3C7', '#FED7D7', '#D1FAE5', '#DBEAFE',
  '#E0E7FF', '#F3E8FF', '#FCE7F3', '#F0FDF4',
]

// Text formatting utilities
export const isFormatActive = (editor: Editor | null, format: string, options?: any): boolean => {
  if (!editor) return false
  
  switch (format) {
    case 'bold':
      return editor.isActive('bold')
    case 'italic':
      return editor.isActive('italic')
    case 'underline':
      return editor.isActive('underline')
    case 'strike':
      return editor.isActive('strike')
    case 'code':
      return editor.isActive('code')
    case 'highlight':
      return editor.isActive('highlight', options)
    case 'heading':
      return editor.isActive('heading', options)
    case 'bulletList':
      return editor.isActive('bulletList')
    case 'orderedList':
      return editor.isActive('orderedList')
    case 'blockquote':
      return editor.isActive('blockquote')
    case 'codeBlock':
      return editor.isActive('codeBlock')
    case 'link':
      return editor.isActive('link')
    case 'textAlign':
      return editor.isActive({ textAlign: options })
    default:
      return false
  }
}

export const toggleFormat = (editor: Editor | null, format: string, options?: any): boolean => {
  if (!editor) return false

  try {
    switch (format) {
      case 'bold':
        return editor.chain().focus().toggleBold().run()
      case 'italic':
        return editor.chain().focus().toggleItalic().run()
      case 'underline':
        return editor.chain().focus().toggleUnderline().run()
      case 'strike':
        return editor.chain().focus().toggleStrike().run()
      case 'code':
        return editor.chain().focus().toggleCode().run()
      case 'highlight':
        return editor.chain().focus().toggleHighlight(options).run()
      case 'heading':
        return editor.chain().focus().toggleHeading(options).run()
      case 'bulletList':
        return editor.chain().focus().toggleBulletList().run()
      case 'orderedList':
        return editor.chain().focus().toggleOrderedList().run()
      case 'blockquote':
        return editor.chain().focus().toggleBlockquote().run()
      case 'codeBlock':
        return editor.chain().focus().toggleCodeBlock().run()
      default:
        return false
    }
  } catch (error) {
    console.warn(`Failed to toggle format: ${format}`, error)
    return false
  }
}

// Text alignment utilities
export const setTextAlign = (editor: Editor | null, alignment: 'left' | 'center' | 'right' | 'justify'): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().setTextAlign(alignment).run()
  } catch (error) {
    console.warn(`Failed to set text alignment: ${alignment}`, error)
    return false
  }
}

export const getCurrentTextAlign = (editor: Editor | null): 'left' | 'center' | 'right' | 'justify' => {
  if (!editor) return 'left'
  
  if (editor.isActive({ textAlign: 'center' })) return 'center'
  if (editor.isActive({ textAlign: 'right' })) return 'right'
  if (editor.isActive({ textAlign: 'justify' })) return 'justify'
  return 'left'
}

// Color utilities
export const setTextColor = (editor: Editor | null, color: string): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().setColor(color).run()
  } catch (error) {
    console.warn(`Failed to set text color: ${color}`, error)
    return false
  }
}

export const getCurrentTextColor = (editor: Editor | null): string | undefined => {
  if (!editor) return undefined
  
  const { color } = editor.getAttributes('textStyle')
  return color
}

// Link utilities
export const setLink = (editor: Editor | null, url: string, text?: string): boolean => {
  if (!editor) return false
  
  try {
    if (text) {
      return editor.chain().focus().insertContent(`<a href="${url}">${text}</a>`).run()
    } else {
      return editor.chain().focus().setLink({ href: url }).run()
    }
  } catch (error) {
    console.warn(`Failed to set link: ${url}`, error)
    return false
  }
}

export const unsetLink = (editor: Editor | null): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().unsetLink().run()
  } catch (error) {
    console.warn('Failed to unset link', error)
    return false
  }
}

// Image utilities
export const insertImage = (
  editor: Editor | null, 
  src: string, 
  alt?: string, 
  width?: number, 
  height?: number,
  alignment: 'left' | 'center' | 'right' | 'inline' = 'inline'
): boolean => {
  if (!editor) return false
  
  try {
    // Use the enhanced draggable image command if available
    if (editor.commands.insertDraggableImage) {
      return editor.commands.insertDraggableImage({
        src,
        alt,
        width,
        height,
        alignment,
      })
    }
    
    // Fallback to regular image
    const attributes: any = { src }
    if (alt) attributes.alt = alt
    if (width) attributes.width = width
    if (height) attributes.height = height
    
    return editor.chain().focus().setImage(attributes).run()
  } catch (error) {
    console.warn(`Failed to insert image: ${src}`, error)
    return false
  }
}

// New utility for drag-and-drop image insertion
export const insertDraggableImage = (
  editor: Editor | null,
  src: string,
  options: {
    alt?: string
    width?: number
    height?: number
    alignment?: 'left' | 'center' | 'right' | 'inline'
  } = {}
): boolean => {
  if (!editor) return false
  
  try {
    return editor.commands.insertDraggableImage({
      src,
      alt: options.alt || '',
      width: options.width,
      height: options.height,
      alignment: options.alignment || 'inline',
    })
  } catch (error) {
    console.warn(`Failed to insert draggable image: ${src}`, error)
    return false
  }
}

// Update image alignment
export const updateImageAlignment = (
  editor: Editor | null,
  alignment: 'left' | 'center' | 'right' | 'inline'
): boolean => {
  if (!editor) return false
  
  try {
    return editor.commands.updateImageAlignment(alignment)
  } catch (error) {
    console.warn(`Failed to update image alignment: ${alignment}`, error)
    return false
  }
}

// Handle file drop for images
export const handleImageDrop = async (
  editor: Editor | null,
  files: FileList | File[],
  options: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
    alignment?: 'left' | 'center' | 'right' | 'inline'
    onUpload?: (file: File) => Promise<string> // Custom upload handler
  } = {}
): Promise<boolean> => {
  if (!editor) return false
  
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    alignment = 'inline',
    onUpload,
  } = options
  
  try {
    const fileArray = Array.from(files)
    
    for (const file of fileArray) {
      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        console.warn(`File type ${file.type} not allowed`)
        continue
      }
      
      // Validate file size
      if (file.size > maxSize) {
        console.warn(`File size ${file.size} exceeds maximum ${maxSize}`)
        continue
      }
      
      let imageSrc: string
      
      if (onUpload) {
        // Use custom upload handler
        imageSrc = await onUpload(file)
      } else {
        // Convert to base64 for local use
        imageSrc = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }
      
      // Insert the image
      insertDraggableImage(editor, imageSrc, {
        alt: file.name,
        alignment,
      })
    }
    
    return true
  } catch (error) {
    console.warn('Failed to handle image drop:', error)
    return false
  }
}

// Table utilities
export const insertTable = (editor: Editor | null, rows: number = 3, cols: number = 3): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
  } catch (error) {
    console.warn(`Failed to insert table: ${rows}x${cols}`, error)
    return false
  }
}

// History utilities
export const undo = (editor: Editor | null): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().undo().run()
  } catch (error) {
    console.warn('Failed to undo', error)
    return false
  }
}

export const redo = (editor: Editor | null): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().redo().run()
  } catch (error) {
    console.warn('Failed to redo', error)
    return false
  }
}

// Content utilities
export const clearContent = (editor: Editor | null): boolean => {
  if (!editor) return false
  
  try {
    return editor.chain().focus().clearContent().run()
  } catch (error) {
    console.warn('Failed to clear content', error)
    return false
  }
}

export const setContent = (editor: Editor | null, content: string): boolean => {
  if (!editor) return false
  
  try {
    editor.commands.setContent(content)
    return true
  } catch (error) {
    console.warn(`Failed to set content`, error)
    return false
  }
}

// Selection utilities
export const getSelection = (editor: Editor | null) => {
  if (!editor) return { from: 0, to: 0, empty: true }
  
  const { from, to, empty } = editor.state.selection
  return { from, to, empty }
}

// Focus utilities
export const focusEditor = (editor: Editor | null): boolean => {
  if (!editor) return false
  
  try {
    editor.commands.focus()
    return true
  } catch (error) {
    console.warn('Failed to focus editor', error)
    return false
  }
}

export const blurEditor = (editor: Editor | null): boolean => {
  if (!editor) return false
  
  try {
    editor.commands.blur()
    return true
  } catch (error) {
    console.warn('Failed to blur editor', error)
    return false
  }
}

// Content validation
export const isEmpty = (editor: Editor | null): boolean => {
  if (!editor) return true
  return editor.isEmpty
}

export const isFocused = (editor: Editor | null): boolean => {
  if (!editor) return false
  return editor.isFocused
}

// Word count utilities
export const getWordCount = (editor: Editor | null): number => {
  if (!editor) return 0
  
  const text = editor.getText()
  if (!text.trim()) return 0
  
  return text.trim().split(/\s+/).length
}

export const getCharacterCount = (editor: Editor | null): number => {
  if (!editor) return 0
  return editor.getText().length
}

// Export utilities for file operations
export const exportToHTML = (editor: Editor | null): string => {
  if (!editor) return ''
  return editor.getHTML()
}

export const exportToText = (editor: Editor | null): string => {
  if (!editor) return ''
  return editor.getText()
}

export const exportToJSON = (editor: Editor | null): any => {
  if (!editor) return null
  return editor.getJSON()
}

// File handling utilities
export const createImageUploadHandler = (
  uploadFunction: (file: File) => Promise<string>
) => {
  return async (files: FileList | File[]) => {
    const promises = Array.from(files).map(uploadFunction)
    return Promise.all(promises)
  }
}

// Image dimension utilities
export const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
    img.onerror = reject
    img.src = src
  })
}

// Calculate responsive image dimensions
export const calculateResponsiveDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number
) => {
  const aspectRatio = originalWidth / originalHeight
  let width = Math.min(originalWidth, maxWidth)
  let height = width / aspectRatio
  
  if (maxHeight && height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height),
  }
}
