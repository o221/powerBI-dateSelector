import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import DateMove from "./datemove";
import RangeSlider from "./rangeslider";

function Timeline({
  dates,
  rangeScope,
  stepValue,
  payProps,
  handleVal,
  show2ndSlider,
  weekStartDay,
  yearStartMonth,
  stepSkip,
  stepFmt
}) {
  return (
    <>
      <Grid xs="auto">
        <Box>
          <DateMove
            dates={dates}
            rangeScope={rangeScope}
            stepValue={stepValue}
            payProps={payProps}
            handleVal={handleVal}
            bf={"b"}
            vertical={true}
            viz={true}
          />
        </Box>
      </Grid>
      <Grid xs="auto">
        <Box>
          <DateMove
            dates={dates}
            rangeScope={rangeScope}
            stepValue={stepValue}
            payProps={payProps}
            handleVal={handleVal}
            bf={"f"}
            vertical={true}
            viz={true}
          />
        </Box>
      </Grid>
      <Grid xs marginLeft={1} paddingTop={0.3}>
        <RangeSlider
          dates={dates}
          payProps={payProps}
          rangeScope={rangeScope}
          stepFmt={stepFmt}
          stepValue={stepValue}
          stepSkip={stepSkip}
          weekStartDay={weekStartDay}
          yearStartMonth={yearStartMonth}
          handleVal={handleVal}
          show2ndSlider={show2ndSlider}
        />
      </Grid>
    </>
  );
}

export default Timeline;
