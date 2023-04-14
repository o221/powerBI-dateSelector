import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { HelpOutline } from "@mui/icons-material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";
import { useHotkeys } from "react-hotkeys-hook";
import { HELP_PROVIDER } from "./constants";

const HelpContext = React.createContext({
  showKey: false,
  showHelp: false,
toggleHelp: () => {/* show or hide help messages*/},
});

const { TopRowInfo, DetailRowInfo, TopRowHelp, DetailRowHelp } = HELP_PROVIDER;

export const useHelpContext = () => useContext(HelpContext);

export const HelpProvider = ({ children, showHelpIcon }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const toggleHelp = (): void => {
    setShowHelp(!showHelp);
    
  };

  const value = { showKey, showHelp, toggleHelp };
  useHotkeys("escape", () => setShowHelp(false));
  useHotkeys(["h"], () => setShowHelp(true));
  // useHotkeys(["alt"], () => toggleKey());
  useHotkeys("alt", () => setShowKey(true), { keydown: true }, [showKey]);
  useHotkeys("alt", () => setShowKey(false), { keyup: true }, [showKey]);

  return (
    <HelpContext.Provider value={value}>
      {showHelpIcon && (
        <Tooltip
          arrow
          title={
            showHelp ? (
              <>
                <div>
                  <b>{TopRowInfo}</b>
                </div>
                <div>{DetailRowInfo}</div>
              </>
            ) : (
              <>
                <div>
                  <b>{TopRowHelp}</b>
                </div>
                <div>{DetailRowHelp}</div>
              </>
            )
          }
          placement="left"
          // open={showHelp}
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: (theme) =>
                  showHelp
                    ? theme.palette.secondary.dark
                    : theme.palette.primary.dark,
                maxWidth: 350,
                fontWeight: 400,
                fontSize: 8,
              },
            },
          }}
        >
          <IconButton
            size="small"
            sx={{ position: "absolute", right: 0, top: 0, margin: 0.2 }}
            color={showHelp ? "secondary" : "primary"}
            onClick={toggleHelp}
          >
            {showHelp ? (
              <InfoOutlined style={{ fontSize: 16 }} />
            ) : (
              <HelpOutline style={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Tooltip>
      )}
      {children}
    </HelpContext.Provider>
  );
};
