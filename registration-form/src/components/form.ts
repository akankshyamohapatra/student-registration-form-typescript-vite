import { state } from "../app.state";
import { validateStudent } from "../app.logic";
import { saveStudents } from "../app.storage";
import type { Student } from "../types";
import { generateId } from "../utils/id";
import { renderTableHTML } from "./table";

export function renderForm(): HTMLDivElement {
  //containerdiv
  const containerDiv = document.createElement("div");

  containerDiv.className = "container";

  //form
  const form = document.createElement("form");

  form.id = "form";
  form.action = "#";
  form.name = "form";
  form.method = "post";

  //helper functions
  function createHeading(text: string): HTMLHeadingElement {
    const heading = document.createElement("h3");

    heading.textContent = text;

    return heading;
  }

  function createHr(): HTMLHRElement {
    return document.createElement("hr");
  }

  function createRow(): HTMLDivElement {
    const row = document.createElement("div");

    row.className = "row";

    return row;
  }

  function createCol(): HTMLDivElement {
    const col = document.createElement("div");

    col.className = "col form-group";

    return col;
  }

  function createLabel(forid: string, text: string): HTMLLabelElement {
    const label = document.createElement("label");

    label.htmlFor = forid;

    const textNode = document.createTextNode(text);

    const star = document.createElement("span");

    star.style.color = "red";

    star.textContent = "*";

    label.append(textNode, star);

    return label;
  }

  function createInput(
    type: string,
    id: string,
    name: string,
    placeholder: string
  ): HTMLInputElement {
    const input = document.createElement("input");

    input.type = type;
    input.id = id;
    input.name = name;
    input.placeholder = placeholder;

    return input;
  }

  function createError(id: string): HTMLDivElement {
    const error = document.createElement("div");

    error.className = "error-message";
    error.id = id;

    return error;
  }

  //heading
  form.append(createHeading("Personal Information"), createHr());

  //first row (fname + lname)
  const row1 = createRow();

  //fname
  const fnameCol = createCol();

  fnameCol.append(
    createLabel("fname", "First Name"),
    createInput("text", "fname", "fname", "Enter first name"),
    createError("fnameError")
  );

  //lname
  const lnameCol = createCol();

  lnameCol.append(
    createLabel("lname", "Last Name"),
    createInput("text", "lname", "lname", "Enter last name"),
    createError("lnameError")
  );

  //1st row append
  row1.append(fnameCol, lnameCol);

  form.appendChild(row1);

  //2nd row (dob + gender)
  const row2 = createRow();

  //dob
  const dobCol = createCol();

  dobCol.append(
    createLabel("dob", "Date of Birth"),
    createInput("text", "dob", "dob", "dd/mm/yy"),
    createError("dobError")
  );

  //gender
  const genderCol = createCol();

  const genderLabel = createLabel("gender", "Gender");

  const genderSelect = document.createElement("select");

  genderSelect.id = "gender";
  genderSelect.name = "gender";

  const genderOptions = [
    {
      value: "",
      text: "Select Gender",
    },
    {
      value: "male",
      text: "Male",
    },
    {
      value: "female",
      text: "Female",
    },
    {
      value: "other",
      text: "Other",
    },
  ];

  genderOptions.forEach((optionData) => {
    const option = document.createElement("option");

    option.value = optionData.value;
    option.textContent = optionData.text;

    if (optionData.value === "") {
      option.disabled = true;
      option.selected = true;
    }

    genderSelect.appendChild(option);
  });

  genderCol.append(genderLabel, genderSelect, createError("genderError"));

  //row2 append
  row2.append(dobCol, genderCol);

  form.appendChild(row2);

  //nationality
  const nationalityGroup = document.createElement("div");

  nationalityGroup.className = "form-group";

  nationalityGroup.append(
    createLabel("nationality", "Nationality"),
    createInput("text", "nationality", "nationality", "Enter your nationality"),

    createError("nationalityError")
  );

  form.appendChild(nationalityGroup);

  //heading
  form.append(createHeading("Academic Information"), createHr());

  //3rd row(ed level + major)
  const row3 = createRow();

  //ed level
  const edLevelCol = createCol();

  const edLevelLabel = createLabel("ed level", "Education Level");

  const edLevelSelect = document.createElement("select");

  edLevelSelect.id = "edlevel";
  edLevelSelect.name = "ed level";

  const edLevelOptions = [
    {
      value: "",
      text: "Select education level",
    },

    {
      value: "high school",
      text: "High School",
    },

    {
      value: "Bachelor's degree",
      text: "Bachelor's Degree",
    },

    {
      value: "master's degree",
      text: "Master's Degree",
    },

    {
      value: "phd",
      text: "PhD",
    },
  ];

  edLevelOptions.forEach((optionData) => {
    const option = document.createElement("option");

    option.value = optionData.value;
    option.textContent = optionData.text;

    if (optionData.value === "") {
      option.disabled = true;
      option.selected = true;
    }

    edLevelSelect.appendChild(option);
  });

  edLevelCol.append(edLevelLabel, edLevelSelect, createError("edlevelError"));

  //major
  const majorCol = createCol();

  majorCol.append(
    createLabel("study", "Major/Field of study"),
    createInput("text", "study", "study", "e.g.,computer science"),
    createError("studyError")
  );

  //row3 append
  row3.append(edLevelCol, majorCol);

  form.appendChild(row3);

  //row4(gpa + school)
  const row4 = createRow();

  //gpa
  const gpaCol = createCol();

  gpaCol.append(
    createLabel("gpa", "Current GPA"),
    createInput("text", "gpa", "gpa", "e.g.,3.8"),
    createError("gpaError")
  );

  //school
  const schoolCol = createCol();

  schoolCol.append(
    createLabel("school", "Previous School"),
    createInput("text", "school", "school", "Enter previous school name"),
    createError("schoolError")
  );

  //row4 append
  row4.append(gpaCol, schoolCol);

  form.appendChild(row4);

  //heading
  form.append(createHeading("Contact Information"), createHr());

  //row5(email + phone)
  const row5 = createRow();

  //email
  const emailCol = createCol();

  emailCol.append(
    createLabel("email", "Email Address"),
    createInput("email", "email", "email", "your.email@example.com"),
    createError("emailError")
  );

  //phone
  const phoneCol = createCol();

  phoneCol.append(
    createLabel("phone", "Phone Number"),
    createInput("tel", "phone", "phone", "+1(555)123-4567"),
    createError("phoneError")
  );

  //row5 append
  row5.append(emailCol, phoneCol);

  form.appendChild(row5);

  //street
  const streetGroup = document.createElement("div");

  streetGroup.className = "form-group";

  streetGroup.append(
    createLabel("street", "Street Address"),
    createInput("text", "street", "street", "123 main street"),
    createError("streetError")
  );

  form.appendChild(streetGroup);

  //row6(city + state)
  const row6 = createRow();

  //city
  const cityCol = createCol();

  cityCol.append(
    createLabel("city", "City"),
    createInput("text", "city", "city", "enter city"),
    createError("cityError")
  );

  //state
  const stateCol = createCol();

  stateCol.append(
    createLabel("state", "State/Province"),
    createInput("text", "state", "state", "enter state"),
    createError("stateError")
  );

  //row6 append
  row6.append(cityCol, stateCol);

  form.appendChild(row6);

  //pin
  const pinGroup = document.createElement("div");

  pinGroup.className = "form-group";

  pinGroup.append(
    createLabel("pin", "Zip/Postal code"),
    createInput("text", "pin", "pin", "enter zip code"),
    createError("pinError")
  );

  form.appendChild(pinGroup);

  //heading
  form.append(createHeading("Documents"), createHr());

  //row7(photo + transscipt)
  const row7 = createRow();

  //photo
  const photoCol = createCol();

  photoCol.append(
    createLabel("photo", "Profile Photo"),
    createInput("file", "photo", "photo", "Choose file no file selected"),
    createError("photoError")
  );

  //transcript
  const transcriptCol = createCol();

  transcriptCol.append(
    createLabel("transcript", "Academic Transcript"),
    createInput(
      "file",
      "transcript",
      "transcript",
      "Choose file no file selected"
    ),
    createError("transcriptError")
  );

  //row7 append
  row7.append(photoCol, transcriptCol);

  form.appendChild(row7);

  //row8(submit + reset)
  const row8 = createRow();

  //submit
  const submitCol = createCol();

  const submitBtn = document.createElement("button");

  submitBtn.type = "submit";
  submitBtn.id = "registerBtn";
  submitBtn.textContent = "Register";

  submitCol.appendChild(submitBtn);

  //reset
  const resetCol = createCol();

  const resetBtn = document.createElement("button");

  resetBtn.type = "reset";
  resetBtn.textContent = "Clear Form";

  resetCol.appendChild(resetBtn);

  //row8 append
  row8.append(submitCol, resetCol);

  form.appendChild(row8);

  //form append
  containerDiv.appendChild(form);

  return containerDiv;
}

