export interface dateCardProps {
  dates?: dateRange;
  rangeScope?: dateRange;
  stepViz?: stepBool;
  vizOpt?: boolean;
  stepFmt?: stepString;
  stepSkip?: stepNum;
  stepInit?: string; // granularity display formats
  stepPeriod?: string;
  payProps?: pay;
  fmtDate?: string;
  weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  yearStartMonth?: number;
  showSlider?: boolean;
  show2ndSlider?: boolean;
  showCurrent?: boolean;
  themeColor?: string;
  themeFont?: any;
  themeMode?: any;
  showHelpIcon?: boolean;
  handleVal?: (val) => void;
  showIconText?: boolean;
}

export interface topRowProps {
  openSlider: boolean;
  toggleSlider: () => void;
  dates?: dateRange;
  rangeScope?: dateRange;
  payProps: any;
  handleVal?: (val) => void;
  stepViz?: stepBool;
  stepOpen: boolean;
  stepValue: string;
  handleClick: () => void;
  setStepValue: (value: string) => void;
  setStepOpen: (value: boolean) => void;
  vizOpt: boolean;
  showCurrent: boolean;
  showIconText: boolean;
  current: any;
}

export interface DateMoveProps {
  dates?: dateRange;
  rangeScope?: dateRange;
  stepValue?: string;
  payProps?: pay;
  bf?: string;
  viz?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  render?: number;
  handleVal?: (val) => void;
}

export interface stepProps {
  // value: string;
  stepViz?: stepBool;
  stepValue?: string;
  payProps?: pay;
  viz?: boolean;
  handleStep?: (newValue: string) => void;
  handleViz?: (viz: boolean) => void;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface UseCurrentProps {
  rangeScope?: dateRange;
  weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  yearStartMonth?: number;
  payProps?: pay;
  stepViz?: stepBool;
  showCurrent?: boolean;
  stepValue?: string;
  showIconText?: boolean;
  vizOpt?: boolean;
  current: any;
  handleVal?: (val) => void;
  handleStep?: (newValue: string) => void;
  handleViz?: (viz: boolean) => void;
}

export interface DateRangeProps {
  dates: dateRange;
  rangeScope?: dateRange;
  handleVal?: (val) => void;
  fmtDate?: string;
}

export interface SliderProps {
  dates?: dateRange;
  rangeScope?: dateRange;
  weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  yearStartMonth?: number;
  stepValue?: string;
  payProps?: pay;
  stepFmt?: stepString;
  stepSkip?: stepNum;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleVal?: (val) => void;
  toggleSlider?: () => void;
  show2ndSlider?: boolean;
  handleStep?: (val) => void;
}

export interface dateRange {
  start: Date;
  end: Date;
}

export interface stepBool {
  day: boolean;
  week: boolean;
  pay: boolean;
  month: boolean;
  quarter: boolean;
  year: boolean;
}

interface stepString {
  day: string;
  week: string;
  pay: string;
  month: string;
  quarter: string;
  year: string;
}

interface stepNum {
  day: number;
  week: number;
  pay: number;
  month: number;
  quarter: number;
  year: number;
}

interface pay {
  desc: string;
  ref: Date;
  len: number;
}

export interface current {
  tip: string;
  show: boolean;
  thisPeriod: string;
  thisRange: any;
  icon: JSX.Element;
}
