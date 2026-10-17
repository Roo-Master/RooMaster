import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: { error?: string };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const hasError = Boolean(searchParams.error);

  return (
    <main className="admin-login">
      <form method="POST" action="/api/admin/login" className="admin-card" noValidate>
        <header className="admin-card__header">
          <h1 className="admin-card__title">Admin Login</h1>
          <p className="admin-card__subtitle">
            Sign in to access the administration dashboard.
          </p>
        </header>

        <div className="admin-field">
          <label htmlFor="password" className="admin-field__label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="admin-field__input"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            autoFocus
            aria-invalid={hasError}
            aria-describedby={hasError ? "password-error" : undefined}
          />
          {hasError && (
            <p id="password-error" className="admin-error" role="alert">
              Incorrect password. Please try again.
            </p>
          )}
        </div>

        <button type="submit" className="admin-submit">
          Sign in
        </button>

        <p className="admin-card__footer">
          Authorized personnel only.
        </p>
      </form>
    </main>
  );
} 
