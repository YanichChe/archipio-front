export default function validate(email: string) {

    let errors = {
        email: '',
    };

    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email address is invalid";
    }
    return errors;
}