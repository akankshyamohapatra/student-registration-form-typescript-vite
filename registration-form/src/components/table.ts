import { state } from "../app.state";

import { saveStudents } from "../app.storage";

export function renderTableHTML(): HTMLElement {
  //container
  const container = document.createElement("div");
  container.className = "table-container";

  //table
  const table = document.createElement("table");
  table.style.width = "100%";
  table.id = "dataTable";

  //thead
  const thead = document.createElement("thead");

  //header row
  const headerRow = document.createElement("tr");

  const headers = [
    "S.no",
    "Firstname",
    "Lastname",
    "Gender",
    "Nationality",
    "Education Level",
    "GPA",
    "School",
    "City",
    "Dob",
    "Major",
    "Email",
    "Mobileno",
    "Street",
    "State",
    "Zip",
  ];

  headers.forEach((text) => {
    const th = document.createElement("th");

    th.textContent = text;

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  //tbody
  const tbody = document.createElement("tbody");
  tbody.id = "tableBody";

  table.append(thead, tbody);

  container.appendChild(table);

 

  return container;
}

 export function renderTable(): void {
  const tableBody = document.getElementById("tableBody");

  if (!tableBody) {
    return;
  }

  tableBody.replaceChildren();

  state.students.forEach((student, index) => {
    const row = document.createElement("tr");

    //serial cell
    const serialCell = document.createElement("td");
    serialCell.textContent = String(index + 1);

    //first name
    const fnameCell = document.createElement("td");
    fnameCell.textContent = student.fname;

    //last name
    const lnameCell = document.createElement("td");
    lnameCell.textContent = student.lname;

    //email
    const emailCell = document.createElement("td");
    emailCell.textContent = student.email;

    //gpa
    const gpaCell = document.createElement("td");
    gpaCell.textContent = student.gpa === null ? "" : String(student.gpa);

    //gender
    const genderCell = document.createElement("td");
    genderCell.textContent = student.gender;

    //nationality
    const nationalityCell = document.createElement("td");
    nationalityCell.textContent = student.nationality;

    //edlevel
    const edlevelCell = document.createElement("td");
    edlevelCell.textContent = student.edlevel;

    //school
    const schoolCell = document.createElement("td");
    schoolCell.textContent = student.school;

    //city
    const cityCell = document.createElement("td");
    cityCell.textContent = student.city;

    //dob
    const dobCell = document.createElement("td");
    dobCell.textContent = student.dob;

    //study
    const studyCell = document.createElement("td");
    studyCell.textContent = student.study;

    //phone
    const phoneCell = document.createElement("td");
    phoneCell.textContent = student.phone;

    //street
    const streetCell = document.createElement("td");
    streetCell.textContent = student.street;

    //state
    const stateCell = document.createElement("td");
    stateCell.textContent = student.state;

    //pin
    const pinCell = document.createElement("td");
    pinCell.textContent = student.pin;

    //actions
    const actionCell = document.createElement("td");

    //edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.setAttribute("data-edit", student.id);

    editBtn.addEventListener("click", () => handleEdit(student.id));

    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.setAttribute("data-delete", student.id);

    deleteBtn.addEventListener("click", () => handleDelete(student.id));

    actionCell.append(editBtn, deleteBtn);

    row.append(
      serialCell,
      fnameCell,
      lnameCell,
      genderCell,
      nationalityCell,
      edlevelCell,
      gpaCell,
      schoolCell,
      cityCell,
      dobCell,
      studyCell,
      emailCell,
      phoneCell,
      streetCell,
      stateCell,
      pinCell,
      actionCell
    );

    tableBody.appendChild(row);
  });
}

function handleEdit(id: string): void {
  const student = state.students.find((student) => student.id === id);

  if (!student) {
    return;
  }

  state.editingId = student.id;

  //first name input
  const fnameInput = document.getElementById("fname") as HTMLInputElement;
  fnameInput.value = student.fname;

  //last name input
  const lnameInput = document.getElementById("lname") as HTMLInputElement;
  lnameInput.value = student.lname;

  //email input
  const emailInput = document.getElementById("email") as HTMLInputElement;
  emailInput.value = student.email;

  //gpa input
  const gpaInput = document.getElementById("gpa") as HTMLInputElement;
  gpaInput.value = student.gpa === null ? "" : String(student.gpa);

  //gender input
  const genderInput = document.getElementById("gender") as HTMLInputElement;
  genderInput.value = student.gender;

  //nationality input
  const nationalityInput = document.getElementById(
    "nationality"
  ) as HTMLInputElement;
  nationalityInput.value = student.nationality;

  //ed level input
  const edlevelInput = document.getElementById("edlevel") as HTMLInputElement;
  edlevelInput.value = student.edlevel;

  //school input
  const schoolInput = document.getElementById("school") as HTMLInputElement;
  schoolInput.value = student.school;

  //city input
  const cityInput = document.getElementById("city") as HTMLInputElement;
  cityInput.value = student.city;

  //dob input
  const dobInput = document.getElementById("dob") as HTMLInputElement;
  dobInput.value = student.dob;

  //study input
  const studyInput = document.getElementById("study") as HTMLInputElement;
  studyInput.value = student.study;

  //phone input
  const phoneInput = document.getElementById("phone") as HTMLInputElement;
  phoneInput.value = student.phone;

  //street input
  const streetInput = document.getElementById("street") as HTMLInputElement;
  streetInput.value = student.street;

  //state input
  const stateInput = document.getElementById("state") as HTMLInputElement;
  stateInput.value = student.state;

  //pin input
  const pinInput = document.getElementById("pin") as HTMLInputElement;
  pinInput.value = student.pin;
}

function handleDelete(id: string): void {
  state.students = state.students.filter((student) => student.id !== id);

  saveStudents(state.students);

  renderTable();
}
