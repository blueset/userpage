import { CategoryType, AuthInfo } from "../types";
import React from "react";
import { Category } from "./Category";

export function Entries(props: { entries?: CategoryType[]; user: AuthInfo | null}) {
  if (!props.entries) return null;
  return (
    <>
      {props.entries.map((v, idx) => (
        <Category data={v} key={idx} authorized={!!props.user} />
      ))}
    </>
  );
}
