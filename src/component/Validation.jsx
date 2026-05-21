export const validateEmail = (email) => {
    let errors = [];

    if (!email.trim()) {
        errors.push("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
        errors.push("Invalid email format");
    }

    return errors;
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
        return "Password must contain uppercase, lowercase, number, special character and minimum 8 characters";
    }

    return "";
};

export const validateName = (name) => {
    let errors = [];

    if(!name.trim() ||  (name && !/^[A-Za-z\s]+$/.test(name))) {
        errors.push("Name should contain only letters");
    }

    return errors;
};

export const validatePhone = (phone) => {
    let errors = [];

    if (!phone) {
        errors.push("Phone number is required");
    }

    if (!/^[0-9]+$/.test(phone)) {
        errors.push("Phone number must contain only digits");
    }

    if (phone && phone.length !== 10) {
        errors.push("Phone number must be exactly 10 digits");
    }

    return errors;
};

export const validateCopies = (copies, totalCopies) => {
    let errors = [];

    if (!copies.trim()) {
        errors.push("Serial numbers are required");

        return errors;
    }

    const copiesArray = copies.split(",").map((copy) => copy.trim());

    if (copiesArray.length !== Number(totalCopies)) {
        errors.push("Serial numbers count must match total copies");
    }

    const uniqueCopies = new Set(copiesArray);

    if (uniqueCopies.size !== copiesArray.length) {
        errors.push("Duplicate serial numbers are not allowed");
    }

    return errors;
};
