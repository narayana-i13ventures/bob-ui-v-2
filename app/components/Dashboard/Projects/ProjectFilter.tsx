"use client";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import { apiSlice } from "@/lib/redux/Api";
import {
    FormControl,
    Select,
    SelectChangeEvent,
    MenuItem,
    InputBase,
    Tabs,
    Tab,
} from "@mui/material";
import React, { useState } from "react";

const ProjectFilter = () => {
    const dispatch = useDispatch();
    const [sort, setSort] = useState("");
    const { show_projects } = useSelector(selectApp);
    const handleSortChange = (event: SelectChangeEvent) => {
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

    const handleProjectTabChange = (event: React.SyntheticEvent, value: string) => {
        dispatch(appSlice?.actions?.toggleShowProjects(value))
    }

    return (
        <>
            <div className="mb-6 flex justify-between items-center w-full">
                <div>
                    <Tabs value={show_projects} onChange={handleProjectTabChange}>
                        <Tab className="!capitalize !font-semibold !text-lg" label="owned" value={'own'} />
                        <Tab className="!capitalize !font-semibold !text-lg" label="shared With Me" value={'shared'} />
                    </Tabs>
                </div>
                <div className="flex justify-end items-center">
                    <p>Sort By&nbsp;:</p>
                    <div>
                        <FormControl fullWidth>
                            <Select
                                className="!rounded-full !ml-3 !p-0 !w-[150px] !text-center"
                                size="small"
                                id="demo-simple-select"
                                value={sort || "default"}
                                onChange={handleSortChange}
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
                </div>
            </div>
        </>
    );
};

export default ProjectFilter;
