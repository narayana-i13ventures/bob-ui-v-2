import React from "react";
import { Metadata } from "next";
import { Container, Divider } from "@mui/material";
import Header from "../components/shared/Header/Header";
import NewProjectModal from "../components/Dashboard/NewProject/NewProjectModal";
import NewProjectModalButton from "../components/Dashboard/NewProject/NewProjectModalButton";
import ProjectCardsContainer from "../components/Dashboard/Projects/ProjectCardsContainer";
import ProjectFilter from "../components/Dashboard/Projects/ProjectFilter";

const Dashboard = () => {

    return (
        <>
            <Header />
            <Container
                className="!flex flex-col justify-between items-start !px-10 !pb-6"
                maxWidth={"xl"}
                disableGutters
            >
                <div className="flex justify-between items-center w-full mt-8">
                    <div>
                        <h3 className="text-2xl font-semibold">Dashboard</h3>
                    </div>
                    <NewProjectModalButton />
                    <NewProjectModal />
                </div>
                <hr className="border-slate-200 mt-2 w-full" />
                <div className="mt-5 flex flex-col justify-start items-start w-full">
                    <ProjectFilter />
                    <ProjectCardsContainer />
                </div>
            </Container>
        </>
    );
};

export default Dashboard;

export const metadata: Metadata = {
    title: "Bob-Ui - Dashboard",
};
