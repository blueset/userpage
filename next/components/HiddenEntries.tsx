import React from "react";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import stylesSet from "./HiddenEntries.module.css";

type HiddenEntriesProps = {
  count: number,
  authorized: boolean
};

export function HiddenEntries(props: HiddenEntriesProps) {

  const { t } = useTranslation();

  // let line2 = t("Log in to see if you have access to more boxes.");
  let line2 = t("hidden.line2.unauth", "Log in to see if you have access to more boxes.");
  if (props.authorized) {
    // line2 = t("Unfortunately, it seems that Eana has not met you in person before. Ping me up if you think that’s a mistake.");
    line2 = t(
      "hidden.line2.authed",
      "Unfortunately, it seems that Eana has not met you in person before. Ping me up if you think that’s a mistake."
    );
  }

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card variant="outlined" className={stylesSet.card}>
        <CardContent className={stylesSet.cardContent}>
          <Typography color="textSecondary">
            {t("hidden.line1", {
              count: props.count,
              defaultValue: "There is {{count}} entry not shown here.",
              defaultValue_plural:
                "There are {{count}} entries not shown here.",
            })}{" "}
            {line2}
          </Typography>
        </CardContent>
        <div />
        {/* Drop the extra bottom margin of box content. */}
      </Card>
    </Grid>
  );
}
