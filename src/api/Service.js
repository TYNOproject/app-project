import axios from "axios";

export default axios.create({
  baseURL: "http://app-db-service.azurewebsites.net/api/db/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
