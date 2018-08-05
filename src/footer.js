import React from "react";
import { FormattedMessage } from "react-intl";

const Footer = () => (
  <footer className="footer">
    <div className="footer__body">
      <h4>
        <FormattedMessage id="detail.footer" />
      </h4>
      <ul className="footer__social">
        <li className="social__item">
          <a href="mailto:me@l0rdcafe.com">
            <i className="far fa-envelope fa-lg" />
          </a>
        </li>
        <li className="social__item">
          <a href="https://github.com/l0rdcafe/">
            <i className="fab fa-github fa-lg" />
          </a>
        </li>
        <li className="social__item">
          <a href="https://www.linkedin.com/in/ismail-arafa/">
            <i className="fab fa-linkedin fa-lg" />
          </a>
        </li>
        <li className="social__item">
          <a href="https://twitter.com/l0rdcafe">
            <i className="fab fa-twitter fa-lg" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
