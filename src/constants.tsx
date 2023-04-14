export const HELP_PROVIDER = {
  ShortCut: "H",
  TopRowHelp: "Date Range Selection - shortcut key (H)",
  DetailRowHelp:
    "Click to show descriptions for each aspect of the date range selector.",
  TopRowInfo: "Information Mode Active",
  DetailRowInfo:
    "Hover over area of the date selector for descriptions. Escape to cancel."
};

export const STEP_TOGGLE = {
  ShortCut: "D, W, P, M, Q, Y",
  TopRow: "Step Level - ",
  DetailRow: "Set up the markers on the timeline"
};

export const TOGGLE_SLIDER_BUTTON = {
  ShortCut: "S",
  TopRowOpen: "Hide",
  TopRowClosed: "Show",
  TopRowEnd: " Timeline (S)",
  DetailRowOpen:
    "Click or drag to step markers to select date range or move range (ctrl+click) using top (or bottom) timeline markers. ",
  DetailRowClosed:
    "When displayed, use the timeline steps to drag or move (ctrl+click) to select a date range."
};

export const DATEUTILS = {
  periodTip: {
    day: "Day",
    week: "Week",
    pay: "Pay",
    month: "Month",
    quarter: "Quarter",
    year: "Year"
  },
  periodThis: {
    day: "Today",
    week: "This Week",
    pay: "This ",
    month: "This Month",
    quarter: "This Quarter",
    year: "This Year",
    range: "Full range",
    more: "more",
    ytd: "YTD",
    yearPast: "Year Past",
    ytdLastMonth: "YTD Last Month",
    ytdThisMonth: "YTD This Month"
  },
  periodGranularity: {
    day: "day",
    week: "week",
    pay: "pay",
    month: "month",
    quarter: "quarter",
    year: "year",
    range: "day",
    ytd: "day",
    yearPast: "day",
    ytdLastMonth: "month",
    ytdThisMonth: "month"
  }
};

export const HELP_TEXT = {
  menuToggle: {
    seq: "1",
    id: "menuToggle",
    helpText:
      "Tap the vertical menu button to show or hide the timeline date range slider.",
    isFirst: true,
    shortCut: "T",
    next: "fromDate"
  },
  fromDate: {
    seq: "2",
    id: "fromDate",
    helpText:
      "Enter the start date. Data only updates when you tap outside the field.",
    shortCut: ""
  },
  toDate: {
    seq: "3",
    id: "toDate",
    helpText:
      "Enter the end date. Data only updates when you tap outside the field.",
    shortCut: ""
  }
};
