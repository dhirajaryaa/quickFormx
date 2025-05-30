import z from 'zod';

const createFieldSchema = (fields) => {
    if (!Array.isArray(fields)) {
        throw new Error("Fields must be an array");
    }

    const schemaObject = fields.reduce((acc, field) => {
        if (!field.name || !field.type) {
            throw new Error("Each field must have a name and type");
        }

        switch (field.type) {
            case "number":
                acc[field.name] = field.required
                    ? z.preprocess(
                        (val) => (typeof val === "string" ? parseFloat(val) : val),
                        z.number().min(0, `${field.label} must be a positive number`)
                    )
                    : z.preprocess(
                        (val) => (typeof val === "string" ? parseFloat(val) : val),
                        z.number().optional()
                    );
                break;

            case "email":
                acc[field.name] = field.required
                    ? z.string().email(`${field.label} must be a valid email address`)
                    : z.string().email().optional();
                break;

            case "password":
                acc[field.name] = field.required
                    ? z.string().min(8, `${field.label} must be at least 8 characters`)
                        .regex(/[A-Z]/, `${field.label} must contain at least one uppercase letter`)
                        .regex(/[a-z]/, `${field.label} must contain at least one lowercase letter`)
                        .regex(/[0-9]/, `${field.label} must contain at least one number`)
                        .regex(/[@$!%*?&#]/, `${field.label} must contain at least one special character`)
                    : z.string().optional();
                break;

            case "date":
                acc[field.name] = field.required
                    ? z.date()
                    : z.date().optional();
                break;

            default:
                acc[field.name] = field.required
                    ? z.string().min(2, `${field.label} must be at least 2 characters`)
                    : z.string().optional();
        }
        return acc;
    }, {});

    return z.object(schemaObject);
};

export const submissionSchema = (fields) => {
    const schema = createFieldSchema(fields);
    return schema
};