export default function validate(login: string) {

    let errors = {
        login: '',
    };

    if (!login) {
        errors.login = "Login is required";
    }
    return errors;
}