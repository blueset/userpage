import React from "react";
import { CardMedia } from "@material-ui/core";
import moment from "moment";

type DateBoxProps = {
  className?: string,
  format: string,
  fontSize?: string,
  backgroundColor?: string,
  color?: string,
  fontWeight?: string,
  monospace?: boolean,
};

export function DateBox(props: DateBoxProps) {
  return (
    <CardMedia
      className={`${props.className}`}
      style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      lineHeight: 1,
      textAlign: "center",
      fontSize: props.fontSize,
      fontWeight: parseInt(props.fontWeight || "500"),
      backgroundColor: props.backgroundColor,
      color: props.color,
      fontVariantNumeric: props.monospace ? "tabular-nums" : undefined,
    }}
      component="div"
    >
      {moment().format(props.format)}
    </CardMedia>
  );
}

DateBox.defaultProps = {
  fontSize: "1.8rem",
  fontWeight: "700",
  backgroundColor: "#285817",
  color: "#badc94",
  monospace: false,
};