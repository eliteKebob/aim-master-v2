import { useState } from "react";
import { register, login } from "../requests/user";
import { Themes } from "../constants/themes";
import { IAuthRequest, IAuthResponse } from "../types/auth.types";

type ILoginProps = {
  theme: Themes;
  setUser: React.Dispatch<React.SetStateAction<IAuthResponse>>;
  setShowMemberForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = (props: ILoginProps) => {
  const [formData, setFormData] = useState<IAuthRequest>({
    username: "",
    password: "",
  });
  const [isMember, setIsMember] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    props.setShowMemberForm(false);
    isMember ? await login(formData, props.setUser) : await register(formData);
    setFormData({ username: "", password: "" });
  };

  return (
    <div className="login-wrapper" style={{ borderColor: props.theme }}>
      <div className="login">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={() => handleSubmit()}>
          {isMember ? "Sign In" : "Sign Up"}
        </button>
      </div>
      <p onClick={() => setIsMember(!isMember)}>
        {!isMember ? "Already have an account?" : "Click here to register"}
      </p>
    </div>
  );
};

export default Login;
