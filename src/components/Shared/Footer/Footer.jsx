import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import Container from "../Container";
import logo from "../../../assets/Logo/MediCamp.svg";

const Footer = () => {
  return (
    <footer className="bg-cyan-50 pt-10">
      <Container>
        <section className="footer">
          <aside>
            <img src={logo} alt="" />
            <p>
              Medical Camp Management
              <br />
              Providing reliable service since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Quick Access</h6>
            <a href="#" className="link link-hover">
              Home
            </a>
            <a href="#banner" className="link link-hover">
              Banner
            </a>
            <a href="#popular-camps" className="link link-hover">
              Popular Camps
            </a>
            <a href="#feedback-ratings" className="link link-hover">
              Feedback & Ratings
            </a>
          </nav>
          <nav>
            <h6 className="footer-title">Contact</h6>
            <div className="flex items-center text-3xl gap-3">
              <a href="https://www.facebook.com/ansarulislamriyad" target="_blank" className="link link-hover">
                <FaFacebook />
              </a>
              <a href="https://www.linkedin.com/in/ansarul-islam-riyad" target="_blank" className="link link-hover">
                <FaLinkedin />
              </a>
              <a href="https://github.com/AnsarulIslam10" target="_blank" className="link link-hover">
                <FaGithub />
              </a>
            </div>
          </nav>
        </section>
      </Container>
      <p className="text-center p-2 bg-cyan-100 mt-2">
        Created By{" "}
        <span className="text-blue-500 font-semibold hover:underline underline-offset-1">
          <a href="https://www.linkedin.com/in/ansarul-islam-riyad">
            @Ansarul Islam
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
