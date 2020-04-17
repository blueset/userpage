import React from "react";
import { ItemType } from "../types";
import { makeStyles, CardMedia, Link } from "@material-ui/core";
import Markdown from "markdown-to-jsx";
import { commonMarkdownConfigs, t_ } from "../utils";
import { AgeBox } from "./entryMediaTypes/AgeBox";
import { TextBox } from "./entryMediaTypes/TextBox";
import { useTranslation } from "react-i18next";
import { DateBox } from "./entryMediaTypes/DateBox";

type EntryMediaProps = {
    data: ItemType,
    left?: boolean,
    right?: boolean,
    className?: string,
}

const EntryMedia = function (props: EntryMediaProps) {

    const {t, i18n} = useTranslation();

    let url: string | undefined = undefined;
    let component: string | undefined = undefined;
    let caption = "";
    if (props.left === true) {
        url = props.data.leftImage;
        component = props.data.leftComponent;
        caption = t("left", "Left");
    } else {
        url = props.data.rightImage;
        component = props.data.rightComponent;
        caption = t("right", "Right");
    }
    if (component) {
        return (<Markdown options={{
            overrides: {
                a: {
                    component: Link
                },
                AgeBox: {
                    component: AgeBox,
                    props: {className: props.className}
                },
                TextBox: {
                    component: TextBox,
                    props: {className: props.className}
                },
                DateBox: {
                    component: DateBox,
                    props: {className: props.className}
                }
            }
        }}>{component}</Markdown>);
    }
    if (url) {
        return (
          <CardMedia
            className={props.className}
            component="img"
            alt={t("entry_icon_alt", "{{ side }} icon of {{ name }}.", {
              side: caption,
              name: t_(i18n, props.data.desc),
            })}
            src={"images/" + url}
          />
        );
    }
    return null;
}

EntryMedia.defaultProps = {
    left: false,
    right: false
};

export { EntryMedia };
