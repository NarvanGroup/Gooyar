# Telegram Integration Setup Guide

This guide will help you set up Telegram user login and messaging functionality using the Telegram API.

## Prerequisites

1. **Telegram Account**: You need a Telegram account to use this integration
2. **Node.js**: Make sure you have Node.js installed
3. **Telegram API Credentials**: You'll need to get API credentials from Telegram

## Getting Telegram API Credentials

1. **Visit Telegram API Development Tools**:

   - Go to https://my.telegram.org/apps
   - Log in with your Telegram account

2. **Create a New Application**:

   - Fill in the required fields:
     - **App title**: Your app name (e.g., "My Telegram Client")
     - **Short name**: A short identifier (e.g., "myapp")
     - **Platform**: Choose "Desktop"
     - **Description**: Brief description of your app

3. **Get Your Credentials**:
   - After creating the app, you'll get:
     - **API ID**: A numeric identifier
     - **API Hash**: A long string hash

## Environment Setup

Create a `.env` file in the `apps/gooyar-back` directory with the following variables:

```env
# OpenAI API Key (existing)
OPENAI_API_KEY=your_openai_api_key_here

# Telegram API Credentials
TELEGRAM_API_ID=your_telegram_api_id_here
TELEGRAM_API_HASH=your_telegram_api_hash_here

# Optional: Session string for persistent login
# This will be generated after first successful login
TELEGRAM_SESSION_STRING=

# Server Port
PORT=3001
```

## Installation

1. **Install Dependencies**:

   ```bash
   cd apps/gooyar-back
   npm install
   ```

2. **Start the Backend Server**:

   ```bash
   npm run dev
   ```

3. **Start the Frontend** (in another terminal):
   ```bash
   cd apps/gooyar-front
   npm run dev
   ```

## Usage

### 1. Login Process

1. **Open the Telegram Client** in your browser
2. **Enter your phone number** with country code (e.g., +1234567890)
3. **Click Login** - you'll receive a verification code on Telegram
4. **Enter the verification code** and click Login again
5. **You're now logged in!**

### 2. Sending Messages

1. **Enter recipient**: Use username (e.g., @username) or chat ID
2. **Type your message**
3. **Click "Send Message"**

### 3. Receiving Messages

1. **Click "Start Listener"** to begin receiving real-time messages
2. **Incoming messages** will appear in the "Incoming Messages" section

### 4. Getting Message History

1. **Enter a chat ID or username** in the recipient field
2. **Click "Get Messages"** to retrieve recent messages

## API Endpoints

### REST API Endpoints

- `POST /api/telegram/initialize` - Initialize Telegram service
- `POST /api/telegram/login` - Login with phone number and code
- `POST /api/telegram/send-message` - Send message to recipient
- `POST /api/telegram/send-message-to-user` - Send message to user by username
- `GET /api/telegram/messages/:chatId` - Get messages from chat
- `GET /api/telegram/me` - Get current user info
- `GET /api/telegram/status` - Get connection status
- `POST /api/telegram/start-listener` - Start message listener
- `POST /api/telegram/disconnect` - Disconnect from Telegram

### WebSocket Events

- `telegram:login` - Login request
- `telegram:send-message` - Send message request
- `telegram:get-messages` - Get messages request
- `telegram:start-listener` - Start listener request
- `telegram:new-message` - Incoming message notification

## Security Notes

1. **Keep your API credentials secure** - never commit them to version control
2. **Session strings** contain sensitive authentication data - store them securely
3. **Phone numbers** are used for authentication - handle them with care
4. **Rate limiting** - respect Telegram's API rate limits

## Troubleshooting

### Common Issues

1. **"API ID and API Hash required"**

   - Make sure you've set `TELEGRAM_API_ID` and `TELEGRAM_API_HASH` in your `.env` file

2. **"Phone number invalid"**

   - Ensure you're using the full international format (e.g., +1234567890)

3. **"Verification code invalid"**

   - Check that you've entered the correct code from Telegram
   - Codes expire quickly, so enter them promptly

4. **"Connection failed"**

   - Check your internet connection
   - Verify the server is running on the correct port

5. **"User not found"**
   - Make sure the username exists and is spelled correctly
   - Some users may have privacy settings that prevent messaging

### Getting Help

- Check the console logs for detailed error messages
- Verify your API credentials are correct
- Ensure you're using the latest version of the telegram library

## Features

- ✅ User login with phone number verification
- ✅ Send messages to users and chats
- ✅ Receive real-time messages
- ✅ Get message history
- ✅ WebSocket integration for real-time updates
- ✅ Session persistence
- ✅ User information retrieval
- ✅ Connection status monitoring

## Next Steps

- Add message encryption support
- Implement file/media sharing
- Add group chat functionality
- Create message templates
- Add message scheduling
- Implement message search
