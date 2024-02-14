# Chat App UI
A chat UI built with next.js (react), shadcn, zustand, tailwind

### Live Preview:
https://chat-ui-ten-kappa.vercel.app/

### Steps to Run Locally:
1. clone this repo to your local machine.

2. cd into the project directory and install all dependencies:
```
npm install
```

3. run the project on your local development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Included Features:
- Send, receive, and display messages for a chat
- Create new chat from list of contacts
- Expand/Collapse Sidebar
- Emoji Support
- Sidebar latest messages preview/ordering
- Supports multiple channels/chats
- Autoscroll to last message in chat

### Additional Features (to be implemented, time permitting):
In a fully featured chat UI, there would be many additional considerations/features to implement, including:

- Message typing indicator
- Intgration with websockets for realtime messaging
- Online/Offline indicator status
- Message caching (i.e. only pull last 100 message from chat, load more on scroll up/event)
- Unread message indicator/notification
- Light/Dark mode support
- Reacting (emoji) to individual chat messages
- Support for group chat
- Support for various media type messages (image, video, file attachments, etc)
- Support for Voice/Video chat
- Undo/edit existing message
- Integration with backend datalayer/DB

<video src="https://github.com/mrkchoi/chat_ui/assets/40152546/1946d427-f36e-4a23-b354-4608e83da1e2" width="100%">
