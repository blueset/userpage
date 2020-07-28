import React from "react";
import { Typography, Link, Box } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";

export function Footer() {
  useTranslation();
  
  return (
    <Box p={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        <Trans i18nKey="footer">
          {"User page made by "}
          <Link href="https://1A23.com/">
            Eana Hufwe
          </Link>
          {". View source on "}
          <Link href="https://github.com/blueset/userpage">
            GitHub
          </Link>
          {"."}
        </Trans>
      </Typography>
    </Box>
  );
}
