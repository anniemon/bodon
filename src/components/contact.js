import React, { useState, useEffect } from "react"
import yeonji_v from "../images/yeonji_v.jpg"
import "./contact.css"

const Contact = () => {
  const [copySuccess, setCopySuccess] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is defined (for SSR)
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 767)
      }

      // Initial check
      checkMobile()

      // Add event listener for resize
      window.addEventListener("resize", checkMobile)

      // Clean up
      return () => window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const copyToClipboard = () => {
    const accountNumber = "1000-8314-8244"
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => {
          setCopySuccess(false)
        }, 2000)
      })
      .catch(err => {
        console.error("Failed to copy: ", err)
      })
  }

  return (
    <div id="contact">
      <div className="contact-content">
        <div className="contact-details">
          <div className="contact-title">
              <span>마음 전하실 곳</span>
          </div>
          <div className="yeonji-image-container">
            <img src={yeonji_v} alt="yeonji_v" className="yeonji-image" />
          </div>
          <div className="contact-info">
            <div className="contact-info-item">
              <div>
                <div className="contact-item-content-wrapper">
                  <div className="contact-item-content">
                    토스뱅크 1000-8314-8244
                  </div>
                  <button
                    className="copy-button"
                    onClick={copyToClipboard}
                    title="계좌번호 복사"
                  >
                    복사
                  </button>
                  {copySuccess && (
                    <div className="copy-success">복사 완료!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
