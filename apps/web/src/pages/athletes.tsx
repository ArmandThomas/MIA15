import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@tremor/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import { Card } from '@/components/ui/Card';

interface Athlete {
  id: number;
  name: string;
  sport: string;
  country: string;
  age: number;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

const Athletes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState<Athlete[]>([
    {
      id: 1,
      name: "John Doe",
      sport: "Swimming",
      country: "USA",
      age: 28,
      medals: {
        gold: 3,
        silver: 2,
        bronze: 1
      }
    },
    {
      id: 2,
      name: "Alice Smith",
      sport: "Gymnastics",
      country: "Canada",
      age: 24,
      medals: {
        gold: 1,
        silver: 3,
        bronze: 0
      }
    },
    {
      id: 3,
      name: "Mohamed Ali",
      sport: "Boxing",
      country: "France",
      age: 30,
      medals: {
        gold: 2,
        silver: 1,
        bronze: 1
      }
    },
    {
      id: 4,
      name: "Maria Garcia",
      sport: "Tennis",
      country: "Spain",
      age: 27,
      medals: {
        gold: 0,
        silver: 2,
        bronze: 1
      }
    },
    {
      id: 5,
      name: "Chen Wei",
      sport: "Table Tennis",
      country: "China",
      age: 26,
      medals: {
        gold: 4,
        silver: 0,
        bronze: 0
      }
    }
  ]);
  const [filteredData, setFilteredData] = useState<Athlete[]>([]);

  useEffect(() => {
    filterData();
  }, [location.search]);

  const filterData = () => {
    const countryFilter = queryParams.get('country');
    const sportFilter = queryParams.get('sport');

    let filtered = data;
    if (countryFilter) {
      filtered = filtered.filter(item => item.country === countryFilter);
    }
    if (sportFilter) {
      filtered = filtered.filter(item => item.sport === sportFilter);
    }

    setFilteredData(filtered);
  };

  const handleFilterByCountry = (country: string) => {
    queryParams.set('country', country);
    navigate(`?${queryParams.toString()}`);
  };

  const handleFilterBySport = (sport: string) => {
    queryParams.set('sport', sport);
    navigate(`?${queryParams.toString()}`);
  };

  const handleClearFilters = (params: string) => {
    if(params === "country"){
      queryParams.delete('country');
    }else if(params === "sport"){
      queryParams.delete('sport');
    }else{
      queryParams.delete('country');
      queryParams.delete('sport');
    }
    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div>
      <div className="mt-8 flex items-center space-x-2">
        <Button onClick={() => handleFilterByCountry('USA')}>USA</Button>
        <Button onClick={() => handleFilterByCountry('Canada')}>Canada</Button>
        <Button onClick={() =>handleClearFilters('country')}>Supprimer les filtres des pays</Button>
      </div>
      <div className="mt-8 flex items-center space-x-2">
        <Button onClick={() => handleFilterBySport('Swimming')}>Swimming</Button>
        <Button onClick={() => handleFilterBySport('Gymnastics')}>Gymnastics</Button>
        <Button onClick={() =>handleClearFilters('sport')}>Supprimer les filtres des sports</Button>
      </div>
      <div className="mt-8 flex items-center space-x-2">
        <Button onClick={() =>handleClearFilters('')}>Supprimer les filtres</Button>
      </div>
      <div className="mt-8 flex items-center space-x-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-50">Workspaces</h3>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
          Overview of all registered workspaces within your organization.
        </p>
      </div>
      <Card className="p-4">
      <TableRoot className="mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nom</TableHeaderCell>
              <TableHeaderCell>Sport</TableHeaderCell>
              <TableHeaderCell>Pays</TableHeaderCell>
              <TableHeaderCell>Age</TableHeaderCell>
              <TableHeaderCell>Médailles</TableHeaderCell>
             </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="">{item.name}</TableCell>
                <TableCell>{item.sport}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>
                <ul>
                  <li>Gold: {item.medals.gold}</li>
                  <li>Silver: {item.medals.silver}</li>
                  <li>Bronze: {item.medals.bronze}</li>
                </ul>
              </TableCell>
               </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
      </Card>
    </div>
  );
};

export default Athletes;
