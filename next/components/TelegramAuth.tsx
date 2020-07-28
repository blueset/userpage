import React from "react";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import { AuthInfo } from "../utils/types";
import { Avatar, Chip } from "@material-ui/core";
import styleSet from "./TelegramAuth.module.css";

interface TelegramUserProps {
    onLogOut: () => void;
    currentUser: AuthInfo | null;
}

interface TelegramAuthProps extends TelegramUserProps {
    onTelegramAuth: (user: TelegramUser) => void;
}


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