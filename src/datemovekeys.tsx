import { getRange } from "./dateutils";
import { useHotkeys } from "react-hotkeys-hook";
import debounce from "lodash.debounce";

type Callback = (result: Date[]) => void;
export function dateMoveKeys(
  fn: Callback,
  stepValue: string,
  dates: Interval,
  current: any,
  debounceTime = 500
) {
  const updateResult = (x: string) => {
    const dteRange = getRange(x, stepValue, dates);
    fn(dteRange);
    // console.log("moveKeys: ", dteRange.toString());
  };

  const debouncedResult = debounce(updateResult, debounceTime, {
    leading: false,
    trailing: true
  });

  useHotkeys(["n", "right"], () => debouncedResult("f"), [stepValue, dates]);
  useHotkeys(["left", "l"], () => debouncedResult("b"), [stepValue, dates]);
  useHotkeys("ctrl+right", () => debouncedResult("ef"), [stepValue, dates]);
  useHotkeys("ctrl+left", () => debouncedResult("eb"), [stepValue, dates]);
  useHotkeys("shift+right", () => debouncedResult("rf"), [stepValue, dates]);
  useHotkeys("shift+left", () => debouncedResult("rb"), [stepValue, dates]);
  useHotkeys(
    "t",
    () => {
      const thisRange = current
        .filter((item) => item.tip.toLowerCase() === stepValue)
        .map((item) => item.thisRange)[0];
      fn([thisRange.start, thisRange.end]);
    },
    [stepValue]
  );
}
