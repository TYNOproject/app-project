import axios from "axios";

const baseURL = "https://app-db-service.azurewebsites.net/api/db";

const service = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const addNewUser = async (studentDetails) => {
  try {
    const response = await service.post("/add/user", {
      name: studentDetails.name,
      email: studentDetails.email,
      password: studentDetails.password,
      faculty: studentDetails.faculty,
      degree: studentDetails.degree,
      departmentId: studentDetails.departmentId,
      year: studentDetails.year,
      isTeacher: false,
      price: 0.0,
      privateInfo: "",
    });
    return response;
  } catch (err) {
    console.log("error in addNewUser function: " + err);
  }
};

export const signIn = async (studentDetails) => {
  try {
    const response = await service.post("/signIn", {
      email: studentDetails.email,
      password: studentDetails.password,
    });
    return response;
  } catch (err) {
    console.log("error in addNewUser function: " + err);
    return err;
  }
};

export const addNewClass = async (classDetails) => {
  try {
    const response = await service.post("/add/class", {
      courseId: classDetails.courseId,
      teacherId: classDetails.teacherId,
      startTime: classDetails.startTime,
      endTime: classDetails.endTime,
    });
    return response;
  } catch (err) {
    console.log("error in addNewClass function: " + err);
  }
};

export const bookClass = async (bookingDetails) => {
  try {
    const response = await service.post("/bookClass", {
      classId: bookingDetails.classId,
      studentId: bookingDetails.studentId,
    });
    return response;
  } catch (err) {
    console.log("error in bookClass function: " + err);
  }
};

export const addReviewToClass = async (addReviewDetails) => {
  try {
    const response = await service.post("/addReviewToClass", {
      classId: addReviewDetails.classId,
      textReview: addReviewDetails.textReview,
      starsReview: addReviewDetails.starsReview,
    });
    return response;
  } catch (err) {
    console.log("error in addReviewToClass function: " + err);
  }
};
export const updatePersonalDetails = async (updateDetails) => {
  try {
    const response = await service.post("/updatePersonalDetails", {
      studentId: updateDetails.studentId,
      privateInfo: updateDetails.privateInfo,
    });
    return response;
  } catch (err) {
    console.log("error in updatePersonalDetails function: " + err);
  }
};

export const getTeachersByCourseName = async (courseName) => {
  try {
    const response = await service.post("/getTeachersByCourse", {
      courseName,
    });
    return response;
  } catch (err) {
    console.log("error in getTeachersByCourseName function: " + err);
  }
};

export const getTeachersContainingString = async (teacherName) => {
  try {
    const response = await service.post("/getTeachersContainingString", {
      teacherName,
    });
    return response;
  } catch (err) {
    console.log("error in getTeachersContainingString function: " + err);
  }
};

export const getCoursesByCourseName = async (courseName) => {
  try {
    const response = await service.post("/getCoursesByCourseName", {
      courseName,
    });
    return response;
  } catch (err) {
    console.log("error in getCoursesByCourseName function: " + err);
  }
};

export const setStudentAsTeacher = async (studentId) => {
  try {
    const response = await service.post("/setStudentAsTeacher", {
      studentId: studentId,
    });
    return response;
  } catch (err) {
    console.log("error in setStudentAsTeacher function: " + err);
  }
};

export const getCoursesByDepartment = async (depId) => {
  try {
    const response = await service.get(`/${depId}/courses`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTeachers = async () => {
  try {
    const response = await service.get("/getAllTeachers");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherReviews = async (teacherId) => {
  try {
    const response = await service.get(`/teacher/${teacherId}/reviews`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherCourses = async (teacherId) => {
  try {
    const response = await service.get(`/teacher/${teacherId}/courses`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherClasses = async (teacherId) => {
  try {
    const response = await service.get(`/teacher/${teacherId}/classes`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherAvailableClasses = async (teacherId) => {
  try {
    const response = await service.get(
      `/teacher/${teacherId}/classes/available`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  addNewUser,
  addNewClass,
  bookClass,
  addReviewToClass,
  updatePersonalDetails,
  getTeachersByCourseName,
  getTeachersContainingString,
  getCoursesByCourseName,
  setStudentAsTeacher,
  getAllTeachers,
  getTeacherReviews,
  getTeacherCourses,
  getTeacherClasses,
  getTeacherAvailableClasses,
  getCoursesByDepartment,
};
