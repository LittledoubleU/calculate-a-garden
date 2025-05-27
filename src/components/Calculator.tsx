import DropDown from "./DropDown";
import basePrice from '../data/basePrice.json';
import growthMutation from '../data/growthMutation.json';
import mutationPlant from '../data/mutation.json';
import { useMemo, useState } from "react";
import MutationList from "./MutationList";

export default function Calculator() {

    const [selectPlant, setSelectPlant] = useState<number | null>(null); // index
    const [selectGrowthMutation, setSelectGrowthMutation] = useState<number | null>(null);
    const [selectMutation, setSelectMutation] = useState<{ [key: number]: boolean } | null>(null);

    const handleOnChange = (value: number) => {
        setSelectPlant(value);
    };

    const handleGrowthOnChange = (value: number) => {
        setSelectGrowthMutation(value);
    };

    const handleMutation = (value: { [key: number]: boolean } ) => {
        setSelectMutation(value);
    }

    const calculateGarden = () => {
        if (selectPlant !== null && selectGrowthMutation !== null) {
            const plantData = basePrice.PlantMinValues[selectPlant];
            const growthType = growthMutation.GrowthMutations[selectGrowthMutation]

            let mutationBonus = 0; // default

            if (selectMutation) {
                Object.entries(selectMutation).forEach(([indexStr, isChecked]) => {
                    if (isChecked) {
                        const index = Number(indexStr);
                        mutationBonus += mutationPlant.MutationStackBonuses[index].StackBonus;
                    }
                });
            }

            return plantData.MinValue * growthType.Multiplier * (1 + mutationBonus); // Or any calculation you want
        }

        return "Please select a plant.";
    };

    const value = useMemo(() => calculateGarden(), [selectPlant, selectGrowthMutation, selectMutation])

    return (
        <div className="bg-white m-auto md:max-w-120 max-w-[85%] h-[600px] p-10">
            <h1 className="text-[200%] font-bold">Calculate a Garden</h1>
            <DropDown 
                data={basePrice.PlantMinValues} 
                name="Plant"
                handleOnChange={handleOnChange} 
            />
            <DropDown 
                data={growthMutation.GrowthMutations} 
                name="Type"
                handleOnChange={handleGrowthOnChange} 
            />
            <h2 className="text-[150%] font-semibold">Mutation Stack</h2>
            <MutationList 
                data={mutationPlant.MutationStackBonuses}
                handleMutation={handleMutation}
            />
            {value}
        </div>
    )
}
