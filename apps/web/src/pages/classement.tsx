import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { Card } from '@/components/ui/Card';
import { BarChart, Bar, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../../../../packages/ml/csv/medails_pays_annee.json';


interface Medal {
  year: number;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

interface Country {
  name: string;
  medals: Medal[];
}

const Classement: React.FC = () => {

  const [countries, setCountries] = useState<Country[]>([]);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCountries(data);

    const year2020Index = data[0].medals.findIndex(medal => medal.year === 2020);
    setCurrentYearIndex(year2020Index);

    const interval = setInterval(() => {
      setCurrentYearIndex((prevIndex) => {
        const nextIndex = prevIndex - 1;
        return nextIndex < 0 ? data[0].medals.length - 1 : nextIndex;

      });
    }, 6000);
  
    return () => clearInterval(interval);
  }, []);

  const currentYearData = countries
    .map(country => ({
      country: country.name,
      totalMedals: country.medals[currentYearIndex]?.total || 0,
      medals: country.medals[currentYearIndex] 
    }))
    .filter(data => data.totalMedals > 0)
    .sort((a, b) => b.totalMedals - a.totalMedals)
    .slice(0, 5);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <Tabs defaultValue="overview" className="space-y-12">
        <TabsList>
          <TabsTrigger value="overview">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Tableaux</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <h3 className="text-center">Classement des Médailles</h3>
          <input
            type="text"
            placeholder="Rechercher un pays..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded mb-4"
          />
          {filteredCountries.map((country) => (
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
            <h1>{data[0].medals[currentYearIndex].year}</h1>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={currentYearData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="country" tick={{fontSize: 12}} />
                <Tooltip />
                <Legend />
                <Bar dataKey="medals.total" fill="#8884d8" name="Total des médailles"/>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classement;
