import * as React from "react";
import { format } from "date-fns";
import DateRangeCard from "./daterangecard";
import { dateCardProps } from "./interface";
import { initialState } from "./initstate";
import { Typography } from "@mui/material";

export default class DateCardClass extends React.Component<
  { onChanged: (arg0: any) => void },
  dateCardProps
> {
  private static updateCallback?: (data: object) => void = null;

  public datesLoaded: boolean;

  public static update(newState: dateCardProps) {
    if (typeof DateCardClass.updateCallback === "function") {
      DateCardClass.updateCallback(newState);
    }
  }

  public state: dateCardProps = initialState;

  constructor(props: any) {
    super(props);
    this.state = initialState;
    if (!this.state.dates) this.state.dates = this.state.rangeScope; // this.datesLoaded = false;};
    this.onDateChanged = this.onDateChanged.bind(this);
  }

  public onDateChanged = (e: Date[]) => {
    // console.log(e, this.state.dates);
    if (
      e.length &&
      (format(e[0], "dd-MM-yyyy") !==
        format(this.state.dates.start, "dd-MM-yyyy") ||
        format(e[1], "dd-MM-yyyy") !==
          format(this.state.dates.end, "dd-MM-yyyy"))
    ) {
      this.setState({
        dates: {
          start: e[0],
          end: e[1]
        }
      });
      this.props.onChanged(e);
    }
  };

  public componentDidMount() {
    DateCardClass.updateCallback = (newState: dateCardProps): void => {
      this.setState(newState);
    };
  }

  public componentWillUnmount() {
    DateCardClass.updateCallback = null;
  }

  render() {
    const {
      dates,
      rangeScope,
      stepViz,
      vizOpt,
      stepFmt,
      stepSkip,
      stepInit,
      stepPeriod,
      payProps,
      fmtDate,
      weekStartDay,
      yearStartMonth,
      showSlider,
      show2ndSlider,
      showCurrent,
      themeColor,
      themeFont,
      themeMode,
      showIconText,
      showHelpIcon
    } = this.state;
    return this.state.rangeScope.start ? (
      <>
        <DateRangeCard
          dates={dates}
          rangeScope={rangeScope}
          vizOpt={vizOpt}
          stepViz={stepViz}
          stepFmt={stepFmt}
          stepSkip={stepSkip}
          stepInit={stepInit}
          stepPeriod={stepPeriod}
          payProps={payProps}
          fmtDate={fmtDate}
          weekStartDay={weekStartDay}
          yearStartMonth={yearStartMonth}
          showSlider={showSlider}
          showCurrent={showCurrent}
          themeColor={themeColor}
          themeFont={themeFont}
          themeMode={themeMode}
          showIconText={showIconText}
          showHelpIcon={showHelpIcon}
          handleVal={this.onDateChanged}
          show2ndSlider={show2ndSlider}
        />
      </>
    ) : (
      <>
        <Typography variant="h5" ml={2} mt={3}>
          Blank dates are not supported.
        </Typography>
        <Typography variant="body2" m={2}>
          Please add a valid source date column or filter out the blanks.
        </Typography>
      </>
    );
  }
}
