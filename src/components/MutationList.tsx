import MutationChoice from "./MutationChoice";
import { useState } from "react";

interface myProps {
    data: {[key:string]: string | number}[];
    handleMutation: (value: { [key: number]: boolean }) => void;
}

export default function MutationList(props: myProps) {

    const { data, handleMutation } = props;

    const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

    const handleCheckList = (index: number, isChecked: boolean) => {
        setCheckedItems(prev => {
            const updated = {
                ...prev,
                [index]: isChecked
            };
            handleMutation(updated); // ← send updated state up
            return updated;
        });
    };
    
    return (
        <div className="w-full flex flex-wrap my-2">
            {data.map((d, i) => 
                <MutationChoice 
                    key={i} 
                    label={d["Mutation"]}
                    checked={!!checkedItems[i]}
                    onChange={(isChecked) => handleCheckList(i, isChecked)} 
                />
            )}
        </div>
    )
}
