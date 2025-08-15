import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Code, 
  Link as LinkIcon,
  Palette,
  Highlighter,
} from 'lucide-react'
import { BubbleMenuConfig } from '../types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DEFAULT_TEXT_COLORS, DEFAULT_HIGHLIGHT_COLORS } from '../utils'

interface BubbleMenuProps {
  editor: Editor | null
  config?: BubbleMenuConfig
  className?: string
}

export const BubbleMenu = ({ editor, config = {}, className }: BubbleMenuProps) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)

  if (!editor) return null

  const defaultConfig: BubbleMenuConfig = {
    enabled: true,
    showTextFormatting: true,
    showLinkControls: true,
    showColorControls: true,
    placement: 'auto',
    ...config,
  }

  if (!defaultConfig.enabled) return null

  const handleAddLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setIsLinkPopoverOpen(false)
    }
  }

  const handleRemoveLink = () => {
    editor.chain().focus().unsetLink().run()
    setIsLinkPopoverOpen(false)
  }

  const shouldShow = ({ editor, view, state, oldState, from, to }: any) => {
    // Only show when there's a selection
    if (from === to) return false
    
    // Don't show if editor is not editable
    if (!editor.isEditable) return false
    
    // Don't show for image nodes
    const { doc, selection } = state
    const { from: selFrom, to: selTo } = selection
    
    let hasImage = false
    doc.nodesBetween(selFrom, selTo, (node: any) => {
      if (node.type.name === 'image') {
        hasImage = true
        return false
      }
    })
    
    return !hasImage
  }

  const BubbleButton = ({ 
    onClick, 
    isActive, 
    disabled, 
    children, 
    tooltip 
  }: { 
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
    tooltip?: string
  }) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={cn(
        "h-7 w-7 p-0",
        isActive && "bg-primary text-primary-foreground"
      )}
      title={tooltip}
    >
      {children}
    </Button>
  )

  return (
    <TiptapBubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        duration: 100,
        placement: defaultConfig.placement === 'auto' ? 'top' : defaultConfig.placement,
        maxWidth: 'none',
      }}
      className={cn(
        "flex items-center gap-1 p-2 bg-background border border-border rounded-lg shadow-lg backdrop-blur-sm",
        className
      )}
    >
      {/* Text Formatting */}
      {defaultConfig.showTextFormatting && (
        <>
          <BubbleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            tooltip="Bold"
          >
            <Bold className="h-3.5 w-3.5" />
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            tooltip="Italic"
          >
            <Italic className="h-3.5 w-3.5" />
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            tooltip="Underline"
          >
            <Underline className="h-3.5 w-3.5" />
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            tooltip="Strikethrough"
          >
            <Strikethrough className="h-3.5 w-3.5" />
          </BubbleButton>

          <BubbleButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            tooltip="Code"
          >
            <Code className="h-3.5 w-3.5" />
          </BubbleButton>

          <Separator orientation="vertical" className="h-6" />
        </>
      )}

      {/* Color Controls */}
      {defaultConfig.showColorControls && (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" title="Text Color">
                <Palette className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium mb-1">Text Color</p>
                  <div className="grid grid-cols-6 gap-1">
                    {DEFAULT_TEXT_COLORS.slice(0, 12).map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={editor.isActive('highlight') ? "default" : "ghost"} 
                size="sm" 
                className="h-7 w-7 p-0" 
                title="Highlight"
              >
                <Highlighter className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium mb-1">Highlight</p>
                  <div className="grid grid-cols-4 gap-1">
                    {DEFAULT_HIGHLIGHT_COLORS.slice(0, 8).map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                        title={color}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-1 h-6 text-xs"
                    onClick={() => editor.chain().focus().unsetHighlight().run()}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Separator orientation="vertical" className="h-6" />
        </>
      )}

      {/* Link Controls */}
      {defaultConfig.showLinkControls && (
        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant={editor.isActive('link') ? "default" : "ghost"} 
              size="sm" 
              className="h-7 w-7 p-0" 
              title="Link"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-3">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium">URL</label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1 h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddLink()
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddLink} disabled={!linkUrl} className="h-7 text-xs">
                  Add Link
                </Button>
                {editor.isActive('link') && (
                  <Button size="sm" variant="destructive" onClick={handleRemoveLink} className="h-7 text-xs">
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Custom Buttons */}
      {defaultConfig.customButtons?.map((button, index) => (
        <div key={index} className="flex items-center">
          <Separator orientation="vertical" className="h-6" />
          <BubbleButton
            onClick={() => button.action(editor)}
            isActive={button.isActive?.(editor)}
            disabled={button.isDisabled?.(editor)}
            tooltip={button.tooltip}
          >
            {button.icon}
          </BubbleButton>
        </div>
      ))}
    </TiptapBubbleMenu>
  )
}

export default BubbleMenu
