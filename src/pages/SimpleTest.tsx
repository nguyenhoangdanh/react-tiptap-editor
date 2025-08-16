import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SimpleTest() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Simple TipTap Test
          </h1>
          <p className="text-lg text-muted-foreground">
            Testing basic TipTap functionality
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic TipTap Editor</CardTitle>
            <CardDescription>
              Just StarterKit - no custom extensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 min-h-[200px]">
              <EditorContent editor={editor} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}