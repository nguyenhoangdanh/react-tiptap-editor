import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function TestIndex() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            React TipTap Editor Test
          </h1>
          <p className="text-lg text-muted-foreground">
            Testing basic functionality without TipTap components
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Test</CardTitle>
            <CardDescription>
              If you can see this, the basic app structure is working
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              CSS variables and theme are loading correctly.
            </p>
            <div className="mt-4 p-4 bg-muted rounded-md">
              <p className="text-muted-foreground">
                This should have a different background color.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>TipTap Editor Tests</CardTitle>
            <CardDescription>
              Navigate to test different configurations and fixes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/simple">
                <Button variant="outline" className="w-full">
                  Simple TipTap Test
                </Button>
              </Link>
              <Link to="/full">
                <Button variant="outline" className="w-full">
                  Full Editor Test
                </Button>
              </Link>
              <Link to="/test">
                <Button variant="default" className="w-full">
                  ✅ Fixed Editor Test
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Link to="/feature-test">
                <Button variant="outline" className="w-full">
                  Feature Testing Suite
                </Button>
              </Link>
              <Link to="/debug">
                <Button variant="outline" className="w-full">
                  Debug Editor
                </Button>
              </Link>
              <Link to="/history-fix">
                <Button variant="secondary" className="w-full">
                  🔧 History Fix Test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}