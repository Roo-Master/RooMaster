export default function Footer() {
  return (
    <footer>
      <h3>Connect With Me</h3>

      <div className="social-links">
        <a
          href="https://github.com/Roo-Master"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fab fa-github" />
        </a>
        <a href="mailto:okothregan2@gmail.com" aria-label="Email">
          <i className="fa-solid fa-envelope" />
        </a>
        {/* Add real profile links, then unhide:
        <a href="https://linkedin.com/in/your-handle" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin" /></a>
        <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X"><i className="fab fa-twitter" /></a>
        */}
      </div>

      <p>&copy; {new Date().getFullYear()} Okoth Reagan | All Rights Reserved</p>
    </footer>
  );
}
