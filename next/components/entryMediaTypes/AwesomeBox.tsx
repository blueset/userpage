import React from "react";
import { CardMedia } from "@material-ui/core";
import styleSet from "./AwesomeBox.module.css";

type AwesomeBoxProps = {
  className?: string,
};

export function AwesomeBox(props: AwesomeBoxProps) {
  
  return (
    <CardMedia
      className={`${props.className} ${styleSet.root}`}
      component="div"
    >
      <span className={styleSet.span}>
        CSS
        <br />
        IS
        <br />
        <b>AWESOME</b>
      </span>
    </CardMedia>
  );
}
