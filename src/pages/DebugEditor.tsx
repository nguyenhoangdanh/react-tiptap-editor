import React, { useState, useEffect } from 'react'
import { Editor, useEditor, FullFeaturedExtensions } from '@/lib/editor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const EMPTY_CONTENT = '<p></p>'

export default function DebugEditor() {
  const [content, setContent] = useState(EMPTY_CONTENT)
  const { editor } = useEditor(content, { extensions: FullFeaturedExtensions }, setContent)

  // Test functions to verify each feature
  const testBold = () => {
    if (!editor) return
    editor.chain().focus().insertContent('This is bold text. ').toggleBold().insertContent('Bold toggled. ').run()
    toast.info('Bold test executed')
  }

  const testItalic = () => {
    if (!editor) return
    editor.chain().focus().insertContent('This is italic text. ').toggleItalic().insertContent('Italic toggled. ').run()
    toast.info('Italic test executed')
  }

  const testUnderline = () => {
    if (!editor) return
    editor.chain().focus().insertContent('This is underlined text. ').toggleUnderline().insertContent('Underline toggled. ').run()
    toast.info('Underline test executed')
  }

  const testHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    if (!editor) return
    editor.chain().focus().insertContent(`Heading ${level}`).setHeading({ level }).insertContent('\n').run()
    toast.info(`Heading ${level} test executed`)
  }

  const testBulletList = () => {
    if (!editor) return
    editor.chain().focus()
      .insertContent('Regular paragraph\n')
      .toggleBulletList()
      .insertContent('First bullet item\n')
      .insertContent('Second bullet item\n')
      .insertContent('Third bullet item\n')
      .run()
    toast.info('Bullet list test executed')
  }

  const testOrderedList = () => {
    if (!editor) return
    editor.chain().focus()
      .insertContent('Regular paragraph\n')
      .toggleOrderedList()
      .insertContent('First numbered item\n')
      .insertContent('Second numbered item\n')
      .insertContent('Third numbered item\n')
      .run()
    toast.info('Ordered list test executed')
  }

  const testBlockquote = () => {
    if (!editor) return
    editor.chain().focus()
      .insertContent('This will be a blockquote')
      .toggleBlockquote()
      .insertContent('\n')
      .run()
    toast.info('Blockquote test executed')
  }

  const testCodeBlock = () => {
    if (!editor) return
    editor.chain().focus()
      .insertContent('function hello() {\n  console.log("Hello World")\n}')
      .toggleCodeBlock()
      .insertContent('\n')
      .run()
    toast.info('Code block test executed')
  }

  const testTextAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    if (!editor) return
    editor.chain().focus()
      .insertContent(`This text should be aligned ${alignment}`)
      .setTextAlign(alignment)
      .insertContent('\n')
      .run()
    toast.info(`Text align ${alignment} test executed`)
  }

  const testTable = () => {
    if (!editor) return
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
    toast.info('Table test executed')
  }

  const clearEditor = () => {
    if (!editor) return
    editor.chain().focus().clearContent().run()
    setContent(EMPTY_CONTENT)
    toast.info('Editor cleared')
  }

  const checkEditorState = () => {
    if (!editor) return
    
    console.log('Editor state:')
    console.log('- Can toggle bold:', editor.can().toggleBold())
    console.log('- Can toggle italic:', editor.can().toggleItalic())
    console.log('- Can toggle underline:', editor.can().toggleUnderline())
    console.log('- Can set heading:', editor.can().setHeading({ level: 1 }))
    console.log('- Can toggle bullet list:', editor.can().toggleBulletList())
    console.log('- Can toggle ordered list:', editor.can().toggleOrderedList())
    console.log('- Can toggle blockquote:', editor.can().toggleBlockquote())
    console.log('- Can toggle code block:', editor.can().toggleCodeBlock())
    console.log('- Can set text align:', editor.can().setTextAlign('center'))
    console.log('- Can insert table:', editor.can().insertTable())
    
    console.log('Active states:')
    console.log('- Bold active:', editor.isActive('bold'))
    console.log('- Italic active:', editor.isActive('italic'))
    console.log('- Underline active:', editor.isActive('underline'))
    console.log('- Heading active:', editor.isActive('heading'))
    console.log('- Bullet list active:', editor.isActive('bulletList'))
    console.log('- Ordered list active:', editor.isActive('orderedList'))
    console.log('- Blockquote active:', editor.isActive('blockquote'))
    console.log('- Code block active:', editor.isActive('codeBlock'))
    
    console.log('Extensions:', editor.extensionManager.extensions.map(ext => ext.name))
    
    toast.info('Check console for editor state details')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">TipTap Editor Debug Console</h1>
          <p className="text-muted-foreground">
            Testing individual features to identify issues
          </p>
        </div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Basic Formatting</Badge>
              <Button size="sm" onClick={testBold}>Test Bold</Button>
              <Button size="sm" onClick={testItalic}>Test Italic</Button>
              <Button size="sm" onClick={testUnderline}>Test Underline</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Headings</Badge>
              <Button size="sm" onClick={() => testHeading(1)}>H1</Button>
              <Button size="sm" onClick={() => testHeading(2)}>H2</Button>
              <Button size="sm" onClick={() => testHeading(3)}>H3</Button>
              <Button size="sm" onClick={() => testHeading(4)}>H4</Button>
              <Button size="sm" onClick={() => testHeading(5)}>H5</Button>
              <Button size="sm" onClick={() => testHeading(6)}>H6</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Lists</Badge>
              <Button size="sm" onClick={testBulletList}>Bullet List</Button>
              <Button size="sm" onClick={testOrderedList}>Ordered List</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Blocks</Badge>
              <Button size="sm" onClick={testBlockquote}>Blockquote</Button>
              <Button size="sm" onClick={testCodeBlock}>Code Block</Button>
              <Button size="sm" onClick={testTable}>Table</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Alignment</Badge>
              <Button size="sm" onClick={() => testTextAlign('left')}>Left</Button>
              <Button size="sm" onClick={() => testTextAlign('center')}>Center</Button>
              <Button size="sm" onClick={() => testTextAlign('right')}>Right</Button>
              <Button size="sm" onClick={() => testTextAlign('justify')}>Justify</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Debug</Badge>
              <Button size="sm" onClick={checkEditorState}>Check State</Button>
              <Button size="sm" variant="destructive" onClick={clearEditor}>Clear Editor</Button>
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Editor Output</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Editor
              content={content}
              onChange={setContent}
              config={{
                extensions: FullFeaturedExtensions,
                placeholder: 'Click the test buttons above to test features...',
                className: 'p-6 min-h-[400px]',
              }}
              toolbar={true}
              bubbleMenu={true}
              floatingMenu={true}
              className="border-0"
            />
          </CardContent>
        </Card>

        {/* Raw HTML Output */}
        <Card>
          <CardHeader>
            <CardTitle>Raw HTML Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-64 whitespace-pre-wrap">
              {content}
            </pre>
          </CardContent>
        </Card>

        {/* Extension List */}
        {editor && (
          <Card>
            <CardHeader>
              <CardTitle>Loaded Extensions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {editor.extensionManager.extensions.map((ext: any) => (
                  <Badge key={ext.name} variant="outline">
                    {ext.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}