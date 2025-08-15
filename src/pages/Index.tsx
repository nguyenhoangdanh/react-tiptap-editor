import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Copy, 
  Github, 
  Star, 
  Download, 
  FileText, 
  Palette, 
  Zap, 
  Settings, 
  Layers,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react'
import { Editor } from '@/lib/editor'
import { toast } from 'sonner'

const HomePage = () => {
  const [basicContent, setBasicContent] = useState('<p>Try editing this text...</p>')
  const [richContent, setRichContent] = useState(`
    <h1>Welcome to React TipTap Editor</h1>
    <p>This is a <strong>powerful</strong> and <em>flexible</em> rich text editor built with TipTap and React.</p>
    <ul>
      <li>Full TypeScript support</li>
      <li>Customizable UI components</li>
      <li>Extensible architecture</li>
    </ul>
    <blockquote>
      <p>"The best editor library for React applications" - Happy Developer</p>
    </blockquote>
  `)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Built on TipTap's performant core with optimized React components"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Fully Customizable",
      description: "Override any component, extension, or behavior to match your needs"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Extensible Architecture",
      description: "Add custom extensions, commands, and UI components easily"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Beautiful UI",
      description: "Modern design with dark mode support and customizable themes"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "TypeScript First",
      description: "Complete type safety with comprehensive TypeScript definitions"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Developer Friendly",
      description: "Intuitive API with excellent documentation and examples"
    }
  ]

  const installationCode = `npm install react-tiptap-editor

# or with yarn
yarn add react-tiptap-editor

# or with pnpm
pnpm add react-tiptap-editor`

  const basicUsageCode = `import { Editor, useEditor } from 'react-tiptap-editor'

function MyEditor() {
  const [content, setContent] = useState('')
  
  return (
    <Editor
      content={content}
      onChange={setContent}
      placeholder="Start writing..."
    />
  )
}`

  const advancedUsageCode = `import { 
  Editor, 
  useEditor, 
  Toolbar, 
  BubbleMenu,
  createRichTextEditor 
} from 'react-tiptap-editor'

function AdvancedEditor() {
  const { editor, commands, state } = useEditor(
    initialContent,
    {
      extensions: createRichTextEditor(),
      placeholder: "Tell your story...",
      autofocus: true
    },
    handleChange
  )
  
  return (
    <Editor
      editor={editor}
      toolbar={{
        showBold: true,
        showItalic: true,
        showLink: true,
        customButtons: [myCustomButton]
      }}
      bubbleMenu={{ enabled: true }}
      floatingMenu={{ enabled: true }}
    />
  )
}`

  const customizationCode = `import { 
  Editor,
  configureStarterKit,
  configureLinkExtension,
  lightTheme 
} from 'react-tiptap-editor'

const customExtensions = [
  configureStarterKit({
    heading: { levels: [1, 2, 3] }
  }),
  configureLinkExtension({
    openOnClick: true,
    validate: (url) => isValidUrl(url)
  }),
  MyCustomExtension
]

function CustomEditor() {
  return (
    <Editor
      config={{ 
        extensions: customExtensions,
        placeholder: "Custom placeholder..."
      }}
      theme={lightTheme}
      toolbar={{
        customButtons: [
          {
            name: 'custom',
            icon: <MyIcon />,
            action: (editor) => editor.chain().focus().run(),
            tooltip: 'My custom action'
          }
        ]
      }}
    />
  )
}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="h-4 w-4 mr-2" />
                React TipTap Editor v1.0.0
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Build Amazing
                <br />
                Rich Text Editors
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A fully customizable and extensible React editor library built on TipTap. 
                TypeScript-first, beautiful UI, and endless possibilities.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 h-auto btn-gradient">
                <Download className="h-5 w-5 mr-2" />
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </Button>
              <Button variant="ghost" size="lg" className="text-lg px-8 py-4 h-auto">
                <FileText className="h-5 w-5 mr-2" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Try the editor yourself - no setup required
            </p>
          </div>

          <Tabs defaultValue="basic" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
              <TabsTrigger value="basic" className="text-base">Basic Editor</TabsTrigger>
              <TabsTrigger value="rich" className="text-base">Rich Text Editor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Basic Editor</CardTitle>
                  <CardDescription>
                    Simple setup with essential features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Editor
                    content={basicContent}
                    onChange={setBasicContent}
                    config={{
                      placeholder: "Start typing here...",
                      autofocus: false
                    }}
                    toolbar={{
                      showBold: true,
                      showItalic: true,
                      showUnderline: true,
                      showStrike: true,
                      showCode: true,
                      showLink: true,
                      showHeadings: false,
                      showLists: true,
                      showQuote: false,
                      showCodeBlock: false,
                      showTable: false,
                      showTextAlign: false,
                      showTextColor: false
                    }}
                    className="min-h-[200px]"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rich" className="space-y-4">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle>Rich Text Editor</CardTitle>
                  <CardDescription>
                    Full-featured editor with all tools
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Editor
                    content={richContent}
                    onChange={setRichContent}
                    config={{
                      placeholder: "Create something amazing...",
                      autofocus: false
                    }}
                    className="min-h-[300px]"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose React TipTap Editor?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for developers who need flexibility without sacrificing ease of use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient hover:shadow-lg transition-all duration-300 border-0">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Simple to Use, Powerful to Customize
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes, customize for years
            </p>
          </div>

          <Tabs defaultValue="installation" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-12">
              <TabsTrigger value="installation">Install</TabsTrigger>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="installation">
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Installation</CardTitle>
                    <CardDescription>Add to your project with your favorite package manager</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard('npm install react-tiptap-editor')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{installationCode}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="basic">
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Basic Usage</CardTitle>
                    <CardDescription>Get started with just a few lines of code</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(basicUsageCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{basicUsageCode}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Advanced Usage</CardTitle>
                    <CardDescription>Use hooks for more control and customization</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(advancedUsageCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{advancedUsageCode}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="custom">
              <Card className="card-gradient">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Full Customization</CardTitle>
                    <CardDescription>Complete control over extensions, themes, and behavior</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(customizationCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm">
                    <code>{customizationCode}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Everything You Need
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  From simple text editing to complex document creation, 
                  our library scales with your needs.
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  "Complete TypeScript support with full type safety",
                  "Modular architecture - use only what you need", 
                  "Custom extensions and commands",
                  "Theming system with dark mode support",
                  "Accessibility built-in",
                  "Production-ready with comprehensive testing"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="btn-gradient">
                Get Started Today
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
            
            <div className="relative">
              <Card className="card-gradient p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">API Reference</h3>
                    <Badge variant="secondary">v1.0.0</Badge>
                  </div>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="text-blue-600 dark:text-blue-400">
                      import {'{ Editor, useEditor }'} from 'react-tiptap-editor'
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      // Hooks
                    </div>
                    <div className="text-green-600 dark:text-green-400">
                      useEditor(), useEditorCommands(), useEditorState()
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      // Components  
                    </div>
                    <div className="text-purple-600 dark:text-purple-400">
                      Toolbar, BubbleMenu, FloatingMenu
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      // Extensions
                    </div>
                    <div className="text-orange-600 dark:text-orange-400">
                      StarterKit, Link, Image, Table, ...
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who have chosen React TipTap Editor 
              for their text editing needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-lg px-12 py-6 h-auto btn-gradient">
                <Download className="h-5 w-5 mr-2" />
                Start Building
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-12 py-6 h-auto">
                <Github className="h-5 w-5 mr-2" />
                Star on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">React TipTap Editor</h3>
              <p className="text-muted-foreground">
                The most flexible and powerful rich text editor for React applications.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Documentation</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Getting Started</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">API Reference</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Examples</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Migration Guide</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Community</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">GitHub</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Discord</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Twitter</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Discussions</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Changelog</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Roadmap</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">Contributing</div>
                <div className="text-muted-foreground hover:text-foreground cursor-pointer">License</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 React TipTap Editor. Released under the MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
