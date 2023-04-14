import React, { useState } from "react";
import { Box, Popover, TextField } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import { Interval, subDays } from "date-fns";
import { getIntervalFunction } from "./dateutils";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";
import RngeTooltip from "./rngetooltip";

interface IntervalParmsProps {
  setIntervalValue: (value: number) => void;
  handleClose: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  intervalValue: number;
  stepValue: string;
}
const IntervalParms: React.FC<IntervalParmsProps> = ({
  setIntervalValue,
  handleClose,
  handleInputChange,
  intervalValue,
  stepValue,
}) => {
  return (
    <>
      <RngeTooltip
        title={undefined}
        topRow={`Number of ${stepValue}s from today`}
        detailRow={`Set the date range by adding or subtracting ${stepValue}s. Click away to save & close.`}
        placement="left"
      >
        <TextField
          variant="outlined"
          type="number"
          onChange={handleInputChange}
          sx={{ width: 76 }}
          value={intervalValue}
          size="small"
        />
      </RngeTooltip>
      <RngeTooltip title={`Save & Close`} placement="top">
        <IconButton size="small" onClick={handleClose}>
          <CheckIcon />
        </IconButton>
      </RngeTooltip>
      <RngeTooltip title={`Reset to 0`} placement="top">
        <IconButton size="small" onClick={() => setIntervalValue(0)}>
          <RefreshIcon />
        </IconButton>
      </RngeTooltip>
    </>
  );
};

interface DateIntervalPickerProps {
  children: React.ReactNode;
  baseDate?: Date;
  stepValue: string;
  handleVal?: (interval: Interval) => void;
}

const DateIntervalPicker: React.FC<DateIntervalPickerProps> = ({
  children,
  baseDate = new Date(),
  stepValue,
  handleVal,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [intervalValue, setIntervalValue] = useState<number>(0);
  const [interval, setInterval] = useState<Interval>({
    start: null,
    end: null,
  });

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isOpen) {
      const target = event.target as HTMLElement;
      setAnchorEl(target);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
    if (intervalValue !== 0) {
      handleVal(interval);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return;
    }
    if (value === "" || numValue === 0) {
      setIntervalValue(0);
      return;
    }
    const intervalFn = getIntervalFunction(stepValue);
    const newDate = subDays(
      intervalFn(baseDate, numValue),
      stepValue === "day" ? 0 : numValue < 0 ? -1 : 1
    );
    setInterval({
      start: numValue >= 0 ? baseDate : newDate,
      end: numValue < 0 ? baseDate : newDate,
    });
    setIntervalValue(numValue);
    setIsOpen(true);
  };

  return (
    <>
      <Box sx={{ maxHeight: 18 }} onContextMenu={handleContextMenu}>
        <Popover
          open={isOpen}
          sx={{ zIndex: 1000 }}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Paper
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "6px",
              }}
            >
              <IntervalParms
                setIntervalValue={() => setIntervalValue(0)}
                handleClose={handleClose}
                handleInputChange={handleInputChange}
                intervalValue={intervalValue}
                stepValue={stepValue}
              />
            </Paper>
          </ClickAwayListener>
        </Popover>
        {children}
      </Box>
    </>
  );
};

export default DateIntervalPicker;
