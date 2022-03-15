export default function validateInfo(values) {
  let errors = {};
  if (!values.userName.trim()) {
    errors.userName = "Username required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 5) {
    errors.password =
      "Password is too short - needs to be at least 5 characters";
  }
  if (!values.password2) {
    errors.password2 = "Password is required";
  } else if (values.password2 !== values.password) {
    errors.password2 = "Passwords do not match";
  }
  return errors;
}