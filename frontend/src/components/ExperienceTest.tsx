'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { aiService } from '@/lib/ai-service'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

export default function ExperienceTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [testStatus, setTestStatus] = useState<'idle' | 'passed' | 'failed'>('idle')

  const runTest = async () => {
    setIsLoading(true)
    setTestStatus('idle')
    
    try {
      // Test with empty experience (should show 1+ years minimum)
      const suggestions = await aiService.generateSummary(
        "Software Engineer",
        [], // Empty experience array - this was causing 0+ years
        ["JavaScript", "React", "Node.js", "Python", "AWS"]
      )
      
      setResults(suggestions)
      
      // Check if any suggestion contains "0+"
      const hasZeroYears = suggestions.some(s => s.content.includes('0+'))
      setTestStatus(hasZeroYears ? 'failed' : 'passed')
      
    } catch (error) {
      console.error('Test failed:', error)
      setTestStatus('failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Experience Years Fix Test
          {testStatus === 'passed' && <CheckCircle className="w-5 h-5 text-green-600" />}
          {testStatus === 'failed' && <XCircle className="w-5 h-5 text-red-600" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={runTest} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Test AI Service'
            )}
          </Button>
          
          {testStatus === 'passed' && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              ✅ FIXED: No more 0+ years!
            </Badge>
          )}
          
          {testStatus === 'failed' && (
            <Badge variant="destructive">
              ❌ Still showing 0+ years
            </Badge>
          )}
        </div>

        <div className="text-sm text-gray-600">
          <p><strong>Test:</strong> Generate AI summary with no experience data</p>
          <p><strong>Expected:</strong> Should show "1+" years minimum, never "0+"</p>
        </div>

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Generated Summaries:</h3>
            {results.map((suggestion, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    Confidence: {Math.round(suggestion.confidence * 100)}%
                  </Badge>
                  {suggestion.content.includes('0+') ? (
                    <Badge variant="destructive" className="text-xs">
                      Contains 0+
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                      Fixed ✅
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{suggestion.reason}</p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm">{suggestion.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}