import { EditorContent } from '@tiptap/react'
import { useEditor } from '../hooks'
import { EditorProps } from '../types'
import { cn } from '@/lib/utils'
import Toolbar from './Toolbar'
import BubbleMenu from './BubbleMenu'
import FloatingMenu from './FloatingMenu'
import { DragAndDropWrapper } from './DragAndDropWrapper'
import { forwardRef, useImperativeHandle, useEffect } from 'react'

// Define the ref interface for the Editor component
export interface EditorRef {
  getHTML: () => string
  getText: () => string
  getJSON: () => any
  setContent: (content: string) => boolean
  focus: () => boolean
  blur: () => boolean
  clearContent: () => boolean
  isEmpty: () => boolean
  isFocused: () => boolean
}

const EditorComponent = forwardRef<EditorRef, EditorProps>(({
  content = '',
  onChange,
  onUpdate,
  onSelectionUpdate,
  onFocus,
  onBlur,
  config = {},
  toolbar = true,
  bubbleMenu = true,
  floatingMenu = true,
  theme,
  className,
  children,
}, ref) => {
  // Use our custom hook
  const { editor, commands, state } = useEditor(
    content,
    config,
    onChange,
    onUpdate,
    onSelectionUpdate,
    onFocus,
    onBlur
  )

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || '',
    getText: () => editor?.getText() || '',
    getJSON: () => editor?.getJSON() || null,
    setContent: (content: string) => commands.setContent(content),
    focus: () => commands.focus(),
    blur: () => commands.blur(),
    clearContent: () => commands.clearContent(),
    isEmpty: () => state.isEmpty,
    isFocused: () => state.isFocused,
  }), [editor, commands, state])

  // Apply theme if provided
  useEffect(() => {
    if (theme && editor) {
      const editorElement = editor.view.dom as HTMLElement
      
      if (theme.colors?.primary) {
        editorElement.style.setProperty('--editor-primary', theme.colors.primary)
      }
      if (theme.colors?.background) {
        editorElement.style.setProperty('--editor-background', theme.colors.background)
      }
      if (theme.colors?.foreground) {
        editorElement.style.setProperty('--editor-foreground', theme.colors.foreground)
      }
      if (theme.borderRadius) {
        editorElement.style.setProperty('--editor-radius', theme.borderRadius)
      }
      if (theme.typography?.fontFamily) {
        editorElement.style.setProperty('--editor-font-family', theme.typography.fontFamily)
      }
    }
  }, [theme, editor])

  const renderToolbar = () => {
    if (toolbar === false) return null
    
    const toolbarConfig = typeof toolbar === 'object' ? toolbar : {}
    return <Toolbar editor={editor} config={toolbarConfig} />
  }

  const renderBubbleMenu = () => {
    if (bubbleMenu === false) return null
    
    const bubbleMenuConfig = typeof bubbleMenu === 'object' ? bubbleMenu : {}
    return <BubbleMenu editor={editor} config={bubbleMenuConfig} />
  }

  const renderFloatingMenu = () => {
    if (floatingMenu === false) return null
    
    const floatingMenuConfig = typeof floatingMenu === 'object' ? floatingMenu : {}
    return <FloatingMenu editor={editor} config={floatingMenuConfig} />
  }

  if (!editor) {
    return (
      <div className={cn(
        "border border-border rounded-lg overflow-hidden",
        className
      )}>
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          Loading editor...
        </div>
      </div>
    )
  }

  return (
    <DragAndDropWrapper
      editor={editor}
      className={cn(
        "border border-border rounded-lg overflow-hidden bg-background",
        className
      )}
    >
      {/* Toolbar */}
      {renderToolbar()}
      
      {/* Editor Content */}
      <div className="relative">
        <EditorContent 
          editor={editor} 
          className={cn(
            "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none",
            "focus-within:outline-none",
            "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px]",
            "[&_.image-wrapper]:relative",
            "[&_.draggable-image]:max-w-full [&_.draggable-image]:h-auto",
            config.className
          )}
        />
        
        {/* Floating Menu */}
        {renderFloatingMenu()}
        
        {/* Bubble Menu */}
        {renderBubbleMenu()}
      </div>
      
      {/* Custom children content */}
      {children}
    </DragAndDropWrapper>
  )
})

EditorComponent.displayName = 'Editor'

export { EditorComponent as Editor }
export default EditorComponent
