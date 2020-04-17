import { ItemType } from "../types"
import React from "react"
import { Grid, Card, CardContent, Typography, makeStyles, CardActionArea } from "@material-ui/core";
import Markdown from "markdown-to-jsx";
import { EntryDetails } from "./EntryDetails";
import { t_, commonMarkdownConfigs } from "../utils";
import { useTranslation } from "react-i18next";
import { EntryMedia } from "./EntryMedia";


type EntryProps = {
    data: ItemType
}

const styleConfig = makeStyles({
  card: {
    height: "6rem",
    display: "flex",
    alignItems: "center",
  },
  cardContent: {
    flexGrow: 1,
    margin: "auto 0",
  },
  cardMedia: {
    width: "6rem",
    height: "6rem",
    flexShrink: 0,
    alignSelf: "start",
  },
  description: {
    lineHeight: 1.2
  },
});

export function Entry(props: EntryProps) {

    let widthSubtraction = 0;
    if (props.data.leftImage) widthSubtraction += 6;
    if (props.data.rightImage) widthSubtraction += 6;

    const { i18n } = useTranslation();

    const [open, setOpen] = React.useState(false);

    const styleSet = styleConfig();

    const desc = t_(i18n, props.data.desc);

    const openDetails = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
      <Grid item xs={12} sm={6} lg={4}>
        <Card>
          <CardActionArea component="div" className={styleSet.card} onClick={openDetails}>
            <EntryMedia left data={props.data} className={styleSet.cardMedia} />
            <CardContent
              className={styleSet.cardContent}
              style={{
                maxWidth: `calc(100% - ${widthSubtraction}rem)`,
              }}
            >
              <Typography
                color="textSecondary"
                className={styleSet.description}
              >
                <Markdown
                  options={{ forceInline: true, ...commonMarkdownConfigs }}
                >
                  {desc}
                </Markdown>
              </Typography>
            </CardContent>
            <EntryMedia
              right
              data={props.data}
              className={styleSet.cardMedia}
            />
            <div />
          </CardActionArea>
        </Card>
        <EntryDetails data={props.data} open={open} onClose={onClose} />
      </Grid>
    );
}