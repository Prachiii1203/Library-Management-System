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
  } else {
    errors = "";
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

export const validateCopies = (copies, totalCopies) => {
  let errors = "";

  if (!copies.trim()) {
    errors = "Serial numbers are required";

    return errors;
  }

  const copiesArray = copies.split(",").map((copy) => copy.trim());

  if (copiesArray.length !== Number(totalCopies)) {
    errors = "Serial numbers count must match total copies";
  }


  return errors;
};
