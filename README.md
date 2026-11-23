# Najib AI API starter

## Included
- `public/index.html`: Najib AI chat interface
- `server.js`: secure server-side OpenAI Responses API integration
- `.env.example`: environment variable template

## Run locally
1. Install Node.js on a computer or use a supported online development environment.
2. Copy `.env.example` to `.env`.
3. Put your API key in `.env` as `OPENAI_API_KEY=...`.
4. Run `npm install` then `npm start`.
5. Open `http://localhost:3000`.

## Important security and billing
- Never put your API key in `public/index.html`, share it in chat, or commit `.env` to GitHub.
- Set `OPENAI_API_KEY` as a private environment variable in your hosting provider instead.
- API usage is billed separately from ChatGPT subscriptions. A zero-rupee launch cannot be guaranteed; check current API pricing and add a spending limit.
- Set `OPENAI_MODEL` to a model available to your API project if the default model is unavailable.
- This is a starter prototype, not a production-ready public service. Before public launch add authentication, per-user quotas, rate limiting, abuse prevention, privacy policy, and persistent chat storage.
