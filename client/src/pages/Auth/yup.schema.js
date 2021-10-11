import * as yup from "yup";
// const regFormDataInitialState = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   };

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("email is required"),
  password: yup.string().min(8).max(32).required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "*Passwords does not match"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});
