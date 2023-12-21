import Grow from "@mui/material/Grow";
import React, { JSXElementConstructor } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { TransitionProps } from "@mui/material/transitions";
import { useSession, signOut, signIn } from "next-auth/react";
import { Avatar, Popover, useTheme } from "@mui/material";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";
import Link from "next/link";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
    },
    ref: React.Ref<unknown>
) {
    return <Grow style={{ transformOrigin: "0 0 1" }} ref={ref} {...props} />;
});

const UserMenu = (props: any) => {
    const theme: any = useTheme();
    const dispatch = useDispatch();
    const { data }: any = useSession();  
    const { profileMenu }: { profileMenu: any } = useSelector(selectApp);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <Popover
            TransitionComponent={Transition}
            disablePortal
            anchorEl={props?.value}
            open={profileMenu}
            onClose={() => dispatch(appSlice.actions.toggleProfileMenu(false))}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                className: `mt-4 !overflow-visible relatives py-4`,
                style: { backgroundColor: theme?.custom?.contrastBg },
                elevation: 3,
                sx: {
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        transform: "rotate(45deg)",
                        height: 20,
                        width: 20,
                        zIndex: 1,
                        backgroundColor: theme?.custom?.contrastBg,
                        top: -10,
                        right: 12,
                    },
                },
            }}
        >
            <Link
                href={`/profile/${data?.user?.name}`}
                style={{ color: `${theme.palette.text.primary}` }}
            >
                <div
                    className={`${theme.palette.mode === "light"
                        ? "hover:bg-neutral-200"
                        : "hover:bg-neutral-700"
                        } py-2 px-5 flex items-center`}
                >
                    <img
                        referrerPolicy="no-referrer"
                        className="!bg-indigo-500 mr-3"
                        style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "100%",
                        }}
                        src={data?.user?.image}
                    />
                    <span className="truncate ... w-[100px] overflow-hidden">
                        {data?.user?.name}
                    </span>
                </div>
            </Link>
            <Link href={"/"} style={{ color: `${theme.palette.text.primary}` }}>
                <div
                    className={`${theme.palette.mode === "light"
                        ? "hover:bg-neutral-200"
                        : "hover:bg-neutral-700"
                        } py-2 px-5 flex items-center`}
                >
                    <SettingsIcon className="mr-3" />
                    <span>Settings</span>
                </div>
            </Link>
            <div
                onClick={handleSignOut}
                className={`${theme.palette.mode === "light"
                    ? "hover:bg-neutral-200"
                    : "hover:bg-neutral-700"
                    } py-2 px-5 flex items-center cursor-pointer`}
            >
                <ExitToAppIcon className="mr-3" />
                <span>Sign Out</span>
            </div>
        </Popover>
    );
};

export default UserMenu;
