# Message Sachi: WhatsApp live chat setup

How it works

1. A student types in the chat on any page. The page sends it to `/api/chat`.
2. `/api/chat` forwards it to **your SYNCODE WhatsApp (+94 70 291 1223)** through the WhatsApp Cloud API.
3. You answer in WhatsApp (swipe → **Reply** on the forwarded message).
4. Meta calls `/api/whatsapp` (the webhook), your answer is added to that student's conversation, and the website chat shows it within a few seconds.

Until the steps below are done, the chat still works one way: messages are emailed to you through Web3Forms.

## 1. Create the WhatsApp Cloud API app (Meta)

1. Go to https://developers.facebook.com → **My Apps → Create app** → type **Business**.
2. Add the product **WhatsApp**. Open **WhatsApp → API Setup**.
3. Meta gives you a **test phone number**. Copy its **Phone number ID**.
4. Under **To**, add **+94 70 291 1223** as a recipient and confirm the code WhatsApp sends you.
5. Permanent token: Business settings → **System users** → add one (Admin) → **Generate token**, select your app and the permissions `whatsapp_business_messaging` and `whatsapp_business_management`. Copy the token. (The 24 hour token on the API Setup page is only for a first test.)
6. From **App settings → Basic**, copy the **App secret**.

## 2. Add environment variables in Vercel

Project → **Settings → Environment Variables** (then redeploy):

| Name | Value |
|---|---|
| `WHATSAPP_TOKEN` | the permanent token |
| `WHATSAPP_PHONE_ID` | the Phone number ID |
| `WHATSAPP_OWNER` | `94702911223` (your SYNCODE number, digits only) |
| `WHATSAPP_VERIFY_TOKEN` | any secret word you choose, for example `sachi-portal-2026` |
| `WHATSAPP_APP_SECRET` | the App secret (makes sure only Meta can call the webhook) |
| `WHATSAPP_TEMPLATE` | optional, see step 5 |

The Redis store is the one already connected in **Storage** (`KV_REST_API_URL` and `KV_REST_API_TOKEN`).

## 3. Connect the webhook

In the Meta app: **WhatsApp → Configuration → Webhook → Edit**

- Callback URL: `https://learn-with-sachi-exam-portal.vercel.app/api/whatsapp`
- Verify token: the same word as `WHATSAPP_VERIFY_TOKEN`
- Click **Verify and save**, then under **Webhook fields** subscribe to **messages**.

## 4. Open the 24 hour window

WhatsApp only lets the bot send free-form text to you within 24 hours of your last message to it. From your SYNCODE WhatsApp, send **hi** to the test number once. Every time you reply to a student, the window is extended.

## 5. (Optional) A template for when the window is closed

If you do not message the bot for more than 24 hours, a new student message cannot be delivered as normal text. Create a message template in **WhatsApp → Message templates**, for example:

- Name: `portal_message`, category **Utility**, language English (US)
- Body: `New Learn with Sachi portal message: {{1}}`

When it is approved, set `WHATSAPP_TEMPLATE=portal_message` in Vercel. The portal then falls back to it automatically. Check Meta's current pricing for template messages; ordinary replies inside the 24 hour window are normally free.

## Replying

- **Best:** long-press the forwarded message → **Reply**. The answer goes to exactly that student.
- Or start your message with the code from the first line, for example `#A7F2C Here is the link`.
- A message with neither goes to the most recent student, and you get a short note saying which chat it went to.

## Notes

- Conversations are kept for 14 days in your Redis store and can only be read by the browser that started them (a random 128-bit id).
- Students are not asked for a name, email or phone. They only type a message. You answer in WhatsApp and the reply shows in their chat when they come back to the site.
- The public wall was removed. Old wall messages may still be in Redis under the key `lws:messages`; delete that key in the Upstash console if you do not want them kept.
- Meta's free test number is meant for development. If you later want your own brand number or a verified business name, Meta's business verification is needed.
