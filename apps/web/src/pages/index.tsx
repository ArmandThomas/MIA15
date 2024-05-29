import { Header } from "@/components/Header";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LineChartAxisLabelsExample } from "@/components/ExampleLineChart";
import { TableExample } from "@/components/ExampleTable";
import Countdown from "@/components/Countdown";
import { Callout } from '@/components/Callout';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="flex items-center justify-center p-4">
          <Callout>
          <Countdown />
          </Callout>
        </div>
        <Tabs defaultValue="overview" className="space-y-12">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card className="p-4">
              <LineChartAxisLabelsExample />
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-4">
              <TableExample />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
