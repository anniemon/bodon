import { Link } from "gatsby"
import React from "react"

import "./divider.css"
import ArrowDown from "./assets/arrow-down.svg"


class Divider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="divider">
      {/* //   <h2 className="divider-text">이벤트</h2>
      //   <button className="divider-icon"><Link to="#evento"><ArrowDown /></Link></button> */}
      </div>
    )
  }
}

export default Divider;
