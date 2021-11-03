import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import login from "../../utils/funcs/login";
import "./styles.css";

const Login = ({ history, location, match }: RouteComponentProps) => {
  useEffect(() => {
    login(history);
  }, []);
  return <></>;
};

export default Login;
