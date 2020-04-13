import { ItemType } from "../types";
import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography, makeStyles } from "@material-ui/core";
import { truthyString, t_, commonMarkdownConfigs } from "../utils";
import Markdown from "markdown-to-jsx";
import { useTranslation } from "react-i18next";

type EntryDetailsProps = {
    data: ItemType,
    open: boolean,
    onClose: () => void,
}

const styleConfig = makeStyles({
    titleRow: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "1rem",
    },
    iconsColumn: {
      display: "flex",
      flexDirection: "column"
    },
    image: {
      width: "5rem",
      marginBottom: "0.5rem",
      marginRight: "0.5rem",
    },
    title: {
      fontWeight: 600,
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
          <DialogContentText id="details-dialog-description">
            <div className={styleSet.titleRow}>
              {(props.data.leftImage || props.data.rightImage) && (
                <div className={styleSet.iconsColumn}>
                  {props.data.leftImage && (
                    <img
                      className={styleSet.image}
                      alt={`Left icon of ${props.data.desc}`}
                      src={"images/" + props.data.leftImage}
                    />
                  )}
                  {props.data.rightImage && (
                    <img
                      className={styleSet.image}
                      alt={`Right icon of ${props.data.desc}`}
                      src={"images/" + props.data.rightImage}
                    />
                  )}
                </div>
              )}
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