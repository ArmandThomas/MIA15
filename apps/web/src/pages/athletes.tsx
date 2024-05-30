import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import BronzeMedal from '@/assets/medals_icons/BronzeMedal';
import SilverMedal from '@/assets/medals_icons/SilverMedal';
import GoldMedal from '@/assets/medals_icons/GoldMedal';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {getInitialsFromFullName} from '@/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/ui/Table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button"
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
  imageUrl?: string;
}

interface Country {
  countryName : string,
  countryISO : string
}

const Athletes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState<Athlete[]>([]);

  const [listCountry, setListCountry] = useState<Country[]>([]);

  const fetchGetListCountries = async () => {
    // TODO : Replace with call api
    const fakeData = [
        {countryName : 'Etats unis', countryISO : 'USA'},
        {countryName : 'Canada', countryISO : 'CAN'},
    ]
    setListCountry(fakeData)
  }

  useEffect(() => {
    fetchGetListCountries();
  }, []);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleChange = (value : string) => {
    queryParams.set('country', value)
    navigate(`?${queryParams.toString()}`);
  }

  const handlegetNbrAthletesToShow = () => {
    return parseInt(queryParams.get('nbrResults') || "10")
  }

  const handleMoreAthletes = () => {
    queryParams.set('nbrResults', (handlegetNbrAthletesToShow() + 10).toString())
    navigate(`?${queryParams.toString()}`);
  }

  async function fetchData() {
    //TODO : Replace with call api
    const fakeData = [
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
    ];
    setData(fakeData);
  }
  return (
    <div>
      <Card className="p-4">
        <div className="w-2/5 ml-2">
          <Select
              onValueChange={handleChange}
              value={queryParams.get('country') || ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a country"/>
            </SelectTrigger>
            <SelectContent>
              {
                listCountry.map(
                    country => <SelectItem key={country.countryISO}
                                           value={country.countryISO}>{country.countryName}</SelectItem>
                )
              }
            </SelectContent>
          </Select>
        </div>
          <TableRoot className="mt-8 w-10/12 flex mx-auto">
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
                {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="">
                        <div className="flex items-center">
                          <Avatar>
                            <AvatarImage src={item.imageUrl} />
                            <AvatarFallback
                                className="bg-gray-200 white"
                            >{getInitialsFromFullName(item.name)}</AvatarFallback>
                          </Avatar>
                          <p className="ml-1">{item.name}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.sport}</TableCell>
                      <TableCell>{item.country}</TableCell>
                      <TableCell>{item.age}</TableCell>
                      <TableCell>
                        <ul className="flex">
                          <li>
                            <div className="text-center my-1">
                              <GoldMedal fontSize={32}/>
                              {item.medals.gold}
                            </div>
                          </li>
                          <li>
                            <div className="text-center my-1">
                              <SilverMedal fontSize={32}/>
                              {item.medals.silver}
                            </div>
                          </li>
                          <li>
                            <div className="text-center my-1">
                              <BronzeMedal fontSize={32}/>
                              {item.medals.bronze}
                            </div>
                          </li>
                        </ul>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        <div className="mt-2 flex justify-center">
          <Button
              onClick={handleMoreAthletes}
          >Load more</Button>
        </div>
      </Card>
    </div>
);
};

export default Athletes;
