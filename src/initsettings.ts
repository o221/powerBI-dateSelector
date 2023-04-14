/*
 *  Power BI Visualization Settings
 *  Date Range Selector
 */

"use strict";
// import Today from "@mui/icons-material/Today";
import {
    // startOfYear,
    startOfToday
  } from "date-fns";

export class StyleSettings {
    // granularity display formats
    public fmtDate: string = 'd-MM-yyyy';
    public themeColor: string = "#607d8b";
    public themeMode: string = "light";
    public themeFont: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif";
    public fontFamily: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif";
    public fontSize: number = 16;
    public fontBold: boolean = false;
    public fontUnderline: boolean = false;
    public fontItalic: boolean = false;
    public fontColor: string = "#000000";

}

export class CalendarSettings {
    // Initial date range
    public startRange: string = "rangeScope"
    // Initial step granularity
    public stepInit: string = "day";
    // Fiscal Year
    public yearStartMonth: number = 0;
    // Week start day
    public weekStartDay: number = 1;
    //Pay periods
    public payLength: number = 14;
    // Base Date for Pay Periods
    // public payRefDate: Date;
    public fmtDate: string = "EEE, d MMM yy";
}

export class ConfigSettings {
    // Slider initial visibility
    public showSlider: boolean = false;
    // 2 slider view
    public show2ndSlider: boolean = true;
    // granularity display items
    public showCurrent: boolean = true;
    public showIconText: boolean = false;
    public showHelpIcon: boolean = false;
    public showMore: boolean = false;
}

export class DaySettings {
    // Slider initial visibility
    public showDay: boolean = true;
    public fmtDay: string = 'd-MMM';
}

export class WeekSettings {
    public showWeek: boolean = true;
    public weekSkip: number = 4;
    public fmtWeek: string = 'w';
}

export  class PaySettings {
    public showPay: boolean = false;
    public paySkip: number = 4;
    public payLength: number = 14;
    public fmtPay: string = 'd-MMM';
    public payRefDay = new Date().getDate();
    public payRefYear = new Date().getFullYear();
    public payRefMonth = new Date().getMonth();
    public payRefDate: Date = startOfToday();//startOfYear(startOfToday());
}


export class MonthSettings {
    public showMonth: boolean = true;
    public monthSkip: number = 1;
    public fmtMonth: string = 'MMMMM';
}

export class QuarterSettings {
    public showQuarter: boolean = false;
    public fmtQuarter: string = 'QQQ';
    public quarterSkip: number = 1;
}

export class YearSettings {
    public showYear: boolean = true;
    public fmtYear: string = 'yyyy';
    public yearSkip: number = 1;
}
