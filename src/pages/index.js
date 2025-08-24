import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"
// import Divider from "../components/divider"
import Event from "../components/event"
import Confirmation from "../components/confirmation"
import Guestbook from "../components/guestbook"
import Contact from "../components/contact"
import ceremonyImg from "../images/ceremony.png"


// Ceremony Image Container Style
const ceremonyContainerStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "2rem 0",
  backgroundColor: "#fefacb",
}

const ceremonyImageStyle = {
  width: "100%",
  maxWidth: "35vw",
  height: "auto",
}

// Media query for mobile
const mobileCeremonyImageStyle = {
  maxWidth: "120%",
}

export default () => {
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

  return (
    <Layout>
      <Hero />
      <div id="ceremony" style={ceremonyContainerStyle}>
        <img
          src={ceremonyImg}
          alt="결혼식 일시"
          style={isMobile ? mobileCeremonyImageStyle : ceremonyImageStyle}
        />
      </div>
      <Confirmation />
      <Guestbook />
      <Event
        id="evento"
        infoTitle="오시는 길"
        location="문학살롱 초고"
        address="서울 마포구 독막로2길 30 지하 1층"
        mobility="(대중교통 이용을 권장합니다.)"
        map="네이버 지도 바로가기"
        mapLink="https://naver.me/FlcphEXE"
      />
      <Contact />
    </Layout>
  )
}
