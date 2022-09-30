import axios from "axios";
import { getTokenFormat } from "../util/helper";
import { IUser } from "../interfaces";

class AuthApi {
  private static path: string = "/auth";

  static lawyerSignUp(userInput: any) {
    return axios.post(`${this.path}/lawyer/register`, userInput);
  }

  static caregiverSignUp(userInput: any) {
    return axios.post(`${this.path}/caregiver/register`, userInput);
  }

  static signIn(userInput: any) {
    return axios.post(`${this.path}/login`, userInput);
  }

  static whoami() {
    return axios.get(`${this.path}/whoami`, getTokenFormat());
  }

  static uploadAvatar(data: any) {
    return axios.put(`${this.path}/avatar`, data, getTokenFormat());
  }

  static updateProfile(data: Partial<IUser>) {
    return axios.put(`${this.path}`, data, getTokenFormat());
  }

  static changePassword(data: any) {
    return axios.put(`${this.path}/change-password`, data, getTokenFormat());
  }

  static getAllLawyer(lat: string, lng: string, page: number, size: number) {
    return axios.get(`/lawyer?lat=${lat}&lng=${lng}&size=${size}&page=${page}`);
  }

  static getLawyerById(id: string) {
    return axios.get(`/lawyer/${id}`);
  }
}

export default AuthApi;
