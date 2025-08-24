import React from "react"

import "./header.css"
import ArrowDown from "./assets/arrow-down.svg"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headerIsOpen: true,
      isMobile: false,
    }
  }

  componentDidMount() {
    // Check if window is defined (for SSR)
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        this.setState({ isMobile: window.innerWidth <= 767 })
      }

      // Initial check
      checkMobile()

      // Add event listener for resize
      window.addEventListener("resize", checkMobile)

      // Clean up
      return () => window.removeEventListener("resize", checkMobile)
    }
  }

  handleClick = () => {
    this.setState({ headerIsOpen: !this.state.headerIsOpen })
  }

  handleNavClick = (event, target) => {
    event.preventDefault()
    const element = document.getElementById(target)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  render() {
    return (
      <header>
        <div className="header-content">
          <div className="header-brand">
            {this.state.isMobile ? (
              <div className="header-text">
                <div className="date-line">2025. 6. 18.</div>
                <div className="time-line">Wed. 7:30 pm</div>
              </div>
            ) : (
              <div className="header-text">2025. 6. 18. Wed. 7:30 pm</div>
            )}
            <div className="header-sub-text">Save the date</div>
            <button
              className="header-btn"
              onClick={this.handleClick.bind(this)}
            >
              <ArrowDown
                className={this.state.headerIsOpen ? "arrow-up" : ""}
              />
            </button>
          </div>
          <div
            className={`header-menu ${
              !this.state.headerIsOpen ? "hidden" : ""
            }`}
          >
            <a
              href="#ceremony"
              onClick={e => this.handleNavClick(e, "ceremony")}
            >
              일시
            </a>
            <a
              href="#confirmar"
              onClick={e => this.handleNavClick(e, "confirmar")}
            >
              예약
            </a>
            <a
              href="#guestbook"
              onClick={e => this.handleNavClick(e, "guestbook")}
            >
              편지
            </a>
            <a href="#contact" onClick={e => this.handleNavClick(e, "contact")}>
              기부
            </a>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
