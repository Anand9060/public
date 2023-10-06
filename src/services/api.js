import axios from "axios";

export default axios.create({
  baseURL: "https://o00bs4fduc.execute-api.ap-south-1.amazonaws.com/dev/",
});

export const loginDomain = "https://auth1.services.simpsoft-solutions.com/";
