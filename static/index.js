import { App } from "./app.js";
import { HtmlString } from "./html-string.js";
import { ui } from "./ui.js";

const html = new HtmlString();

const app = new App(html, ui);
app.asyncInterval(100);
app.run();
