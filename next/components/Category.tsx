import React from "react";
import { CategoryType } from "../utils/types";
import { Typography, Grid } from "@material-ui/core";
import { Entry } from "./Entry";
import { HiddenEntries } from "./HiddenEntries";
import { t_ } from "../utils/utils";
import { useTranslation } from "react-i18next";
import styleSet from "./Category.module.css";

type CategoryProps = {
    data: CategoryType,
    authorized: boolean
}

export function Category(props: CategoryProps) {
  
    const { i18n } = useTranslation();

    return (
      <section className="category">
        <Typography variant="h3" component="h2" className={styleSet.title}>
          {t_(i18n, props.data.name)}
        </Typography>
        <Grid container spacing={3}>
          {props.data.items.map((v, idx) => (
            <Entry data={v} key={idx} />
          ))}
          {(props.data.filtered !== 0) && <HiddenEntries count={props.data.filtered || 0} authorized={props.authorized} />}
        </Grid>
      </section>
    );
}