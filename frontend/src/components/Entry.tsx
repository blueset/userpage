import { ItemType } from "../types"
import React from "react"
import { Grid, Card, CardContent, Typography, makeStyles, CardActionArea, CardMedia } from "@material-ui/core";
import Markdown from "markdown-to-jsx";
import { EntryDetails } from "./EntryDetails";
import { t_, commonMarkdownConfigs } from "../utils";
import { useTranslation } from "react-i18next";


type EntryProps = {
    data: ItemType
}

export function Entry(props: EntryProps) {

    let widthSubtraction = 0;
    if (props.data.leftImage) widthSubtraction += 6;
    if (props.data.rightImage) widthSubtraction += 6;

    const { i18n } = useTranslation();

    const [open, setOpen] = React.useState(false);

    const styleSet = makeStyles({
      card: {
        height: "6rem",
        display: "flex",
        alignItems: "center",
      },
      cardContent: {
        flexGrow: 1,
        maxWidth: `calc(100% - ${widthSubtraction}rem)`,
        // height: "6rem",
      },
      cardMedia: {
        width: "6rem",
        alignSelf: "start",
      },
      description: {
        lineHeight: 1.2
      },
    })();

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
          <CardActionArea className={styleSet.card} onClick={openDetails}>
            {props.data.leftImage && (
              <CardMedia
                className={styleSet.cardMedia}
                component="img"
                image={"images/" + props.data.leftImage}
              />
            )}
            <CardContent className={styleSet.cardContent}>
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
            {props.data.rightImage && (
              <CardMedia
                className={styleSet.cardMedia}
                component="img"
                image={"images/" + props.data.rightImage}
              />
            )}
            <div />
          </CardActionArea>
        </Card>
        <EntryDetails data={props.data} open={open} onClose={onClose} />
      </Grid>
    );
}