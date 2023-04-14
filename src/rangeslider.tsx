import * as React from "react";
import { SliderProps } from "./interface";
import DualSlider from "./dualslider";
import {
  mainMarks,
  superMarks,
  sliderMarkNumber,
  sliderMarkDate,
  sliderMarkText
} from "./dateutils";

export default function RangeSlider(props: SliderProps) {
  const { dates, rangeScope, stepValue, show2ndSlider, handleVal } = props;

  const [sliderStart, setSliderStart] = React.useState<number>(
    sliderMarkNumber(dates.start, rangeScope.start)
  );
  const [sliderEnd, setSliderEnd] = React.useState<number>(
    sliderMarkNumber(dates.end, rangeScope.start)
  );

  React.useEffect(() => {
    const sn = sliderMarkNumber(dates.start, rangeScope.start);
    setSliderStart(sn);
    const en = Math.min(
      sliderMarkNumber(dates.end, rangeScope.start),
      sliderMarkNumber(rangeScope.end, rangeScope.start)
    );
    setSliderEnd(en);
  }, [dates, rangeScope]);

  const closestMark = (val: number[]) => {
    return val.map((x) => {
      const marks = mainMarks(props).map((v) => v.value);
      return marks.sort((a, b) => Math.abs(x - a) - Math.abs(x - b))[0];
    });
  };

  const handleChange = (
    event: MouseEvent,
    val: number[],
    stp: boolean,
    commit: boolean
  ): void => {
    const x = isNaN(val.reduce((a, b) => a + b, 0));
    if (!x) {
      if (event.ctrlKey) {
        const d = [val[0] - sliderStart, val[1] - sliderEnd].filter(
          (v) => v !== 0
        )[0];
        val = d ? [sliderStart, sliderEnd].map((v) => v + d) : val;
        val = stp ? val : closestMark(val);
      }

      val[1] = sliderEnd === val[1] || stp ? val[1] : val[1] - 1;

      if (commit) {
        handleVal([
          sliderMarkDate(val[0], rangeScope.start),
          sliderMarkDate(val[1], rangeScope.start)
        ]);
      } else {
        setSliderStart(val[0]);
        setSliderEnd(val[1]);
      }
    }
  };

  const handleOnChange = (e: MouseEvent, val: number[]) => {
    const top = e.target["name"] === "top";
    handleChange(e, val, top ? stepValue === "day" : false, false);
  };

  const handleTopCommit = (e: MouseEvent, val: number[]) => {
    handleChange(e, val, stepValue === "day", true);
  };

  const handleBottomCommit = (e: MouseEvent, val: number[]) => {
    handleChange(e, val, false, true);
  };
  return (
    <DualSlider
      value={[sliderStart, sliderEnd]}
      step={stepValue === "day" ? 1 : null}
      showBottomSlider={show2ndSlider}
      handleTopCommit={handleTopCommit}
      handleBottomCommit={handleBottomCommit}
      mainMarks={mainMarks(props)}
      superMarks={superMarks(props)}
      valueLabelFormat={(val) => sliderMarkText(val, rangeScope.start)}
      max={sliderMarkNumber(rangeScope.end, rangeScope.start)}
      onChange={handleOnChange}
    />
  );
}
