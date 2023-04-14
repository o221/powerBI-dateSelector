/*
 *  Power BI Visualization Settings
 *  Date Range Selector
 */

"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.Card;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
import {
    StyleSettings,
    CalendarSettings,
    ConfigSettings,
    DaySettings,
    WeekSettings,
    PaySettings,
    MonthSettings,
    QuarterSettings,
    YearSettings
} from "./initsettings"

export class VisualSettingsModel extends FormattingSettingsModel {
    // Building visual formatting settings card
    styleCard = new styleSettings();
    calendarCard = new calendarSettings();
    configCard = new configSettings();
    dayCard = new daySettings();
    weekCard = new weekSettings();
    payCard = new paySettings();
    monthCard = new monthSettings();
    quarterCard = new quarterSettings();
    yearCard = new yearSettings();

    // Add formatting settings card to cards list in model
    cards: Array<FormattingSettingsCard> = [
        this.styleCard, this.calendarCard, this.configCard,
        this.dayCard, this.weekCard, this.payCard, this.monthCard, this.quarterCard, this.yearCard
    ];
}

class styleSettings extends FormattingSettingsCard {

    style: StyleSettings = new StyleSettings();

    name: string = "style";
    description: string = "Visual look and feel";
    displayName: string = "Style";
    analyticsPane: boolean = false;
    uid: string = "styleUid";

    // Slices 
    themeFont = new formattingSettings.AutoDropdown({
        name: "themeFont",
        description: "Font for text on this slicer",
        displayName: "Theme Font",
        value: this.style.themeFont
    });
    themeMode = new formattingSettings.AutoDropdown({
        name: "themeMode",
        description: "Theme mode dark background",
        displayName: "Mode",
        value: this.style.themeMode
    });
    themeColor = new formattingSettings.ColorPicker({
        name: "themeColor",
        displayName: "Theme color",
        value: { value: this.style.themeColor }
    });

    // not implemented
    fmtDate = new formattingSettings.AutoDropdown({ 
        name: "fmtDate",
        description: "Date format of the input fields",
        displayName: "Date Input Format",
        value: this.style.fmtDate
    });

    slices: Array<FormattingSettingsSlice> = [this.themeFont, this.themeMode, this.themeColor];

}

class calendarSettings extends FormattingSettingsCard {

    calendar: CalendarSettings = new CalendarSettings();

    name: string = "calendar";
    description: string = "Calendar stuff like Year Setup (Financial/Calendar), Week start day, etc.";
    displayName: string = "Range options";
    analyticsPane: boolean = false;
    uid: string = "calendarUid";

    startRange = new formattingSettings.AutoDropdown({
        name: "startRange",
        description: "Default date range when a page is loaded - predominant unless 'Sync'",
        displayName: "Start Range",
        value: this.calendar.startRange
    });
    // Slices 
    stepInit = new formattingSettings.AutoDropdown({
        name: "stepInit",
        description: "Slider and increment step intervals when a page is loaded",
        displayName: "Step Level",
        value: this.calendar.stepInit
    }
    );
    yearStartMonth = new formattingSettings.AutoDropdown({
        name: "yearStartMonth",
        description: "Set the start month for the [Fiscal] year",
        displayName: "Fiscal Year Start",
        value: this.calendar.yearStartMonth
    });
    weekStartDay = new formattingSettings.AutoDropdown({
        name: "weekStartDay",
        description: "The start day for each week step",
        displayName: "Week Start Day",
        value: this.calendar.weekStartDay
    });

    slices: Array<FormattingSettingsSlice> = [this.startRange, this.stepInit, this.yearStartMonth, this.weekStartDay];
}

class configSettings extends FormattingSettingsCard {

    public config: ConfigSettings = new ConfigSettings();

    name: string = "config";
    description: string = "Timeline controls to show or hide";
    displayName: string = "Layout";
    analyticsPane: boolean = false;
    uid: string = "timelineUid";

    showSlider = new formattingSettings.ToggleSwitch({
        name: "showSlider",
        description: "Show the timeline by default",
        displayName: "Timeline",
        value: this.config.showSlider
    });

