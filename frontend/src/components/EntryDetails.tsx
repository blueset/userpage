import { ItemType } from "../types";
import React from "react";
import { Dialog, DialogContent, DialogContentText, DialogActions, Button, Typography, makeStyles } from "@material-ui/core";
import { truthyString } from "../utils";
import Markdown from "markdown-to-jsx";

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
                <Markdown options={{ forceBlock: false }}>
                  {props.data.desc?.en}
                </Markdown>
              </Typography>
            </div>
            {truthyString(props.data.details?.en) && (
              <Markdown options={{ forceBlock: true }}>
                {props.data.details?.en}
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