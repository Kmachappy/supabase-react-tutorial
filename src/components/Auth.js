import { useState } from "react";
import { supabase } from "../api/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Supabase + React</h1>
        <p className="decription">
          Sign in via magic link with you email below
        </p>
        {loading ? (
          "Sending magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="button block"
              style={{ marginTop: "2rem" }}
              aria-live="polite"
            >
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
