import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Zoom from "@mui/material/Zoom";
import DateMove from "./datemove";
import DateRange from "./daterange";
import StepsMenu from "./stepsmenu";
import StepToggle from "./steptoggle";

function DateInput({
  dates,
  rangeScope,
  payProps,
  handleVal,
  stepViz,
  openSlider,
  stepOpen,
  stepValue,
  handleClick,
  handleStep,
  handleViz
}) {
  return (
    <>
      <Grid xs="auto">
        <DateRange
          dates={dates}
          rangeScope={rangeScope}
          handleVal={handleVal}
        />
      </Grid>
      <Zoom in={openSlider}>
        <Grid xs="auto">
          <DateMove
            dates={dates}
            rangeScope={rangeScope}
            stepValue={stepValue}
            payProps={payProps}
            handleVal={handleVal}
            bf={"b"}
            vertical={false}
            reverse={true}
            viz={openSlider}
          />
        </Grid>
      </Zoom>
      <Grid xs="auto" paddingRight={1}>
        <StepToggle
          stepViz={stepViz}
          stepValue={stepValue}
          payProps={payProps}
          viz={stepOpen}
          handleStep={handleStep}
          onClick={handleClick}
        />
      </Grid>
      <Zoom in={stepOpen}>
        <Grid xs="auto">
          <StepsMenu
            stepViz={stepViz}
            stepValue={stepValue}
            payProps={payProps}
            viz={stepOpen}
            handleStep={handleStep}
            handleViz={handleViz}
          />
        </Grid>
      </Zoom>
      <Zoom in={openSlider}>
        <Grid xs="auto">
          <DateMove
            dates={dates}
            rangeScope={rangeScope}
            stepValue={stepValue}
            payProps={payProps}
            handleVal={handleVal}
            bf={"f"}
            vertical={false}
            reverse={false}
            viz={openSlider}
          />
        </Grid>
      </Zoom>
    </>
  );
}

export default DateInput;
