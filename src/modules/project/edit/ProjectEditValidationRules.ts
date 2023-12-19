export default function validate(name: string, description: string, tags: string[]) {

    let errors = {
        name: '',
        description: '',
        tags: ''
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

    if (tags.length > 0) {
        const uniqueTags = new Set(tags);
        if (tags.length !== uniqueTags.size) {
            errors.tags = "Tags must be unique";
        }
    }

    tags.forEach(tag => {
        if (tag.includes(" ")) {
            errors.tags = "Tags cannot contain spaces";
        }
    });

    return errors;
}
