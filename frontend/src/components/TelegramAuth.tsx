import React from "react";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import { AuthInfo } from "../types";
import { makeStyles, Avatar, Chip } from "@material-ui/core";
import { useTranslation } from "react-i18next";

interface TelegramUserProps {
    onLogOut: () => void;
    currentUser: AuthInfo | null;
}

interface TelegramAuthProps extends TelegramUserProps {
    onTelegramAuth: (user: TelegramUser) => void;
}

const styleConfig = makeStyles({
    telegramButton: {
      display: "inline",
      verticalAlign: "bottom",
    },
});

function TelegramUserChip(props: TelegramUserProps) {
  let name = props?.currentUser?.first_name || "";
  if (props?.currentUser?.last_name) {
    name += ` ${props?.currentUser?.last_name}`;
  }
  return (
    <Chip
      variant="outlined"
      label={name}
      onDelete={props.onLogOut}
      avatar={<Avatar src={props?.currentUser?.photo_url} />}
    />
  );
}

export function TelegramAuth(props: TelegramAuthProps) {
    const styleSet = styleConfig();

    if (props.currentUser) {
        return (<TelegramUserChip onLogOut={props.onLogOut} currentUser={props.currentUser}/>);
    }
    return (
        <TelegramLoginButton
            botName="utsdskgmbot"
            dataOnauth={props.onTelegramAuth}
            className={styleSet.telegramButton}
        />
    );
}