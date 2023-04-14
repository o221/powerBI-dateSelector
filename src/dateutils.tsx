import * as React from "react";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaymentIcon from "@mui/icons-material/Payment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import SwitchLeft from "@mui/icons-material/SwitchLeft";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import SkipNext from "@mui/icons-material/SkipNext";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
// import Collapse from "@material-ui/core/Collapse";

import startOfDay from "date-fns/startOfDay";
import endOfDay from "date-fns/endOfDay";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import differenceInDays from "date-fns/differenceInDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import eachYearOfInterval from "date-fns/eachYearOfInterval";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import eachQuarterOfInterval from "date-fns/eachQuarterOfInterval";
import startOfToday from "date-fns/startOfToday";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfQuarter from "date-fns/startOfQuarter";
import startOfYear from "date-fns/startOfYear";
import endOfToday from "date-fns/endOfToday";
import endOfWeek from "date-fns/endOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import endOfQuarter from "date-fns/endOfQuarter";
import endOfYear from "date-fns/endOfYear";
import addMonths from "date-fns/addMonths";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import subWeeks from "date-fns/subWeeks";
import addWeeks from "date-fns/addWeeks";
import subMonths from "date-fns/subMonths";
import subQuarters from "date-fns/subQuarters";
import addQuarters from "date-fns/addQuarters";
import subYears from "date-fns/subYears";
import addYears from "date-fns/addYears";
import isAfter from "date-fns/isAfter";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import isLastDayOfMonth from "date-fns/isLastDayOfMonth";
import isFirstDayOfMonth from "date-fns/isFirstDayOfMonth";
import isWithinInterval from "date-fns/isWithinInterval";
import { stepBool, dateRange, SliderProps } from "./interface";
import { DATEUTILS } from "./constants";
import getDay from 'date-fns/getDay'

const { periodTip, periodThis, periodGranularity } = DATEUTILS;

/** Date Movement functions **/

const arrowIcons = {
  arrowLeft: <KeyboardArrowLeft fontSize="inherit" />,
  arrowDoubleLeft: <KeyboardDoubleArrowLeft fontSize="inherit" />,
  arrowRight: <KeyboardArrowRight fontSize="inherit" />,
  arrowDoubleRight: <KeyboardDoubleArrowRight fontSize="inherit" />,
};

type MoveParms = {
  isBack: boolean;
  placement: "left" | "right" | "bottom";
  iconLabel: string;
  reduceExpand: string;
  iconT: JSX.Element;
  iconB: JSX.Element;
  topRow1: string;
  detailRow1: string;
  topRow2: string;
  detailRow2: string;
};

export const moveParms = (
  bf: string,
  vert: boolean,
  ctrl: boolean,
  stepValue: string
): MoveParms => {
  const isBack = bf === "b";
  const iconLabel = isBack ? " Back " : " Forward ";
  const iconT = isBack ? arrowIcons.arrowLeft : arrowIcons.arrowRight;
  const iconB = ctrl
    ? isBack
      ? arrowIcons.arrowDoubleRight
      : arrowIcons.arrowDoubleLeft
    : isBack
    ? arrowIcons.arrowDoubleLeft
    : arrowIcons.arrowDoubleRight;
  const reduceExpand = ctrl ? "Reduce by " : "Extend ";
  const topRow1 = iconLabel + " a " + stepValue + (isBack ? " (L)" : " (N)");
  const detailRow1 =
    "Move the selected range " +
    iconLabel.toLowerCase() +
    " by the step level.";
  const topRow2 =
    reduceExpand +
    " a " +
    stepValue +
    " " +
    (!ctrl ? iconLabel.toLowerCase() : isBack ? " forward" : " back") +
    (!ctrl
      ? isBack
        ? " (ctrl + <)"
        : " (ctrl + >)"
      : isBack
      ? " (shift + >)"
      : " (shift + <)");
  const detailRow2 =
    reduceExpand +
    " the selected range " +
    iconLabel.toLowerCase() +
    " by the step level.";
  return {
    isBack: isBack,
    placement: vert ? (isBack ? "left" : "right") : "bottom",
    iconLabel: iconLabel,
    iconT: iconT,
    iconB: iconB,
    reduceExpand: reduceExpand,
    topRow1: topRow1,
    detailRow1: detailRow1,
    topRow2: topRow2,
    detailRow2: detailRow2,
  };
};

