"use client";
import { useDispatch } from "@/lib/redux";
import { apiSlice } from "@/lib/redux/Api";
import {
    FormControl,
    Select,
    SelectChangeEvent,
    MenuItem,
    InputBase,
} from "@mui/material";
import React, { useState } from "react";

const ProjectFilter = () => {
    const dispatch = useDispatch();
    const [sort, setSort] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value as string;
        setSort(selectedValue);
        dispatch(
            apiSlice.util.updateQueryData("getCompanies", {}, (draft: any) => {
                return draft.slice().sort((a: any, b: any) => {
                    const dateA: any = parseDate(a.createdAt);
                    const dateB: any = parseDate(b.createdAt);

                    if (selectedValue === "a-z") {
                        return a.companyName.localeCompare(b.companyName);
                    } else if (selectedValue === "date") {
                        return dateB - dateA;
                    } else if (selectedValue === "newest") {
                        return b.newestField - a.newestField;
                    } else {
                        return 0;
                    }
                });
            })
        );
    };

    const parseDate = (dateString: string) => {
        const [day, month, year] = dateString.split("/").map(Number);
        return new Date(year, month - 1, day);
    };

    return (
        <>
            <div className="mb-6 flex justify-end items-center w-full">
                <p>Sort By&nbsp;:</p>
                <div>
                    <FormControl fullWidth>
                        <Select
                            className="!rounded-full !ml-3 !p-0 !w-[150px] !text-center"
                            size="small"
                            id="demo-simple-select"
                            value={sort || "default"}
                            onChange={handleChange}
                            input={<InputBase className="border-[1px] border-primary" />}
                        >
                            <MenuItem value={"default"} disabled>
                                Nothing
                            </MenuItem>
                            <MenuItem value={"a-z"}>A - Z</MenuItem>
                            <MenuItem value={"date"}>Date</MenuItem>
                            <MenuItem value={"newest"}>Newest</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div></div>
            </div>
        </>
    );
};

export default ProjectFilter;
