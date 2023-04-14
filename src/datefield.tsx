import * as React from "react";
import TextField from "@mui/material/TextField";

interface DateFieldProps {
  id: "start" | "end";
  value: string;
  error?: boolean;
  underline?: boolean;
  type?: string;
  width?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

export const DateField: React.FC<DateFieldProps> = ({
  id,
  value,
  error,
  onChange,
  onBlur,
  onFocus,
  underline,
  type = "date",
  width = 95
}) => {
  return (
    <TextField
      id={id}
      sx={{
        "& input[type='date']::-webkit-calendar-picker-indicator": {
          display: "none",
          WebkitAppearance: "none"
        },
        width: { width }
      }}
      variant="standard"
      type={type}
      error={error}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={"yyyy-MM-dd"}
      InputProps={{
        disableUnderline: underline
      }}
    />
  );
};
