"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "@/lib/redux";
import { Grid, Button } from "@mui/material";
import ProjectCard from "./ProjectCard";
import ProjectShareModal from "../../shared/Share/ProjectShareModal";
import ProjectSkeleton from "./ProjectSkeleton";
import { useGetCompaniesQuery } from "@/lib/redux/Api";

const ProjectCardsContainer = () => {
    const {
        data: AllCompanies,
        isLoading: CompanyLoading,
        isError: CompanyError,
        refetch,
    } = useGetCompaniesQuery({});

    const handleRetry = () => {
        refetch();
    };

    return (
        <>
            {CompanyLoading ? (
                <ProjectSkeleton />
            ) : CompanyError ? (
                <div className="flex flex-col items-center justify-center w-full">
                    <p className="my-4">Something Went Wrong. Please Try Again</p>
                    <Button
                        variant="contained"
                        className="!capitalize !text-white !font-semibold"
                        onClick={handleRetry}
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <>
                    <Grid container spacing={4}>
                        {AllCompanies?.map((company: any) => {
                            return (
                                <Grid key={company.id} item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <ProjectCard project={company} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}

        </>
    );
};

export default ProjectCardsContainer;
