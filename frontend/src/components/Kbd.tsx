import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core";

type KbdProps = {
  children: ReactNode,
};

export function Kbd(props: KbdProps) {
  const styleSet = makeStyles({
    root: {
        fontFamily: "monospace",
        display: "inline-block",
        borderRadius: "3px",
        padding: "0px 4px",
        boxShadow: "1px 1px 1px #777",
        margin: "2px",
        fontSize: "small",
        verticalAlign: "text-bottom",
        background: "#000",
        color: "#ddd",
        cursor: "pointer",
        fontWeight: 600,

        letterSpacing: "1px",

        "-webkit-touch-callout": "none",
        "-webkit-user-select": "none",
        "-khtml-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        userSelect: "none",
        "&:hover": {
          color: "#fff"
        },
        "&:hover *": {
          color: "#fff"
        },
        "&:active": {
          color: "#fff",
          boxShadow: "1px 1px 0px #ddd inset",
        },
        "&:active *": {
          color: "#fff",
          boxShadow: "1px 1px 0px #ddd inset",
        },
    },
  })();
  return (
    <kbd
      className={`${styleSet.root}`}
    >
      {props.children}
    </kbd>
  );
}
