"use client";
import React from "react";
import Link from "next/link";
import CanvasCard from "../CanvasCard";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Accordion, AccordionDetails, AccordionSummary, Divider, IconButton, useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PersonaCard = (props: any) => {
    const { card } = props;
    const theme: any = useTheme();
    const [expanded, setExpanded] = React.useState<string | false>('Details');

    const handleCardChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="h-full w-full py-2 px-4 flex flex-col justify-start items-start rounded-md">
            <div className="flex justify-between items-start w-full px-2 py-4 h-fit">
                <div>
                    <p className="font-semibold text-md">
                        Role Name&nbsp;:&nbsp;{card?.roleName}
                    </p>
                    <p className="font-semibold text-md my-2">
                        Age&nbsp;:&nbsp;{card?.metaData?.age}
                    </p>
                    <p className="font-semibold text-md">
                        Role Name&nbsp;:&nbsp;{card?.metaData?.gender}
                    </p>
                </div>
                <Link href={`Persona/${card?.roleName}`}>
                    <IconButton>
                        <OpenInFullIcon />
                    </IconButton>
                </Link>
            </div>
            <Divider className="w-full !my-1" />
            <div className="grow w-full overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-3">

                {card?.cards?.map((data: any) => {
                    return (
                        <Accordion key={data?.id} id={data?.cardName} disableGutters elevation={0} expanded={expanded === data?.cardName} onChange={handleCardChange(data?.cardName)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <p>
                                    {data?.cardName}
                                </p>
                            </AccordionSummary>
                            <AccordionDetails className="!px-0">
                                <CanvasCard
                                    expand={false}
                                    loading={false}
                                    className={`${theme?.palette?.mode === "light" ? "!bg-cyan-100" : "!bg-cyan-900"
                                        } my-3 !max-h-[300px] !h-[300px]`}
                                    card={data}
                                />
                            </AccordionDetails>
                        </Accordion>

                    );
                })}
            </div>
        </div>
    );
};

export default PersonaCard;
