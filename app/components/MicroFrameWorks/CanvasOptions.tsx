import React, { useEffect, useState } from "react";
import {
  Drawer,
  Divider,
  IconButton,
  Button,
  useTheme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import StartIcon from "@mui/icons-material/Start";
import LockResetIcon from "@mui/icons-material/LockReset";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ShareUserNameCard from "../shared/Share/ShareUserNameCard";
import {
  appSlice,
  notificationSlice,
  selectApp,
  selectCVPPrefillBody,
  selectFuture1BMCCanvasColors,
  selectFuture1BMCCompleted,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import {
  usePrefillFuture1CVPMutation,
  useResetFuture1BMCMutation,
} from "@/lib/redux/Api";
import { usePathname, useRouter } from "next/navigation";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchPrefillData } from "@/lib/redux/slices/ApiCalls";
import CardColorPicker from "./CardColorPicker";

const CanvasOptions = (props: any) => {
  const router = useRouter();
  const theme: any = useTheme();
  const pathName = usePathname();
  const { drawerWidth } = props;
  const dispatch = useDispatch();
  const { rightSidebarOpen } = useSelector(selectApp);
  const [resetFuture1BMC] = useResetFuture1BMCMutation();
  const CVPPrefillData = useSelector(selectCVPPrefillBody);
  const [prefillFuture1CVP] = usePrefillFuture1CVPMutation();
  const [canvasCompleted, setCanvasComplete] = useState(false);
  const Future1BMCCompleted = useSelector(selectFuture1BMCCompleted);
  const Future1BMCColors = useSelector(selectFuture1BMCCanvasColors);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [canvasColors, setCanvasColors] = useState({});

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleRightBarClose = () => {
    dispatch(appSlice.actions.toggleRightSidebar(false));
  };

  useEffect(() => {
    if (pathName.includes("/Future1/BMC")) {
      setCanvasColors(Future1BMCColors);
      setCanvasComplete(Future1BMCCompleted);
    } else if (pathName.includes("/Future2/BMC")) {
      // setSelectedCard(Future2BMCCard);
    } else if (pathName.includes("/Future3/BMC")) {
      // setSelectedCard(Future3BMCCard);
    } else if (pathName.includes("/Future1/CVP")) {
      // setSelectedCard(Future1CVPCard);
    } else {
      setCanvasComplete(false);
    }
    return () => {
      setCanvasComplete(false);
    };
  }, [pathName, Future1BMCCompleted, Future1BMCColors]);

  const fetchNextCanvas = () => {
    if (canvasCompleted) {
      if (pathName.includes("/Future1/BMC")) {
        if (!!CVPPrefillData) {
          dispatch(appSlice.actions.toggleBobPrefillingOpen(true));
          fetchPrefillData(
            "https://bobapi.i13ventures.com/v1/value/prefill",
            CVPPrefillData
          ).then((data: any) => {
            prefillFuture1CVP(data)
              .unwrap()
              .then((data: any) => {
                router.push("CVP");
                dispatch(
                  notificationSlice.actions.createNotification({
                    content:
                      "Congratulations!! You Have Unlocked Customer Value Proposition Canvas",
                    action: "CVP",
                  })
                );
                dispatch(appSlice.actions.toggleBobPrefillingOpen(false));
              });
          });
        }
      } else if (pathName.includes("/Future2/BMC")) {
        // setSelectedCard(Future2BMCCard);
      } else if (pathName.includes("/Future3/BMC")) {
        // setSelectedCard(Future3BMCCard);
      } else if (pathName.includes("/Future1/CVP")) {
        // setSelectedCard(Future1CVPCard);
      }
    } else {
      if (pathName.includes("/Future1/BMC")) {
        dispatch(
          appSlice.actions.setGlobalSnackBar({
            content: "Please Complete Future 1 BMC Canvas to go to Next Canvas",
            open: true,
          })
        );
      } else if (pathName.includes("/Future2/BMC")) {
        // setSelectedCard(Future2BMCCard);
      } else if (pathName.includes("/Future3/BMC")) {
        // setSelectedCard(Future3BMCCard);
      } else if (pathName.includes("/Future1/CVP")) {
        // setSelectedCard(Future1CVPCard);
      }
    }
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
            zIndex: 1,
          },
        }}
        variant="persistent"
        anchor="right"
        open={rightSidebarOpen}
      >
        <div className="flex items-center !justify-start h-[40px] py-2">
          <IconButton onClick={handleRightBarClose}>
            {<ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className="p-2 flex flex-col justify-between items-start w-full h-full overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <div className="w-full">
            <Accordion
              className="w-full !p-0"
              elevation={0}
              expanded={expanded === "panel1"}
              onChange={handleAccordionChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <p className="text-md font-semibold">People With Access</p>
              </AccordionSummary>
              <AccordionDetails>
                <div className="max-h-[200px] overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-300 scrollbar-track-gray-100"></div>
                <Button
                  variant="contained"
                  className="!capitalize !text-white !font-semibold w-full"
                  size="small"
                >
                  Add Users
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion
              className="w-full !p-0"
              elevation={0}
              expanded={expanded === "panel2"}
              onChange={handleAccordionChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <p className="text-md font-semibold">Customize</p>
              </AccordionSummary>
              <AccordionDetails>
                {Object.entries(canvasColors).map(([cardName, color]: any) => (
                  <CardColorPicker
                    key={cardName}
                    cardName={cardName}
                    color={color}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </div>
          <div className="w-full">
            <Button
              fullWidth
              className="!font-semibold !capitalize !my-2"
              variant="outlined"
            >
              <LockIcon className="mr-3" />
              Lock Canvas
            </Button>
            <Button
              onClick={fetchNextCanvas}
              fullWidth
              className="!font-semibold !text-white !capitalize !my-2"
              variant="contained"
            >
              <StartIcon className="mr-3" />
              Go to Next Canvas
            </Button>
            <Button
              fullWidth
              onClick={() => resetFuture1BMC({})}
              className="!font-semibold !text-white !capitalize !my-2"
              variant="contained"
              color="error"
              sx={{
                "&:hover": {
                  backgroundColor: `${theme.palette.error.main} !important`,
                },
              }}
            >
              <LockResetIcon className="mr-3" />
              Reset Canvas
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CanvasOptions;
