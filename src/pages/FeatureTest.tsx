import React, { useState } from 'react'
import {
  Editor,
  useEditor,
  FullFeaturedExtensions,
} from '@/lib/editor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

const INITIAL_CONTENT = `
<h1>Feature Test Document</h1>
<p>This document is used to test all editor features. Try the following:</p>

<h2>Text Formatting</h2>
<p>Test <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, and <code>inline code</code>.</p>

<h2>Lists</h2>
<ul>
  <li>Bullet list item 1</li>
  <li>Bullet list item 2</li>
</ul>

<ol>
  <li>Ordered list item 1</li>
  <li>Ordered list item 2</li>
</ol>

<h2>Quote and Code</h2>
<blockquote>
  <p>This is a blockquote for testing.</p>
</blockquote>

<pre><code>// This is a code block
function test() {
  console.log("Hello World!");
}</code></pre>

<p>Testing <mark>highlighted text</mark> and <a href="https://example.com">links</a>.</p>

<hr>

<p>Test text alignment:</p>
<p style="text-align: center">Centered text</p>
<p style="text-align: right">Right-aligned text</p>
<p style="text-align: justify">Justified text that should be justified when it's long enough to span multiple lines and show the justification effect.</p>
`

interface TestResult {
  name: string
  passed: boolean
  description: string
}

