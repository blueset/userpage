import React, { ReactNode } from "react";
import styleSet from "./Kbd.module.css";

type KbdProps = {
  children: ReactNode,
};

export function Kbd(props: KbdProps) {
  
  return (
    <kbd
      className={`${styleSet.root}`}
    >
      {props.children}
    </kbd>
  );
}
