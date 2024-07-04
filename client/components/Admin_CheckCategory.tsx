import { toggle_error } from "@/redux/feature/error";
import { AppDispatch } from "@/redux/store";
import { Checkbox, CheckboxGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Elsie_Swash_Caps } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

// const keyValues = ["customer", "time", "spent", "woman", "retail"];


export function CheckCategory({ keyValues }: { keyValues: string[]; }) {
    const [cat_1, setCat_1] = useState(Array(keyValues.length).fill([]));
    const [cat_2, setCat_2] = useState(Array(keyValues.length).fill([]));
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const category_1 = ["Direct", "Reported", "Judgemental"];
    const category_2 = [
        "IDEOLOGICAL-INEQUALITY",
        "STEREOTYPING-DOMINANCE",
        "OBJECTIFICATION",
        "SEXUAL-VIOLENCE",
        "MISOGYNY-NON-SEXUAL-VIOLENCE"
    ];

    const columns = [
        {
            key: "keyword",
            label: "KEYWORD",
        },
        {
            key: "category_1",
            label: "CATEGORY 1",
        },
        {
            key: "category_2",
            label: "CATEGORY 2",
        },
    ];

    function convertData(data: any) {
        const elements: string[] = data.split(" ");

        const result = {
            keyword: "",
            category_1: "",
            category_2: ""
        };

        elements.forEach(element => {
            const [keyword, category] = element.split("-@");
            if (!result.keyword) {
                result.keyword = keyword;
            }
            if (category === "Reported" || category === "Direct" || category === "Judgemental") {
                result.category_1 = category.toUpperCase();
            } else {
                result.category_2 = category.toUpperCase();
            }
        });
        return [result];
    }
    const handleCat1Change = (index: any, values: any) => {
        const newCat_1 = [...cat_1];
        newCat_1[index] = values;
        setCat_1(newCat_1);
    };

    const handleCat_2Change = (index: any, values: any) => {
        const newCat_2 = [...cat_2];
        newCat_2[index] = values;
        setCat_2(newCat_2);
    };

    const getFormattedData = () => {
        const formattedData: any = [];
        keyValues.forEach((item, index) => {
            if (cat_1[index] && cat_1[index].length > 0 || cat_1[index] && cat_2[index].length > 0) {
                const dataString = [...cat_1[index], ...cat_2[index]].join(" ");
                formattedData.push(...convertData(dataString));
            }
        });
        if (formattedData.length > 0) {

            fetch('/api/admin/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedData),
            }).then(response => {
                if (!response.ok) {
                    dispatch(toggle_error({ type: "alert", data: "Server error Try after some time" }));
                }
                return response.json();
            }).then(data => {
                dispatch(toggle_error({ type: data.status, data: data.message }));
                if (data.status == "success") {
                    router.refresh();
                }
            });
        } else {
            dispatch(toggle_error({ type: "alert", data: "Please select the field" }));
        }
    };

    return (
        <div className="flex items-center flex-col">
            <Table className="flex flex-col items-center space-y-5 w-3/4 mx-auto" isStriped aria-label="Keyword Table">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent="No keyword to be found">
                    {keyValues.length > 1 ? keyValues.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-xl capitalize">{item}</TableCell>
                            <TableCell>
                                <CheckboxGroup
                                    isRequired
                                    isDisabled={cat_1[index] && cat_1[index].length >= 1}
                                    value={cat_1[index]}
                                    onValueChange={(values) => handleCat1Change(index, values)}
                                >
                                    {category_1.map((value, idx) => (
                                        <Checkbox key={idx} value={`${item}-@${value}`}>{value}</Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </TableCell>
                            <TableCell>
                                <CheckboxGroup
                                    isDisabled={cat_2[index] && cat_2[index].length >= 1}
                                    value={cat_2[index]}
                                    onValueChange={(values) => handleCat_2Change(index, values)}
                                >
                                    {category_2.map((value, idx) => (
                                        <Checkbox key={idx} value={`${item}-@${value}`}>{value}</Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </TableCell>
                        </TableRow>
                    )) :
                        []
                    }
                </TableBody>
            </Table>
            <div onClick={getFormattedData} className="px-4 py-2 mt-5 mx-5 text-lg capitalize bg-green-400 rounded-md shadow-xl x-4  text-stone-800 shadow-green-600">Add Keywords</div>
        </div>
    );
}