export const getIntervalFunction = (stepValue: string) => {
  switch (stepValue) {
    case "day":
      return addDays;
    case "week":
      return addWeeks;
    case "pay":
      return addWeeks;
    case "month":
      return addMonths;
    case "quarter":
      return addQuarters;
    case "year":
      return addYears;
    default:
      return null;
  }
};

/** Initial Range set up **/

export const day = (
  i: number,
  startBaseDate: Date = startOfToday(),
  endBaseDate?: Date
): dateRange => {
  const endDate = endBaseDate ? endOfDay(endBaseDate) : endOfToday();
  return {
    start: subDays(startBaseDate, i),
    end: subDays(endDate, i),
  };
};

export const week = (
  i: number,
  w: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  startBaseDate: Date = startOfToday(),
  full?: boolean
): dateRange => {
  // if (full) {console.log(full, getDay(startBaseDate),w,startBaseDate)}
  const j = full ? (w === getDay(subDays(startBaseDate,1)) ? i : i + 1) : i;
  return {
    start: startOfWeek(subWeeks(startBaseDate, j), {
      weekStartsOn: w,
    }),
    end: endOfWeek(subWeeks(startBaseDate, j), {
      weekStartsOn: w,
    }),
  };
};

export const month = (
  i: number,
  startBaseDate: Date = startOfToday(),
  endBaseDate?: Date
): dateRange => {
  const endDate = endBaseDate ? endOfDay(endBaseDate) : endOfToday();
  return {
    start: startOfMonth(subMonths(startBaseDate, i)),
    end: endOfMonth(subMonths(endDate, i)),
  };
};

export const quarter = (i: number): dateRange => {
  return {
    start: startOfQuarter(subQuarters(startOfToday(), i)),
    end: endOfQuarter(subQuarters(startOfToday(), i)),
  };
};

export const year = (i: number, yearStartMonth: number): dateRange => {
  return {
    start: subMonths(
      subMonths(
        addMonths(startOfYear(startOfToday()), yearStartMonth),
        Number(format(startOfToday(), "L")) <= yearStartMonth ? 12 : 0
      ),
      i * 12
    ),
    end: subMonths(
      subMonths(
        addMonths(endOfYear(startOfToday()), yearStartMonth),
        Number(format(startOfToday(), "L")) <= yearStartMonth ? 12 : 0
      ),
      i * 12
    ),
  };
};

export const getInitRange = (
  startRange: string,
  weekStartDay: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0,
  yearStartMonth: number = 0,
  rangeScope: dateRange = { start: null, end: null },
  rtn: string = ""
) => {
  const _rnge = {
    today: day(0),
    yesterday: day(1),
    tomorrow: day(-1),
    thisWeek: week(0, weekStartDay),
    lastWeek: week(1, weekStartDay),
    nextWeek: week(-1, weekStartDay),
    thisMonth: month(0),
    lastMonth: month(1),
    nextMonth: month(-1),
    thisQuarter: quarter(0),
    lastQuarter: quarter(1),
    thisYear: year(0, yearStartMonth),
    lastYear: year(1, yearStartMonth),
    nextYear: year(-1, yearStartMonth),
    ytdToday: {
      start: year(0, yearStartMonth).start,
      end: endOfToday(),
    },
    ytdLastMonth: {
      start: year(0, yearStartMonth).start,
      end: month(1).end,
    },
    ytdThisMonth: {
      start: year(0, yearStartMonth).start,
      end: month(0).end,
    },
    ytdCalToday: {
      start: year(0, 0).start,
      end: endOfToday(),
    },
    ytdCalLastMonth: {
      start: year(0, 0).start,
      end: month(1).end,
    },
    ytdCalThisMonth: {
      start: year(0, 0).start,
      end: month(0).end,
    },
    ytToday: {
      start: addDays(subMonths(startOfToday(), 12), 1),
      end: endOfToday(),
    },
    yearToLastMonth: {
      start: startOfMonth(subMonths(startOfToday(), 12)),
      end: endOfMonth(subMonths(endOfToday(), 1)),
    },
    yearToThisMonth: {
      start: startOfMonth(subMonths(startOfToday(), 11)),
      end: endOfMonth(subMonths(endOfToday(), 0)),
    },
    firstWeekOfScope: week(0, weekStartDay, rangeScope.start),
    lastWeekOfScope: week(0, weekStartDay, rangeScope.end, true),
    firstMonthOfScope: month(0, rangeScope.start, rangeScope.start),
    lastMonthOfScope: month(0, rangeScope.end, endOfDay(rangeScope.end)),
  };
  return rtn !== ""
    ? _rnge
    : _rnge[startRange]
    ? _rnge[startRange]
    : rangeScope;
};

