# Benkyo UI

Benkyo UI is the repository of front end source code for a web application for my Japanese language studies.

It allows me to keep track of my progress, where I can create and store vocabulary, kanji and grammar clauses in a database.

## Demo

If the demo video is not available in Github, you can [watch the demo video in Google Cloud](https://storage.googleapis.com/benkyo/github/demo1.mp4).

<https://github.com/feriosch/benkyo-ui/assets/47795404/92e5086e-af76-48f4-8235-3fe701b32f6a>

## Words

Each new word is created with the respective spanish translation, the type and usage of the word (e.g. noun, na-adjective, etc.), and example sentences with their respective translations.

Words belong to a group where I first discovered the word (e.g. literature books, anime, JLPT material), and these words can possess certain features that remark them (e.g. common words, honorific terms, onotamopoeic adverbs, etc.).

Words can also be downloaded in a comma separated file (.csv) for studying with Anki.

## Kanji

Following Heisig's methodology for remembering the kanji, studied kanjis contain the components and radicals that conform them. Each non-trivial kanji contains a story to remember the meaning and the components.

Kanjis can be searched by components or by radicals. For example, When I do not remember a component

## Development Environment

### Frontend Setup

A web application developed with [Angular](https://angular.io/guide/what-is-angular) framework, using [Node.js](https://nodejs.org/en/about) as the development platform.

#### Frontend Prerequisites

- Node.js (v12 or higher recommended)
- npm (comes with Node.js)

#### Frontend Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure backend URL:

   - Edit `src/environments/variables.env.ts`
   - Set `localhostUrl` to your backend URL (default: `http://localhost:80`)

3. Start the development server:

   ```bash
   npm start
   ```

The application will be available at `http://localhost:4200`

#### Frontend Technologies Used

- [Angular](https://angular.io/) - Frontend framework
- [Bulma](https://bulma.io/) - CSS framework for styling and components
- [AG Grid](https://www.ag-grid.com/) - Data tables
- The file assets (such as the group collection images) are stored in Google Cloud Storage

> ⚠️ Due to security reasons, since anyone with access can create, update, and delete information, the application and the database require authentication.  
> Please contact [@feriosch](https://github.com/feriosch) if interested in a live demo.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

### Backend Setup

A Python Flask application providing HTTP endpoints for the front end app to communicate with the database and to obtain additional information of the characters.

#### Backend Prerequisites

- Python 3.11+ (tested with Python 3.13)
- pip
- MongoDB database access
- Google Cloud Storage credentials (for file storage)

#### Backend Installation

1. Create and activate a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:

   - Create a `.env` file in the root directory
   - Add the following variables:

   ```text
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   DB_NAME=your_database_name
   TOKEN_PASS=your_jwt_secret_key
   PORT=5001  # Optional, defaults to 80
   ```

4. Start the server:

   ```bash
   PORT=5001 python application.py
   ```

The API will be available at `http://localhost:5001`

#### Backend Technologies Used

- [Flask](https://flask.palletsprojects.com/en/2.0.x/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [KanjiAlive API](https://rapidapi.com/KanjiAlive/api/learn-to-read-and-write-japanese-kanji/details) - Kanji information
- Google Cloud Storage - File storage

### Notes

- On macOS, port 5000 is often used by AirPlay Receiver. Use port 5001 or another port for local development.
- The backend requires Python 3.11+ due to compatibility requirements with updated dependencies.
- Make sure your MongoDB connection string and credentials are correctly configured in the `.env` file.

> ℹ️ To save server costs, front end and backend servers are turned off most of the time.
> Please contact [@feriosch](https://github.com/feriosch) if you are interested in running the environment.
