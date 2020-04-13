import React from "react";
import { makeStyles, Grid, Card, CardContent, Typography } from "@material-ui/core";

type HiddenEntriesProps = {
  count: number,
  authorized: boolean
};

const stylesConfig = makeStyles({
  cardContent: {
    display: "flex",
    height: "6em",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderStyle: "dashed",
    borderWidth: 3,
    backgroundColor: "rgba(66, 66, 66, 0.3)",
  },
});

export function HiddenEntries(props: HiddenEntriesProps) {

  if (props.count < 1) return null;

  const stylesSet = stylesConfig();

  let line2 = "Log in to see if you have access to more boxes.";
  if (props.authorized) {
      line2 = "Unfortunately, it seems that Eana has not met you in person before. Ping me up if you think that’s a mistake.";
  }

  return (
    <Grid item xs={12}>
      <Card variant="outlined" className={stylesSet.card}>
        <CardContent className={stylesSet.cardContent}>
          <Typography color="textSecondary">
            There{" "}
            {props.count < 2
              ? `is ${props.count} entry`
              : `are ${props.count} entries`}{" "}
            not shown here. {line2}
          </Typography>
        </CardContent>
        <div />
        {/* Drop the extra bottom margin of box content. */}
      </Card>
    </Grid>
  );
}
