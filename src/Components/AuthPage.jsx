function AuthPage({
  title,
  description,
  loginWithGoogle,
}) {
  return (
    <section className="page-card">
      <h1>{title}</h1>

      <p>{description}</p>

      <div className="hero-actions">
        <button
          className="signup-btn"
          onClick={() => loginWithGoogle("parent")}
        >
          Parent Account
        </button>

        <button
          className="login-btn"
          onClick={() => loginWithGoogle("coach")}
        >
          Coach Account
        </button>
      </div>
    </section>
  );
}

export default AuthPage;