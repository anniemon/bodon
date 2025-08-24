import React, { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Masonry from "react-masonry-css"
import { supabase } from "../utils/supabaseClient"

import "./guestbook.css"

import ArrowDown from "./assets/arrow-down.svg"
import Mailbox from "./assets/mailbox.svg"

yup.object({
  name: yup.string().required("이름은 필수입니다"),
  message: yup.string().required("메시지를 입력해주세요"),
})

const Guestbook = props => {
  const [formSent, setFormSent] = useState(false)
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        setNotes(data)
      }
    } catch (error) {
      console.error("Error fetching notes:", error)
    } finally {
      setLoading(false)
    }
  }

  async function addNewNote({ name, message }) {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .insert([{ name, message }])
        .select()

      if (error) {
        throw error
      }

      if (data && data.length > 0) {
        setNotes(prevNotes => [data[0], ...prevNotes])
        return true
      }
      return false
    } catch (error) {
      console.error("Error adding note:", error)
      return false
    }
  }

  function validate(values) {
    const errors = {}
    if (!values.name) {
      errors.name = "note-name required "
    }
    if (!values.message) {
      errors.message = "note-message required "
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      message: "",
    },
    validate,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const success = await addNewNote({
        name: values.name,
        message: values.message,
      })
      setFormSent(true)

      // Immediately reset form after successful submission
      resetForm()
      setSubmitting(false)

      // Hide success message after 5 seconds
      window.setTimeout(() => {
        setFormSent(false)
      }, 5000)
    },
  })

  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    700: 1,
    500: 1,
  }

  // Masonry 컴포넌트 스타일 설정
  const masonryStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "100%",
  }

  const handleDisplay = () => {
    setShowAll(!showAll)
  }

  return (
    <div id="guestbook">
      <div className="note-wrapper">
        <div className="note-title">서정 & 예인에게</div>
        <div className="note-content">
          <form className="note-form" onSubmit={formik.handleSubmit}>
            <div className="note-label">전하고 싶은 말을 남겨주세요.</div>
            <label className="note-label" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="이름*"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={
                  formik.errors.name ? "note-name required" : "note-name"
                }
              />
            </label>
            <label className="note-label" htmlFor="message">
              <textarea
                id="message"
                name="message"
                type="input"
                placeholder="메시지*"
                onChange={formik.handleChange}
                value={formik.values.message}
                className="note-input"
              />
            </label>

            <div className="error-note-msg">
              {formik.errors.eventos || formik.errors.name
                ? "* 필수 입력 사항을 확인해주세요"
                : null}
            </div>
            <div className={formSent ? "success" : "form-hidden"}>
              <div>사랑합니다</div>
            </div>
            <div className="submit-note">
              <button
                className="submit-note-btn"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "등록 중..." : "등록하기"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="wall-wrapper">
        {/* <div className="wall-title">
          <div className="wall-title-text">
            <Mailbox className="wall-icon" />
            <span>예인 & 서정에게</span>
          </div>
          <hr className="wall-divider" />
        </div> */}
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          showAll && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: "2rem",
              }}
            >
              <Masonry
                className="wall"
                breakpointCols={breakpointColumnsObj}
                columnClassName="wall-column"
                style={masonryStyle}
              >
                {notes.map(note => {
                  let date = new Date(note.created_at)
                  var options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                  let localdate = date.toLocaleDateString("ko-KR", options)
                  return (
                    <div className="wall-note" key={note.id}>
                      <div className="note-date">{localdate}</div>
                      <div className="note-message">{note.message}</div>
                      <div className="note-signature">
                        <hr className="note-divider" />
                        {note.name}
                      </div>
                    </div>
                  )
                })}
              </Masonry>
            </div>
          )
        )}
        <button
          className={`wall-btn ${showAll ? "active" : ""}`}
          onClick={handleDisplay}
        >
          <ArrowDown
            style={{
              marginRight: "0.5rem",
              verticalAlign: "middle",
              height: "0.7rem",
              transform: showAll ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}
          />
          {showAll ? "방명록 숨기기" : "방명록 모두 보기"}
        </button>
      </div>
    </div>
  )
}

export default Guestbook
