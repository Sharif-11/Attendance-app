import * as Yup from "yup";
import {
  courseValidation,
  semesterIdValidator,
  teacherIdValidation,
} from "./utils.yup";

export const assignSchema = Yup.object({
  courseCode: courseValidation,
  teacherId: teacherIdValidation,
  semesterId: semesterIdValidator,
});
