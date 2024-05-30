import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { LineChartAxisLabelsExample } from "@/components/ExampleLineChart";
import { TableExample } from "@/components/ExampleTable";
import Countdown from "@/components/Countdown";
import { Callout } from "@/components/Callout";
import { BarChartAxisLabelsExample } from "@/components/ExampleBarChart";
import { AthleteMedalsTable } from "@/components/AthleteMedalsTable";

export default function Home() {
  return (
    <>
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

            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
          <TabsContent value="reports" className="space-y-4">
            <Card className="p-4">
              <BarChartAxisLabelsExample />
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-4">
              <AthleteMedalsTable />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
