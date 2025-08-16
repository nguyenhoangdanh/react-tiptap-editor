import React, { useState } from 'react'
import { Editor, FullFeaturedExtensions } from '@/lib/editor'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestHistoryFix() {
  const [content, setContent] = useState('<p>Testing single editor instance...</p>')

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            History Fix Test
          </h1>
          <p className="text-lg text-muted-foreground">
            Testing if the history plugin conflict is resolved
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Single Editor Instance</CardTitle>
          </CardHeader>
          <CardContent>
            <Editor
              content={content}
              onChange={setContent}
              config={{
                extensions: FullFeaturedExtensions,
                placeholder: 'Start typing to test...',
                className: 'p-4',
              }}
              toolbar={true}
              bubbleMenu={true}
              floatingMenu={true}
              className="min-h-[400px] border rounded-md"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}