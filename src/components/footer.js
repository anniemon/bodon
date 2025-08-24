import React from "react"

import "./footer.css"

import Forest from "../images/forest.png"

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="footer">
        <div className="credits">
          <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "black" }}>도움 주신 분들</div>
          <div>사회: 금혜지</div>
          <div>안내: 오지운</div>
          <div>사진 제공: 김수현</div>
          <div>현장 촬영: 권예린, 백범</div>
          <div>케이터링: 김지양</div>
          <div>축사: 노혜지, 심은하, 진소연</div>
          <div>DJ: 이지향</div>
          <div>장소 제공: 문학살롱 초고(김연지)</div>
          <br/>
          <div style={{ color: "grey" }}>
            <a
              style={{ margin: 0, fontSize: "0.6rem", color: "grey" }}
              href="https://www.utahcounty.gov/dept/clerk/marriage/marriagelicense.html"
            >
              Utah County Online Marriage Application{" "}
            </a>
          </div>

          <div style={{ color: "grey" }}>
            <a
              style={{ margin: 0, fontSize: "0.6rem", color: "grey" }}
              href="https://github.com/alejandroclose/bodon"
            >
              MIT License: alejandroclose/bodon
            </a>
          </div>
        </div>
        <img className="forest" src={Forest} />
      </div>
    )
  }
}

export default Footer
