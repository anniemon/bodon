import React from "react"
import { Helmet } from "react-helmet"

import "./hero.css"
import main from "../images/main.png"
import wedding1 from "../images/wedding_1.jpg"
import wedding2 from "../images/wedding_2.jpg"
import wedding4 from "../images/wedding_4.jpg"
import wedding3 from "../images/wedding_3.jpg"
import wedding6 from "../images/wedding_6.jpg"

class Hero extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: 0,
      imagesLoaded: {},
      // 마지막 슬라이드는 유튜브 영상
      slides: [
        { type: "image", content: wedding1 },
        { type: "image", content: wedding2 },
        { type: "image", content: wedding4 },
        { type: "image", content: wedding3 },
        { type: "image", content: wedding6 },
        { type: "video", content: "https://www.youtube.com/embed/ikuxwQpx90I" },
      ],
    }
  }

  componentDidMount() {
    // Preload all images
    this.preloadImages()
  }

  preloadImages = () => {
    const { slides } = this.state
    slides.forEach((slide, index) => {
      if (slide.type === "image") {
        const img = new Image()
        img.src = slide.content
        img.onload = () => {
          this.setState(prevState => ({
            imagesLoaded: {
              ...prevState.imagesLoaded,
              [index]: true,
            },
          }))
        }
      }
    })
  }

  nextSlide = () => {
    if (this.state.currentSlide < this.state.slides.length - 1) {
      this.setState(prevState => ({
        currentSlide: prevState.currentSlide + 1,
      }))
    }
  }

  prevSlide = () => {
    if (this.state.currentSlide > 0) {
      this.setState(prevState => ({
        currentSlide: prevState.currentSlide - 1,
      }))
    }
  }

  render() {
    const { currentSlide, slides, imagesLoaded } = this.state
    const showPrevButton = currentSlide > 0
    const showNextButton = currentSlide < slides.length - 1
    const currentImage = slides[currentSlide]

    // Preload next and previous images
    const nextSlideIndex =
      currentSlide + 1 < slides.length ? currentSlide + 1 : null
    const prevSlideIndex = currentSlide - 1 >= 0 ? currentSlide - 1 : null

    return (
      <div className="hero">
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+Korean:wght@400;800&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <div className="hero-content">
          <img
            src={main}
            className="hero-cover"
            alt="Wedding cover"
            loading="eager"
          />

          <div className="carousel-wrapper">
            {/* 왼쪽 버튼 */}
            <button
              className={`carousel-button prev-button ${
                !showPrevButton ? "disabled" : ""
              }`}
              onClick={this.prevSlide}
              disabled={!showPrevButton}
            >
              &lt;
            </button>

            <div className="carousel-container">
              <div className="carousel-content">
                {slides[currentSlide].type === "image" ? (
                  <img
                    src={slides[currentSlide].content}
                    className={`carousel-image ${
                      imagesLoaded[currentSlide] ? "loaded" : ""
                    }`}
                    alt={`Wedding image ${currentSlide + 1}`}
                    loading="eager"
                  />
                ) : (
                  <div className="carousel-video-container">
                    <div className="video-aspect-ratio-box">
                      <iframe
                        className="carousel-video"
                        src={slides[currentSlide].content}
                        title="Wedding Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Preload next image */}
                {nextSlideIndex !== null &&
                  slides[nextSlideIndex].type === "image" && (
                    <link
                      rel="preload"
                      href={slides[nextSlideIndex].content}
                      as="image"
                    />
                  )}

                {/* Preload previous image */}
                {prevSlideIndex !== null &&
                  slides[prevSlideIndex].type === "image" && (
                    <link
                      rel="preload"
                      href={slides[prevSlideIndex].content}
                      as="image"
                    />
                  )}
              </div>
            </div>

            {/* 오른쪽 버튼 */}
            <button
              className={`carousel-button next-button ${
                !showNextButton ? "disabled" : ""
              }`}
              onClick={this.nextSlide}
              disabled={!showNextButton}
            >
              &gt;
            </button>
          </div>

          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <span
                key={index}
                className={`carousel-dot ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => this.setState({ currentSlide: index })}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Hero
