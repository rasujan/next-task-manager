import * as yup from "yup";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Username Field is require")
      .min(4, "Must have at least 4 characters."),
    description: yup
      .string()
      .required("Description is required.")
      .min(4, "Must have at least 4 characters."),
  })
  .required();

export default schema;
