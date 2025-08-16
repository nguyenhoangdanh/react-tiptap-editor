import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react/menus'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { 
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Image as ImageIcon,
  Table,
  Minus,
  Plus,
} from 'lucide-react'
import { FloatingMenuConfig } from '../types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface FloatingMenuProps {
  editor: Editor | null
  config?: FloatingMenuConfig
  className?: string
}

export const FloatingMenu = ({ editor, config = {}, className }: FloatingMenuProps) => {
  const [imageUrl, setImageUrl] = useState('')
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)

  if (!editor) return null

  const defaultConfig: FloatingMenuConfig = {
    enabled: true,
    showHeadings: true,
    showLists: true,
    showMedia: true,
    placement: 'auto',
    ...config,
  }

  if (!defaultConfig.enabled) return null

  const handleAddImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setIsImagePopoverOpen(false)
    }
  }

  const shouldShow = ({ editor, view, state, oldState }: any) => {
    const { selection } = state
    const { $anchor, empty } = selection
    
    // Only show when cursor is at start of empty line
    const isRootDepth = $anchor.depth === 1
    const isEmptyTextBlock = $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
    
    if (!empty || !isRootDepth || !isEmptyTextBlock) {
      return false
    }

    return true
  }

  const FloatingButton = ({ 
    onClick, 
    children, 
    tooltip 
  }: { 
    onClick: () => void
    children: React.ReactNode
    tooltip?: string
  }) => (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 hover:bg-primary hover:text-primary-foreground"
      title={tooltip}
    >
      {children}
    </Button>
  )

  return (
    <TiptapFloatingMenu
      editor={editor}
      shouldShow={shouldShow}
      options={{
        placement: defaultConfig.placement === 'auto' ? 'left' : defaultConfig.placement
      }}
      className={cn(
        "flex flex-col gap-1 p-2 bg-background border border-border rounded-lg shadow-lg backdrop-blur-sm",
        className
      )}
    >
      {/* Plus icon to indicate add content */}
      <div className="flex items-center justify-center mb-1">
        <Plus className="h-3 w-3 text-muted-foreground" />
      </div>

      {/* Headings */}
      {defaultConfig.showHeadings && (
        <>
          <FloatingButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            tooltip="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </FloatingButton>

          <FloatingButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            tooltip="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </FloatingButton>

          <FloatingButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            tooltip="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </FloatingButton>
        </>
      )}

      {/* Lists */}
      {defaultConfig.showLists && (
        <>
          <FloatingButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </FloatingButton>

          <FloatingButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            tooltip="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </FloatingButton>

          <FloatingButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            tooltip="Quote"
          >
            <Quote className="h-4 w-4" />
          </FloatingButton>

          <FloatingButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            tooltip="Code Block"
          >
            <Code2 className="h-4 w-4" />
          </FloatingButton>
        </>
      )}

      {/* Media */}
      {defaultConfig.showMedia && (
        <>
          <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Add Image">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3" side="right">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddImage()
                      }
                    }}
                  />
                </div>
                <Button size="sm" onClick={handleAddImage} disabled={!imageUrl}>
                  Add Image
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <FloatingButton
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            tooltip="Insert Table"
          >
            <Table className="h-4 w-4" />
          </FloatingButton>

          <FloatingButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            tooltip="Horizontal Rule"
          >
            <Minus className="h-4 w-4" />
          </FloatingButton>
        </>
      )}

      {/* Custom Buttons */}
      {defaultConfig.customButtons?.map((button, index) => (
        <FloatingButton
          key={index}
          onClick={() => button.action(editor)}
          tooltip={button.tooltip}
        >
          {button.icon}
        </FloatingButton>
      ))}
    </TiptapFloatingMenu>
  )
}

export default FloatingMenu
