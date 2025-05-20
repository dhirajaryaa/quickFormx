import z from 'zod';

export const formTitleSchema = z
    .string()
    .min(6, "Title must be at least 6 characters long")
    .max(60, "Title can't be more than 60 characters");

export const formDescriptionSchema = z.string()
    .max(300, "Description can't be more than 300 characters")
    .optional();

export const formModalSchema = z.object({
    title: formTitleSchema,
    description: formDescriptionSchema

});
