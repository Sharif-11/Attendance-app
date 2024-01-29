import * as Yup from "yup";
import {
  courseTitleValidator,
  courseValidation,
  creditValidator,
} from "./utils.yup";

export const courseSchema = Yup.object({
  courseCode: courseValidation,
  courseTitle: courseTitleValidator,
  credit: creditValidator,
});
