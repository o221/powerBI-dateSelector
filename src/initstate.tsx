//import * as React from "react";
import { endOfYear, startOfYear, startOfToday } from "date-fns";

import { dateCardProps } from "./interface";

export const initialState: dateCardProps = {
  rangeScope: {
    start: startOfYear(startOfToday()),
    end: endOfYear(startOfToday())
  },
  weekStartDay: 0, // 0 = Sun
  yearStartMonth: 0, // 0 = Jan
  stepInit: "week",
  stepSkip: {
    day: 1,
    week: 4,
    pay: 4,
    month: 1,
    quarter: 1,
    year: 1
  },
  stepViz: {
    day: true,
    week: true,
    pay: false,
    month: true,
    quarter: false,
    year: true
  },
  stepFmt: {
    day: "d-MMM",
    pay: "d-MMM",
    week: "w",
    month: "MMMMM",
    quarter: "'Q'Q-yy",
    year: "yy"
  },
  payProps: {
    desc: "Pay-Period",
    ref: new Date("2023-01-1"), //startOfYear(startOfToday()),
    len: 14
  },
  themeColor: "#607d8b",
  themeFont: '"Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif',
  themeMode: "light",
  showCurrent: true,
  showHelpIcon: false,
  vizOpt: false,
  showIconText: false,
  showSlider: true,
  show2ndSlider: true
};
