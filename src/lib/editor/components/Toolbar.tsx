import { useState, useEffect } from 'react'
import { Editor } from '@tiptap/react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Highlighter,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Code2,
  Table,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Undo,
  Redo,
  Minus,
  Type,
} from 'lucide-react'
import { ToolbarConfig, ToolbarButton } from '../types'
import { DEFAULT_TEXT_COLORS, DEFAULT_HIGHLIGHT_COLORS } from '../utils'
import { cn } from '@/lib/utils'

interface ToolbarProps {
  editor: Editor | null
  config?: ToolbarConfig
  className?: string
}

export const Toolbar = ({ editor, config = {}, className }: ToolbarProps) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)

  // Track selection changes to update button states
  const [, setSelectionUpdate] = useState(0)

  useEffect(() => {
    if (!editor) return

    const updateSelection = () => {
      setSelectionUpdate(prev => prev + 1)
    }

    // Listen to all relevant events that could change button states
    editor.on('selectionUpdate', updateSelection)
    editor.on('transaction', updateSelection)
    editor.on('update', updateSelection)
    editor.on('focus', updateSelection)

    return () => {
      editor.off('selectionUpdate', updateSelection)
      editor.off('transaction', updateSelection)
      editor.off('update', updateSelection)
      editor.off('focus', updateSelection)
    }
  }, [editor])

  // Force re-render when editor state changes
  const isActive = (name: string, attributes?: Record<string, any>) => {
    return editor?.isActive(name, attributes) || false
  }

  const canExecute = (command: string) => {
    if (!editor?.can) return false
    const chainCommands = editor.can()
    return typeof (chainCommands as any)[command] === 'function' ? (chainCommands as any)[command]() : false
  }

  if (!editor) return null

  const defaultConfig: ToolbarConfig = {
    showBold: true,
    showItalic: true,
    showUnderline: true,
    showStrike: true,
    showCode: true,
    showHighlight: true,
    showLink: true,
    showImage: true,
    showHeadings: true,
    showLists: true,
    showQuote: true,
    showCodeBlock: true,
    showTable: true,
    showTextAlign: true,
    showTextColor: true,
    showDivider: true,
    ...config,
  }

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

  const handleAddImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setIsImagePopoverOpen(false)
    }
  }

  const ToolbarButton = ({
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
      onMouseDown={(e) => {
        e.preventDefault() // Prevent focus loss from editor
      }}
      onClick={onClick}
      disabled={disabled}
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-primary text-primary-foreground shadow-sm"
      )}
      title={tooltip}
    >
      {children}
    </Button>
  )

  const getCurrentTextAlign = () => {
    if (!editor) return 'left'
    if (editor.isActive({ textAlign: 'center' })) return 'center'
    if (editor.isActive({ textAlign: 'right' })) return 'right'
    if (editor.isActive({ textAlign: 'justify' })) return 'justify'
    return 'left'
  }

  // Get current heading level for display
  const getCurrentHeadingLevel = () => {
    if (isActive('heading', { level: 1 })) return 'h1'
    if (isActive('heading', { level: 2 })) return 'h2'
    if (isActive('heading', { level: 3 })) return 'h3'
    if (isActive('heading', { level: 4 })) return 'h4'
    if (isActive('heading', { level: 5 })) return 'h5'
    if (isActive('heading', { level: 6 })) return 'h6'
    return 'paragraph'
  }

  const getCurrentHeadingDisplay = () => {
    const level = getCurrentHeadingLevel()
    if (level === 'paragraph') return 'Paragraph'
    return level.toUpperCase()
  }

  return (
    <div className={cn(
      "flex flex-wrap items-center gap-1 p-2 border-b border-border bg-background",
      className
    )}>
      {/* Text Formatting */}
      {defaultConfig.showBold && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={isActive('bold')}
          tooltip="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showItalic && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={isActive('italic')}
          tooltip="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showUnderline && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={isActive('underline')}
          tooltip="Underline (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showStrike && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={isActive('strike')}
          tooltip="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showCode && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={isActive('code')}
          tooltip="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* Headings */}
      {defaultConfig.showHeadings && (
        <Select
          value={getCurrentHeadingLevel()}
          onValueChange={(value) => {
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run()
            } else {
              const level = parseInt(value.substring(1)) as 1 | 2 | 3 | 4 | 5 | 6
              editor.chain().focus().setHeading({ level }).run()
            }
          }}
        >
          <SelectTrigger className="w-32 h-8">
            <SelectValue>
              {getCurrentHeadingDisplay()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Paragraph</span>
              </div>
            </SelectItem>
            <SelectItem value="h1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">H1</span>
                <span>Heading 1</span>
              </div>
            </SelectItem>
            <SelectItem value="h2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base">H2</span>
                <span>Heading 2</span>
              </div>
            </SelectItem>
            <SelectItem value="h3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">H3</span>
                <span>Heading 3</span>
              </div>
            </SelectItem>
            <SelectItem value="h4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">H4</span>
                <span>Heading 4</span>
              </div>
            </SelectItem>
            <SelectItem value="h5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">H5</span>
                <span>Heading 5</span>
              </div>
            </SelectItem>
            <SelectItem value="h6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">H6</span>
                <span>Heading 6</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      )}

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* Lists */}
      {defaultConfig.showLists && (
        <>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={isActive('bulletList')}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={isActive('orderedList')}
            tooltip="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
        </>
      )}

      {defaultConfig.showQuote && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={isActive('blockquote')}
          tooltip="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showCodeBlock && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={isActive('codeBlock')}
          tooltip="Code Block"
        >
          <Code2 className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* Text Alignment */}
      {defaultConfig.showTextAlign && (
        <>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={getCurrentTextAlign() === 'left'}
            tooltip="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={getCurrentTextAlign() === 'center'}
            tooltip="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={getCurrentTextAlign() === 'right'}
            tooltip="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={getCurrentTextAlign() === 'justify'}
            tooltip="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>
        </>
      )}

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* Text Color */}
      {defaultConfig.showTextColor && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Text Color">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Text Color</p>
                <div className="grid grid-cols-6 gap-1">
                  {DEFAULT_TEXT_COLORS.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        editor.chain().focus().setColor(color).run()
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Highlight */}
      {defaultConfig.showHighlight && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={isActive('highlight') ? "default" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              title="Highlight"
            >
              <Highlighter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Highlight Color</p>
                <div className="grid grid-cols-4 gap-1">
                  {DEFAULT_HIGHLIGHT_COLORS.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        editor.chain().focus().toggleHighlight({ color }).run()
                      }}
                      title={color}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => editor.chain().focus().unsetHighlight().run()}
                >
                  Remove Highlight
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* Link */}
      {defaultConfig.showLink && (
        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={isActive('link') ? "default" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              title="Link"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">URL</label>
                <Input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddLink()
                    }
                  }}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddLink} disabled={!linkUrl}>
                  Add Link
                </Button>
                {isActive('link') && (
                  <Button size="sm" variant="destructive" onClick={handleRemoveLink}>
                    Remove Link
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Image */}
      {defaultConfig.showImage && (
        <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Image">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3">
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
      )}

      {/* Table */}
      {defaultConfig.showTable && (
        <ToolbarButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          tooltip="Insert Table"
        >
          <Table className="h-4 w-4" />
        </ToolbarButton>
      )}

      {/* Horizontal Rule */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        tooltip="Horizontal Rule"
      >
        <Minus className="h-4 w-4" />
      </ToolbarButton>

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* History */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!canExecute('undo')}
        tooltip="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!canExecute('redo')}
        tooltip="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>

      {/* Custom Buttons */}
      {defaultConfig.customButtons?.map((button, index) => (
        <div key={index}>
          {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}
          <ToolbarButton
            onClick={() => button.action(editor)}
            isActive={button.isActive?.(editor)}
            disabled={button.isDisabled?.(editor)}
            tooltip={button.tooltip}
          >
            {button.icon}
          </ToolbarButton>
        </div>
      ))}
    </div>
  )
}

export default Toolbar
