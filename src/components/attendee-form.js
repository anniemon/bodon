import React, { useState } from "react"
import { useFormik } from "formik"

import "./attendee-form.css"

const AtendeeForm = props => {
  const [formSent, setFormSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function addAttendee(attendeeData) {
    try {
      setLoading(true)
      const res = await fetch("/.netlify/functions/attendees", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(attendeeData),
      })
      if (!res.ok) throw new Error("Failed to add attendee")
      return true
    } catch (error) {
      console.error("Error adding attendee:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  function validate(values) {
    const errors = {}
    if (!values.name) {
      errors.name = "attendee-name required "
    }
    if (!values.is_attend) {
      errors.is_attend = "attendee-checkbox required"
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      is_attend: false,
      plusone: "",
      message: "",
      created_at: new Date().toISOString(),
    },
    validate,
    onSubmit: async values => {
      setFormSent(true)
      await addAttendee({
        id: crypto.randomUUID(),
        name: values.name,
        is_attend: values.is_attend,
        plusone: values.plusone,
        message: values.message,
        created_at: values.created_at,
      })

      // 폼 제출 후 즉시 모든 필드 초기화
      formik.resetForm()
      setFormSent(false)
    },
  })

  return (
    <div className="attendee-wrapper">
      <form
        className="attendee-form"
        onSubmit={formik.handleSubmit}
        name="attendee-form"
      >
        <label className="attendee-label" htmlFor="name">
          이름*
          <input
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={
              formik.touched.name && formik.errors.name
                ? "attendee-name required"
                : "attendee-name"
            }
          />
        </label>
        <div name="is_attend" className="attendee-label">
          참석 여부*
        </div>
        <label className="attendee-label-cb" htmlFor="is_attend">
          <input
            id="is_attend"
            name="is_attend"
            type="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.is_attend}
            className={
              formik.touched.is_attend && formik.errors.is_attend
                ? "attendee-checkbox required"
                : "attendee-checkbox"
            }
          />
          {" 참석합니다"}
        </label>

        <label
          className={formik.values.is_attend ? "attendee-label" : "form-hidden"}
          htmlFor="plusone"
        >
          동행인이 있다면 이름을 모두 적어주세요.
          <textarea
            id="plusone"
            name="plusone"
            type="input"
            placeholder="이름을 입력해주세요"
            onChange={formik.handleChange}
            value={formik.values.plusone}
            className="attendee-input"
          />
        </label>
        <label
          className={formik.values.is_attend ? "attendee-label" : "form-hidden"}
          htmlFor="message"
        >
          기타 메모
          <textarea
            id="message"
            name="message"
            type="input"
            placeholder="기타 궁금한 점이나 문의사항을 남겨주세요"
            onChange={formik.handleChange}
            value={formik.values.message}
            className="attendee-input"
          />
        </label>
        <div className="error-msg">
          {(formik.touched.name && formik.errors.name) ||
          (formik.touched.is_attend && formik.errors.is_attend)
            ? "* 필수 입력 사항을 확인해주세요"
            : null}
        </div>
        {formSent && (
          <div className="success">
            <div>제출 완료!</div>
          </div>
        )}
        <div className="submit-btn-wrapper">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "처리 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AtendeeForm
