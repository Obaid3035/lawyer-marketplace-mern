import { USER_ROLE } from "../interfaces";
import axios from "../util/axios";
import { getTokenFormat } from "../util/helper";

export default class AdminApi {
  static getAllUsers(role: USER_ROLE, page: number) {
    return axios.get(
      `/admin/users/${role}?page=${page}&size=${3}`,
      getTokenFormat()
    );
  }

  static toggleLawyerVerification(lawyerId: string) {
    return axios.put(`/admin/lawyer/${lawyerId}`, {}, getTokenFormat());
  }

  static getLawyerById(lawyerId: string) {
    return axios.get(`/admin/lawyer/${lawyerId}`, getTokenFormat());
  }
}
