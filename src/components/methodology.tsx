import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BrainCircuit, Database } from "lucide-react"

export function Methodology() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h3 className="text-lg font-headline">Our Methodology</h3>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-muted-foreground">
            <p>
              Truth Sleuth employs a sophisticated AI model to discern the authenticity of news content. Here's a simplified look at our process:
            </p>
            <div className="flex items-start gap-4 p-4 rounded-lg border">
              <BrainCircuit className="w-8 h-8 mt-1 shrink-0 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">AI-Powered Analysis</h4>
                <p>
                  Our system is powered by a state-of-the-art Natural Language Processing (NLP) model. This model has been trained to understand the nuances, patterns, and linguistic cues that often distinguish factual reporting from misinformation.
                </p>
              </div>
            </div>
             <div className="flex items-start gap-4 p-4 rounded-lg border">
              <Database className="w-8 h-8 mt-1 shrink-0 text-primary" />
              <div>
                <h4 className="font-semibold text-foreground">Training Data</h4>
                <p>
                  The model was trained on a vast and diverse dataset containing thousands of news articles, each meticulously labeled as either "Real" or "Fake". This comprehensive training enables the AI to recognize characteristics associated with both types of news content.
                </p>
              </div>
            </div>
            <p className="pt-2 text-xs italic">
              <strong>Disclaimer:</strong> While our AI is highly accurate, it is a tool for guidance and not an absolute arbiter of truth. Predictions are based on patterns in the training data and should be considered alongside other verification methods.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
