import React, { Component } from "react";
import { Cookies } from "react-cookie";
import { getCookie, setCookie } from "../../util/cookie";

const initData = {
  pre_heading: "Login",
  heading: "Login to your Account",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

const socialData = [
  {
    id: "1",
    link: "facebook",
    icon: "fab fa-facebook-f",
  },
  {
    id: "2",
    link: "twitter",
    icon: "fab fa-twitter",
  },
  {
    id: "3",
    link: "google-plus",
    icon: "fab fa-google-plus-g",
  },
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailChange = this.emailChange.bind(this);
    this.pwChange = this.pwChange.bind(this);
    this.login = this.login.bind(this);
  }
  state = {
    user: {},
  };

  async login() {
    const email = this.state.user.email;
    const password = this.state.user.password;
    const expires = new Date();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    let res = await fetch("/login", options);

    const data = await res.text(); //토큰 획득
    console.log(data);
    if (data == "fail") {
    } else {
      alert("로그인 성공", data);
      setCookie("jwt", data, {
        path: "/",
        expires,
      });
      this.loginCheck();
    }
  }

  async loginCheck() {
    let res = await fetch("/loginCheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: getCookie("jwt"),
    });

    let data = await res.text();
    alert(data);
  }

  emailChange(e) {
    const pw = this.state.user.password;
    this.setState({
      user: {
        email: e.target.value,
        password: pw,
      },
    });
  }
  pwChange(e) {
    const email = this.state.user.email;
    this.setState({
      user: {
        email: email,
        password: e.target.value,
      },
    });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  componentDidMount() {
    this.setState({
      user: {
        email: "",
        password: "",
      },
    });
    const formtag = document.getElementById("form");

    formtag.addEventListener("submit", this.handleSubmit);
  }
  render() {
    return (
      <section className="author-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span></span>
                <h3 className="mt-3 mb-0"></h3>
                <p></p>
              </div>
              {/* Item Form */}
              <form id="form" className="item-form card no-hover">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.emailChange}
                        placeholder="Enter your Email"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <input
                        type="password"
                        className="form-control"
                        onChange={this.pwChange}
                        name="password"
                        placeholder="Enter your Password"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mt-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          defaultValue="option1"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn w-100 mt-3 mt-sm-4"
                      onClick={this.login}
                    >
                      Sign In
                    </button>
                  </div>
                  <div className="col-12">
                    <hr />
                    <div className="other-option">
                      <span className="d-block text-center mb-4">Or</span>
                      {/* Social Icons */}
                      <div className="social-icons d-flex justify-content-center"></div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
