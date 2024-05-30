import React, { useState, useEffect } from 'react';
import { Button } from '@tremor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { Card } from '@/components/ui/Card';import { BarChart, Bar, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Medal {
  year: number;
  gold: number;
  silver: number;
  bronze: number;
}

interface Country {
  name: string;
  medals: Medal[];
}

const Classement: React.FC = () => {
  const initialData: Country[] = [
        {
          "name": "USA",
          "medals": [
            { "year": 2020, "gold": 39, "silver": 41, "bronze": 33 },
            { "year": 2016, "gold": 46, "silver": 37, "bronze": 38 },
            { "year": 2012, "gold": 46, "silver": 28, "bronze": 29 },
            { "year": 2008, "gold": 36, "silver": 39, "bronze": 37 },
            { "year": 2004, "gold": 36, "silver": 39, "bronze": 26 },
            { "year": 2000, "gold": 37, "silver": 24, "bronze": 32 }
          ]
        },
        {
          "name": "China",
          "medals": [
            { "year": 2020, "gold": 38, "silver": 32, "bronze": 18 },
            { "year": 2016, "gold": 26, "silver": 18, "bronze": 26 },
            { "year": 2012, "gold": 38, "silver": 27, "bronze": 23 },
            { "year": 2008, "gold": 48, "silver": 22, "bronze": 30 },
            { "year": 2004, "gold": 32, "silver": 17, "bronze": 14 },
            { "year": 2000, "gold": 28, "silver": 16, "bronze": 14 }
          ]
        },
        {
          "name": "France",
          "medals": [
            { "year": 2020, "gold": 10, "silver": 12, "bronze": 14 },
            { "year": 2016, "gold": 8, "silver": 11, "bronze": 9 },
            { "year": 2012, "gold": 11, "silver": 11, "bronze": 12 },
            { "year": 2008, "gold": 7, "silver": 16, "bronze": 17 },
            { "year": 2004, "gold": 11, "silver": 9, "bronze": 13 },
            { "year": 2000, "gold": 13, "silver": 14, "bronze": 11 }
          ]
        },
        {
          "name": "Russia",
          "medals": [
            { "year": 2020, "gold": 20, "silver": 28, "bronze": 23 },
            { "year": 2016, "gold": 19, "silver": 17, "bronze": 20 },
            { "year": 2012, "gold": 24, "silver": 25, "bronze": 32 },
            { "year": 2008, "gold": 23, "silver": 21, "bronze": 28 },
            { "year": 2004, "gold": 27, "silver": 27, "bronze": 38 },
            { "year": 2000, "gold": 32, "silver": 28, "bronze": 29 }
          ]
        },
        {
          "name": "Germany",
          "medals": [
            { "year": 2020, "gold": 13, "silver": 17, "bronze": 20 },
            { "year": 2016, "gold": 17, "silver": 10, "bronze": 15 },
            { "year": 2012, "gold": 11, "silver": 19, "bronze": 14 },
            { "year": 2008, "gold": 16, "silver": 10, "bronze": 15 },
            { "year": 2004, "gold": 14, "silver": 16, "bronze": 18 },
            { "year": 2000, "gold": 13, "silver": 17, "bronze": 26 }
          ]
        }
      
  ];

  const [countries, setCountries] = useState<Country[]>(initialData);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  useEffect(() => {
    const totalYears = initialData[0].medals.length;
    setCurrentYearIndex(totalYears - 1); // Commencer par l'année la plus récente
  
    const interval = setInterval(() => {
      setCurrentYearIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        return nextIndex < 0 ? totalYears - 1 : nextIndex;
      });
    }, 6000);
  
    return () => clearInterval(interval);
  }, []);

  const getCurrentYearData = () => {
    const yearData: any[] = [];
    countries.forEach((country) => {
      const medal = country.medals[currentYearIndex];
      const totalMedals = medal.gold + medal.silver + medal.bronze;
      yearData.push({ country: country.name, totalMedals });
    });
    return yearData;
  };

  const currentYearData = getCurrentYearData();

  return (
    <div className="p-8">
         <Tabs defaultValue="overview" className="space-y-12">
          <TabsList>
            <TabsTrigger value="overview">Timeline</TabsTrigger>
            <TabsTrigger value="analytics">Tableaux</TabsTrigger>
        </TabsList>
       
        <TabsContent value="analytics" className="space-y-4">

      <h3 className="text-center">Classement des Médailles</h3>
      {countries.map((country) => (
        <Card key={country.name} className="mt-8">
          <h3>{country.name}</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Année</TableHeaderCell>
                <TableHeaderCell>Or</TableHeaderCell>
                <TableHeaderCell>Argent</TableHeaderCell>
                <TableHeaderCell>Bronze</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {country.medals.map((medal) => (
                <TableRow key={medal.year}>
                  <TableCell>{medal.year}</TableCell>
                  <TableCell>{medal.gold}</TableCell>
                  <TableCell>{medal.silver}</TableCell>
                  <TableCell>{medal.bronze}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ))}
      </TabsContent>
      <TabsContent value="overview" className="space-y-4">
      <h3 className="text-center">Classement des Médailles</h3>
      <Card className="mt-8">
        <h3>{initialData[0].medals[currentYearIndex].year}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={currentYearData} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="country" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalMedals" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classement;
