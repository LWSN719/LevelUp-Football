function Navbar({ isLoggedIn, accountType, user, goToPage, logout }) {
  return (
    <nav className="top-nav">
      <div className="nav-brand" onClick={() => goToPage("home")}>
        NextUp Football
      </div>

      <div className="nav-links">
        <button onClick={() => goToPage("home")}>Home</button>
        <button onClick={() => goToPage("cards")}>Player Cards</button>
        <button onClick={() => goToPage("teams")}>Teams</button>

        {isLoggedIn ? (
          <>
            <span className="account-pill">
              {user?.displayName ||
                (accountType === "coach" ? "Coach Account" : "Parent Account")}
            </span>

            <button className="login-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={() => goToPage("login")}>
              Login
            </button>

            <button className="signup-btn" onClick={() => goToPage("signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;