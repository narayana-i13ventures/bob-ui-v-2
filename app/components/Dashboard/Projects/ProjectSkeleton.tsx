import { Card, Grid, Skeleton } from "@mui/material";
import React from "react";

const ProjectSkeleton = () => {
    const CardSkeleton = () => {
        return (
            <Card className="p-2 h-full opacity-40 min-h-[200px]">
                <div className="flex flex-col justify-between h-full">
                    <Skeleton
                        className="rounded-2xl"
                        variant="rectangular"
                        width={"100%"}
                        height={"20px"}
                    />
                    <Skeleton
                        className="rounded-2xl"
                        variant="rectangular"
                        width={"100%"}
                        height={"20px"}
                    />
                    <Skeleton
                        className="rounded-2xl"
                        variant="rectangular"
                        width={"100%"}
                        height={"20px"}
                    />
                    <div className="flex justify-between items-center my-2">
                        <Skeleton
                            className="rounded-2xl mr-8"
                            variant="rectangular"
                            width={"100%"}
                            height={"20px"}
                        />
                        <div className="flex justify-center items-center pr-16">
                            <Skeleton
                                className=""
                                variant="circular"
                                width={"40px"}
                                height={"40px"}
                            />
                            <Skeleton
                                className="-ml-2"
                                variant="circular"
                                width={"40px"}
                                height={"40px"}
                            />
                            <Skeleton
                                className="-ml-2"
                                variant="circular"
                                width={"40px"}
                                height={"40px"}
                            />
                        </div>
                    </div>
                    <Skeleton
                        className="rounded-2xl"
                        variant="rectangular"
                        width={"100%"}
                        height={"20px"}
                    />
                </div>
            </Card>
        );
    };
    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <CardSkeleton />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <CardSkeleton />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <CardSkeleton />
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                    <CardSkeleton />
                </Grid>
            </Grid>
        </>
    );
};

export default ProjectSkeleton;
