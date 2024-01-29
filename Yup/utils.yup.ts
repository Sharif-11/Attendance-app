import * as Yup from "yup";

export const teacherIdValidation = Yup.string()
  .trim()
  .matches(/^[A-Z]{3}-\d{4}$/, "*Invalid Teacher ID format")
  .required("*teacherId is required");
export const emailValidation = Yup.string()
  .trim()
  .email("Invalid email address")
  .max(48, "Email must be at most 48 characters")
  .required("*email is required");
export const nameValidation = Yup.string()
  .trim()
  .max(48, "Name must be at most 48 characters")
  .required("*name is required");
export const departmentValidation = Yup.string()
  .trim()
  .matches(/^[A-Z]{3}$/, "Department must be 3 capital letters")
  .required("*department is required");
export const batchValidator = Yup.string()
  .trim()
  .matches(/^\d{4}$/, "Batch must be a 4-digit number")
  .required("*Batch is required");
export const courseValidation = Yup.string()
  .trim()
  .matches(/^[A-Z]{3}-\d{3}$/, "Course must follow the pattern: ABC-123")
  .required("*Course is required");
export const designationValidation = Yup.string()
  .trim()
  .max(48, "Designation must be at most 48 characters")
  .required("*designation is equired");
export const specializationValidation = Yup.string()
  .trim()
  .max(256, "*Specialization must be at most 256 characters");
export const passwordValidation = Yup.string()
  .trim()
  .min(6, "*password must be at least 6 characters")
  .max(16, "*password must be at most 16 characters")
  .required("*password is required");
export const deptHeadValidation = Yup.boolean().required(
  "*this field  is required"
);
export const courseTitleValidator = Yup.string()
  .trim()
  .max(48, "Course title must be at most 48 characters")
  .required("*Course title is required");

export const profileImageValidation =
  Yup.mixed().required("*Image is required");
export const excelFileValidation = Yup.mixed().required(
  "*Excel file is required"
);
export const creditValidator = Yup.number()
  .oneOf([1, 1.5, 2, 3, 0.75, 4], "Invalid credit value")
  .required("*Credit is required");
export const semesterTitleValidator = Yup.string()
  .matches(/^(Level-[1-4] Term-[1-2])$/, "Invalid semester title")
  .required("*Semester Title is required");
export const sessionValidator = Yup.string()
  .trim()
  .matches(/^\d{4}-\d{4}$/, "Session must be in the format YYYY-YYYY")
  .test("consecutive-years", "Years must be consecutive", function (value) {
    if (!value) {
      return true; // Allow empty values (handled by the "required" validation)
    }

    const [startYear, endYear] = value.split("-").map(Number);

    return endYear === startYear + 1;
  })
  .required("*Session is required");
export const semesterIdValidator = Yup.string()
  .trim()
  .matches(/^(19\d{2}|20\d{2})[1-8]$/, "Invalid semester ID")
  .required("*Semester ID is required");
export const studentIdValidation = Yup.string()
  .trim()
  .matches(/^\d{7}$/, "*Invalid Student ID format, must be exactly 7 digits")
  .required("*Student ID is required");