    show2ndSlider = new formattingSettings.ToggleSwitch({
        name: "show2ndSlider",
        description: "Show 2 sliders for mixed granularity & clarification of year for months, month for weeks, etc.",
        displayName: "2 timeline sliders",
        value: this.config.show2ndSlider
    });

    showCurrent = new formattingSettings.ToggleSwitch({
        name: "showCurrent",
        description: "Show the Current Action Bar selector for Today, this week, this month, this year, etc.",
        displayName: "Current Periods",
        value: this.config.showCurrent
    });

    showIconText = new formattingSettings.ToggleSwitch({
        name: "showIconText",
        description: "Show the Current Period selector icon text",
        displayName: "Current Icon Text",
        value: this.config.showIconText
    });
    showHelpIcon = new formattingSettings.ToggleSwitch({
        name: "showHelpIcon",
        description: "Show help button for optional extended tooltip help.",
        displayName: "Help Icon",
        value: this.config.showHelpIcon
    });

    showMore = new formattingSettings.ToggleSwitch({
        name: "showMore",
        description: "Show the Extended Period selector for YTD, YT last nonth, etc.",
        displayName: "Extended Periods",
        value: this.config.showMore
    });

    slices: Array<FormattingSettingsSlice> = [this.showSlider, this.show2ndSlider, this.showCurrent, this.showIconText, this.showHelpIcon, this.showMore];
}

class daySettings extends FormattingSettingsCard {

    public day: DaySettings = new DaySettings();

    name: string = "day";
    description: string = "Show the Today button on the Step Bar & Current Action Bar";
    displayName: string = "Day steps";
    analyticsPane: boolean = false;
    uid: string = "dayUid";

    showDay = new formattingSettings.ToggleSwitch({
        name: "showDay",
        displayName: undefined,
        topLevelToggle: true,
        value: this.day.showDay
    });

    fmtDay = new formattingSettings.AutoDropdown({
        name: "fmtDay",
        displayName: "Day format (Today)",
        description: "The timeline format for day step level",
        value: this.day.fmtDay
    });

    slices: Array<FormattingSettingsSlice> = [this.showDay, this.fmtDay];
}

class weekSettings extends FormattingSettingsCard {

    public week: WeekSettings = new WeekSettings();

    name: string = "week";
    description: string = "Show the Week buttons on the Step Bar & Current Action Bar";
    displayName: string = "Week steps";
    analyticsPane: boolean = false;
    uid: string = "weekUid";

    showWeek = new formattingSettings.ToggleSwitch({
        name: "showWeek",
        displayName: undefined,
        topLevelToggle: true,
        value: this.week.showWeek
    });

    fmtWeek = new formattingSettings.AutoDropdown({
        name: "fmtWeek",
        displayName: "Week format",
        description: "The timeline format for week step level",
        value: this.week.fmtWeek
    });

    weekSkip = new formattingSettings.NumUpDown({
        name: "weekSkip",
        displayName: "# Week labels to skip",
        description: "Timeline skips the number of week marker labels specified",
        value: this.week.weekSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showWeek, this.weekSkip, this.fmtWeek];
}

class paySettings extends FormattingSettingsCard {

    public pay: PaySettings = new PaySettings();

    name: string = "pay";
    description: string = "Show the Pay buttons on the Step Bar & Current Action Bar";
    displayName: string = "Pay steps";
    analyticsPane: boolean = false;
    uid: string = "payUid";

    showPay = new formattingSettings.ToggleSwitch({
        name: "showPay",
        displayName: undefined,
        topLevelToggle: true,
        value: this.pay.showPay
    });

    fmtPay = new formattingSettings.AutoDropdown({
        name: "fmtPay",
        displayName: "Pay Period format",
        description: "The timeline format for pay step level",
        value: this.pay.fmtPay
    });

    paySkip = new formattingSettings.NumUpDown({
        name: "paySkip",
        displayName: "# Pay labels to skip",
        description: "Timeline skips the number of pay marker labels specified",
        value: this.pay.paySkip
    });

    payLength = new formattingSettings.NumUpDown({
        name: "payLength",
        displayName: "Pay period length",
        description: "Pay period length in days",
        value: this.pay.payLength
    });

