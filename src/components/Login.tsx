import { useState } from "react";
import { register, login } from "../requests/user";

const Login = ({ theme, setUser, setShowMemberForm }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isMember, setIsMember] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setShowMemberForm(false);
    isMember ? await login(formData, setUser) : await register(formData);
    setFormData({ username: "", password: "" });
  };

  return (
    <div className="login-wrapper" style={{ borderColor: theme }}>
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
