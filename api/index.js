// Server middlware for handeling api requests
import express from 'express'
import mailchimp from '@mailchimp/mailchimp_marketing'

// Express app init
const app = express()
app.use(express.json())

// Mailchimp configuration variables
const MAILCHIMP_KEY = process.env.MAILCHIMP_KEY
const MAILCHIMP_SERVER_PREFIX = 'us3'
const MAILCHIMP_LIST_ID = 'a22c5554d8'

// Mailchimp init
mailchimp.setConfig({
  apiKey: MAILCHIMP_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
})

// Subscribes email to mailchimp newsletter
app.post('/subscribe', async (req, res) => {
  try {
    if (
      req.body &&
      req.body &&
      req.body.email &&
      req.body.first &&
      req.body.last
    ) {
      const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
        email_address: req.body.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: req.body.first,
          LNAME: req.body.last,
        },
      })

      res.json(response.result)
    } else {
      res.status(400).json({ response: 'Invalid post parameters!' })
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

export default {
  path: '/api',
  handler: app,
}
