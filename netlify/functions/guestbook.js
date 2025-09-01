const { google } = require("googleapis")

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GATSBY_GOOGLE_CLIENT_EMAIL,
      private_key: (process.env.GATSBY_GOOGLE_PRIVATE_KEY || "").replace(
        /\\n/g,
        "\n"
      ),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
  const authClient = await auth.getClient()
  return google.sheets({ version: "v4", auth: authClient })
}

exports.handler = async event => {
  try {
    const sheets = await getSheetsClient()
    const spreadsheetId = process.env.GSHEETS_SPREADSHEET_ID
    const range = process.env.GSHEETS_GUESTBOOK_RANGE || "guestbook!A:D" // id, name, message, created_at

    if (event.httpMethod === "GET") {
      const res = await sheets.spreadsheets.values.get({ spreadsheetId, range })
      const rows = res.data.values || []
      const [header, ...dataRows] = rows
      const headerIndex = Object.fromEntries(
        (header || []).map((h, i) => [h, i])
      )
      const items = dataRows
        .map((r, idx) => ({
          id: r[headerIndex.id] || crypto.randomUUID(),
          name: r[headerIndex.name] || "",
          message: r[headerIndex.message] || "",
          created_at: r[headerIndex.created_at] || new Date().toISOString(),
        }))
        .reverse() // 최신순으로 정렬 (시트에서는 오래된 순으로 들어감)
      return {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ data: items }),
      }
    }

    if (event.httpMethod === "POST") {
      const { id, name, message, created_at } = JSON.parse(event.body || "{}")
      if (!name || !message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "name and message are required" }),
        }
      }
      const appendRange = "guestbook!A:D" // 명시적으로 4개 컬럼 지정
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: appendRange,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[id || crypto.randomUUID(), name, message, created_at || new Date().toISOString()]],
        },
      })
      return {
        statusCode: 200,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ success: true }),
      }
    }

    return { statusCode: 405, body: "Method Not Allowed" }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String((err && err.message) || err) }),
    }
  }
}