function getPayPeriod(
  referenceDay: Date,
  periodOne: Date,
  periodLength: number
): { start: Date; end: Date } {
  // Calculate the number of days between the reference day and period 1 start
  const daysPeriodOneFromRef = differenceInDays(
    startOfDay(periodOne),
    startOfDay(referenceDay)
  );

  // Calculate the period number and starting date based on the number of days: period ref and the period length
  const periodNumber = Math.floor(daysPeriodOneFromRef / periodLength);
  const periodStart = addDays(referenceDay, periodNumber * periodLength);

  // Calculate the ending date of the current period
  const periodEnd = addDays(periodStart, periodLength - 1);

  return { start: periodStart, end: periodEnd };
}

const moveDay = (_rnge: dateRange) => {
  return {
    b: [subDays(_rnge.start, 1), subDays(_rnge.end, 1)],
    f: [addDays(_rnge.start, 1), addDays(_rnge.end, 1)],
    eb: [subDays(_rnge.start, 1), _rnge.end],
    ef: [_rnge.start, addDays(_rnge.end, 1)],
    rb: [_rnge.start, subDays(_rnge.end, 1)],
    rf: [addDays(_rnge.start, 1), _rnge.end],
  };
};

const moveWeek = (_rnge: dateRange) => {
  return {
    b: [subWeeks(_rnge.start, 1), subWeeks(_rnge.end, 1)],
    f: [addWeeks(_rnge.start, 1), addWeeks(_rnge.end, 1)],
    eb: [subWeeks(_rnge.start, 1), _rnge.end],
    ef: [_rnge.start, addWeeks(_rnge.end, 1)],
    rb: [_rnge.start, subWeeks(_rnge.end, 1)],
    rf: [addWeeks(_rnge.start, 1), _rnge.end],
  };
};

const movePay = (_rnge: dateRange) => {
  const len = differenceInDays(_rnge.end, _rnge.start) + 1;
  return {
    b: [subDays(_rnge.start, len), subDays(_rnge.end, len)],
    f: [addDays(_rnge.start, len), addDays(_rnge.end, len)],
    eb: [subDays(_rnge.start, len), _rnge.end],
    ef: [_rnge.start, addDays(_rnge.end, len)],
    rb: [_rnge.start, subDays(_rnge.end, len)],
    rf: [addDays(_rnge.start, len), _rnge.end],
  };
};

const moveMonth = (_rnge: dateRange) => {
  const ld = isLastDayOfMonth(_rnge.end) && isFirstDayOfMonth(_rnge.start);
  const dd = differenceInDays(_rnge.end, _rnge.start);

  return {
    b: [
      subMonths(_rnge.start, 1),
      isLastDayOfMonth(_rnge.end)
        ? lastDayOfMonth(subMonths(_rnge.end, 1))
        : addDays(subMonths(_rnge.start, 1), dd),
    ],
    f: [
      addMonths(_rnge.start, 1),
      ld
        ? lastDayOfMonth(addMonths(_rnge.end, 1))
        : addDays(addMonths(_rnge.start, 1), dd),
    ],
    eb: [subMonths(_rnge.start, 1), _rnge.end],
    ef: [
      _rnge.start,
      ld ? lastDayOfMonth(addMonths(_rnge.end, 1)) : addMonths(_rnge.end, 1),
    ],
    rb: [
      _rnge.start,
      ld ? lastDayOfMonth(subMonths(_rnge.end, 1)) : subMonths(_rnge.end, 1),
    ],
    rf: [addMonths(_rnge.start, 1), _rnge.end],
  };
};

