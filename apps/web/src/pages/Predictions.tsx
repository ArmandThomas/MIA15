
import { Card } from '@/components/ui/Card';
import FakeData from '@/assets/fakedata/predictions.json'
import {Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow} from "@/components/ui/Table.tsx";
import BronzeMedal from '@/assets/medals_icons/BronzeMedal';
import SilverMedal from '@/assets/medals_icons/SilverMedal';
import GoldMedal from '@/assets/medals_icons/GoldMedal';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/Avatar.tsx";
interface PredictedCountries {
    country_name : string
    country_code ?: string
    pred_bronze_medals_2024_DT : number
    pred_bronze_medals_2024_GB : number
    pred_bronze_medals_2024_LR : number
    pred_gold_medals_2024_DT  : number
    pred_gold_medals_2024_GB  : number
    pred_gold_medals_2024_LR  : number
    pred_silver_medals_2024_DT  : number
    pred_silver_medals_2024_GB  : number
    pred_silver_medals_2024_LR : number
}

export const Predictions = () => {

   const data = FakeData as PredictedCountries[];
   const top25Countries = data.slice(0,25)

    console.log(top25Countries)
    return (
        <div className="mt-4 w-10/12 mx-auto">
            <Card className="p-4">
                <TableRoot className="mt-8">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>Countries</TableHeaderCell>
                                <TableHeaderCell>DecisionTreeRegressor</TableHeaderCell>
                                <TableHeaderCell>LinearRegression</TableHeaderCell>
                                <TableHeaderCell>GradientBoostingRegressor</TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {top25Countries.map((item) => (
                                <TableRow key={item.country_name}>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Avatar>
                                                <AvatarImage
                                                    src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${item.country_code}.svg`}
                                                />
                                                <AvatarFallback
                                                    className="bg-gray-200 white"
                                                >{item.country_code}</AvatarFallback>
                                            </Avatar>
                                            <p className="ml-1">{item.country_name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <ul className="flex">
                                            <li>
                                                <div className="text-center my-1">
                                                    <GoldMedal fontSize={32}/>
                                                    {item.pred_gold_medals_2024_DT}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="text-center my-1">
                                                    <SilverMedal fontSize={32}/>
                                                    {item.pred_silver_medals_2024_DT}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="text-center my-1">
                                                    <BronzeMedal fontSize={32}/>
                                                    {item.pred_bronze_medals_2024_DT}
                                                </div>
                                            </li>
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <ul className="flex">
                                            <li>
                                                <div className="text-center my-1">
                                                    <GoldMedal fontSize={32}/>
                                                    {item.pred_gold_medals_2024_LR}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="text-center my-1">
                                                    <SilverMedal fontSize={32}/>
                                                    {item.pred_silver_medals_2024_LR}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="text-center my-1">
                                                    <BronzeMedal fontSize={32}/>
                                                    {item.pred_bronze_medals_2024_LR}
                                                </div>
                                            </li>
                                        </ul>
                                    </TableCell>
                                    <TableCell>
                                        <ul className="flex">
                                            <li>
                                                <div className="text-center my-1">
                                                    <GoldMedal fontSize={32}/>
                                                    {item.pred_gold_medals_2024_GB}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="text-center my-1">
                                                    <SilverMedal fontSize={32}/>
                                                    {item.pred_silver_medals_2024_GB}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="text-center my-1">
                                                    <BronzeMedal fontSize={32}/>
                                                    {item.pred_bronze_medals_2024_GB}
                                                </div>
                                            </li>
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableRoot>
            </Card>
        </div>
    )
}