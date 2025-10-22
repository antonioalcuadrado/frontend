export const validateForm = (name, code, description, courses) => {
    let errors = {name: "", code: "", description: ""}

    // validate name
    errors.name = "";
    if (!name) {
        errors.name = "El nombre del curso no puede estar vacío";
    } else if (name.length < 3 || name.length > 70) {
        errors.name = "El nombre tiene que tener entre 3 y 70 caracteres";
    } else if (
        courses &&
        courses.some(
            (course) => course.name.toLowerCase() === name.toLowerCase(),
        )
    ) {
        errors.name = "El nombre del curso ya está en uso";
    }
        
    // validate code
    errors.code = "";
    if (!code) {
        errors.code = "El código del curso no puede estar vacío";
    } else if (code.length < 3 || code.length > 10) {
        errors.code =
            "El código del curso tiene que tener entre 3 y 10 caracteres";
    } else if (
        courses &&
        courses.some(
            (course) => course.code.toLowerCase() === code.toLowerCase(),
        )
    ) {
        errors.code = "El código del curso ya está en uso";
    }

    // validate description
    errors.description = "";
    if (
        description &&
        (description.length < 5 || description.length > 200)
    ) {
        errors.description =
            "La descripción del curso tiene que tener entre 5 y 200 caracteres";
    }

    return errors
}
