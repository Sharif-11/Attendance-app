import * as Yup from "yup";
import { excelFileValidation } from "./utils.yup";

export const evaluateCtschema = Yup.object({
  excelFile: excelFileValidation,
});
