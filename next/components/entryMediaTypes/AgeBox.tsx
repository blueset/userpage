import React from "react";
import { CardMedia } from "@material-ui/core";
import styleSet from "./AgeBox.module.css";

type AgeBoxProps = {
    className?: string,
    since: string
};

function getAge(since: string): number {
  const date = +new Date(parseInt(since));
  return Math.floor((Date.now() - date) / 31557600000);
}

export function AgeBox (props: AgeBoxProps) {
  
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
