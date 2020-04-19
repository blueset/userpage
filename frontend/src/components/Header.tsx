import React from "react";
import { Typography, Hidden, Link, makeStyles, Slide, useScrollTrigger, AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import { useTranslation, Trans } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AuthInfo } from "../types";
import { TelegramAuth } from "./TelegramAuth";


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

const styleConfig = makeStyles({
    title: {
      fontWeight: 700,
      letterSpacing: "-0.2rem",
      lineHeight: 0.8,
      marginBottom: "0.2em",
    },
    toolbarTitle: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      flexGrow: 1,
    },
    subtitle: {
      lineHeight: 1,
    },
    socialButton: {
      minHeight: "4rem",
      padding: "1rem 0",
      textAlign: "right",
    },
  })

export function Header(props: HeaderProps) {
  const styleSet = styleConfig();

  const { t } = useTranslation();

  return (
    <header id="header-anchor">
      <ShowWhenScrolledDown>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" className={styleSet.toolbarTitle}>
              Eana’s User Page
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