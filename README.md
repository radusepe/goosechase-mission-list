# goosechase-mission-list

### Development versioning

- node: 16.14.2
- npm: 8.5.0
- postgres: 14.5

You likely will not need to have these exact versions. But if you run into issues with node or npm, this may be worth looking into.

## Setup - Database

These instructions work under the assumption that postgres is already set up locally with homebrew. If you have a different postgres environment you may need to change how the seeding is completed.

**Running the following command should seed the database:**

```
npm run seed_db
```

If you run into permissions issues, you may need to try with a super user. I have added a script for this:

```
npm run sudo_seed_db
```

## Setup - Client and Server

**Running the following command should install all necessary dependencies:**

```
npm run setup
```

## Running the Server

NOTE: Seeding the database should have created a user with permissions as well. This username and password is already being used in `server/src/constants.ts`. If you run into permission issues on the server side, you will need to update the constants file with a valid username and password for your postgres setup.
Make sure this user has appropriate permissions. You may need to run the following:

```
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO <your_username>;
```

**Run the following command should start the server:**

```
npm run server
```

## Running the Client

**Run the following command should start the client:**

```
npm run client
```

You can interact with the client at http://localhost:3000

## Important Files

Create React App comes with a lot of bloat. Below is a list of files that contain most of the logic for this project:

- client/src/components/
- client/src/hooks/
- client/App.tsx
- server/src/index.ts
