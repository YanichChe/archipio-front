export default function validate(name: string, description: string) {

    let errors = {
        name: '',
        description: ''
    };

    if (!name) {
        errors.name = "Project name is required";
    } else if (name.length > 25) {
        errors.name = "Project name must be less than 25 characters";
    }
    if (!description) {
        errors.description = "Project description is required";
    } else if (description.length > 400) {
        errors.description = "Project description must be less than 400 characters";
    }
    return errors;
}