const { google } = require("googleapis")

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GATSBY_GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GATSBY_GOOGLE_PRIVATE_KEY || "",
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
  const authClient = await auth.getClient()
  return google.sheets({ version: "v4", auth: authClient })
}

exports.handler = async event => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  try {
    const sheets = await getSheetsClient()
    const spreadsheetId = process.env.GSHEETS_SPREADSHEET_ID
    const range = process.env.GSHEETS_ATTENDEES_RANGE || "attendees!A:F"

    const body = JSON.parse(event.body || "{}")
    const {
      id,
      name,
      is_attend = false,
      plusone = "",
      message = "",
      created_at = new Date().toISOString(),
    } = body

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "name is required" }),
      }
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[id, name, is_attend, plusone, message, created_at]],
      },
    })

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    console.error("Attendees function error:", err)
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        error: String((err && err.message) || err),
      }),
    }
  }
}