const moveQuarter = (_rnge: dateRange) => {
  const ld = isLastDayOfMonth(_rnge.end) && isFirstDayOfMonth(_rnge.start);
  return {
    b: [
      subQuarters(_rnge.start, 1),
      ld
        ? lastDayOfMonth(subQuarters(_rnge.end, 1))
        : subQuarters(_rnge.end, 1),
    ],
    f: [
      addQuarters(_rnge.start, 1),
      ld
        ? lastDayOfMonth(addQuarters(_rnge.end, 1))
        : addQuarters(_rnge.end, 1),
    ],
    eb: [subQuarters(_rnge.start, 1), _rnge.end],
    ef: [
      _rnge.start,
      ld
        ? lastDayOfMonth(addQuarters(_rnge.end, 1))
        : addQuarters(_rnge.end, 1),
    ],
    rb: [
      _rnge.start,
      ld
        ? lastDayOfMonth(subQuarters(_rnge.end, 1))
        : subQuarters(_rnge.end, 1),
    ],
    rf: [addQuarters(_rnge.start, 1), _rnge.end],
  };
};

const moveYear = (_rnge: dateRange) => {
  return {
    b: [subYears(_rnge.start, 1), subMonths(_rnge.end, 12)],
    f: [addYears(_rnge.start, 1), addMonths(_rnge.end, 12)],
    eb: [subYears(_rnge.start, 1), _rnge.end],
    ef: [_rnge.start, addMonths(_rnge.end, 12)],
    rb: [_rnge.start, subMonths(_rnge.end, 12)],
    rf: [addYears(_rnge.start, 1), _rnge.end],
  };
};

const getdRange2 = (fn: string, step: string, dates) => {
  /*** fn values
   * b - isBack
   * f - forward
   * eb - extend isBack
   * ef - extend forward
   * rb - reduce isBack
   * rf - reduce forward
   */
  return {
    day: moveDay(dates),
    week: moveWeek(dates),
    pay: movePay(dates),
    month: moveMonth(dates),
    quarter: moveQuarter(dates),
    year: moveYear(dates),
  }[step][fn];
};

export const getRange = (fn: string, step: string, dates) => {
  const dte = getdRange2(fn, step, dates);
  return isAfter(dte[0], dte[1]) ? [dates.start, dates.end] : dte;
};

/** Current Period Parameters */

