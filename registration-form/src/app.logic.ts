import type { Student } from "./types";

export function validateStudent(student: Student) {
  const errors: Record<string, string> = {};

  //validate fname
  if (student.fname.trim() === "") {
    errors.fname = "first name can not be empty";
  } else if (student.fname.trim().length < 3) {
    errors.fname = "First name must be at least 3 characters";
  }

  //validate lname
  if (student.lname.trim() === "") {
    errors.lname = "Last name can not be empty";
  } else if (student.lname.trim().length < 3) {
    errors.lname = "Last name must be at least 3 characters";
  }

  //validate dob
  const date = /^\d{1,31}\/\d{1,12}\/\d{4}$/;

  if (student.dob.trim() === "") {
    errors.dob = "dob can not be empty";
  } else if (!date.test(student.dob)) {
    errors.dob = "please enter a valid date";
  }

  //validate gender
  if (student.gender === "") {
    errors.gender = "gender can not be empty";
  }

  //validate nationality
  if (student.nationality.trim() === "") {
    errors.nationality = "nationality can not be empty";
  } else if (student.nationality.trim().length < 3) {
    errors.nationality = "nationality must be at least 3 characters";
  }

  //validate education-level
  if (student.edlevel === "") {
    errors.edlevel = "edlevel can not be empty";
  }

  //validate major
  if (student.study.trim() === "") {
    errors.study = "major can not be empty";
  } else if (student.study.trim().length < 3) {
    errors.study = "major must be at least 3 characters";
  }

  // validate gpa
  if (student.gpa === null) {
    errors.gpa = "gpa can not be empty";
  } else if (isNaN(student.gpa) || student.gpa <= 0) {
    errors.gpa = "please enter a valid gpa";
  }

  //validate school
  if (student.school.trim() === "") {
    errors.school = "school can not be empty";
  } else if (student.school.trim().length < 3) {
    errors.school = "school must be at least 3 characters";
  }

  //validate email
  const dmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;

  if (student.email.trim() === "") {
    errors.email = " email can not be empty";
  } else if (!dmail.test(student.email)) {
    errors.email = "please enter a valid email address";
  }

  //validate contact details
  const contactno = /^\+[1-9]\d{1,14}$/;

  if (student.phone.trim() === "") {
    errors.phone = "mobile no. can not be empty";
  } else if (!contactno.test(student.phone)) {
    errors.phone = "please enter a valid phone number";
  }

  //validate street
  if (student.street.trim() === "") {
    errors.street = "street can not be empty";
  } else if (student.street.trim().length < 3) {
    errors.street = "street must be at least 3 characters";
  }

  //validate city

  if (student.city.trim() === "") {
    errors.city = "city can not be empty";
  } else if (student.city.trim().length < 3) {
    errors.city = "city must be at least 3 characters";
  }

  //validate state
  if (student.state.trim() === "") {
    errors.state = "state can not be empty";
  } else if (student.state.trim().length < 3) {
    errors.state = "state must be at least 3 characters";
  }

  //validate zipcode
  const zipcode = /^\d{4,10}$/;

  if (student.pin.trim() === "") {
    errors.pin = "pin can not be empty";
  } else if (!zipcode.test(student.pin)) {
    errors.pin = " please enter a valid zip code";
  }

  return errors;
}
