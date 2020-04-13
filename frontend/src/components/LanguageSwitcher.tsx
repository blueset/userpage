import React from "react";
import { IconButton, Button, Tooltip, Menu, MenuItem } from "@material-ui/core";
import TranslateIcon from "@material-ui/icons/Translate";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
    const { t, i18n } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const showLanguageMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
      setAnchorEl(null);
    };

    const setLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
        closeMenu();
    }

    return (
      <>
        <Tooltip title={t("langSwitcher", "Switch language") as string}>
          <IconButton
            aria-controls="language-menu"
            aria-haspopup="true"
            aria-label={t("langSwitcher", "Switch language")}
            onClick={showLanguageMenu}
            color="inherit"
          >
            <TranslateIcon />
          </IconButton>
        </Tooltip>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={() => setLanguage("en")}>English</MenuItem>
          <MenuItem onClick={() => setLanguage("zh")}>中文</MenuItem>
          <MenuItem onClick={() => setLanguage("ja")}>日本語</MenuItem>
          <MenuItem onClick={() => setLanguage("08n")}>Lì’fya leNa’vi</MenuItem>
        </Menu>
      </>
    );
}