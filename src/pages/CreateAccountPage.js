import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const createAccount = async () => {
    try {
        if (password !== confirmPassword) {
            setError('Password and comfirm password do not match');
            return;
        }
        await createUserWithEmailAndPassword(getAuth(), email, password);
        navigate('/articles');
    } catch (e) {
        setError(e.message);
    }
  }

  return (
    <>
      <h1>Create Account </h1>
      { error && <p className="error">{error}</p>}
      <input
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Reenter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to="/login">Aleady have an account? Log In here</Link>
    </>
  );
};

export default CreateAccountPage;
