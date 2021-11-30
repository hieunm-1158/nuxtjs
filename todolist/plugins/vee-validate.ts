import { extend } from "vee-validate";
import { required, alpha } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Trường này là bắt buộc",
});

extend("alpha", {
  ...alpha,
  message: "Trường này không được chứa số",
});
