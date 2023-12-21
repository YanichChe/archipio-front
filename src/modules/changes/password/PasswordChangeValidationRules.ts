export default function validate(oldPassword: string, newPassword: string) {

    let errors = {
        oldPassword: '',
        newPassword: '',
    };

    if (!newPassword) {
        errors.newPassword = "Password is required";
    } else if (newPassword.length < 8) {
        errors.newPassword = "Password must be 8 or more characters";
    } else if (!/\d/.test(newPassword)) {
        errors.newPassword = "Password must contain at least 1 number";
    } else if (!/[!@#$%&?]/g.test(newPassword)) {
        errors.newPassword = "Password must contain at least 1 special character";
    } else if (!/[A-Z]/g.test(newPassword)) {
        errors.newPassword = "Password must contain at least 1 capitol letter";
    }
    return errors;
}