export const Increment = (
  stepViz: stepBool,
  weekStartDay: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  yearStartMonth: number,
  payProps?: any,
  vizOpt?: boolean,
  scope?: Interval
) => {
  const _rnge = getInitRange("today", weekStartDay, yearStartMonth, { start: null, end: null }, "matrix" );
  return [
    {
      tip: periodTip.day, step: periodGranularity.day,
      show: stepViz.day,
      thisPeriod: periodThis.day,
      thisRange: _rnge["today"],
      icon: <TodayIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: periodTip.week, step: periodGranularity.week,
      show: stepViz.week,
      thisPeriod: periodThis.week,
      thisRange: _rnge["thisWeek"],
      icon: <DateRangeIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: periodTip.pay, step: periodGranularity.pay,
      show: stepViz.pay,
      thisPeriod: periodThis.pay + payProps.desc,
      thisRange: getPayPeriod(payProps.ref, startOfToday(), payProps.len),
      icon: <PaymentIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: periodTip.month, step: periodGranularity.month,
      show: stepViz.month,
      thisPeriod: periodThis.month,
      thisRange: _rnge["thisMonth"],
      icon: <EventNoteIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: periodTip.quarter, step: periodGranularity.quarter,
      show: stepViz.quarter,
      thisPeriod: periodThis.quarter,
      thisRange: _rnge["thisQuarter"],
      icon: <DynamicFeedIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: periodTip.year, step: periodGranularity.year,
      show: stepViz.year,
      thisPeriod: periodThis.year,
      thisRange: _rnge["thisYear"],
      icon: <LineStyleIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: "", step: null,
      show: (stepViz.day || stepViz.year) && vizOpt,
      thisPeriod: periodThis.more, //"more",
      thisRange: null,
      icon: (
        <MoreHoriz style={{ fontSize: 12, opacity: 0.5 }} color="primary" />
      ),
    },
    {
      tip: "", step: periodGranularity.range,
      show: true,
      thisPeriod: periodThis.range,
      thisRange: scope,
      icon: <SettingsEthernetIcon style={{ fontSize: 16 }} color="primary" />,
    },
    {
      tip: "", step: periodGranularity.ytd,
      show: stepViz.day || stepViz.year,
      thisPeriod: periodThis.ytd, //YTD
      thisRange: _rnge["ytdToday"],
      icon: <PlayArrow style={{ fontSize: 16, opacity: 0.7 }} color="primary" />,
    },
    {
      tip: "", step: periodGranularity.yearPast,
      show: stepViz.day || stepViz.year,
      thisPeriod: periodThis.yearPast, //"Year Past"
      thisRange: _rnge["ytToday"],
      icon: <SwitchLeft style={{ fontSize: 16, opacity: 0.7 }} color="primary" />,
    },
    {
      tip: "", step: periodGranularity.ytdLastMonth,
      show: stepViz.month || stepViz.year,
      thisPeriod: periodThis.ytdLastMonth, //"YTD Last Month",
      thisRange: _rnge["ytdLastMonth"],
      icon: <SkipPrevious style={{ fontSize: 16, opacity: 0.7 }} color="primary" />,
    },
    {
      tip: "", step: periodGranularity.ytdThisMonth,
      show: stepViz.month || stepViz.year,
      thisPeriod: periodThis.ytdThisMonth, //"YTD This Month",
      thisRange: _rnge["ytdThisMonth"],
      icon: <SkipNext style={{ fontSize: 16, opacity: 0.7 }} color="primary" />,
    },
  ];
};

/*
 Date Range Slider mark setter functions
*/

export const sliderMarkNumber = (val: Date, min: Date) =>
  Math.max(0, differenceInDays(val, min));

export const sliderMarkDate = (val: number, min: Date) => addDays(min, val);

export const sliderMarkText = (num: number, min: Date, fmt = "d-MMM-yy") =>
  format(addDays(min, num), fmt);

type StepMinor = "day" | "week" | "pay" | "month" | "quarter" | "year";
type StepMajor = "day" | "week" | "pay" | "month" | "quarter" | "year";

export const stepMinor: Record<StepMinor, StepMajor> = {
  day: "month",
  week: "month",
  pay: "month",
  month: "year",
  quarter: "month",
  year: "month",
};

export const stepMajor: Record<StepMajor, StepMajor> = {
  day: "day",
  week: "week",
  pay: "pay",
  month: "month",
  quarter: "quarter",
  year: "year",
};
// payProps = {
//   desc: "Pay-Period" description
//   ref: root date for pay periods to use as starting date,
//   len: length of pay period
// },

function eachPaydayOfInterval(range, pay) {
  const result = subDays(
    range.start,
    differenceInDays(range.start, pay.ref) % pay.len
  );
  return eachDayOfInterval(
    { start: result, end: range.end },
    { step: pay.len }
  );
}

/* Timeline Setup functions */

