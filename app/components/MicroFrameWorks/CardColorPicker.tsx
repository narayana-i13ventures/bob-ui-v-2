import { Card, Grow, Popover, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Github from "@uiw/react-color-github";
import React, { JSXElementConstructor, useRef, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, JSXElementConstructor<unknown>>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow style={{ transformOrigin: "0 0 1" }} ref={ref} {...props} />;
});

const CardColorPicker = (props: any) => {
  const theme: any = useTheme();
  const { cardName, color } = props;
  const colorBadgeRef = useRef(null);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  return (
    <>
      <Card
        elevation={0}
        className="!p-2 flex justify-between items-center !my-2"
      >
        <p>{cardName}</p>
        <div
          onClick={() => setColorPickerOpen(true)}
          ref={colorBadgeRef}
          style={{ backgroundColor: color }}
          className={`w-[25px] h-[25px] border-2 cursor-pointer`}
        ></div>
      </Card>
      <Popover
        TransitionComponent={Transition}
        disablePortal
        anchorEl={colorBadgeRef?.current}
        open={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          className: `!ml-2 !overflow-visible relatives py-4`,
          style: { backgroundColor: "transparent" },
          elevation: 0,
        }}
      >
        <Github
          onChange={() => setColorPickerOpen(false)}
          color={color}
          className="!w-[140px]"
        />
      </Popover>
    </>
  );
};

export default CardColorPicker;
