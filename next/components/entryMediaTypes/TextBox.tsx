import React, { ReactNode } from "react";
import { CardMedia } from "@material-ui/core";

type TextBoxProps = {
  className?: string,
  children: ReactNode,
  fontSize?: string,
  backgroundColor?: string,
  color?: string,
  fontWeight?: string,
};

export function TextBox(props: TextBoxProps) {
  return (
    <CardMedia
      className={`${props.className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 1,
        textAlign: "center",
        whiteSpace: "pre-wrap",
        fontSize: props.fontSize,
        fontWeight: parseInt(props.fontWeight || "500"),
        backgroundColor: props.backgroundColor,
        color: props.color,
      }}
      component="div"
    >
      {props.children}
    </CardMedia>
  );
}

TextBox.defaultProps = {
  fontSize: "2rem",
  fontWeight: "700",
  backgroundColor: "#f9f9f9",
  color: "#333333",
};