export function closest(needle, haystack) {
  return haystack.reduce((a, b) => {
    const aDiff = Math.abs(a - needle);
    const bDiff = Math.abs(b - needle);

    if (aDiff === bDiff) {
      return a > b ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
}

export const createMarks = (
  period: string,
  range: dateRange,
  weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  yearStart: number,
  pay: any
) => {
  const periodHandlers = {
    day: () => [startOfToday()],
    week: () => eachWeekOfInterval(range, { weekStartsOn: weekStart }),
    month: () => eachMonthOfInterval(range),
    pay: () => eachPaydayOfInterval(range, pay),
    quarter: () => eachQuarterOfInterval(range),
    year: () =>
      eachYearOfInterval({
        start: range.start,
        end: range.end,
      }).map((x) => addMonths(x, yearStart)),
  };

  const handler = periodHandlers[period];
  if (handler) {
    return handler();
  }
  return null; // or handle unsupported period
};

export const doMarks = (
  _val: any,
  _fmt: any,
  _min: Date,
  _skip: number,
  _offset: number
) => {
  return _val.map((x: Date, i: number) => {
    const v: number = sliderMarkNumber(x, _min);
    const od =
      _offset === 0
        ? _min
        : addYears(_min, sliderMarkDate(v, _min).getMonth() <= _offset ? 1 : 0);
    const l =
      (i + 1) % _skip === 0 || i === 0 || i === _val.length - 1
        ? sliderMarkText(v, od, _fmt)
        : "";
    return { value: v, label: l };
  });
};

export const buildMarks = (period: string, props: SliderProps) => {
  const marks = createMarks(
    period,
    props.rangeScope,
    props.weekStartDay,
    props.yearStartMonth,
    props.payProps
  );
  const fmt = props.stepFmt[period];
  const step = props.stepSkip[period];
  const offset = period === "year" ? props.yearStartMonth : 0;
  return doMarks(marks, fmt, props.rangeScope.start, step, offset);
};

export const mainMarks = (props: SliderProps) => {
  const _val = stepMajor[props.stepValue];
  if (_val != null) {
    return buildMarks(_val, props);
  }
  return null;
};

export const superMarks = (props: SliderProps) => {
  const _val = stepMinor[props.stepValue];
  if (_val != null) {
    return buildMarks(_val, props);
  }
  return null;
};

export const uniqueDate = (_array: Date[]) => {
  return _array
    .map((s) => s.getTime())
    .filter((s, i, a) => a.indexOf(s) === i)
    .map((s) => new Date(s));
};

/** Date field input parameters and checks */

export const inputParms = (dates: dateRange, rangeScope: dateRange) => {
  const _start =
    dates.start >= rangeScope.start
      ? startOfDay(dates.start)
      : startOfDay(rangeScope.start);
  const _end =
    dates.end <= rangeScope.end
      ? endOfDay(dates.end)
      : endOfDay(rangeScope.end);
  const _startInRange: boolean = isWithinInterval(
    startOfDay(dates.start),
    rangeScope
  );
  const _endInRange: boolean = isWithinInterval(
    startOfDay(dates.end),
    rangeScope
  );
  try {
    const noDays = differenceInDays(_end, _start);
    const _startStory =
      (_startInRange
        ? ""
        : " [" + format(dates.start, "EEE, d MMM yy") + "] ") +
      format(_start, "EEE, d MMM yy");
    const _endStory =
      (_endInRange ? "" : " [" + format(dates.end, "EEE, d MMM yy") + "] ") +
      format(_end, "EEE, d MMM yy");
    return {
      string:
        formatDistance(_start, _end)
          .toLowerCase()
          .replace(/\b\w/g, (s) => s.toUpperCase()) +
        (noDays !== 0 ? " from " + _startStory + " to " : " - ") +
        _endStory +
        (_startInRange && _endInRange ? `` : `. [Selection exceeds scope]`),
      duration: formatDistance(_start, _end),
      fmDoW: format(dates.start, "EEEE"),
      toDoW: format(dates.end, "EEE"),
      fmValid: _startInRange,
      toValid: _endInRange,
    };
  } catch {
    return {
      string: "Date entry is invalid",
      duration: formatDistance(_start, _end),
      fmDoW: format(dates.start, "EEEE"),
      toDoW: format(dates.end, "EEE"),
      fmValid: _startInRange,
      toValid: _endInRange,
    };
  }
};
