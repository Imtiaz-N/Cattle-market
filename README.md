CATTLE MARKET MANAGEMENT APPLICATION
An Angular-based application for managing cattle market data, integrated with a JSON-server backend for mock API interactions.

FEATURES

Manage cattle listings and market data

CRUD operations for cattle records

Local development with mock backend

Production deployment capabilities

PREREQUISITES

Node.js v18+

Angular CLI v18.2.9+

npm v9+

GETTING STARTED

Clone Repository:
git clone https://github.com/Imtiaz-N/Cattle-market
cd CattleMarketManagement

Install Dependencies:
npm install

If encountering peer dependency issues:
npm install --legacy-peer-deps

DEVELOPMENT SETUP

Option 1: Local Backend (Recommended for Development)

Start JSON Server:
cd json-server
npm start
(Backend runs at http://localhost:3000)

Configure Frontend:
Open src/environments/environment.ts
Set API URL to:
apiUrl: 'http://localhost:3000'

Run Angular Application:
cd ..
ng serve
Access application at http://localhost:4200

---if hosted json serve get cross error please run the json server locally.

a separate repo for the json server also give in addition. if want run it separtely.https://github.com/Imtiaz-N/json-server-cattle-api
--not recommanded. run the folder which is inside the angular project folder

Option 2: Live Backend (Render Hosting)

Use Production API:
Open src/environments/environment.ts
Set API URL to:
apiUrl: 'https://json-server-cattle-api.onrender.com'

Run Angular Application:
ng serve

NOTE: The live backend uses Render's free tier which may take 30-60 seconds to respond initially due to server spin-up time.

DEPLOYMENT

Build for Production:
ng build --configuration=production

Deploy JSON Server:

Push db.json to Git repository

Create new Web Service on Render.com

Set build command: npm install && npm start

PROJECT STRUCTURE
src/ - Angular source code
json-server/ - Mock backend configuration
db.json - Database template
server.js - Server configuration
environments/ - API configuration
angular.json - Angular configuration

TROUBLESHOOTING

Q: Backend requests are slow with live URL
A: Normal for Render's free tier. Wait 45-60 seconds for server wake-up

Q: Dependency installation errors
A: Try:
npm cache clean --force
rm -rf node_modules/
npm install --legacy-peer-deps
