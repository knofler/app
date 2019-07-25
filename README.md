## Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.
2.  Clone this repo
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm install` in order to install dependencies.<br />
    _At this point you can run `npm start` to see the app at `http://localhost:3000`._
5. Run `npm run generate` to generate react containers and components.
6. Create .env file following .env.example
   - *API_URL=`< Use localhost for local development, http://localhost:8080 >`* 
   - *DOCKER_API_URL= `<Use your docker cluster api url and port >`*
1. Run `npm run build` to build the production app.