import React from "react";
import ReactDOM from "react-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import en from "react-intl/locale-data/en";
import ar from "react-intl/locale-data/ar";
import App from "./app";
import "./style.css";
import { flattenMessages } from "./utils";
import messages from "./messages";

addLocaleData([...en, ...ar]);

const locale =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || "en-US";
console.log(locale);

ReactDOM.render(
  <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
