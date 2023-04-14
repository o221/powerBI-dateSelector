import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import BlurOn from "@mui/icons-material/BlurOn";
import { stepProps } from "./interface";
import { DATEUTILS, STEP_TOGGLE } from "./constants";
import { useHotkeys } from "react-hotkeys-hook";
import RngeTooltip from "./rngetooltip";

const { TopRow, DetailRow } = STEP_TOGGLE;

export default function StepToggle(props: stepProps) {
  const { stepViz, stepValue, viz } = props;

  const keyHandler = (period) => {
    if (props.handleStep && stepViz[period]) {
      props.handleStep(period);
    }
  };

  const trueKeys = Object.keys(stepViz).filter((key) => stepViz[key]);
  const ShortCut = trueKeys
    .map((key) => key.charAt(0).toUpperCase())
    .join(", ");

  useHotkeys("d", () => keyHandler("day"));
  useHotkeys("w", () => keyHandler("week"));
  useHotkeys("p", () => keyHandler("pay"));
  useHotkeys("m", () => keyHandler("month"));
  useHotkeys("q", () => keyHandler("quarter"));
  useHotkeys("y", () => keyHandler("year"));

  return (
    !viz && (
      <ToggleButton
        value="on"
        size="small"
        onClick={props.onClick}
        // onMouseEnter={handleStepOpen}
        // onMouseLeave={handleStepClose}
      >
        <Badge
          sx={{
            "& .MuiBadge-badge": {
              right: -2,
              top: -1
            }
          }}
          badgeContent={
            <Typography
              variant="overline"
              sx={{ fontSize: 8, textTransform: "uppercase" }}
            >
              {<span>{stepValue.charAt(0)}</span>}
            </Typography>
          }
          //color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          <RngeTooltip
            title={undefined}
            topRow={TopRow + DATEUTILS.periodTip[stepValue] + ` (${ShortCut})`}
            detailRow={DetailRow}
            placement="bottom"
          >
            <BlurOn style={{ fontSize: 16 }} color="primary" />
          </RngeTooltip>
        </Badge>
      </ToggleButton>
    )
  );
}
