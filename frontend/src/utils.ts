import { LangString } from "./types";
import { useTranslation } from "react-i18next";
import {i18n as i18nInterface } from "i18next";
import { Link } from "@material-ui/core";
import { MarkdownOptions } from "markdown-to-jsx";
import { AgeValue } from "./components/entryMediaTypes/AgeBox";


export function t_(i18n: i18nInterface, translatedString?: LangString): string | null {
    if (!translatedString) {
        return null;
    }

    if (i18n.language in translatedString && truthyString(translatedString[i18n.language as keyof LangString])) {
        return translatedString[i18n.language as keyof LangString] as string;
    } else {
        if (truthyString(translatedString.en)) {
            return translatedString.en;
        }
    }
    return translatedString[Object.keys(translatedString)[0] as keyof LangString] || "";
}

export function truthyString(s: string | undefined | null): boolean {
    return s !== undefined && s !== null && s !== "";
}

export const commonMarkdownConfigs: MarkdownOptions = {
    overrides: {
        a: {
            component: Link
        },
        AgeValue: {
            component: AgeValue
        }
    }
};