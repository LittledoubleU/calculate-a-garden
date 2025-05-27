// props
// array of objects
// name
// valueName


interface myProps {
    data: {[key:string]: string | number}[];
    name: string;
    handleOnChange: (n: number) => void;
}

export default function DropDown(props: myProps) {

    const {data, name, handleOnChange} = props;

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = parseInt(e.target.value, 10);
        console.log(selectedIndex);
        handleOnChange(selectedIndex);
    };

    return (
        <select 
            className="w-full my-4 border"
            onChange={onChange}
        >
            <option disabled selected value="" style={{display: "none"}}>Select a {name}</option>
            {data.map((d, i) => 
                <option 
                    key={i} 
                    value={i}
                >
                    {d[name]}
                </option>
            )}
        </select>
    )
}
