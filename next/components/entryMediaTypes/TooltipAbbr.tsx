import { Tooltip } from "@material-ui/core";
import { ReactNode } from "react";
import React from "react";

export function TooltipAbbr(props: { children: ReactNode; title: string }) {
  return (
    <Tooltip title={props.title} arrow>
      <span>
        <abbr title={props.title}>{props.children}</abbr>
      </span>
    </Tooltip>
  );
}
