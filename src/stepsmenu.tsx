import * as React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import RngeTooltip from "./rngetooltip";

import { Increment } from "./dateutils";
import { stepProps } from "./interface";

export default function StepsMenu(props: stepProps) {
  const { stepViz, stepValue, payProps, viz } = props;
  const actions = React.useMemo(
    () => Increment(stepViz, null, null, payProps),
    [stepViz, payProps]
  );

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    operation: string | null
  ) => {
    const _op = operation.toLowerCase().trim();
    if (props.handleStep) {
      props.handleStep(_op);
      props.handleViz(!viz);
    }
  };

  return (
    <>
      {viz && (
        <Box p={0}>
          {/* <Typography variant="caption" display="block" gutterBottom pl={0}>
        {"Step level - " + periodTip[stepValue]}
      </Typography> */}
          <ToggleButtonGroup
            value={stepValue}
            size="small"
            aria-label="outlined button group"
            exclusive
          >
            {actions
              .filter((value) => {
                return value.show === true && value.tip !== "";
              })
              .map((action, index) => (
                <ToggleButton
                  key={action.tip + index}
                  value={action.step}
                  onClick={(e) => {
                    handleClick(e, action.step);
                  }}
                >
                  <RngeTooltip
                    title={undefined}
                    topRow={
                      action.tip +
                      ` steps (` +
                      action.step.charAt(0).toLocaleUpperCase() +
                      `)`
                    }
                    // detailRow={detailRow}
                    placement="bottom-end"
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
                          sx={{ fontSize: 8, textTransform: "none" }}
                        >
                          {
                            <span>
                              {action.step.charAt(0).toLocaleUpperCase()}
                            </span>
                          }
                        </Typography>
                      }
                      //color="primary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                      }}
                    >
                      {action.icon}
                    </Badge>
                  </RngeTooltip>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Box>
      )}
    </>
  );
}
