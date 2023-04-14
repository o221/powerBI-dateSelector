/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
"use strict";

import powerbi from "powerbi-visuals-api";
// powerbi viz stuff
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import VisualUpdateType = powerbi.VisualUpdateType;

// filter stuff
import { AdvancedFilter, IFilterColumnTarget } from "powerbi-models";
import { interactivityFilterService } from "powerbi-visuals-utils-interactivityutils";
import extractFilterColumnTarget = interactivityFilterService.extractFilterColumnTarget;


// Formatting Options Panel
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualSettingsModel } from "./settings";

// React integration
import * as React from "react";
import { render } from "react-dom";
// react application interfaces
import DateCardClass from "./dateRangeSelector";
import { getInitRange } from "./dateutils";

export class Visual implements IVisual {
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;
  private formattingSettings: VisualSettingsModel;
  private previousSettings: VisualSettingsModel | null = null;
  private formattingSettingsService: FormattingSettingsService;
  private static filterObjectProperty: {
    objectName: string;
    propertyName: string;
  } = { objectName: "general", propertyName: "filter" };
  private filterTarget!: IFilterColumnTarget;
  private initialized: boolean = false;
  private dateInitRange: string;
  // Initial date selection
  public start: Date | null = null;
  public end: Date | null = null;
  private rangeScope: {
    start: Date | null;
    end: Date | null;
  } = { start: null, end: null };
  private dateRangeFilter: {
    start: Date | null;
    end: Date | null;
  } = { start: null, end: null };
  private prevFilteredStartDate: Date | null = null;
  private prevFilteredEndDate: Date | null = null;
  private host: powerbi.extensibility.visual.IVisualHost;

  constructor(options: VisualConstructorOptions) {
    // console.log('Visual constructor', options);
    this.formattingSettingsService = new FormattingSettingsService();
    this.reactRoot = React.createElement(DateCardClass, {
      onChanged: this.handleVal,
    });
    this.target = options.element;
    this.host = options.host;
    render(this.reactRoot, this.target);
  }

  public update(options: VisualUpdateOptions) {
    // console.log("opt: ",options)
    if (!Visual.areOptionsValid(options)) {
      this.clearData();
      return null;
    }

    //  Get settings
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualSettingsModel,
        options.dataViews
      );

    const isDataUpdate =
      options.type === VisualUpdateType.Data || this.rangeScope.start === null;
    const isSettingsUpdate = this.previousSettings !== this.formattingSettings;

    const dataView: DataView = options.dataViews[0];

    if (Visual.isDataViewValid(dataView)) {
      this.clearData();
      return null;
    }
    //  Set up the date scope of the slider
    if (isDataUpdate || !this.initialized) {
      // Get the date values
      const cat: powerbi.DataViewCategoryColumn =
        dataView.categorical.categories[0];
      const len: number = cat.values.length - 1;

      // Initialise the filter
      this.filterTarget = extractFilterColumnTarget(cat);
      this.setFilterValues(options.jsonFilters as AdvancedFilter[]);

      const minDate: Date = this.parseDate(cat.values[0]);
      const maxDate: Date = this.parseDate(cat.values[len]);
      this.rangeScope = {
        start: minDate,
        end: maxDate,
      };
      //console.log(cat.values)
      DateCardClass.update({
        rangeScope: this.rangeScope,
      });
    }

