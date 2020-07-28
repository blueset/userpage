import React from "react";
import { Typography, Hidden, Link, Slide, useScrollTrigger, AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { TelegramUser } from "telegram-login-button";
import { useTranslation, Trans } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AuthInfo } from "../utils/types";
import { TelegramAuth } from "./TelegramAuth";
import styleSet from "./Header.module.css";

type ShowWhenScrolledDownProps = {
  children: React.ReactElement;
}

function ShowWhenScrolledDown(props: ShowWhenScrolledDownProps) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 150,
  });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

function backToTopOnClick (event: React.MouseEvent<HTMLElement>) {
    const anchor = (
      (event.target as HTMLElement).ownerDocument || document
    ).querySelector("#header-anchor");

    if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
};

type HeaderProps = {
    onTelegramAuth: (user: TelegramUser) => void,
    onLogOut: () => void,
    currentUser: AuthInfo | null,
}


export function Header(props: HeaderProps) {
  

  const { t } = useTranslation();

  return (
    <header id="header-anchor">
      <ShowWhenScrolledDown>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={styleSet.toolbarTitle}>
              {t("barTitle", "User:Eana Hufwe")}
            </Typography>
            <Tooltip title={t("goToTop", "Go to top") as string}>
              <IconButton
                aria-label={t("goToTop", "Go to top")}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={backToTopOnClick}
                color="inherit"
              >
                <ArrowUpwardIcon />
              </IconButton>
            </Tooltip>
            <LanguageSwitcher />
          </Toolbar>
        </AppBar>
      </ShowWhenScrolledDown>
      <div className={styleSet.socialButton}>
        <TelegramAuth
          onTelegramAuth={props.onTelegramAuth}
          onLogOut={props.onLogOut}
          currentUser={props.currentUser}
        />
        <LanguageSwitcher />
      </div>
      <Typography variant="h2" component="h1" className={styleSet.title}>
        <Trans i18nKey="pageTitle">
          User:
          <Hidden only={["sm", "md", "lg", "xl"]}>
            <br />
          </Hidden>
          Eana Hufwe
        </Trans>
      </Typography>
      <Typography variant="subtitle1" className={styleSet.subtitle}>
        <Trans i18nKey="pageDesc">
          Eana’s user page. A simple and rough about-me page heavily inspired by{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Wikipedia:Userboxes"
            color="primary"
          >
            Wikipedia Userboxes
          </Link>
          .
        </Trans>
      </Typography>
    </header>
  );
}