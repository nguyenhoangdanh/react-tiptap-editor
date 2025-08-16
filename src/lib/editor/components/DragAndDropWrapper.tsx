import React, { ReactNode, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  restrictToParentElement,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers'
import { Editor } from '@tiptap/react'

export interface DragAndDropWrapperProps {
  editor: Editor | null
  children: ReactNode
  onImageDragStart?: (id: string) => void
  onImageDragEnd?: (id: string, newPosition?: { x: number; y: number }) => void
  onImageDragMove?: (id: string, position: { x: number; y: number }) => void
  allowDragOutside?: boolean
  className?: string
}

export interface DraggableImageData {
  id: string
  src: string
  alt?: string
  width?: number
  height?: number
  alignment?: 'left' | 'center' | 'right' | 'inline'
}

interface DragState {
  activeId: UniqueIdentifier | null
  activeImage: DraggableImageData | null
}

export const DragAndDropWrapper: React.FC<DragAndDropWrapperProps> = ({
  editor,
  children,
  onImageDragStart,
  onImageDragEnd,
  onImageDragMove,
  allowDragOutside = false,
  className,
}) => {
  const [dragState, setDragState] = React.useState<DragState>({
    activeId: null,
    activeImage: null,
  })

  // Configure sensors for different input methods
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })
  
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })
  
  const keyboardSensor = useSensor(KeyboardSensor)
  
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  // Extract image data from the editor
  const getImageData = useCallback((id: string): DraggableImageData | null => {
    if (!editor) return null
    
    let imageData: DraggableImageData | null = null
    
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'draggableImage' && node.attrs['data-draggable-id'] === id) {
        imageData = {
          id,
          src: node.attrs.src,
          alt: node.attrs.alt,
          width: node.attrs.width,
          height: node.attrs.height,
          alignment: node.attrs['data-alignment'],
        }
        return false // Stop iteration
      }
    })
    
    return imageData
  }, [editor])

  // Update image position in the editor
  const updateImagePosition = useCallback((id: string, newAlignment: 'left' | 'center' | 'right' | 'inline') => {
    if (!editor) return
    
    // Find the image node and update its alignment
    let nodePos: number | null = null
    
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'draggableImage' && node.attrs['data-draggable-id'] === id) {
        nodePos = pos
        return false
      }
    })
    
    if (nodePos !== null) {
      editor.commands.command(({ tr }) => {
        const node = editor.state.doc.nodeAt(nodePos!)
        if (node) {
          tr.setNodeMarkup(nodePos!, null, {
            ...node.attrs,
            'data-alignment': newAlignment,
          })
          return true
        }
        return false
      })
    }
  }, [editor])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const imageData = getImageData(active.id as string)
    
    setDragState({
      activeId: active.id,
      activeImage: imageData,
    })
    
    onImageDragStart?.(active.id as string)
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { delta } = event
    
    if (dragState.activeId) {
      onImageDragMove?.(dragState.activeId as string, {
        x: delta.x,
        y: delta.y,
      })
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic if needed
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event
    
    if (dragState.activeImage) {
      // Determine new alignment based on drop position
      let newAlignment: 'left' | 'center' | 'right' | 'inline' = 'inline'
      
      // Simple logic to determine alignment based on horizontal position
      if (delta.x < -100) {
        newAlignment = 'left'
      } else if (delta.x > 100) {
        newAlignment = 'right'
      } else if (Math.abs(delta.x) < 50 && Math.abs(delta.y) > 20) {
        newAlignment = 'center'
      }
      
      // Update the image alignment in the editor
      updateImagePosition(active.id as string, newAlignment)
      
      onImageDragEnd?.(active.id as string, {
        x: delta.x,
        y: delta.y,
      })
    }
    
    setDragState({
      activeId: null,
      activeImage: null,
    })
  }

  // Determine modifiers based on allowDragOutside
  const modifiers = allowDragOutside 
    ? [restrictToWindowEdges] 
    : [restrictToParentElement]

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      modifiers={modifiers}
    >
      <div className={`dnd-wrapper relative ${className || ''}`}>
        {children}
      </div>
      
      <DragOverlay>
        {dragState.activeImage ? (
          <DragPreview image={dragState.activeImage} />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

// Drag preview component
const DragPreview: React.FC<{ image: DraggableImageData }> = ({ image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden opacity-90 transform rotate-3">
      <img
        src={image.src}
        alt={image.alt || ''}
        width={image.width ? Math.min(image.width, 200) : 200}
        height={image.height ? Math.min(image.height, 200) : undefined}
        className="object-cover"
        style={{
          maxWidth: '200px',
          maxHeight: '200px',
        }}
      />
      <div className="p-2 text-xs text-gray-600">
        {image.alignment?.toUpperCase() || 'INLINE'}
      </div>
    </div>
  )
}