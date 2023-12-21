import Chip from "@mui/material/Chip";
import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import { useDispatch } from "@/lib/redux";
import { useShareCompanyMutation } from "@/lib/redux/Api";

const users = [
    {
        username: "Oliver Hansen",
        email: "oliverhansen@test.com",
        role: "viewer",
        owner: false,
    },
    {
        username: "Van Henry",
        email: "vanhenry@test.com",
        role: "viewer",
        owner: false,
    },
    {
        username: "April Tucker",
        email: "apriltucker@test.com",
        role: "viewer",
        owner: false,
    },
];

const UserSearch = (props: any) => {
    const { projectId } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [personName, setPersonName] = useState<any[]>([]);
    const [shareCompany] = useShareCompanyMutation();

    const handleShareUser = () => {
        shareCompany({ companyId: projectId, sharedUser: personName });
        setPersonName([]);
    };

    const handleInputChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        const selectedUsers = users.filter((user) => value.includes(user.username));
        setPersonName(selectedUsers);
    };

    const handleUserListClose = () => {
        setOpen(false);
    };

    const handleUserListOpen = () => {
        setOpen(true);
    };

    const handleChipDelete = (event: any, value: string) => {
        event?.stopPropagation();
        setPersonName((prevPersonName) =>
            prevPersonName.filter((user) => user.username !== value)
        );
    };

    return (
        <>
            <FormControl fullWidth>
                <Select
                    size="small"
                    id="demo-simple-select"
                    className="text-white"
                    value={personName.map((user) => user.username)}
                    open={open}
                    multiple
                    onClose={handleUserListClose}
                    onOpen={handleUserListOpen}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em className="text-gray-500">None</em>;
                        } else {
                            return (
                                <div
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={handleUserListOpen}
                                    className="flex items-center justify-start overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600"
                                >
                                    {selected.map((value: any, index: any) => (
                                        <Chip
                                            onMouseDown={(event) => {
                                                event.stopPropagation();
                                            }}
                                            onDelete={() => handleChipDelete(event, value)}
                                            deleteIcon={<DeleteIcon />}
                                            key={index}
                                            label={value}
                                            className="!mr-2 !mb-2"
                                        />
                                    ))}
                                </div>
                            );
                        }
                    }}
                    displayEmpty
                    onChange={handleInputChange}
                >
                    {users.map((user, index) => (
                        <MenuItem key={user?.username} value={user?.username}>
                            <Checkbox
                                id={user?.username}
                                checked={personName.some(
                                    (selectedUser) => selectedUser.username === user?.username
                                )}
                            />
                            <ListItemText primary={user?.username} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {personName?.length > 0 && (
                <div className="my-3 flex justify-end items-center w-full">
                    <Button
                        onClick={handleShareUser}
                        size="small"
                        variant="contained"
                        className="!font-semibold !text-white !capitalize"
                    >
                        Add Users
                    </Button>
                </div>
            )}
        </>
    );
};

export default UserSearch;
