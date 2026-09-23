# Recipe App
 
A full-stack recipe management app — create, view, and save recipes.

## Setup

```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

## Run

```bash
npm run dev
```

Client:

```text
http://localhost:3000
```

Server:

```text
http://localhost:3001
```

## Environment

Create `server/.env`:
again- in server directory
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
