import * as Yup from "yup";
import {
  batchValidator,
  semesterTitleValidator,
  sessionValidator,
} from "./utils.yup";

export const semesterSchema = Yup.object({
  semesterTitle: semesterTitleValidator,
  batch: batchValidator,
  session: sessionValidator,
});
