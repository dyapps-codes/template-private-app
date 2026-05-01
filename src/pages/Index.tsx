import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>DYPAI App</CardTitle>
            <Badge variant="secondary">Ready</Badge>
          </div>
          <CardDescription>
            Tailwind v4 + shadcn/ui están listos. Empieza a construir.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button>Get started</Button>
          <Button variant="outline">Learn more</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Index