    payRefDay = new formattingSettings.NumUpDown({
        name: "payRefDay",
        displayName: "Reference date DAY",
        description: "Pay period seed reference date from which to start the repeating period",
        value: this.pay.payRefDay
    });

    payRefMonth = new formattingSettings.AutoDropdown({
        name: "payRefMonth",
        displayName: "Reference date MONTH",
        description: "Pay period seed reference date's month from which to start the repeating period",
        value: this.pay.payRefMonth
    });

    payRefYear = new formattingSettings.NumUpDown({
        name: "payRefYear",
        displayName: "Reference date YEAR",
        description: "Pay period seed reference date's year from which to start the repeating period",
        value: this.pay.payRefYear
    });

    // feature doesn't work
    payRefDate = new formattingSettings.DatePicker({
        placeholder: "Pay Period Reference Date",
        name: "payRefDate",
        displayName: "Pay period start",
        description: "Pay period seed reference date from which to start the repeating period",
        value: this.pay.payRefDate
    });

    slices: Array<FormattingSettingsSlice> = [this.showPay, this.paySkip, this.fmtPay, this.payLength, this.payRefYear, this.payRefMonth, this.payRefDay];
}

class monthSettings extends FormattingSettingsCard {

    public month: MonthSettings = new MonthSettings();

    name: string = "month";
    description: string = "Show the Month buttons on the Step Bar & Current Action Bar";
    displayName: string = "Month steps";
    analyticsPane: boolean = false;
    uid: string = "monthUid";

    showMonth = new formattingSettings.ToggleSwitch({
        name: "showMonth",
        displayName: undefined,
        topLevelToggle: true,
        value: this.month.showMonth
    });

    fmtMonth = new formattingSettings.AutoDropdown({
        name: "fmtMonth",
        displayName: "Month Period format",
        description: "The timeline format for month step level",
        value: this.month.fmtMonth
    });

    monthSkip = new formattingSettings.NumUpDown({
        name: "monthSkip",
        displayName: "# Month labels to skip",
        description: "Timeline skips the number of month marker labels specified",
        value: this.month.monthSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showMonth, this.monthSkip, this.fmtMonth];
}

class quarterSettings extends FormattingSettingsCard {

    public quarter: QuarterSettings = new QuarterSettings();

    name: string = "quarter";
    description: string = "Show the Quarter buttons on the Step Bar & Current Action Bar";
    displayName: string = "Quarter steps";
    analyticsPane: boolean = false;
    uid: string = "quarterUid";

    showQuarter = new formattingSettings.ToggleSwitch({
        name: "showQuarter",
        displayName: undefined,
        topLevelToggle: true,
        value: this.quarter.showQuarter
    });

    fmtQuarter = new formattingSettings.AutoDropdown({
        name: "fmtQuarter",
        displayName: "Quarter Period format",
        description: "The timeline format for quarter step level",
        value: this.quarter.fmtQuarter
    });

    quarterSkip = new formattingSettings.NumUpDown({
        name: "quarterSkip",
        displayName: "# Quarter labels to skip",
        description: "Timeline skips the number of quarter marker labels specified",
        value: this.quarter.quarterSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showQuarter, this.quarterSkip, this.fmtQuarter];
}

class yearSettings extends FormattingSettingsCard {

    public year: YearSettings = new YearSettings();

    name: string = "year";
    description: string = "Show the Year buttons on the Step Bar & Current Action Bar";
    displayName: string = "Year steps";
    analyticsPane: boolean = false;
    uid: string = "yearUid";

    showYear = new formattingSettings.ToggleSwitch({
        name: "showYear",
        displayName: undefined,
        topLevelToggle: true,
        value: this.year.showYear
    });

    fmtYear = new formattingSettings.AutoDropdown({
        name: "fmtYear",
        displayName: "Year Period format",
        description: "The timeline format for year step level",
        value: this.year.fmtYear
    });

    yearSkip = new formattingSettings.NumUpDown({
        name: "yearSkip",
        displayName: "# Year labels to skip",
        description: "Timeline skips the number of year marker labels specified",
        value: this.year.yearSkip
    });

    slices: Array<FormattingSettingsSlice> = [this.showYear, this.yearSkip, this.fmtYear];
}

