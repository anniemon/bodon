import React from "react"

import "./event.css"

import Pin from "../components/assets/pin.svg"
import Map from "../components/assets/map.svg"
import Bus from "../components/assets/bus.svg"

class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div id={this.props.id}>
        <div className="event-header">
          <div className="event-content">
            <div className="event-details">
              <div className="info-title">{this.props.infoTitle}</div>
              <div className="info">
                <div className="info-text">
                </div>
                <div className="info-text">
                  <div>
                    <Pin className="icon" />
                  </div>
                  <div>
                    <div className="location">
                      <strong>{this.props.location}</strong>
                    </div>
                    <div className="address">{this.props.address}</div>
                  </div>
                </div>
                <div className="info-text">
                  <div>
                    <Bus className="icon" />
                  </div>
                  <div>
                    <div className="location">합정역 7번 출구 도보 5분</div>
                    <div className="mobility-info">{this.props.mobility}</div>
                  </div>
                </div>
                <div className="info-text">
                  <div>
                    <Map className="icon" />
                  </div>
                  <div className="map">
                    <a
                      href={this.props.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="location"></span>
                      <div className="map-link">{this.props.map}</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Event
