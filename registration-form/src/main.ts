import { loadStudents } from "./app.storage";

import { renderApp } from "./components/app";

import { state } from "./app.state";

document.addEventListener("DOMContentLoaded", (): void => {
  state.students = loadStudents();

  renderApp();
});
