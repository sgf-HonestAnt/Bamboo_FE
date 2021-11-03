import { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import attemptLogin from "../../utils/funcs/login";
import "./styles.css";

const Login = ({ history, location, match }: RouteComponentProps) => {
  useEffect(() => {
    attemptLogin(history);
  }, [history]);
  return <></>;
};

export default Login;
