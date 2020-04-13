import React from "react";
import { CategoryType } from "../types";
import { Typography, makeStyles, Grid } from "@material-ui/core";
import { Entry } from "./Entry";
import { HiddenEntries } from "./HiddenEntries";
import { t_ } from "../utils";
import { useTranslation } from "react-i18next";

type CategoryProps = {
    data: CategoryType,
    authorized: boolean
}

export function Category(props: CategoryProps) {
  
    const { i18n } = useTranslation();

    const styleSet = makeStyles({
        title: {
            fontWeight: 200,
            letterSpacing: "-0.2rem",
            lineHeight: 0.8,
            marginBottom: "0.2em",
            marginTop: "1em"
        },
    })();

    return (
      <section className="category">
        <Typography variant="h3" component="h2" className={styleSet.title}>
          {t_(i18n, props.data.name)}
        </Typography>
        <Grid container spacing={3}>
          {props.data.items.map((v, idx) => (
            <Entry data={v} key={idx} />
          ))}
          <HiddenEntries count={props.data.filtered || 0} authorized={props.authorized} />
        </Grid>
      </section>
    );
}