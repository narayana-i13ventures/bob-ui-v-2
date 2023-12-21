import {
    Avatar,
    Button,
    FormControl,
    IconButton,
    MenuItem,
    Select,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { companySlice, useDispatch } from "@/lib/redux";
import { useUnshareCompanyMutation } from "@/lib/redux/Api";

const ShareUserNameCard = (props: any) => {
    const { user, roleControl, projectId } = props;
    const [unshareProject] = useUnshareCompanyMutation();

    const handleUserRoleChange = (e: any) => { };

    const handleUserDelete = (id: any) => {
        unshareProject({ companyId: projectId, sharedUserId: user?._id });
    };

    return (
        <div className="flex justify-between items-center mb-5">
            <div className="flex justify-start items-center">
                <Avatar className="!bg-blue-500" sx={{ width: 30, height: 30 }}>
                    J
                </Avatar>
                <div className="ml-5">
                    <p className="font-semibold text-sm">
                        {user?.username}
                        {user?.owner && <>&nbsp;&nbsp;(you)</>}
                    </p>
                    <span className="text-xs">{user?.email}</span>
                </div>
            </div>
            <div className="flex justify-end items-center">
                {roleControl && !user?.owner && (
                    <>
                        <FormControl fullWidth size="small" className="!mx-3">
                            <Select
                                size="small"
                                id="user-role-select"
                                value={user?.role}
                                onChange={(e) => handleUserRoleChange(exports)}
                            >
                                <MenuItem value={"editor"}>Editor</MenuItem>
                                <MenuItem value={"commenter"}>Commenter</MenuItem>
                                <MenuItem value={"viewer"}>Viewer</MenuItem>
                            </Select>
                        </FormControl>

                        <IconButton onClick={() => handleUserDelete(user?.id)}>
                            <CloseIcon />
                        </IconButton>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShareUserNameCard;
