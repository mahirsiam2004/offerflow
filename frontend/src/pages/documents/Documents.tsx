import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Documents() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-neutral-600">Store your resumes and cover letters</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documents Management</h3>
            <p className="text-neutral-600 mb-4">
              Upload and manage your resumes and cover letters
            </p>
            <div className="flex gap-2 justify-center">
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}