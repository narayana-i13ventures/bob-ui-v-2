import React from "react";
import Link from "next/link";
import {
    Drawer,
    List,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CircularProgress,
    Button,
} from "@mui/material";
import { useGetMenuQuery } from "@/lib/redux/Api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useParams, usePathname, useRouter } from "next/navigation";
import { appSlice, selectApp, useDispatch, useSelector } from "@/lib/redux";

const CanvasNavigation = (props: any) => {
    const router = useRouter();
    const { drawerWidth } = props;
    const pathName = usePathname();
    const dispatch = useDispatch();
    const { projectId, futureId } = useParams();

    const { leftSidebarOpen } = useSelector(selectApp);
    const [MethodologyExpanded, setMethodologyExpanded] = React.useState<
        string | false
    >("ThinkBeyond");
    const [MicroframeworksExpanded, setMicroframeworksExpanded] = React.useState<
        string | false
    >("Micro frameworks");
    const {
        data: Menu,
        isLoading: loading,
        isError: error,
        refetch: MenuRefetch,
    } = useGetMenuQuery({});

    const handleLeftBarClose = () => {
        dispatch(appSlice.actions.toggleLeftSidebar(false));
    };

    const handleMethodologyChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            // setMethodologyExpanded(isExpanded ? panel : false);
            router.push(`/${projectId}/ThinkBeyond`);
        };
    const handleMicroframeworkChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            // setMicroframeworksExpanded(isExpanded ? panel : false);
            router.push(`/${projectId}/${futureId}/MicroFrameworks`);
        };
    const renderMenu = () => {
        if (loading) {
            return (
                <div className="w-full py-10">
                    <CircularProgress />
                </div>
            );
        }
        if (error) {
            return (
                <div className="w-full py-10">
                    <p>Error loading data</p>
                    <Button
                        className="!text-white !capitalize !font-semibold"
                        variant="contained"
                        onClick={MenuRefetch}
                    >
                        Retry
                    </Button>
                </div>
            );
        }
        return Menu?.map((methodology: any, index: any) => (
            <Accordion
                disableGutters
                key={index}
                elevation={0}
                expanded={MethodologyExpanded === methodology?.methodology}
                onChange={handleMethodologyChange(methodology?.methodology)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <ArrowBackIcon className="mr-3" />
                    <p className="font-semibold text-lg">{methodology?.methodology}</p>
                </AccordionSummary>
                <AccordionDetails>
                    {methodology?.frameworks?.map((framework: any, index: any) => (
                        <Accordion
                            disableGutters
                            elevation={0}
                            key={index}
                            expanded={MicroframeworksExpanded === framework?.name}
                            onChange={handleMicroframeworkChange(framework?.name)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <ArrowBackIcon className="mr-3" />
                                <p className="font-semibold text-lg">{framework?.name}</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List>
                                    {framework?.canvases
                                        ?.filter((canvas: any) => canvas?.locked === false)
                                        .map((canvas: any, index: any) => (
                                            <Link href={ `/${projectId}/${futureId}/${canvas?.route}`} key={index}>
                                                <ListItem
                                                    disablePadding
                                                    className={`!my-1 !p-1 ${pathName?.includes(canvas?.route)
                                                        ? "bg-primary text-white !rounded-md overflow-hidden"
                                                        : ""
                                                        }`}
                                                >
                                                    <ListItemButton className="!p-1 !px-2">
                                                        <ListItemText className="!m-0">
                                                            <p className="!font-semibold !text-md">{canvas?.name}</p>
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                            </Link>
                                        ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </AccordionDetails>
            </Accordion>
        ));
    };

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        position: "absolute",
                        zIndex: 1
                    },
                }}
                variant="persistent"
                anchor="left"
                open={leftSidebarOpen}
            >
                <div className="h-full overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100 ">
                    <div className="flex items-center !justify-end h-[40px] py-2">
                        <IconButton onClick={handleLeftBarClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {renderMenu()}
                </div>
            </Drawer>
        </>
    );
};

export default CanvasNavigation;
