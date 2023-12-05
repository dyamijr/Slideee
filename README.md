# **Slideee**
Welcome to the Slideee application

## Introduction
- Clubs on campus are currently using a mix of Discord, and Instagram to communicate with their members and the general body.
- The problem with this current method is Discord and Instagram are flooded with information making it hard and confusing to get information about upcoming events and promotions.
- Slideee is a mix of a social media platform, an event finder, and a calendar tailored to the RPI community. The app includes two main flows, one for finding events and one for creating events. Slideee aims to provide a platform for both those looking to stay up to date with events from their favorite clubs and people looking for new events to attend. At its core, Slide aims to grow the communities at RPI.
 
## Tech Stack
### Frontend
- React Native
- TypeScript
### Backend
- NestJS
- TypeScript
- MongoDB

## Starting Frontend
### Installations Needed
- ngrok
- Expo
- ExpoGo on mobile device
### Steps
- Start the backend
- Create a ngrok account at https://dashboard.ngrok.com/login
- Locate Your Authtoken on the left-hand side of the page
- Copy Authtoken
- In your terminal run ngrok config add-authtoken <YOUR_AUTHTOKEN>
- Run ngrok http 1234
- Obtain the forwarding address
- Place in the /slideee/frontend/.env
- Run npx expo start -c
- Scan QR Code
- Celebrate

## Testing
- npm run test
### Coverage Report
- To generate coverage report run: npm run test:cov
- coverage report wil generate and display in terminal
- can also be found at /backend/coverage/lcov-report/index.html 
- open the index.html file in browser
