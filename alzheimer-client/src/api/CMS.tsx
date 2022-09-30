import axios from "axios";

export const  getHomeSections =async () => {
  return await axios.get("/api/home");
};

export const getAboutSections =async () => {
  return await axios.get("/api/about");
};
export const getJoinSections = async() => {
  return await axios.get("/api/join");
};
export const getPrivacyPolicySections =async () => {
  return await axios.get("/api/privacyPolicy");
};
export const getFooterSections = async() => {
  return await axios.get("/api/footer");
};
