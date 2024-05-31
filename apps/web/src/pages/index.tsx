import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LineChartAxisLabelsExample } from "@/components/ExampleLineChart";
import { TableExample } from "@/components/ExampleTable";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion"

import Countdown from "@/components/Countdown";
import { Callout } from '@/components/Callout';
import { BarChartAxisLabelsExample } from "@/components/ExampleBarChart";
import BgImage from "@/assets/bg.jpg";

import FaqData from "@/assets/fakedata/faq.json";

interface itemFaq {
    index: number;
    question: string;
    answer: string;
}

export default function Home() {
   const data : itemFaq[] = FaqData;
  return (
    <>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-center p-4"
             style={{
               backgroundImage : `url(${BgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                minHeight: "70vh",
               width: "70vw",
                margin: "auto",
               borderRadius: "10px",
             }}
         >
          <Callout>
          <Countdown />
          </Callout>
        </div>
        <div
            className="flex flex-col space-y-8 w-8/12 mx-auto"
        >
            <h2
                className="text-2xl font-bold"
            >FAQ</h2>
            <Accordion type="single" collapsible>
                {
                    data.map(item =>
                        <AccordionItem key={item.index} value={item.index.toString()}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    )

                }
            </Accordion>

        </div>
      </div>
    </>
  );
}
