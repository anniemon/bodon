import React from "react"

import "./confirmation.css"
import AtendeeForm from "./attendee-form"

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div id="confirmar">
        <div className="conf-header">
          <div className="conf-title">참석 확인</div>
          <div className="conf-text">
            *예약이 마감되었습니다.
            {/* 오실 분들은 반드시 작성해주세요. <br /> (인원 파악 및 자리 배치에 참고하겠습니다.) */}
          </div>
        </div>
          <AtendeeForm />
        </div>
    )
  }
}

export default Confirmation;
