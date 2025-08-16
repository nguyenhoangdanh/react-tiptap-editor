import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Image } from '@tiptap/extension-image'
import ResizeImage from 'tiptap-extension-resize-image'

export interface DraggableImageOptions {
  allowBase64?: boolean
  HTMLAttributes?: Record<string, any>
  allowDrag?: boolean
  textWrapMode?: 'css' | 'custom'
  alignmentOptions?: ('left' | 'center' | 'right' | 'inline')[]
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minHeight?: number
  maintainAspectRatio?: boolean
  dragHandleClass?: string
  resizeHandleClass?: string
}

export interface ImageAttributes {
  src: string
  alt?: string
  width?: number
  height?: number
  'data-alignment'?: 'left' | 'center' | 'right' | 'inline'
  'data-draggable-id'?: string
}

// Plugin to add drag handles to images
const DragHandlePlugin = new PluginKey('dragHandle')

const createDragHandlePlugin = (options: DraggableImageOptions) => {
  return new Plugin({
    key: DragHandlePlugin,
    props: {
      decorations(state) {
        const decorations: Decoration[] = []
        
        state.doc.descendants((node, pos) => {
          if (node.type.name === 'image') {
            const decoration = Decoration.widget(pos, () => {
              const dragHandle = document.createElement('div')
              dragHandle.className = options.dragHandleClass || 'image-drag-handle'
              dragHandle.contentEditable = 'false'
              dragHandle.innerHTML = `
                <div class="absolute top-2 left-2 bg-white shadow-md rounded p-1 cursor-move opacity-0 hover:opacity-100 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                  </svg>
                </div>
              `
              return dragHandle
            })
            decorations.push(decoration)
          }
        })
        
        return DecorationSet.create(state.doc, decorations)
      }
    }
  })
}

// Enhanced Image extension with drag-and-drop capabilities
export const DraggableImage = Image.extend<DraggableImageOptions>({
  name: 'draggableImage',
  
  addOptions() {
    return {
      ...this.parent?.(),
      allowDrag: true,
      textWrapMode: 'css',
      alignmentOptions: ['left', 'center', 'right', 'inline'],
      maintainAspectRatio: true,
      dragHandleClass: 'image-drag-handle',
      resizeHandleClass: 'image-resize-handle',
      maxWidth: 800,
      maxHeight: 600,
      minWidth: 50,
      minHeight: 50,
    }
  },
  
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-alignment': {
        default: 'inline',
        parseHTML: element => element.getAttribute('data-alignment'),
        renderHTML: attributes => {
          if (!attributes['data-alignment']) return {}
          return { 'data-alignment': attributes['data-alignment'] }
        },
      },
      'data-draggable-id': {
        default: null,
        parseHTML: element => element.getAttribute('data-draggable-id'),
        renderHTML: attributes => {
          if (!attributes['data-draggable-id']) return {}
          return { 'data-draggable-id': attributes['data-draggable-id'] }
        },
      },
      draggable: {
        default: true,
        parseHTML: () => true,
        renderHTML: () => ({ draggable: true }),
      },
    }
  },
  
  addProseMirrorPlugins() {
    return [
      ...this.parent?.() || [],
      createDragHandlePlugin(this.options),
    ]
  },
  
  renderHTML({ node, HTMLAttributes }) {
    const alignment = node.attrs['data-alignment'] || 'inline'
    const draggableId = node.attrs['data-draggable-id'] || `image-${Date.now()}`
    
    // Apply CSS classes based on alignment
    let alignmentClass = ''
    switch (alignment) {
      case 'left':
        alignmentClass = 'float-left mr-4 mb-2'
        break
      case 'right':
        alignmentClass = 'float-right ml-4 mb-2'
        break
      case 'center':
        alignmentClass = 'block mx-auto my-4'
        break
      case 'inline':
      default:
        alignmentClass = 'inline-block'
        break
    }
    
    return [
      'div',
      {
        class: `image-wrapper relative ${alignmentClass}`,
        'data-draggable-id': draggableId,
      },
      [
        'img',
        {
          ...HTMLAttributes,
          class: `${HTMLAttributes.class || ''} draggable-image`,
          'data-alignment': alignment,
          'data-draggable-id': draggableId,
        },
      ],
    ]
  },
})

// Enhanced ResizeImage extension with better integration
export const EnhancedResizeImage = ResizeImage.extend({
  name: 'enhancedResizeImage',
  
  addOptions() {
    return {
      ...this.parent?.(),
      useFigure: true,
      allowResize: true,
    }
  },
})

// Command to insert draggable image
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    draggableImage: {
      insertDraggableImage: (options: {
        src: string
        alt?: string
        width?: number
        height?: number
        alignment?: 'left' | 'center' | 'right' | 'inline'
      }) => ReturnType
      updateImageAlignment: (alignment: 'left' | 'center' | 'right' | 'inline') => ReturnType
    }
  }
}

// Extension to add draggable image commands
export const DraggableImageCommands = Extension.create({
  name: 'draggableImageCommands',
  
  addCommands() {
    return {
      insertDraggableImage: (options) => ({ commands }) => {
        const draggableId = `image-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        
        return commands.insertContent({
          type: 'draggableImage',
          attrs: {
            src: options.src,
            alt: options.alt || '',
            width: options.width,
            height: options.height,
            'data-alignment': options.alignment || 'inline',
            'data-draggable-id': draggableId,
          },
        })
      },
      
      updateImageAlignment: (alignment) => ({ state, dispatch }) => {
        const { selection } = state
        const node = state.doc.nodeAt(selection.from)
        
        if (node && node.type.name === 'draggableImage') {
          if (dispatch) {
            const tr = state.tr.setNodeMarkup(selection.from, null, {
              ...node.attrs,
              'data-alignment': alignment,
            })
            dispatch(tr)
          }
          return true
        }
        
        return false
      },
    }
  },
})

// Complete draggable image extension set
export const createDraggableImageExtensions = (options: DraggableImageOptions = {}) => [
  DraggableImage.configure(options),
  EnhancedResizeImage,
  DraggableImageCommands,
]