import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BronzeMedal from "@/assets/medals_icons/BronzeMedal";
import SilverMedal from "@/assets/medals_icons/SilverMedal";
import GoldMedal from "@/assets/medals_icons/GoldMedal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getInitialsFromFullName } from "@/utils";

import TopAthletes from "@/assets/fakedata/top_athletes.json";

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
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface Athlete {
  id: number;
  athlete_full_name: string;
  discipline_title: string;
  country_3_letter_code: string;
  country_code: string;
  athlete_year_birth: number;
  silver_medals: number;
  gold_medals: number;
  bronze_medals: number;
  athlete_url?: string;
  total_medals: number;
  total_medals_all_time: number;
  country_name: string;
}

interface Country {
  countryName: string;
  countryISO: string;
}

const Athletes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [data, setData] = useState<Athlete[]>([]);

  const [listCountry, setListCountry] = useState<Country[]>([]);

  const fetchGetListCountries = async () => {
    // TODO : Replace with call api
    const data = TopAthletes;
    const fakeData = data.filter((item) => item.country_3_letter_code !== "");
    const key = "country_name";
    const arrayUniqueByKey = [...new Map(fakeData.map((item) => [item[key], item])).values()];
    const countries = arrayUniqueByKey
      .map((item) => {
        return {
          countryName: item.country_name,
          countryISO: item.country_3_letter_code,
        };
      })
      .sort((a, b) => a.countryName.localeCompare(b.countryName));
    setListCountry(countries);
  };

  useEffect(() => {
    fetchGetListCountries();
  }, []);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const handleChange = (value: string) => {
    queryParams.set("country", value);
    navigate(`?${queryParams.toString()}`);
  };

  const handlegetNbrAthletesToShow = () => {
    return parseInt(queryParams.get("nbrResults") || "10");
  };

  const handleMoreAthletes = () => {
    queryParams.set("nbrResults", (handlegetNbrAthletesToShow() + 10).toString());
    navigate(`?${queryParams.toString()}`);
  };

  async function fetchData() {
    //TODO : Replace with call api
    const data = TopAthletes;
    console.log(data);
    if (queryParams.get("country")) {
      // @ts-ignore
      setData(data.filter((item) => item.country_3_letter_code === queryParams.get("country")));
      return;
    }
    // @ts-ignore
    setData(data.slice(0, handlegetNbrAthletesToShow()));
  }
  return (
    <div>
      <Card className="p-4">
        <div className="w-2/5 ml-2">
          <Select onValueChange={handleChange} value={queryParams.get("country") || ""}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {listCountry.map((country) => (
                <SelectItem key={country.countryISO} value={country.countryISO}>
                  {country.countryName}
                </SelectItem>
              ))}
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
                <TableHeaderCell>Année de naissance</TableHeaderCell>
                <TableHeaderCell>Médailles (en solo)</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.athlete_full_name}>
                  <TableCell className="">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src={item.athlete_url} />
                        <AvatarFallback className="bg-gray-200 white">
                          {getInitialsFromFullName(item.athlete_full_name)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="ml-1">{item.athlete_full_name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.discipline_title}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${item.country_code}.svg`}
                        />
                        <AvatarFallback className="bg-gray-200 white">
                          {item.country_3_letter_code}
                        </AvatarFallback>
                      </Avatar>
                      <p className="ml-1">{item.country_name}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.athlete_year_birth}</TableCell>
                  <TableCell>{item.total_medals_all_time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
        <div className="mt-2 flex justify-center">
          <Button onClick={handleMoreAthletes}>Load more</Button>
        </div>
      </Card>
    </div>
  );
};

export default Athletes;