export function setupForm() {
  const form = document.getElementById("form") as HTMLFormElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE andx

    const gpaValue = (document.getElementById("gpa") as HTMLInputElement).value;

    const student: Student = {
      id: state.editingId || generateId(),
      fname: (document.getElementById("fname") as HTMLInputElement).value,
      lname: (document.getElementById("lname") as HTMLInputElement).value,
      dob: (document.getElementById("dob") as HTMLInputElement).value,
      gender: (document.getElementById("gender") as HTMLInputElement).value,
      nationality: (document.getElementById("nationality") as HTMLInputElement)
        .value,
      edlevel: (document.getElementById("edlevel") as HTMLInputElement).value,
      study: (document.getElementById("study") as HTMLInputElement).value,
      gpa: gpaValue ? Number(gpaValue) : null,
      school: (document.getElementById("school") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      street: (document.getElementById("street") as HTMLInputElement).value,
      city: (document.getElementById("city") as HTMLInputElement).value,
      state: (document.getElementById("state") as HTMLInputElement).value,
      pin: (document.getElementById("pin") as HTMLInputElement).value,
    };

    const errors = validateStudent(student);

    clearErrors();

    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }

    if (state.editingId) {
      const index = state.students.findIndex(
        (student) => student.id === state.editingId
      );

      state.students[index] = student;
    } else {
      state.students.push(student); //add new student
    }

    saveStudents(state.students);

    form.reset();

    state.editingId = null;

    renderTableHTML();
  });
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");

  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

function showErrors(errors: Record<string, string>) {
  //Record<string,string> means: Key type = string,Value type = string

  Object.entries(errors).forEach(([key, value]) => {
    const errorElement = document.getElementById(`${key}Error`);

    if (errorElement) {
      errorElement.textContent = value;
    }
  });
}
