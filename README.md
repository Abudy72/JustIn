# JustIn
## File Structure
```markdown
- file-browser              # Bieber Browser
    - public                # Contains icons
    - src                   # Contains JS and CSS
      - App.css             # CSS
      - App.jsx             # Main JS
      - index.css           # Index CSS
      - index.jsx           # Index JS
    - .env                  # Make a .env file
    - .gitignore            # Gitignore
    - index.html            # Default HTML file
    - package.json          # NPM package
    - postcss.config.js     # PostCSS config
    - README.md             # Readme
    - tailwind.config.js    # Tailwind
    - vite.config.js        # Vite config
- just-in                   # Main app
    - assets                # Contains images
    - build                 # Contains Chrome extension build
    - .env                  # Make a .env file
    - .gitignore            # Gitignore
    - package.json          # NPM package
    - popup.tsx             # Popup
    - README.md             # Readme
    - tsconfig.json         # TS config
- JustIn                    # Flask server
    - requirements.txt      # Requirements
    - testing.py            # Flask server
- Model training
```
## Set Up
### file-browser
Create a `.env`  file in `/file-browser` with the following content:
```
VITE_TINYMCE_API_KEY=<your_tinymce_api_key>
```
Run the following commands:
1. `npm install`
1. `npm run dev`

Go to http://localhost:5173/
### just-in
Create a `.env`  file in `/file-browser` with the following content:
```
VITE_TINYMCE_API_KEY=<your_tinymce_api_key>
```
Run the following commands:
1. `npm install`
1. `npm run dev`

Load the unpacked extension from `/just-in/build/chrome-mv3-dev` in Chrome
### JustIn
Create a `.env`  file in `/JustIn` with the following content:
```
GOOGLE_GEN_AI_KEY=<your_google_gen_ai_key>
```
Run the following commands:
1. `pip install -r requirements.txt`
1. `flask --app testing --debug run`