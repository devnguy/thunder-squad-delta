# Book Swap (Name TBD)

## Install and Run

```shell
# Assuming you are in the root of the project:

# Install dependencies for server
npm install

# Install dependencies for frontend
npm run frontend-install

# Run the frontend AND server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React frontend only
npm run frontend

# Server runs on localhost:4000 and frontend on localhost:3000
```

## Set Database Environment Variables

1. Duplicate the `.env-example` file (keeping it in the root of the project)
   and rename it `.env`
2. Replace the values inside the file with the correct MySql database
   credentials.

This allows the application to connect to the database in your local
development environment. The `.env` file will be ignored by git so that
sensitive information (like passwords) are not committed to version control.

The environment variables you set are being used in `lib/db.js`

### Further reading

- [https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa)
- [dotenv documentation](https://www.npmjs.com/package/dotenv)
