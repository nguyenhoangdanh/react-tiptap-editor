import { useState } from 'react'
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
      onClick={onClick}
      disabled={disabled}
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-primary text-primary-foreground"
      )}
      title={tooltip}
    >
      {children}
    </Button>
  )

  return (
    <div className={cn(
      "flex flex-wrap items-center gap-1 p-2 border-b border-border bg-background",
      className
    )}>
      {/* Text Formatting */}
      {defaultConfig.showBold && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          tooltip="Bold"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
      )}
      
      {defaultConfig.showItalic && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          tooltip="Italic"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showUnderline && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          tooltip="Underline"
        >
          <Underline className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showStrike && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          tooltip="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showCode && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          tooltip="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showDivider && <Separator orientation="vertical" className="h-6" />}

      {/* Headings */}
      {defaultConfig.showHeadings && (
        <Select
          value={
            editor.isActive('heading', { level: 1 }) ? 'h1' :
            editor.isActive('heading', { level: 2 }) ? 'h2' :
            editor.isActive('heading', { level: 3 }) ? 'h3' :
            editor.isActive('heading', { level: 4 }) ? 'h4' :
            editor.isActive('heading', { level: 5 }) ? 'h5' :
            editor.isActive('heading', { level: 6 }) ? 'h6' :
            'paragraph'
          }
          onValueChange={(value) => {
            if (value === 'paragraph') {
              editor.chain().focus().setParagraph().run()
            } else {
              const level = parseInt(value.substring(1)) as 1 | 2 | 3 | 4 | 5 | 6
              editor.chain().focus().toggleHeading({ level }).run()
            }
          }}
        >
          <SelectTrigger className="w-24 h-8">
            <SelectValue placeholder="Text" />
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
            isActive={editor.isActive('bulletList')}
            tooltip="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
            tooltip="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
        </>
      )}

      {defaultConfig.showQuote && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          tooltip="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
      )}

      {defaultConfig.showCodeBlock && (
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
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
            isActive={editor.isActive({ textAlign: 'left' })}
            tooltip="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            tooltip="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            tooltip="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
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
                      onClick={() => editor.chain().focus().setColor(color).run()}
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
              variant={editor.isActive('highlight') ? "default" : "ghost"} 
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
                      onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
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
              variant={editor.isActive('link') ? "default" : "ghost"} 
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
                {editor.isActive('link') && (
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
        disabled={!editor.can().undo()}
        tooltip="Undo"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        tooltip="Redo"
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
