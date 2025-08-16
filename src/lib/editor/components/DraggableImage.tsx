import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Editor } from '@tiptap/react'
import { cn } from '@/lib/utils'
import {
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
  TrashIcon,
  Bars3BottomLeftIcon,
  RectangleStackIcon,
  Bars3BottomRightIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface DraggableImageProps {
  id: string
  src: string
  alt?: string
  width?: number
  height?: number
  alignment?: 'left' | 'center' | 'right' | 'inline'
  editor?: Editor | null
  className?: string
  onAlignmentChange?: (alignment: 'left' | 'center' | 'right' | 'inline') => void
  onDelete?: () => void
  onReset?: () => void
  allowResize?: boolean
  allowDelete?: boolean
  showControls?: boolean
}

interface ResizeHandle {
  position: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'
  cursor: string
}

const RESIZE_HANDLES: ResizeHandle[] = [
  { position: 'nw', cursor: 'nw-resize' },
  { position: 'ne', cursor: 'ne-resize' },
  { position: 'sw', cursor: 'sw-resize' },
  { position: 'se', cursor: 'se-resize' },
  { position: 'n', cursor: 'n-resize' },
  { position: 's', cursor: 's-resize' },
  { position: 'e', cursor: 'e-resize' },
  { position: 'w', cursor: 'w-resize' },
]

export const DraggableImage: React.FC<DraggableImageProps> = ({
  id,
  src,
  alt,
  width: initialWidth,
  height: initialHeight,
  alignment = 'inline',
  editor,
  className,
  onAlignmentChange,
  onDelete,
  onReset,
  allowResize = true,
  allowDelete = true,
  showControls = true,
}) => {
  const [dimensions, setDimensions] = useState({
    width: initialWidth || 'auto',
    height: initialHeight || 'auto',
  })
  const [isResizing, setIsResizing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [originalDimensions, setOriginalDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)
  const resizeStartPos = useRef<{ x: number; y: number } | null>(null)
  const resizeStartDimensions = useRef<{ width: number; height: number } | null>(null)

  // Setup draggable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
    data: {
      type: 'image',
      src,
      alt,
      width: dimensions.width,
      height: dimensions.height,
      alignment,
    },
  })

  const dragTransform = CSS.Translate.toString(transform)

  // Load original image dimensions
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setOriginalDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })

      // Set initial dimensions if not provided
      if (!initialWidth && !initialHeight) {
        const maxWidth = 600
        const aspectRatio = img.naturalWidth / img.naturalHeight
        const calculatedWidth = Math.min(img.naturalWidth, maxWidth)
        const calculatedHeight = calculatedWidth / aspectRatio

        setDimensions({
          width: calculatedWidth,
          height: calculatedHeight,
        })
      }
    }
    img.src = src
  }, [src, initialWidth, initialHeight])

  // Handle alignment change
  const handleAlignmentChange = useCallback((newAlignment: 'left' | 'center' | 'right' | 'inline') => {
    onAlignmentChange?.(newAlignment)

    if (editor) {
      // Update in editor
      editor.commands.updateImageAlignment(newAlignment)
    }
  }, [editor, onAlignmentChange])

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: ResizeHandle) => {
    e.preventDefault()
    e.stopPropagation()

    setIsResizing(true)
    resizeStartPos.current = { x: e.clientX, y: e.clientY }
    resizeStartDimensions.current = {
      width: typeof dimensions.width === 'number' ? dimensions.width : imageRef.current?.offsetWidth || 0,
      height: typeof dimensions.height === 'number' ? dimensions.height : imageRef.current?.offsetHeight || 0,
    }

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeStartPos.current || !resizeStartDimensions.current || !originalDimensions) return

      const deltaX = moveEvent.clientX - resizeStartPos.current.x
      const deltaY = moveEvent.clientY - resizeStartPos.current.y

      let newWidth = resizeStartDimensions.current.width
      let newHeight = resizeStartDimensions.current.height

      const aspectRatio = originalDimensions.width / originalDimensions.height

      // Calculate new dimensions based on handle position
      switch (handle.position) {
        case 'se':
        case 'e':
          newWidth = Math.max(50, resizeStartDimensions.current.width + deltaX)
          newHeight = newWidth / aspectRatio
          break
        case 'sw':
        case 'w':
          newWidth = Math.max(50, resizeStartDimensions.current.width - deltaX)
          newHeight = newWidth / aspectRatio
          break
        case 'ne':
        case 'n':
          newHeight = Math.max(50, resizeStartDimensions.current.height - deltaY)
          newWidth = newHeight * aspectRatio
          break
        case 'nw':
          const widthFromX = Math.max(50, resizeStartDimensions.current.width - deltaX)
          const heightFromY = Math.max(50, resizeStartDimensions.current.height - deltaY)
          // Use the smaller dimension to maintain aspect ratio
          if (widthFromX / aspectRatio < heightFromY) {
            newWidth = widthFromX
            newHeight = newWidth / aspectRatio
          } else {
            newHeight = heightFromY
            newWidth = newHeight * aspectRatio
          }
          break
        case 's':
          newHeight = Math.max(50, resizeStartDimensions.current.height + deltaY)
          newWidth = newHeight * aspectRatio
          break
      }

      // Apply max dimensions
      const maxWidth = 800
      const maxHeight = 600

      if (newWidth > maxWidth) {
        newWidth = maxWidth
        newHeight = newWidth / aspectRatio
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight
        newWidth = newHeight * aspectRatio
      }

      setDimensions({
        width: Math.round(newWidth),
        height: Math.round(newHeight),
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      resizeStartPos.current = null
      resizeStartDimensions.current = null
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [dimensions, originalDimensions])

  // Reset to original dimensions
  const handleReset = useCallback(() => {
    if (originalDimensions) {
      const maxWidth = 600
      const aspectRatio = originalDimensions.width / originalDimensions.height
      const calculatedWidth = Math.min(originalDimensions.width, maxWidth)
      const calculatedHeight = calculatedWidth / aspectRatio

      setDimensions({
        width: calculatedWidth,
        height: calculatedHeight,
      })
    }
    onReset?.()
  }, [originalDimensions, onReset])

  // Get alignment classes
  const getAlignmentClasses = () => {
    switch (alignment) {
      case 'left':
        return 'float-left mr-4 mb-2'
      case 'right':
        return 'float-right ml-4 mb-2'
      case 'center':
        return 'block mx-auto my-4'
      case 'inline':
      default:
        return 'inline-block'
    }
  }

  // Get alignment icon
  const getAlignmentIcon = () => {
    switch (alignment) {
      case 'left':
        return <Bars3BottomLeftIcon className="w-3.5 h-3.5" />
      case 'center':
        return <RectangleStackIcon className="w-3.5 h-3.5" />
      case 'right':
        return <Bars3BottomRightIcon className="w-3.5 h-3.5" />
      case 'inline':
      default:
        return <Square3Stack3DIcon className="w-3.5 h-3.5" />
    }
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'image-wrapper relative',
        getAlignmentClasses(),
        isDragging && 'opacity-50',
        isResizing && 'select-none',
        className
      )}
      style={{
        transform: dragTransform,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-draggable-id={id}
    >
      {/* Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={typeof dimensions.width === 'number' ? dimensions.width : undefined}
        height={typeof dimensions.height === 'number' ? dimensions.height : undefined}
        className={cn(
          'draggable-image block',
          isResizing ? 'pointer-events-none' : 'pointer-events-auto'
        )}
        style={{
          width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width,
          height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : dimensions.height,
        }}
        draggable={false}
      />

      {/* Resize handles */}
      {allowResize && showControls && (isHovered || isResizing) && (
        <>
          {RESIZE_HANDLES.map((handle) => (
            <div
              key={handle.position}
              className={cn(
                'absolute w-3 h-3 bg-primary border border-white rounded-full cursor-pointer hover:scale-110 transition-transform',
                {
                  'top-0 left-0 -translate-x-1/2 -translate-y-1/2': handle.position === 'nw',
                  'top-0 right-0 translate-x-1/2 -translate-y-1/2': handle.position === 'ne',
                  'bottom-0 left-0 -translate-x-1/2 translate-y-1/2': handle.position === 'sw',
                  'bottom-0 right-0 translate-x-1/2 translate-y-1/2': handle.position === 'se',
                  'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2': handle.position === 'n',
                  'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2': handle.position === 's',
                  'top-1/2 right-0 translate-x-1/2 -translate-y-1/2': handle.position === 'e',
                  'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2': handle.position === 'w',
                }
              )}
              style={{ cursor: handle.cursor }}
              onMouseDown={(e) => handleResizeStart(e, handle)}
            />
          ))}
        </>
      )}

      {/* Control toolbar */}
      {showControls && (isHovered || isDragging) && (
        <div className={cn(
          "absolute top-2 left-2 bg-white shadow-lg rounded-md p-1 flex items-center gap-1 z-10 transition-opacity",
          (isHovered || isDragging) ? "opacity-100" : "opacity-0"
        )}>
          {/* Drag handle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto cursor-move"
            {...attributes}
            {...listeners}
          >
            <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          </Button>

          <Separator orientation="vertical" className="h-4" />

          {/* Alignment dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                {getAlignmentIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleAlignmentChange('inline')}>
                <Square3Stack3DIcon className="w-3.5 h-3.5 mr-2" />
                Inline
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAlignmentChange('left')}>
                <Bars3BottomLeftIcon className="w-3.5 h-3.5 mr-2" />
                Left
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAlignmentChange('center')}>
                <RectangleStackIcon className="w-3.5 h-3.5 mr-2" />
                Center
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAlignmentChange('right')}>
                <Bars3BottomRightIcon className="w-3.5 h-3.5 mr-2" />
                Right
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset button */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={handleReset}
            title="Reset to original size"
          >
            <ArrowUturnLeftIcon className="w-3.5 h-3.5" />
          </Button>

          {/* Delete button */}
          {allowDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto text-destructive hover:text-destructive"
              onClick={onDelete}
              title="Delete image"
            >
              <TrashIcon className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}