import React, { useState } from 'react'
import {
  Editor,
  Toolbar,
  BubbleMenu,
  FloatingMenu,
  useEditor,
  FullFeaturedExtensions,
  BasicExtensions,
  MinimalExtensions,
  handleImageDrop,
  insertDraggableImage,
} from '@/lib/editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  CodeBracketIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  SparklesIcon,
  BookOpenIcon,
  SwatchIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'

const SAMPLE_CONTENT = `
<h1>Welcome to React TipTap Editor</h1>
<p>This is a <strong>comprehensive</strong> and <em>fully customizable</em> rich text editor built on top of <a href="https://tiptap.dev" target="_blank">TipTap</a>.</p>
<h2>✨ Features</h2>
<ul>
  <li><strong>Drag-and-Drop Images</strong> - Upload and position images anywhere</li>
  <li><strong>Resizable Images</strong> - Click and drag handles to resize</li>
  <li><strong>Text Wrapping</strong> - Images flow naturally with text content</li>
  <li><strong>Full Extensibility</strong> - Override any component or behavior</li>
  <li><strong>TypeScript Support</strong> - Complete type safety</li>
</ul>
<blockquote>
  <p>Try dragging the sample image below to different positions and watch the text reflow!</p>
</blockquote>
<p>You can also try <mark>highlighting text</mark>, adding <a href="#">links</a>, and formatting content with the toolbar above.</p>
<h3>Code Examples</h3>
<pre><code>// Simple usage
import { Editor } from 'react-tiptap-editor'

function MyApp() {
  return (
    &lt;Editor
      content="Start writing..."
      onChange={(html) => console.log(html)}
    /&gt;
  )
}</code></pre>
`

