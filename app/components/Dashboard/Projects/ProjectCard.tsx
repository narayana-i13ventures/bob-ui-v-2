import {
    Avatar,
    Card,
    IconButton,
    LinearProgress,
    Tooltip,
} from "@mui/material";
import React, { useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProjectMenu from "./ProjectMenu";
import Link from "next/link";
import ProjectShareModal from "../../shared/Share/ProjectShareModal";
import moment from 'moment';

const ProjectCard = (props: any) => {
    const { project } = props;
    const projectMenuBtnRef = useRef(null);
    const [projectMenuOpen, setProjectMenuOpen] = useState(false);
    const [projectShareModal, setProjectShareModal] = useState(false);
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const openProjectShareModal = () => {
        setProjectShareModal(true);
    };
    const closeProjectShareModal = () => {
        setProjectShareModal(false);
    };
    const handleProjectMenuOpen = () => {
        setProjectMenuOpen(true);
    };
    return (
        <>
            <Card className="p-2 flex justify-start items-start flex-col ">
                <div className="flex justify-between items-center w-full">
                    <Link href={`${project?.project_id}/ThinkBeyond`}>
                        <p className="hover:underline underline-offset-2 py-2 text-lg font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {project?.project_name}
                        </p>
                    </Link>
                    <IconButton ref={projectMenuBtnRef} onClick={handleProjectMenuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <ProjectMenu
                        projectId={project?.project_id}
                        projectMenuOpen={projectMenuOpen}
                        setProjectMenuOpen={setProjectMenuOpen}
                        value={projectMenuBtnRef?.current}
                    />
                </div>
                <p className="py-2 text-sm font-semibold">
                    {/* Started on:&nbsp;{project?.created_on} */}
                    Started on:&nbsp;{moment(project?.created_on).format('LL')}
                </p>
                <div className="flex justify-start items-center my-2">
                    <p className="py-2 text-sm font-semibold">Shared with:&nbsp;</p>
                    <div
                        onClick={openProjectShareModal}
                        className="flex justify-start items-center ml-4 cursor-pointer"
                    >
                        {project?.shared?.length > 0 ? (
                            <>
                                {project?.shared?.slice(0, 3).map((user: any, index: any) => (
                                    <Tooltip
                                        key={index}
                                        title={user?.username}
                                        placement="top"
                                        arrow
                                    >
                                        <Avatar
                                            sx={{
                                                width: 25,
                                                height: 25,
                                                fontSize: "16px",
                                                marginLeft: `-${index * 6}px`,
                                                backgroundColor: getRandomColor(), // Set a random background color
                                            }}
                                        >
                                            {user?.username[0]}
                                        </Avatar>
                                    </Tooltip>
                                ))}

                                {project?.shared?.slice(3).length > 0 && (
                                    <Tooltip
                                        title={project?.shared.slice(3).map((user: any, index: any) => (
                                            <p key={index}>{user?.username}</p>
                                        ))}
                                        placement="bottom"
                                        arrow
                                    >
                                        <span className="ml-2 hover:underline underline-offset-2 transition-all duration-500 ease-in">
                                            +{project?.shared?.slice(3).length} more
                                        </span>
                                    </Tooltip>
                                )}
                            </>
                        ) : (
                            <p className="hover:underline underline-offset-2">None</p>
                        )}
                    </div>
                </div>
                <Tooltip title={"Value Proposition Canvas"} placement="bottom" arrow>
                    <div className="bg-orange-400 rounded-md px-3 py-1 my-2  max-w-full w-full text-center">
                        <p className="!text-black font-semibold text-sm max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
                            Current Canvas:&nbsp;Value Proposition Canvas
                        </p>
                    </div>
                </Tooltip>
                <div className="flex items-center w-full">
                    <LinearProgress
                        variant="determinate"
                        value={40}
                        className="w-full my-2 !rounded-md"
                    />
                    <span className="px-3 text-xs font-semibold">40%</span>
                </div>
            </Card>
            <ProjectShareModal open={projectShareModal} project={project} closeModal={closeProjectShareModal} />
        </>
    );
};

export default ProjectCard;
