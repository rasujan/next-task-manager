import * as yup from "yup";

const schema = yup
  .object({
    username: yup
      .string()
      .required("Username Field is require")
      .min(4, "Must have at least 4 characters.")
      .max(32, "Must have at most 32 characters.")
      .lowercase("Username must be only of lowercase."),
    password: yup.string().required("Password Field is required."),
  })
  .required();

export default schema;
