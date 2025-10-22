function correctNameLength(len) {
    return len >= 3 && len <= 70
}

function nameDuplicated(name, courses) {
    return courses && courses.some((course) => course.name.toLowerCase() === name.toLowerCase()
}

function correctCodeLength(len) {
    return len >= 3 && len <= 10
}

function codeDuplicated(code, courses) {
    return courses && courses.some((course) => course.code.toLowerCase() === code.toLowerCase()
}

function correctDescriptionLength(description) {
    return description && description.length >= 5 && description.length <= 200
}


/* VALIDATE FORM
 * Attributes: {name: string, code: string, description: string}
 * Return: {name: string, code: string, description: string} (list of errors)
 * Usage: correctNameLength, nameDuplicated, correctCodeLength, codeDuplicated, correctDescriptionLength
 *
 * This function checks if all the values in the form are correctly introduce, 
 * for the creation of a new course.
 */
export const validateForm = (name, code, description, courses) => {
    let errors = {name: "", code: "", description: ""}

    // Validate Name
    if (!name) {
        errors.name = "El nombre del curso no puede estar vacío";
    } else if (!correctNameLength(name.length)) {
        errors.name = "El nombre tiene que tener entre 3 y 70 caracteres";
    } else if (nameDuplicated(name, courses)) {
        errors.name = "El nombre del curso ya está en uso";
    }
       
    // Validate Code
    if (!code) {
        errors.code = "El código del curso no puede estar vacío";
    } else if (!correctCodeLength(code.length) {
        errors.code =
            "El código del curso tiene que tener entre 3 y 10 caracteres";
    } else if (codeDuplicated(code, courses)) {
        errors.code = "El código del curso ya está en uso";
    }

    // Validate Description
    if (!correctDescriptionLength(description)) {
        errors.description =
            "La descripción del curso tiene que tener entre 5 y 200 caracteres";
    }

    return errors
}
