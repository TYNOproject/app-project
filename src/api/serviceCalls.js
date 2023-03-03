import axios from "axios";

const baseURL = "https://app-db-service.azurewebsites.net/api/db/";

const service = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const addNewUser = async (studentDetails) => {
  try {
    const response = await service.post("/add", {
      name: studentDetails.name,
      email: studentDetails.email,
      password: studentDetails.password,
      degree: studentDetails.degree,
      departmentId: studentDetails.departmentId,
      year: studentDetails.year,
      isTeacher: false,
      price: 0.0,
      description: "",
    });
    return response;
  } catch (err) {
    console.log("error in addNewUser function: " + err);
  }
};

export const getCoursesByDepartment = async (depId) => {
  try {
    const response = await Service.post("/getCoursesByDepartment", {
      departmentId: depId,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default {
  addNewUser,
  getCoursesByDepartment,
};
