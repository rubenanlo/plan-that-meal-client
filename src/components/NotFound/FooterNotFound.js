import "./NotFound.css";

function FooterNotFound() {
  return (
    <>
      <footer className="footer-not-found">
        <p>(C) PlanThatMeal, Inc 2022, by Ruben Andino</p>
        <div>
          <a
            href="https://www.linkedin.com/in/rubenandino/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="icon-footer-not-found"
              src="../../linkedin.svg"
              alt="linkedin-logo"
            />
          </a>
          <a
            href="https://github.com/rubenanlo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="icon-footer-not-found"
              src="../../github.svg"
              alt="github-logo"
            />
          </a>
        </div>
      </footer>
    </>
  );
}

export default FooterNotFound;
