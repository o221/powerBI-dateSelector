import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Zoom from "@mui/material/Zoom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHotkeys } from "react-hotkeys-hook";
import TopRow from "./daterangetoprow";
import Timeline from "./timeline";
import { dateCardProps } from "./interface";
import { dateMoveKeys } from "./datemovekeys";
import { Increment } from "./dateutils";
import { HelpProvider } from "./helpprovider";

export default function DateRangeCard(props: dateCardProps) {
  const {
    dates,
    rangeScope,
    weekStartDay,
    yearStartMonth,
    stepInit,
    stepSkip,
    stepViz,
    vizOpt,
    stepFmt,
    payProps,
    themeColor,
    themeFont,
    themeMode,
    showCurrent,
    showIconText,
    show2ndSlider,
    handleVal,
    showSlider,
    showHelpIcon,
  } = props;

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeColor,
      },
    },
    typography: {
      fontFamily: themeFont,
    },
  });

  const [openSlider, setOpenSlider] = React.useState<boolean>(showSlider);
  const [stepValue, setStepValue] = React.useState<string>(stepInit);
  const [stepOpen, setStepOpen] = React.useState<boolean>(false);

  const current = React.useMemo(() => {
    return Increment(
      stepViz,
      weekStartDay,
      yearStartMonth,
      payProps,
      vizOpt,
      rangeScope
    );
  }, [stepViz, weekStartDay, yearStartMonth, payProps, vizOpt, rangeScope]);

  React.useEffect(() => {
    setOpenSlider(showSlider);
  }, [showSlider]);
  React.useEffect(() => {
    setStepValue(stepInit);
  }, [stepInit]);

  const toggleSlider = () => {
    setOpenSlider(!openSlider);
  };

  dateMoveKeys(handleVal, stepValue, dates, current);
  useHotkeys("s", () => toggleSlider(), [openSlider]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <HelpProvider showHelpIcon={showHelpIcon}>
          <TopRow
            openSlider={openSlider}
            toggleSlider={toggleSlider}
            dates={dates}
            rangeScope={rangeScope}
            payProps={payProps}
            handleVal={handleVal}
            stepViz={stepViz}
            stepOpen={stepOpen}
            stepValue={stepValue}
            handleClick={() =>  setStepOpen(!stepOpen)}
            setStepOpen={setStepOpen}
            vizOpt={vizOpt}
            showCurrent={showCurrent}
            showIconText={showIconText}
            setStepValue={setStepValue}
            current={current}
          />
          <Zoom in={!openSlider}>
            <Grid container spacing={0} xs={12}>
              <Timeline
                dates={dates}
                rangeScope={rangeScope}
                stepValue={stepValue}
                payProps={payProps}
                handleVal={handleVal}
                stepFmt={stepFmt}
                stepSkip={stepSkip}
                weekStartDay={weekStartDay}
                yearStartMonth={yearStartMonth}
                show2ndSlider={show2ndSlider}
              />
            </Grid>
          </Zoom>
        </HelpProvider>
      </ThemeProvider>
    </>
  );
}
