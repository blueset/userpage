import { ItemType } from "../utils/types";
import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@material-ui/core";
import { truthyString, t_, commonMarkdownConfigs } from "../utils/utils";
import Markdown from "markdown-to-jsx";
import { useTranslation } from "react-i18next";
import { EntryMedia } from "./EntryMedia";
import styleSet from "./EntryDetails.module.css";

type EntryDetailsProps = {
    data: ItemType,
    open: boolean,
    onClose: () => void,
}


export function EntryDetails(props: EntryDetailsProps) {

  const { i18n } = useTranslation();
  const details = t_(i18n, props.data.details);

    return (
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth={true}
        maxWidth="sm"
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