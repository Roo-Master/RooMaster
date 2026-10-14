export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="admin-login">
      <form method="POST" action="/api/admin/login" className="admin-card">
        <h1>Admin Login</h1>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoFocus />
        {searchParams.error && <p className="admin-error">Incorrect password.</p>}
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
