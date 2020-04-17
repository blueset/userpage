import React from "react";
import { makeStyles, CardMedia } from "@material-ui/core";

type AwesomeBoxProps = {
  className?: string,
};

export function AwesomeBox(props: AwesomeBoxProps) {
  const styleSet = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      border: "solid 2px #fff",
      justifyContent: "center",
      lineHeight: 1,
      textAlign: "right",
      fontSize: "1.5rem",
      fontWeight: 500,
      backgroundColor: "#000",
      color: "#fff",
      position: "relative",
    },
    span: {
      position: "absolute",
      right: "0.65rem",
    },
  })();
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
