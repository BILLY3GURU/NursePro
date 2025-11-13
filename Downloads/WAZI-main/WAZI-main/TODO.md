# TODO: Convert React Project to EJS, HTML, CSS, JS with MySQL

## Step 1: Update package.json

- [x] Remove React, Vite, TypeScript dependencies.
- [x] Add Express, EJS, mysql2, body-parser.
- [x] Update scripts to run server (e.g., "start": "node server.js").

## Step 2: Create server.js

- [x] Set up Express app with EJS view engine.
- [x] Define routes for / (home), /solution, /data, /engage.
- [x] Include middleware for static files (public/).
- [x] Integrate MySQL connection from db.js.

## Step 3: Create db.js

- [x] Set up MySQL connection using mysql2.
- [x] Export connection for use in server.js.

## Step 4: Create views/ folder and EJS templates

- [x] Create views/home.ejs: Convert HomePage.tsx to EJS.
- [x] Create views/solution.ejs: Convert SolutionPage.tsx to EJS.
- [x] Create views/data.ejs: Convert DataPage.tsx to EJS.
- [x] Create views/engage.ejs: Convert EngagePage.tsx to EJS.
- [x] Create views/partials/navigation.ejs: Convert Navigation.tsx to EJS partial.
- [x] Create views/partials/footer.ejs: Convert Footer.tsx to EJS partial.
- [x] Include layout.ejs if needed for common structure.

## Step 5: Create public/ folder

- [x] Move and adapt src/index.css to public/css/styles.css.
- [x] Create public/js/app.js for any client-side JS (e.g., scroll functions).

## Step 6: Remove old React files

- [x] Delete src/ folder entirely.
- [x] Delete vite.config.ts, tsconfig files, eslint.config.js, postcss.config.js, tailwind.config.js.
- [x] Update index.html or remove if not needed (server will handle).

## Step 7: Install dependencies

- [x] Run npm install to install new packages.

## Step 8: Test the application

- [x] Run npm start.
- [x] Check routes render correctly.
- [x] Verify MySQL connection (user may need to provide credentials).
- [x] Test client-side JS if any.
- [x] Server running on http://localhost:3001
- [x] MySQL connection error: Unknown database 'wazi_db' - Need to create database

## Step 9: Final cleanup

- [ ] Update README.md if needed.
- [ ] Ensure .gitignore includes node_modules.
- [ ] Create MySQL database 'wazi_db'
