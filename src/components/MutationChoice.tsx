import { useState } from "react";

interface myProps {
    label: string | number;
    checked: boolean;
    onChange: (checked: boolean) => void;
}


export default function MutationChoice(props: myProps) {

    const { label, checked, onChange } = props;

    return (
        <label className="me-5">
            <input 
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
                {label}
        </label>
    )
}
