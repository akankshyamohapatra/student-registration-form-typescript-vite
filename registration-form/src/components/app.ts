import { renderForm, setupForm } from "./form";

import { renderTableHTML,renderTable } from "./table";

import { state } from "../app.state";



export function renderApp(): void {
  const root = document.getElementById("app");

  if (!root) {
    throw new Error("root element #app not found");
  }

  //root.innerHTML="";

  //root.textContent="hello world";

  const layout: HTMLDivElement = document.createElement("div");

  layout.className = "row1";

  layout.appendChild(renderForm());

  layout.appendChild(renderTableHTML());

  root.appendChild(layout);

  

  setupForm();

  renderTable();
}