export default function EditorDemo() {
  const [content, setContent] = useState(SAMPLE_CONTENT)
  const [preset, setPreset] = useState<'minimal' | 'basic' | 'full'>('full')
  const [showJSON, setShowJSON] = useState(false)

  // Create single editor instance based on current preset
  const getExtensions = () => {
    switch (preset) {
      case 'minimal': return MinimalExtensions
      case 'basic': return BasicExtensions
      case 'full': return FullFeaturedExtensions
      default: return FullFeaturedExtensions
    }
  }

  const { editor } = useEditor(
    content,
    { extensions: getExtensions() },
    setContent
  )

  const getCurrentEditor = () => {
    return editor
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const editor = getCurrentEditor()
    if (!editor) return

    try {
      await handleImageDrop(editor, files, {
        alignment: 'center',
        maxSize: 10 * 1024 * 1024, // 10MB
        onUpload: async (file: File) => {
          // In a real app, you'd upload to your server
          // For demo, we'll use base64
          return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        }
      })

      toast.success('Image uploaded successfully!')
    } catch (error) {
      toast.error('Failed to upload image')
    }
  }

  const addSampleImage = () => {
    const editor = getCurrentEditor()
    if (!editor) return

    insertDraggableImage(editor, 'https://picsum.photos/400/300', {
      alt: 'Sample image',
      alignment: 'right',
      width: 300,
      height: 225,
    })

    toast.success('Sample image added!')
  }

  const exportContent = (format: 'html' | 'json' | 'text') => {
    const editor = getCurrentEditor()
    if (!editor) return

    let exportedContent: string
    let filename: string

    switch (format) {
      case 'json':
        exportedContent = JSON.stringify(editor.getJSON(), null, 2)
        filename = 'editor-content.json'
        break
      case 'text':
        exportedContent = editor.getText()
        filename = 'editor-content.txt'
        break
      case 'html':
      default:
        exportedContent = editor.getHTML()
        filename = 'editor-content.html'
        break
    }

    // Create and download file
    const blob = new Blob([exportedContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`Content exported as ${format.toUpperCase()}!`)
  }

  const copyToClipboard = async (format: 'html' | 'json') => {
    const editor = getCurrentEditor()
    if (!editor) return

    const content = format === 'json'
      ? JSON.stringify(editor.getJSON(), null, 2)
      : editor.getHTML()

    try {
      await navigator.clipboard.writeText(content)
      toast.success(`${format.toUpperCase()} copied to clipboard!`)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <SparklesIcon className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              React TipTap Editor
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A fully customizable and extensible React editor with drag-and-drop images,
            complete TypeScript support, and modern UI components.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">
              <BookOpenIcon className="w-3.5 h-3.5 mr-1" />
              TipTap Core
            </Badge>
            <Badge variant="secondary">
              <SwatchIcon className="w-3.5 h-3.5 mr-1" />
              Tailwind CSS
            </Badge>
            <Badge variant="secondary">
              <PhotoIcon className="w-3.5 h-3.5 mr-1" />
              Drag & Drop
            </Badge>
            <Badge variant="secondary">
              <CodeBracketIcon className="w-3.5 h-3.5 mr-1" />
              TypeScript
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpTrayIcon className="w-5 h-5" />
              Editor Controls
            </CardTitle>
            <CardDescription>
              Try different presets, upload images, and export your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Preset Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Preset:</span>
                <Tabs value={preset} onValueChange={(value) => setPreset(value as any)}>
                  <TabsList>
                    <TabsTrigger value="minimal">Minimal</TabsTrigger>
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="full">Full</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Image Actions */}
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                  multiple
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addSampleImage}
                >
                  <PhotoIcon className="w-4 h-4 mr-2" />
                  Add Sample
                </Button>
              </div>

              <Separator orientation="vertical" className="h-8" />

              {/* Export Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportContent('html')}
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Export HTML
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard('html')}
                >
                  <ClipboardDocumentIcon className="w-4 h-4 mr-2" />
                  Copy HTML
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowJSON(!showJSON)}
                >
                  <CodeBracketIcon className="w-4 h-4 mr-2" />
                  {showJSON ? 'Hide' : 'Show'} JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Editor ({preset})</CardTitle>
                <CardDescription>
                  {preset === 'full' && "Full-featured editor with all extensions enabled"}
                  {preset === 'basic' && "Basic editor with essential formatting tools"}
                  {preset === 'minimal' && "Minimal editor with just text formatting"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Editor
                  key={preset} // Force recreation when preset changes
                  content={content}
                  onChange={setContent}
                  config={{
                    extensions: getExtensions(),
                    placeholder: `Start writing something amazing...`,
                    className: 'p-6',
                  }}
                  toolbar={preset !== 'minimal'}
                  bubbleMenu={preset !== 'minimal'}
                  floatingMenu={preset === 'full'}
                  className="min-h-[600px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* JSON Output */}
            {showJSON && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">JSON Output</CardTitle>
                  <CardDescription>
                    Real-time JSON representation of your content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-64">
                    <code>
                      {editor ?
                        JSON.stringify(editor.getJSON(), null, 2) :
                        'Loading...'
                      }
                    </code>
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full"
                    onClick={() => copyToClipboard('json')}
                  >
                    <ClipboardDocumentIcon className="w-3.5 h-3.5 mr-2" />
                    Copy JSON
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Usage Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Start</CardTitle>
                <CardDescription>
                  Get started with the React TipTap Editor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">1. Install</h4>
                  <code className="text-xs bg-muted p-2 rounded block">
                    npm install react-tiptap-editor
                  </code>
                </div>

                <div>
                  <h4 className="font-medium mb-2">2. Basic Usage</h4>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    <code>{`import { Editor } from 'react-tiptap-editor'

function App() {
  return (
    <Editor
      content="Hello world!"
      onChange={(html) => console.log(html)}
    />
  )
}`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">3. With Drag & Drop</h4>
                  <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                    <code>{`import { 
  Editor, 
  handleImageDrop 
} from 'react-tiptap-editor'

function App() {
  const handleDrop = (editor, files) => {
    handleImageDrop(editor, files, {
      onUpload: async (file) => {
        // Upload to your server
        return uploadFile(file)
      }
    })
  }
  
  return <Editor onImageDrop={handleDrop} />
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Drag & Drop Images
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Resizable Images
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Text Wrapping
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Custom Extensions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    TypeScript Support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Customizable UI
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Multiple Presets
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Export Options
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}