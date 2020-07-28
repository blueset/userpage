import { ItemType } from "../utils/types"
import React from "react"
import { Grid, Card, CardContent, Typography, CardActionArea } from "@material-ui/core";
import Markdown from "markdown-to-jsx";
import { EntryDetails } from "./EntryDetails";
import { t_, commonMarkdownConfigs } from "../utils/utils";
import { useTranslation } from "react-i18next";
import { EntryMedia } from "./EntryMedia";
import styleSet from "./Entry.module.css";


type EntryProps = {
    data: ItemType
}


export function Entry(props: EntryProps) {

    let widthSubtraction = 0;
    if (props.data.leftImage) widthSubtraction += 6;
    if (props.data.rightImage) widthSubtraction += 6;

    const { i18n } = useTranslation();

    const [open, setOpen] = React.useState(false);


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