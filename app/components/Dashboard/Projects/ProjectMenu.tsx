import Grow from "@mui/material/Grow";
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { Popover, useTheme } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { JSXElementConstructor } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useDeleteCompanyByIdMutation } from "@/lib/redux/Api";
import { ProjectApiSlice, useDeleteProjectByIdMutation } from "@/lib/redux/projectApi";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Grow style={{ transformOrigin: "0 0 1" }} ref={ref} {...props} />;
});

const ProjectMenu = (props: any) => {
    const theme: any = useTheme();
    // const [deleteProject] = useDeleteCompanyByIdMutation();
    const [deleteProject] = useDeleteProjectByIdMutation();
    const handleDeleteProjectById = (projectId: any) => {
        // deleteProject(projectId);
        console.log(ProjectApiSlice.endpoints);
        
    }
    return (
        <Popover
            TransitionComponent={Transition}
            disablePortal
            anchorEl={props?.value}
            open={props?.projectMenuOpen}
            onClose={() => props?.setProjectMenuOpen(false)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                className: `mt-2 !overflow-visible relatives py-4`,
                style: { backgroundColor: theme?.custom?.contrastBg },
                elevation: 1,
                sx: {
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        transform: "rotate(45deg)",
                        height: 15,
                        width: 15,
                        zIndex: 1,
                        backgroundColor: theme?.custom?.contrastBg,
                        top: -7.5,
                        right: 13,
                    },
                },
            }}
        >
            <div className={`${theme.palette.mode === "light"
                ? "hover:bg-neutral-200"
                : "hover:bg-neutral-700"
                } py-2 px-5 flex items-center cursor-pointer`}>
                <EditIcon className="mr-2" />
                <span>Edit</span>
            </div>
            <div className={`${theme.palette.mode === "light"
                ? "hover:bg-neutral-200"
                : "hover:bg-neutral-700"
                } py-2 px-5 flex items-center cursor-pointer`}>
                <ShareIcon className="mr-2" />
                <span>Share</span>
            </div>
            <div className={`${theme.palette.mode === "light"
                ? "hover:bg-neutral-200"
                : "hover:bg-neutral-700"
                } py-2 px-5 flex items-center cursor-pointer`}>
                <LockIcon className="mr-2" />
                <span>Lock</span>
            </div>
            <div onClick={() => handleDeleteProjectById(props?.projectId)} className={`${theme.palette.mode === "light"
                ? "hover:bg-neutral-200"
                : "hover:bg-neutral-700"
                } py-2 px-5 flex items-center !text-red-500 cursor-pointer`}>
                <DeleteIcon className="mr-2 !text-[20px]" />
                <span>Delete</span>
            </div>
        </Popover>
    );
};

export default ProjectMenu;