export default function FeatureTest() {
  const [content, setContent] = useState(INITIAL_CONTENT)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  
  const { editor } = useEditor(
    content,
    { extensions: FullFeaturedExtensions },
    setContent
  )

  const runTest = (testName: string, testFn: () => boolean, description: string) => {
    try {
      const passed = testFn()
      const result: TestResult = { name: testName, passed, description }
      setTestResults(prev => [...prev.filter(r => r.name !== testName), result])
      
      if (passed) {
        toast.success(`✓ ${testName} test passed`)
      } else {
        toast.error(`✗ ${testName} test failed`)
      }
      
      return passed
    } catch (error) {
      const result: TestResult = { name: testName, passed: false, description: `Error: ${error}` }
      setTestResults(prev => [...prev.filter(r => r.name !== testName), result])
      toast.error(`✗ ${testName} test failed with error`)
      return false
    }
  }

  const testBasicFormatting = () => {
    if (!editor) return false
    
    // Test bold toggle
    editor.chain().focus().selectAll().run()
    const initialBold = editor.isActive('bold')
    editor.chain().focus().toggleBold().run()
    const afterToggle = editor.isActive('bold')
    
    // Reset
    if (afterToggle !== initialBold) {
      editor.chain().focus().toggleBold().run()
    }
    
    return initialBold !== afterToggle
  }

  const testHeadings = () => {
    if (!editor) return false
    
    // Insert a heading and check if it's active
    editor.chain().focus().setHeading({ level: 2 }).run()
    const isHeading2 = editor.isActive('heading', { level: 2 })
    
    // Reset to paragraph
    editor.chain().focus().setParagraph().run()
    
    return isHeading2
  }

  const testLists = () => {
    if (!editor) return false
    
    // Test bullet list
    editor.chain().focus().toggleBulletList().run()
    const isBulletList = editor.isActive('bulletList')
    
    // Test ordered list
    editor.chain().focus().toggleOrderedList().run()
    const isOrderedList = editor.isActive('orderedList')
    
    // Reset
    editor.chain().focus().setParagraph().run()
    
    return isBulletList && isOrderedList
  }

  const testTextAlignment = () => {
    if (!editor) return false
    
    // Test center alignment
    editor.chain().focus().setTextAlign('center').run()
    const isCentered = editor.isActive({ textAlign: 'center' })
    
    // Reset to left
    editor.chain().focus().setTextAlign('left').run()
    
    return isCentered
  }

  const testLinks = () => {
    if (!editor) return false
    
    // Select some text and add a link
    editor.chain().focus().selectAll().run()
    editor.chain().focus().setLink({ href: 'https://test.com' }).run()
    const hasLink = editor.isActive('link')
    
    // Remove link
    editor.chain().focus().unsetLink().run()
    
    return hasLink
  }

  const testUndoRedo = () => {
    if (!editor) return false
    
    const initialContent = editor.getHTML()
    
    // Make a change
    editor.chain().focus().insertContent('TEST').run()
    const canUndo = editor.can().undo()
    
    // Undo the change
    editor.chain().focus().undo().run()
    const afterUndo = editor.getHTML()
    
    const canRedo = editor.can().redo()
    
    return canUndo && canRedo && afterUndo === initialContent
  }

  const testHighlight = () => {
    if (!editor) return false
    
    editor.chain().focus().selectAll().run()
    editor.chain().focus().toggleHighlight({ color: '#FEF3C7' }).run()
    const isHighlighted = editor.isActive('highlight')
    
    // Remove highlight
    editor.chain().focus().unsetHighlight().run()
    
    return isHighlighted
  }

  const testCodeBlock = () => {
    if (!editor) return false
    
    editor.chain().focus().toggleCodeBlock().run()
    const isCodeBlock = editor.isActive('codeBlock')
    
    // Reset to paragraph
    editor.chain().focus().setParagraph().run()
    
    return isCodeBlock
  }

  const testBlockquote = () => {
    if (!editor) return false
    
    editor.chain().focus().toggleBlockquote().run()
    const isBlockquote = editor.isActive('blockquote')
    
    // Reset to paragraph
    editor.chain().focus().setParagraph().run()
    
    return isBlockquote
  }

  const testTable = () => {
    if (!editor) return false
    
    try {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      // Check if we can find a table in the content
      const html = editor.getHTML()
      return html.includes('<table>')
    } catch (error) {
      return false
    }
  }

  const runAllTests = () => {
    if (!editor) {
      toast.error('Editor not ready')
      return
    }

    setTestResults([])
    
    const tests = [
      { name: 'Basic Formatting', fn: testBasicFormatting, desc: 'Bold, italic, underline toggle' },
      { name: 'Headings', fn: testHeadings, desc: 'Heading levels H1-H6' },
      { name: 'Lists', fn: testLists, desc: 'Bullet and ordered lists' },
      { name: 'Text Alignment', fn: testTextAlignment, desc: 'Left, center, right, justify' },
      { name: 'Links', fn: testLinks, desc: 'Add and remove links' },
      { name: 'Undo/Redo', fn: testUndoRedo, desc: 'History management' },
      { name: 'Highlight', fn: testHighlight, desc: 'Text highlighting' },
      { name: 'Code Block', fn: testCodeBlock, desc: 'Code block formatting' },
      { name: 'Blockquote', fn: testBlockquote, desc: 'Quote block formatting' },
      { name: 'Table', fn: testTable, desc: 'Table insertion' },
    ]

    let passedCount = 0
    
    tests.forEach(test => {
      setTimeout(() => {
        const passed = runTest(test.name, test.fn, test.desc)
        if (passed) passedCount++
        
        if (testResults.length === tests.length - 1) {
          toast.success(`Tests completed: ${passedCount}/${tests.length} passed`)
        }
      }, tests.indexOf(test) * 200)
    })
  }

  const clearResults = () => {
    setTestResults([])
  }

  const resetContent = () => {
    setContent(INITIAL_CONTENT)
    if (editor) {
      editor.commands.setContent(INITIAL_CONTENT)
    }
    toast.success('Content reset')
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Full Editor Feature Test</h1>
            <p className="text-muted-foreground">
              Comprehensive testing of all TipTap editor features
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={runAllTests} disabled={!editor}>
              Run All Tests
            </Button>
            <Button variant="outline" onClick={clearResults}>
              Clear Results
            </Button>
            <Button variant="outline" onClick={resetContent}>
              Reset Content
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Editor</CardTitle>
                <CardDescription>
                  Test all features using the toolbar and keyboard shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Editor
                  content={content}
                  onChange={setContent}
                  config={{
                    extensions: FullFeaturedExtensions,
                    placeholder: 'Start testing...',
                    className: 'p-6',
                  }}
                  toolbar={true}
                  bubbleMenu={true}
                  floatingMenu={true}
                  className="min-h-[600px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Test Results */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>
                  Automated feature testing results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No tests run yet. Click "Run All Tests" to start.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {result.passed ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{result.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {testResults.length > 0 && (
                      <>
                        <Separator />
                        <div className="text-sm">
                          <Badge variant={testResults.every(r => r.passed) ? "default" : "destructive"}>
                            {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Manual Test Checklist */}
            <Card>
              <CardHeader>
                <CardTitle>Manual Tests</CardTitle>
                <CardDescription>
                  Features to test manually
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="space-y-1">
                  <p className="font-medium">Text Selection:</p>
                  <ul className="text-muted-foreground space-y-1 text-xs ml-4">
                    <li>• Select text to see bubble menu</li>
                    <li>• Try different text formatting</li>
                    <li>• Test color and highlight</li>
                  </ul>
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium">Images:</p>
                  <ul className="text-muted-foreground space-y-1 text-xs ml-4">
                    <li>• Click image button in toolbar</li>
                    <li>• Try drag and drop (if implemented)</li>
                    <li>• Test image resizing</li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <p className="font-medium">Keyboard Shortcuts:</p>
                  <ul className="text-muted-foreground space-y-1 text-xs ml-4">
                    <li>• Ctrl+B for bold</li>
                    <li>• Ctrl+I for italic</li>
                    <li>• Ctrl+Z for undo</li>
                    <li>• Ctrl+Y for redo</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}