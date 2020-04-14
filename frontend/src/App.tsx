import React from 'react';
import { CssBaseline, Container, ThemeProvider, createMuiTheme, Theme, Backdrop, CircularProgress } from "@material-ui/core";
import './App.css';
import { amber, lightBlue } from '@material-ui/core/colors';
import { Header } from './components/Header';
import axios, { AxiosResponse } from "axios";
import { VerifiedEntriesOutcome, AuthInfo, CategoryType} from './types';
import { Category }  from './components/Category';
import { TelegramUser } from 'telegram-login-button';


type AppState = {
  theme: Theme,
  loading: boolean,
  user?: AuthInfo,
  entries?: CategoryType[]
};

class App extends React.Component<{}, AppState> {
  state: AppState;

  constructor(props: {}) {
    super(props);
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

    this.state = {
      theme,
      loading: true
    };
  }

  private async load(authData?: TelegramUser) {
    this.setState({loading: true});
    let resp: AxiosResponse<VerifiedEntriesOutcome> | undefined = undefined;
    if (authData) {
      resp = await axios.post<VerifiedEntriesOutcome>("/data", {
        data: authData
      });
    } else {
      resp = await axios.get<VerifiedEntriesOutcome>("/data");
    }
    this.setState({
      loading: false,
      entries: resp?.data.data
    });
  }

  async componentDidMount() {
    await this.load();
  }

  async onLogIn(data: TelegramUser) {
    await this.load(data);
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header onTelegramAuth={(data) => {this.onLogIn(data)}}/>
          {
            this.state.entries && this.state.entries.map((v, idx) => (
              <Category data={v} key={idx} authorized={!!this.state.user}/>
            ))
          }
        </Container>
        <Backdrop open={this.state.loading}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </ThemeProvider>
    );
  }
}

export default App;
