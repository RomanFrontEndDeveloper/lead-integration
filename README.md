# Lead Integration App

Fullstack Next.js application for lead collection, validation, anti-spam protection, and CRM/ERP integrations.

---

## Test Accounts

### SalesDrive

```text
Login: romariotraveler@gmail.com
Password: 78omariz
```

### Dilovod

```text
Login: romariotraveler@gmail.com
Password: qazQAZ123
```

---

## Features

- Custom form validation
- Ukrainian phone number validation
- Anti-spam protection without CAPTCHA
- SalesDrive CRM integration
- Dilovod ERP integration
- Telegram notifications for API failures
- Server-side API handling
- Environment variables support

---

## Tech Stack

- Next.js 16
- React
- TypeScript
- SalesDrive API
- Dilovod API
- Telegram Bot API

---

## Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   └── lead/
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── dilovod.ts
│   ├── telegram.ts
│   └── validators.ts
```

Environment Variables

Create .env.local:

SALESDRIVE_API_KEY=your_salesdrive_api_key

DILOVOD_API_KEY=your_dilovod_api_key

TG_TOKEN=your_telegram_bot_token
TG_CHAT_ID=your_telegram_chat_id
Installation
npm install
npm run dev

Open:

http://localhost:3000
Validation
Name
Letters only
Ukrainian and English characters supported
Phone

Supported format:

+380XXXXXXXXX
Anti-Spam Protection

Implemented without CAPTCHA:

Honeypot field
Timestamp validation
Server-side validation
SalesDrive Integration

Lead data is sent to SalesDrive CRM through API requests.

Example payload:

{
"form": "1",
"fName": "Roman",
"phone": "+380991112233",
"comment": "Lead from website"
}
Dilovod Integration

The application creates a new client in Dilovod using API integration.

Implemented features:

API authorization
Object creation (catalogs.persons)
Contact data transfer
Error handling
Server-side integration logic

Example API response:

{
"result": "ok",
"id": "1100100000001003"
}
Telegram Monitoring

Telegram notifications are automatically sent if:

SalesDrive API fails
Dilovod API fails
API Route
POST /api/lead
Author

Roman Okhremov