    this.initializeValues(isSettingsUpdate);
  }

  private initializeValues = (isSettingsUpdate: boolean) => {
    const calendar = this.formattingSettings.calendarCard;
    const startRange = calendar.startRange.value.toString();
    // console.log("init? ",this.initialized)

    if (
      startRange === "sync" ||
      (this.dateInitRange === startRange && this.start) 
      // check if an init range has already been set up
      ) {
      this.dateRangeFilter = {
        start: this.start === null ? this.rangeScope.start : this.start,
        end: this.end === null ? this.rangeScope.end : this.end,
      };
    } else {
      this.dateRangeFilter = getInitRange(
        startRange,
        this.getDayNum(calendar.weekStartDay.value.valueOf()),
        this.getNum(calendar.yearStartMonth.value.valueOf()),
        this.rangeScope
      );
      this.dateInitRange = startRange;
    }

    DateCardClass.update({
      dates: this.dateRangeFilter,
    });

    this.handleVal([this.dateRangeFilter.start, this.dateRangeFilter.end]);

    this.initialized = true;

    if (isSettingsUpdate) {
      this.previousSettings = this.formattingSettings;
      const style = this.formattingSettings.styleCard;
      const config = this.formattingSettings.configCard;
      const day = this.formattingSettings.dayCard;
      const week = this.formattingSettings.weekCard;
      const pay = this.formattingSettings.payCard;
      const month = this.formattingSettings.monthCard;
      const quarter = this.formattingSettings.quarterCard;
      const year = this.formattingSettings.yearCard;

      DateCardClass.update({
        weekStartDay: this.getDayNum(calendar.weekStartDay.value.valueOf()),
        yearStartMonth: this.getNum(calendar.yearStartMonth.value.valueOf()),
        stepInit: calendar.stepInit.value.toString(),
        stepSkip: {
          day: 1,
          week: week.weekSkip.value,
          pay: pay.paySkip.value,
          month: month.monthSkip.value,
          quarter: quarter.quarterSkip.value,
          year: 1,
        },
        stepViz: {
          day: day.showDay.value,
          week: week.showWeek.value,
          pay: pay.showPay.value,
          month: month.showMonth.value,
          quarter: quarter.showQuarter.value,
          year: year.showYear.value,
        },
        stepFmt: {
          day: day.fmtDay.value.toString(),
          week: week.fmtWeek.value.toString(),
          pay: pay.fmtPay.value.toString(),
          month: month.fmtMonth.value.toString(),
          quarter: quarter.fmtQuarter.value.toString(),
          year: year.fmtYear.value.toString(),
        },
        payProps: {
          desc: "Pay-Period",
          ref: new Date(
            pay.payRefYear.value,
            this.getNum(pay.payRefMonth.value.valueOf()),
            pay.payRefDay.value
          ),
          len: pay.payLength.value,
        },
        showHelpIcon: config.showHelpIcon.value,
        showCurrent: config.showCurrent.value,
        vizOpt: config.showMore.value,
        showIconText: config.showIconText.value,
        showSlider: !config.showSlider.value,
        show2ndSlider: config.show2ndSlider.value,
        themeColor: style.themeColor.value.value,
        themeFont: style.themeFont.value,
        themeMode: style.themeMode.value,
      });
    }
  };

  private clearData(): void {
    // console.log('cleared ');
    this.initialized = false;
    this.dateInitRange = "";
    // DateCardClass.update(initialState);
  }

  private getNum = (n: number | string) => {
    return typeof n === "number" ? n : parseInt(n, 10);
  };
  private getDayNum = (n: number | string): 0 | 1 | 2 | 3 | 4 | 5 | 6 => {
    const num = typeof n === "number" ? n : parseInt(n, 10);
    const dayIndex = num % 7;
    return dayIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  };

  /**
   * Event listener for React date changes
   */
  private handleVal = (value: [Date, Date]) => {
    this.start = value[0];
    this.end = value[1];
    this.dateRangeFilter = { start: this.start, end: this.end };
    this.updatePrevFilterState(this.start, this.end, this.filterTarget);
  };

  private setFilterValues = (jsonFilters: AdvancedFilter[]) => {
    if (
      jsonFilters &&
      jsonFilters[0] &&
      jsonFilters[0].conditions &&
      jsonFilters[0].conditions[0] &&
      jsonFilters[0].conditions[1]
    ) {
      const startDate: Date = new Date(`${jsonFilters[0].conditions[0].value}`);
      const endDate: Date = new Date(`${jsonFilters[0].conditions[1].value}`);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        this.start = startDate;
        this.end = endDate;
      } else {
        this.start = null;
      }
    } else {
      this.start = null;
    }
  };

  // Apply the filter
  public applyDatePeriod(
    startDate: Date,
    endDate: Date,
    filterTarget: IFilterColumnTarget
  ): void {
    this.host.applyJsonFilter(
      this.createFilter(startDate, endDate, filterTarget),
      Visual.filterObjectProperty.objectName,
      Visual.filterObjectProperty.propertyName,
      this.getFilterAction(startDate, endDate)
    );
  }

  // Create the filter
  public createFilter(
    startDate: Date,
    endDate: Date,
    filterTarget: IFilterColumnTarget
  ): AdvancedFilter {
    if (startDate == null || endDate == null || !filterTarget) {
      return null;
    }

    return new AdvancedFilter(
      filterTarget,
      "And",
      {
        operator: "GreaterThanOrEqual",
        value: startDate.toJSON(),
      },
      {
        operator: "LessThanOrEqual",
        value: endDate.toJSON(),
      }
    );
  }

  // Clear the filter
  public clearSelection(target: IFilterColumnTarget): void {
    this.prevFilteredStartDate = null;
    this.prevFilteredEndDate = null;

    this.applyDatePeriod(null, null, target);
  }

  // Update the filter
  private updatePrevFilterState(
    startDate: Date,
    endDate: Date,
    target: IFilterColumnTarget
  ): void {
    const isFilterChanged: boolean =
      String(this.prevFilteredStartDate) !== String(startDate) ||
      String(this.prevFilteredEndDate) !== String(endDate);
    // console.log("isFilterChanged", isFilterChanged)

    if (isFilterChanged) {
      this.applyDatePeriod(startDate, endDate, target);
    }

    this.prevFilteredStartDate = startDate;
    this.prevFilteredEndDate = endDate;
  }

  // Clean up
  public getFilterAction(startDate: Date, endDate: Date): powerbi.FilterAction {
    return startDate !== null && endDate !== null
      ? powerbi.FilterAction.merge
      : powerbi.FilterAction.remove;
  }

  private static areOptionsValid(
    options: powerbi.extensibility.visual.VisualUpdateOptions
  ): boolean {
    // check that we have a valid dataview
    // check that the field is a date

    if (
      !options ||
      !options.dataViews ||
      !options.dataViews[0] ||
      !options.dataViews[0].metadata ||
      !Visual.isDataViewCategoricalValid(options.dataViews[0].categorical)
    ) {
      //console.log("false opt")
      return true;
    } else return false;
  }

  private static isDataViewCategoricalValid(
    dataViewCategorical: powerbi.DataViewCategorical
  ): boolean {
    return (
      !dataViewCategorical ||
      !dataViewCategorical.categories ||
      dataViewCategorical.categories.length !== 1 ||
      !dataViewCategorical.categories[0].values ||
      dataViewCategorical.categories[0].values.length === 0 ||
      !dataViewCategorical.categories[0].source ||
      !dataViewCategorical.categories[0].source.type.dateTime
    );
  }

  private static isDataViewValid(dataView: powerbi.DataView): boolean {
    if (
      !dataView ||
      !dataView.categorical ||
      !dataView.metadata ||
      dataView.categorical.categories.length <= 0 ||
      !dataView.categorical.categories[0] ||
      !dataView.categorical.categories[0].identityFields ||
      dataView.categorical.categories[0].identityFields.length <= 0
    ) {
      return true;
    }
    return false;
  }
  private parseDate(value: any): Date | null {
    const typeOfValue: string = typeof value;
    let date: Date = value;

    if (typeOfValue === "number") {
      date = new Date(value, 0);
    }

    if (typeOfValue === "string") {
      date = new Date(value);
    }

    if (date && date instanceof Date && date.toString() !== "Invalid Date") {
      return this.getYmd(date);
    }

    return null;
  }

  private getYmd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  /**
   * Returns properties pane formatting model content hierarchies, properties and latest formatting values, Then populate properties pane.
   * This method is called once every time we open properties pane or when the user edit any format property.
   */
  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
