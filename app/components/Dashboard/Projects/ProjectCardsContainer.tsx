"use client";
import React, { useEffect } from "react";
import { selectApp, useDispatch, useSelector } from "@/lib/redux";
import { Grid, Button } from "@mui/material";
import ProjectCard from "./ProjectCard";
import ProjectShareModal from "../../shared/Share/ProjectShareModal";
import ProjectSkeleton from "./ProjectSkeleton";
import { useGetCompaniesQuery } from "@/lib/redux/Api";
import { useGetAllProjectsQuery } from "@/lib/redux/projectApi";

const ProjectCardsContainer = () => {
    // const {
    //     data: AllCompanies,
    //     isLoading: CompanyLoading,
    //     isError: CompanyError,
    //     refetch,
    // } = useGetCompaniesQuery({});
    const {
        data: AllCompanies,
        isLoading: CompanyLoading,
        isError: CompanyError,
        refetch: GetProjects
    } = useGetAllProjectsQuery({});

    const handleRetry = () => {
        GetProjects()
    };
    const { show_projects }: any = useSelector(selectApp);
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
                    {show_projects === 'own' ? <Grid container spacing={4}>
                        {AllCompanies?.owned_projects?.map((company: any) => {
                            return (
                                <Grid key={company.project_id} item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <ProjectCard project={company} />
                                </Grid>
                            );
                        })}
                    </Grid> : <Grid container spacing={4}>
                        {AllCompanies?.shared_projects?.map((company: any) => {
                            return (
                                <Grid key={company.project_id} item xs={3} sm={3} md={3} lg={3} xl={3}>
                                    <ProjectCard project={company} />
                                </Grid>
                            );
                        })}
                    </Grid>}
                </>
            )}
        </>
    );
};

export default ProjectCardsContainer;
