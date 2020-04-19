import React from 'react';
import { CssBaseline, Container, ThemeProvider, createMuiTheme, Theme, Backdrop, CircularProgress } from "@material-ui/core";
import './App.css';
import { amber, lightBlue } from '@material-ui/core/colors';
import { Header } from './components/Header';
import axios, { AxiosResponse } from "axios";
import { VerifiedEntriesOutcome, AuthInfo, CategoryType} from './types';
import { TelegramUser } from 'telegram-login-button';
import { Footer } from './components/Footer';
import { Entries } from './components/Entries';


type AppState = {
  loading: boolean,
  user: AuthInfo | null,
  entries?: CategoryType[]
};

class App extends React.Component<{}, AppState> {
  state: AppState;

  constructor(props: {}) {
    super(props);

    this.state = {
      loading: true,
      user: null,
    };
  }

  private async load(authData?: TelegramUser) {
    this.setState({ loading: true });
    let resp: AxiosResponse<VerifiedEntriesOutcome> | undefined = undefined;
    if (authData) {
      resp = await axios.post<VerifiedEntriesOutcome>("./data", authData);
    } else {
      resp = await axios.get<VerifiedEntriesOutcome>("./data");
    }
    this.setState({
      loading: false,
      entries: resp?.data.data,
      user: resp.data.verified,
    });
  }

  async componentDidMount() {
    await this.load();
  }

  async onLogIn(data: TelegramUser) {
    await this.load(data);
  }

  async onLogOut() {
    await this.load();
  }

  render() {
    const theme = createMuiTheme({
      palette: {
        type: "dark",
        primary: amber,
        secondary: lightBlue,
      },
      typography: {
        fontFamily: [
          '"Inter V"',
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Helvetica Neue"',
          "Roboto",
          '"Segoe UI"',
          "Arial",
          "Source Han Sans SC",
          "Noto Sans CJK SC",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            ":lang(zh)": {
              fontFamily: [
                '"Inter V"',
                "Inter",
                "source-han-sans-simplified-c",
                "Source Han Sans SC",
                "Noto Sans CJK SC",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Helvetica Neue"',
                "Roboto",
                '"Segoe UI"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(","),
            },
            ":lang(ja)": {
              fontFamily: [
                '"Inter V"',
                "Inter",
                "source-han-sans-cjk-ja",
                "Source Han Sans",
                "Noto Sans CJK",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Helvetica Neue"',
                "Roboto",
                '"Segoe UI"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
              ].join(","),
            },
          },
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            currentUser={this.state.user}
            onLogOut={() => this.onLogOut()}
            onTelegramAuth={(data) => {
              this.onLogIn(data);
            }}
          />
          <Entries entries={this.state.entries} user={this.state.user} />
          <Footer />
        </Container>
        <Backdrop open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </ThemeProvider>
    );
  }
}

export default App;
