# Lead Integration App

Next.js application for lead collection and CRM integration.

## Features

- Custom form validation
- Ukrainian phone number validation
- Anti-spam protection without CAPTCHA
- SalesDrive CRM integration
- Telegram notifications for API failures
- Server-side API handling
- Environment variables support

---

## Tech Stack

- Next.js 16
- React
- TypeScript
- SalesDrive API
- Telegram Bot API

---

## Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   ├── lead/
│   │   └── send/
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── dilovod.ts
│   ├── telegram.ts
│   └── validators.ts
```

---

## Environment Variables

Create `.env.local`:

```env
SALESDRIVE_API_KEY=your_salesdrive_api_key

TG_TOKEN=your_telegram_bot_token
TG_CHAT_ID=your_telegram_chat_id

DILOVOD_API_KEY=your_dilovod_api_key
```

---

## Installation

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Validation

### Name

- Letters only
- Ukrainian and English characters supported

### Phone

```text
+380XXXXXXXXX
```

---

## Anti-Spam Protection

Implemented without CAPTCHA:

- Honeypot field
- Timestamp validation
- Server-side validation

---

## SalesDrive Integration

Lead data is sent to SalesDrive CRM through API requests.

Example payload:

```json
{
	"form": "1",
	"fName": "Roman",
	"phone": "+380991112233",
	"comment": "Lead from website"
}
```

---

## Telegram Monitoring

Telegram notifications are automatically sent if:

- SalesDrive API fails
- Dilovod API fails

---

## Dilovod Integration

Dilovod integration was researched and prepared.

However, full REST integration was not implemented because Dilovod currently uses gRPC instead of a public REST API.

According to Dilovod support:

> REST API is currently unavailable. We use gRPC.

---

## API Route

```text
POST /api/lead
```

---

## Author

Roman Okhremov
