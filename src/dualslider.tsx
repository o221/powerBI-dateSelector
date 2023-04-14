import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Zoom from "@mui/material/Zoom";
import { ValueLabel } from "./rngetooltip";
import { style, styleB, styleT } from "./sliderstyles";

interface DualSliderProps {
  value: number[];
  step: number | null;
  showBottomSlider: boolean;
  mainMarks: Array<{
    value: number;
    label: string;
  }>;
  superMarks: Array<{
    value: number;
    label: string;
  }>;
  max: number;
  valueLabelFormat: (value: number) => string;
  handleTopCommit: (e: Event, val: number[]) => void;
  handleBottomCommit: (e: Event, val: number[]) => void;
  onChange: (
    event: Event,
    value: number | number[],
    activeThumb?: number
  ) => void;
  onClick?: (event: React.SyntheticEvent) => void;
}

function DualSlider(props: DualSliderProps): JSX.Element {
  const {
    value,
    step,
    showBottomSlider,
    handleTopCommit,
    handleBottomCommit,
    mainMarks,
    superMarks,
    max,
    valueLabelFormat,
    onChange,
    onClick
  } = props;

  return (
    <Box sx={{ height: "55px" }}>
      <Box>
        <Slider
          name="top"
          key="slider1"
          size="small"
          color="primary"
          value={value}
          onChangeCommitted={handleTopCommit}
          onChange={onChange}
          onClick={onClick}
          step={step}
          marks={mainMarks}
          valueLabelDisplay="auto"
          components={{
            ValueLabel: ValueLabel
          }}
          valueLabelFormat={valueLabelFormat}
          min={0}
          max={max}
          sx={Object.assign({}, style, styleT)}
        />
      </Box>
      <Zoom in={showBottomSlider}>
        <Box component="span" height={"10px"}>
          <Slider
            name="bottom"
            key="slider2"
            size="small"
            color="primary"
            value={value}
            onChange={onChange}
            onChangeCommitted={handleBottomCommit}
            step={null}
            max={max}
            marks={superMarks}
            components={{
              ValueLabel: ValueLabel
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={valueLabelFormat}
            aria-labelledby="range-slider2"
            getAriaValueText={valueLabelFormat}
            min={0}
            sx={Object.assign({}, style, styleB)}
          />
        </Box>
      </Zoom>
    </Box>
  );
}

export default DualSlider;
