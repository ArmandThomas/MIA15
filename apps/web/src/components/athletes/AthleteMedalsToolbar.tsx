import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function AthleteMedalsToolbar() {
  const [value, setValue] = useState("");
  const data = [
    {
      value: "chocolate",
      label: "🍫  Schoggi (Swiss german for 'Chocolate')",
    },
    {
      value: "cheese",
      label: "🧀  Chäs (Swiss german for 'Cheese')",
    },
    {
      value: "fondue",
      label: "🫕  Fondü (Swiss german for 'Fondue')",
    },
    {
      value: "Milk",
      label: "🥛  Melch (Swiss german for 'Milk')",
    },
  ];

  return (
    <div className="flex flex-1 gap-2">
      <div className="min-w-36">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="mx-auto h-10">
            <SelectValue placeholder="Select" aria-label={value} />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <span className="flex items-center gap-x-2">{item.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="h-10 whitespace-nowrap" variant="secondary" onClick={() => setValue("")}>
        Reset selection
      </Button>
    </div>
  );
}
