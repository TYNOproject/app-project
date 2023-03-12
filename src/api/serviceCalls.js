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
        const response = await service.post("/users/add", {
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
        const response = await service.post("/users/signIn", {
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
        const response = await service.post("/classes/add", {
            courseId: classDetails.courseId,
            teacherId: classDetails.teacherId,
            date: classDetails.date,
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
        const response = await service.post("/classes/book", {
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
        const response = await service.post("/classes/addReview", {
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
        console.log(updateDetails);
        const response = await service.post("/users/updatePrivateInfo", {
            studentId: updateDetails.studentId,
            faculty: updateDetails.faculty,
            department: updateDetails.department,
            degree: updateDetails.degree,
            year: updateDetails.year,
            privateInfo: updateDetails.privateInfo,
        });
        return response;
    } catch (err) {
        console.log("error in updatePersonalDetails function: " + err);
    }
};

export const getTeachersByCourseName = async (courseName) => {
    try {
        const response = await service.post("/users/getTeachersByCourse", {
            courseName,
        });
        return response;
    } catch (err) {
        console.log("error in getTeachersByCourse function: " + err);
    }
};

export const getTeachersContainingString = async (teacherName) => {
    try {
        const response = await service.post("/users/getTeachersContainingString", {
            teacherName,
        });
        return response;
    } catch (err) {
        console.log("error in getTeachersContainingString function: " + err);
    }
};

export const getCoursesByCourseName = async (courseName) => {
    try {
        const response = await service.post("/courses/getByName", {
            courseName,
        });
        return response;
    } catch (err) {
        console.log("error in getCoursesByCourseName function: " + err);
    }
};

export const setStudentAsTeacher = async (studentId) => {
    try {
        const response = await service.post("/users/setStudentAsTeacher", {
            studentId: studentId,
        });
        return response;
    } catch (err) {
        console.log("error in setStudentAsTeacher function: " + err);
    }
};

export const searchCourses = async (searchDetails) => {
    try {
        const response = await service.post(
            "/courses/searchCourses",
            searchDetails
        );
        return response;
    } catch (err) {
        console.log("error in searchCourses function: " + err);
    }
};

export const getCoursesByDepartment = async (depId) => {
    try {
        const response = await service.get(`/departments/${depId}/courses`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getTeachersForCourse = async (courseId) => {
    try {
        const response = await service.post(`/courses/${courseId}/teachers`);
        return response;
    } catch (err) {
        console.log("error in getTeachersForCourse function: " + err);
    }
};

export const getAllTeachers = async () => {
    try {
        const response = await service.get("/users/getAllTeachers");
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getTeacherReviews = async (teacherId) => {
    try {
        const response = await service.get(`/users/teachers/${teacherId}/reviews`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getTeacherCourses = async (teacherId) => {
    try {
        const response = await service.get(`/users/teachers/${teacherId}/courses`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getTeacherClasses = async (teacherId) => {
    try {
        const response = await service.get(`/users/teachers/${teacherId}/classes`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getStudentClasses = async (studentId) => {
    try {
        const response = await service.get(`/users/students/${studentId}/classes`);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const getTeacherAvailableClasses = async (teacherId) => {
    try {
        const response = await service.get(
            `/users/teachers/${teacherId}/classes/available`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};

export default {
    addNewUser,
    addNewClass,
    searchCourses,
    bookClass,
    addReviewToClass,
    updatePersonalDetails,
    getTeachersByCourseName,
    getTeachersForCourse,
    getTeachersContainingString,
    getCoursesByCourseName,
    setStudentAsTeacher,
    getAllTeachers,
    getTeacherReviews,
    getTeacherCourses,
    getTeacherClasses,
    getTeacherAvailableClasses,
    getCoursesByDepartment,
    getStudentClasses
};
