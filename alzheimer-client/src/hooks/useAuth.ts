import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { IUser } from "../interfaces";
type useAuthType = {
  auth: IUser | null;
  setAuth: (user: any) => void;
};

const useAuth = (): useAuthType => {
  return useContext(AuthContext) as useAuthType;
};

export default useAuth;
