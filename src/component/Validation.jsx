export const validateEmail = (email) => {
  let errors = "";
  if (!email.trim()) {
    errors = "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors = "Invalid email format";
  }
  return errors;
};

export const validatePassword = (password) => {
  let errors = "";
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!passwordRegex.test(password)) {
    errors = "Password must contain uppercase, lowercase, number, special character and minimum 8 characters";
  }

  return errors;
};

export const validateName = (name) => {
  let errors = "";

  if (!name.trim() || (name && !/^[A-Za-z\s]+$/.test(name))) {
    errors = "Name should contain only letters";
  }

  return errors;
};

export const validateBookAuthor = (name) => {
  let errors = "";

  if (!name.trim() || (name && !/^[A-Za-z0-9 -.]+$/.test(name))) {
    errors = "Name should contain only letters & digit & . ";
  }

  return errors;
};

export const validatePhone = (phone) => {
  let errors = "";

  if (!phone) {
    errors = "Phone number is required";
  }
  if (!/^[0-9]+$/.test(phone)) {
    errors = "Phone number must contain only digits";
  }
  if (phone && phone.length !== 10) {
    errors = "Phone number must be exactly 10 digits";
  }

  return errors;
};

export const validateNumber = (e) => {
  if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-" || e.key === "*") {
    e.preventDefault();
  }
};

export const validateCopies = (copies, val) => {
  let errors = "";

  if (!val.trim()) {
    errors = "Serial numbers are required";
    return errors;
  }
  const findduplicate = copies.find((cval) => cval === val)

  if (findduplicate) {
    errors = "Serial number already exist !!";
  }

  return errors;
};

export const validateBtn = (error = {}, form = {}) => {
  const hasNoErrors = Object.values(error).every((err) => err === "");

  const hasAllFields = Object.values(form).every((field) => field !== "");

  return hasNoErrors && hasAllFields;
};
