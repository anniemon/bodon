import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { supabase } from "../utils/supabaseClient"

import "./attendee-form.css"


yup
  .object({
    name: yup
      .string()
      .required("Necesitamos tu nombre completo para apuntarte en la lista"),
    preboda: yup.boolean(),
    boda: yup.boolean(),
    noviene: yup.boolean(),
  })
  .test("myCustomCheckboxTest", null, obj => {
    if (obj.preboda || obj.boda || obj.noviene) {
      return true
    }
    return new yup.ValidationError(
      "Elige si podrás acompañarnos o no podrás venir",
      null,
      "myCustomFieldName"
    )
  })

const AtendeeForm = props => {
  const [formSent, setFormSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function addAttendee(attendeeData) {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("attendees")
        .insert([attendeeData])
        .select()

      if (error) {
        throw error
      }

      return data
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
    if (!(values.preboda || values.boda || values.noviene)) {
      errors.eventos = "attendee-checkbox required"
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      preboda: false,
      autocarpre: false,
      boda: false,
      autocarboda: false,
      noviene: false,
      plusone: "",
      food: "",
      otros: "",
    },
    validate,
    onSubmit: async values => {
      setFormSent(true)
      const result = await addAttendee({
        name: values.name,
        preboda: values.preboda,
        autocarpre: values.autocarpre,
        boda: values.boda,
        autocarboda: values.autocarboda,
        noviene: values.noviene,
        plusone: values.plusone,
        food: values.food,
        otros: values.otros,
      })

      window.setTimeout(() => {
        formik.resetForm()
        setFormSent(false)
      }, 5000)
    },
  })

  return (
    <div className="attendee-wrapper">
      {/* <form
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
            value={formik.values.name}
            className={
              formik.errors.name ? "attendee-name required" : "attendee-name"
            }
          />
        </label>
        <div name="eventos" className="attendee-label">
          참석 여부*
        </div>
        <label className="attendee-label-cb" htmlFor="boda">
          <input
            id="boda"
            name="boda"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.boda}
            className={
              formik.errors.eventos
                ? formik.errors.eventos
                : "attendee-checkbox"
            }
            disabled={formik.values.noviene ? "disabled" : ""}
          />
          {" 참석합니다"}
        </label>

        <label
          className={
            formik.values.preboda || formik.values.boda
              ? "form-hidden"
              : "attendee-label-cb"
          }
          htmlFor="noviene"
        ></label>
        <label
          className={
            formik.values.preboda || formik.values.boda
              ? "attendee-label"
              : "form-hidden"
          }
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
          className={
            formik.values.preboda || formik.values.boda
              ? "attendee-label"
              : "form-hidden"
          }
          htmlFor="otros"
        >
          기타 메모
          <textarea
            id="otros"
            name="otros"
            type="input"
            placeholder="기타 궁금한 점이나 문의사항을 남겨주세요"
            onChange={formik.handleChange}
            value={formik.values.otros}
            className="attendee-input"
          />
        </label>
        <div className="error-msg">
          {formik.errors.eventos || formik.errors.name
            ? "* 필수 입력 사항을 확인해주세요"
            : null}
        </div>
        <div className={formSent ? "success" : "form-hidden"}>
          <div>제출 완료!</div>
        </div>
        <div className="submit-btn-wrapper">
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "처리 중..." : "등록하기"}
          </button>
        </div>
      </form> */}
    </div>
  )
}

export default AtendeeForm
