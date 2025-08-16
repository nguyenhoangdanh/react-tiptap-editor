import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

export interface ImageOptions {
  allowBase64: boolean
  HTMLAttributes: Record<string, any>
  inline: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customImage: {
      setImage: (options: { 
        src: string
        alt?: string
        title?: string
        width?: number
        height?: number
        alignment?: 'left' | 'center' | 'right' | 'inline'
      }) => ReturnType
      updateImageAlignment: (alignment: 'left' | 'center' | 'right' | 'inline') => ReturnType
    }
  }
}

export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const CustomImage = Node.create<ImageOptions>({
  name: 'customImage',

  addOptions() {
    return {
      allowBase64: false,
      HTMLAttributes: {},
      inline: false,
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      alignment: {
        default: 'inline',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (dom) => {
          if (typeof dom === 'string') return {}
          const element = dom as HTMLElement
          
          return {
            src: element.getAttribute('src'),
            alt: element.getAttribute('alt'),
            title: element.getAttribute('title'),
            width: element.getAttribute('width') ? parseInt(element.getAttribute('width')!) : null,
            height: element.getAttribute('height') ? parseInt(element.getAttribute('height')!) : null,
            alignment: element.getAttribute('data-alignment') || 'inline',
          }
        },
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
        
      updateImageAlignment:
        (alignment) =>
        ({ commands, state, dispatch }) => {
          const { selection } = state
          const { from } = selection
          
          const node = state.doc.nodeAt(from)
          if (node && node.type.name === this.name) {
            const attrs = { ...node.attrs, alignment }
            return commands.updateAttributes(this.name, attrs)
          }
          
          return false
        },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match
          return { src, alt, title }
        },
      }),
    ]
  },
})
