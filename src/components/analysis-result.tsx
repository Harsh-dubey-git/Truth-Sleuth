'use client';

import type { AnalyzeNewsArticleOutput } from "@/ai/flows/analyze-news-article"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, FileText } from "lucide-react"
import { motion } from "framer-motion"

interface AnalysisResultProps {
  result: AnalyzeNewsArticleOutput;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  const isReal = result.prediction === 'Real';
  const confidencePercent = Math.round(result.confidenceScore * 100);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 w-full"
    >
      <Card className="overflow-hidden shadow-lg">
        <CardHeader className={cn(
          "flex flex-row items-center gap-4 space-y-0 text-white p-4",
          isReal ? "bg-green-600" : "bg-destructive"
        )}>
          {isReal ? (
            <CheckCircle2 className="h-8 w-8 shrink-0 text-white" />
          ) : (
            <XCircle className="h-8 w-8 shrink-0 text-white" />
          )}
          <div className="flex flex-col">
            <span className="text-sm uppercase tracking-wider font-medium opacity-80">Prediction</span>
            <CardTitle className="text-2xl font-headline text-white">
              Article Appears to be {result.prediction}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid gap-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">Confidence</h3>
              <p className="text-2xl font-bold text-foreground">{confidencePercent}%</p>
            </div>
            <Progress value={confidencePercent} className={cn(isReal ? "[&>div]:bg-green-600" : "[&>div]:bg-destructive")} />
          </motion.div>

          {result.explanation && (
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-2">Analysis</h3>
              <div className="p-4 rounded-lg bg-secondary/50 border space-y-3">
                 <p className="text-secondary-foreground">
                  {result.explanation}
                </p>
                {result.keywords && result.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-sm font-normal">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </CardContent>
      </Card>
    </motion.div>
  )
}
