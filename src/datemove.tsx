import * as React from "react";
import { useMemo, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import debounce from "lodash.debounce";
import { useHotkeys } from "react-hotkeys-hook";
import { getRange, moveParms } from "./dateutils";
import { DateMoveProps } from "./interface";
import RngeTooltip from "./rngetooltip";

export default function DateMove(props: DateMoveProps) {
  const { dates, stepValue, bf, vertical, reverse, viz, handleVal } = props;

  const [ctrl, setCtrl] = useState(false);

  const mve = React.useMemo(() => {
    return moveParms(bf, vertical, ctrl, stepValue);
  }, [bf, vertical, ctrl, stepValue]);

  const debExt = useMemo(
    () =>
      debounce((dt) => handleVal(dt), 500, {
        leading: false,
        trailing: true
      }),
    [handleVal]
  );

  useEffect(() => {
    return () => {
      debExt.cancel();
    };
  }, [debExt]);

  const handleClick = (fn: string) => {
    if (handleVal) {
      const newDates = getRange(fn, stepValue, dates);
      debExt(newDates);
    }
  };

  const handleExt = (e) => {
    const _ctl = e["shiftKey"];
    const _bf = _ctl ? (mve.isBack ? "f" : "b") : bf;
    const fn = _ctl ? "r" + _bf : "e" + _bf;
    handleClick(fn);
  };

  useHotkeys("shift", () => setCtrl(true), { keydown: true }, [ctrl]);
  useHotkeys("shift", () => setCtrl(false), { keyup: true }, [ctrl]);

  return (
    <>
      {viz && (
        <Grid
          container
          direction={reverse ? "row-reverse" : vertical ? "column" : "row"}
        >
          <Box>
            <IconButton
              key={mve.iconLabel + reverse + vertical + stepValue}
              aria-label={mve.iconLabel + " a " + stepValue}
              size="small"
              onClick={() => handleClick(bf)}
            >
              <RngeTooltip
                title={undefined}
                topRow={mve.topRow1}
                detailRow={mve.detailRow1}
                placement={mve.placement}
              >
                {mve.iconT}
              </RngeTooltip>
            </IconButton>
          </Box>
          <Box>
            <IconButton
              key={mve.placement + reverse + vertical + stepValue}
              id="eb"
              aria-label={mve.placement + " a " + stepValue}
              size="small"
              onClick={handleExt}
            >
              <RngeTooltip
                title={undefined}
                topRow={mve.topRow2}
                detailRow={mve.detailRow2}
                placement={mve.placement}
              >
                {mve.iconB}
              </RngeTooltip>
            </IconButton>
          </Box>
        </Grid>
      )}
    </>
  );
}
