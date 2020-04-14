import React from "react";
import { makeStyles, CardMedia } from "@material-ui/core";

type AgeBoxProps = {
    className?: string,
    since: string
};

function getAge(since: string): number {
  const date = +new Date(parseInt(since));
  return Math.floor((Date.now() - date) / 31557600000);
}

export function AgeBox (props: AgeBoxProps) {
  const styleSet = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "3rem",
      textAlign: "center",
      fontWeight: 700,
      backgroundColor: "#dd3b06",
      color: "#ffffff",
    },
  })();
  const age = getAge(props.since);
  return (
    <CardMedia
      className={`${props.className} ${styleSet.root}`}
      component="div"
    >
        {age}
    </CardMedia>
  );
};

export function AgeValue (props: AgeBoxProps) {
  const age = getAge(props.since);
  return (
    <>{age}</>
  );
};
