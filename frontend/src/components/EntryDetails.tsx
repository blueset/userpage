import { ItemType } from "../types";
import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography, makeStyles } from "@material-ui/core";
import { truthyString, t_, commonMarkdownConfigs } from "../utils";
import Markdown from "markdown-to-jsx";
import { useTranslation } from "react-i18next";
import { EntryMedia } from "./EntryMedia";

type EntryDetailsProps = {
    data: ItemType,
    open: boolean,
    onClose: () => void,
}

const styleConfig = makeStyles({
    titleRow: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "1rem",
    },
    iconsColumn: {
      display: "flex",
      flexDirection: "row"
    },
    image: {
      width: "6rem",
      height: "6rem",
      marginBottom: "0.5rem",
      marginRight: "0.5rem",
    },
    title: {
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: "-0.05rem"
    }
  });

export function EntryDetails(props: EntryDetailsProps) {

  const styleSet = styleConfig();
  const { i18n } = useTranslation();
  const details = t_(i18n, props.data.details);

    return (
      <Dialog
        open={props.open}
        onClose={props.onClose}
        scroll="paper"
        aria-describedby="details-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="details-dialog-description" component="div">
            <div className={styleSet.titleRow}>
              <div className={styleSet.iconsColumn}>
                <EntryMedia left data={props.data} className={styleSet.image} />
                <EntryMedia right data={props.data} className={styleSet.image} />
              </div>
              <Typography
                variant="h4"
                component="h3"
                className={styleSet.title}
              >
                <Markdown
                  options={{ forceBlock: false, ...commonMarkdownConfigs }}
                >
                  {t_(i18n, props.data.desc)}
                </Markdown>
              </Typography>
            </div>
            {truthyString(details) && (
              <Markdown
                options={{ forceBlock: true, ...commonMarkdownConfigs }}
              >
                {details}
              </Markdown>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
}