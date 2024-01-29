import * as Yup from "yup";
import {
  batchValidator,
  departmentValidation,
  designationValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
  profileImageValidation,
  sessionValidator,
  specializationValidation,
  studentIdValidation,
  teacherIdValidation,
} from "./utils.yup";

export const teacherValidation = Yup.object({
  teacherId: teacherIdValidation,
  name: nameValidation,
  email: emailValidation,
  department: departmentValidation,
  designation: designationValidation,
  specialization: specializationValidation,
  password: passwordValidation,
  profileImage: profileImageValidation,
});
export const studentValidation = Yup.object({
  studentId: studentIdValidation,
  name: nameValidation,
  email: emailValidation,
  department: departmentValidation,
  password: passwordValidation,
  profileImage: profileImageValidation,
  batch: batchValidator,
  session: sessionValidator,
});
