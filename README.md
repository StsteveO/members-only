# members-only
The Odin Project: Members Only

### I will insall the following npm packages (dependency)
- "compression": "^1.7.4",
- "cookie-parser": "~1.4.4",
- "debug": "~2.6.9",
- "dotenv": "^16.3.1",
- "express": "~4.16.1",
- "express-async-handler": "^1.2.0",
- "express-rate-limit": "^6.9.0",
- "express-validator": "^7.0.1",
- "helmet": "^7.0.0",
- "http-errors": "~1.6.3",
- "luxon": "^3.4.0",
- "morgan": "~1.9.1",
- "pug": "2.0.0-beta11",
- "bcryptjs": "^2.4.3",
- "express-session": "^1.17.3",
- "mongodb": "^6.0.0",
- "mongoose": "^7.4.5",
- "passport": "^0.6.0",
- "passport-local": "^1.0.0"

### And the folowing dev-dependency

- "nodemon": "^3.0.1"

```javascript
"private": true,
  "scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www",
    "serverstart": "DEBUG=local-library-tutorial:* npm run devstart"
  },
  "dependencies": {
    "compression": "^1.7.4",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^16.3.1",
    "express": "~4.16.1",
    "express-async-handler": "^1.2.0",
    "express-rate-limit": "^6.9.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0",
    "http-errors": "~1.6.3",
    "luxon": "^3.4.0",
    "morgan": "~1.9.1",
    "pug": "2.0.0-beta11",
    "bcryptjs": "^2.4.3",
    "express-session": "^1.17.3",
    "mongodb": "^6.0.0",
    "mongoose": "^7.4.5",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
```

### Create models folder, and each model will be its own .js file