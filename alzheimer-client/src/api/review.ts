import axios from "../util/axios";
import { getTokenFormat } from "../util/helper";

export default class ReviewApi {
  static create(userInput: any, lawyerId: string) {
    return axios.post(`/review/${lawyerId}`, userInput, getTokenFormat());
  }
  static getAllReviews(lawyerId: string, page: number) {
    return axios.get(`/review/${lawyerId}?page=${page}&size=${3}`);
  }
}
