# Setup Guide

## 1. Extract & open in VS Code
Unzip `gym-fitness-tracker.zip`, then `code gym-fitness-tracker` (or open the
folder in VS Code).

## 2. MongoDB Atlas
1. Create a free cluster at mongodb.com/atlas.
2. Database Access → add a user with a username/password.
3. Network Access → Add IP → Allow Access From Anywhere (0.0.0.0/0) for dev.
4. Get your connection string from "Connect" → "Drivers".

## 3. Backend
```
cd backend
cp .env.example .env
# edit .env: paste your MONGO_URI, set a JWT_SECRET
npm install
npm run seed     # creates demo admin + member + plans + workouts
npm run dev      # http://localhost:5000
```

## 4. Frontend
```
cd frontend
cp .env.example .env
npm install
npm run dev       # http://localhost:5173
```

## 5. Demo logins (from the seed script)
- Admin: admin@gymtracker.com / admin123
- Member: member@gymtracker.com / member123

See the main chat response for the full 7-commit Git workflow.
