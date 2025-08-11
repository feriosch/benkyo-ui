# Benkyo UI

Benkyo UI is the repository of front end source code for a web application for my Japanese language studies.

It allows me to keep track of my progress, where I can create and store vocabulary, kanji and grammar clauses in a database.

## Demo

If the demo video is not available in Github, you can check the demo in Google Cloud [here](https://storage.googleapis.com/benkyo/github/demo1.mp4).

https://github.com/feriosch/benkyo-ui/assets/47795404/92e5086e-af76-48f4-8235-3fe701b32f6a

## Words

Each new word is created with the respective spanish translation, the type and usage of the word (e.g. noun, na-adjective, etc.), and example sentences with their respective translations.

Words belong to a group where I first discovered the word (e.g. literature books, anime, JLPT material), and these words can possess certain features that remark them (e.g. common words, honorific terms, onotamopoeic adverbs, etc.).

Words can also be downloaded in a comma separated file (.csv) for studying with Anki.

## Kanji

Following Heisig's methodology for remembering the kanji, studied kanjis contain the components and radicals that conform them. Each non-trivial kanji contains a story to remember the meaning and the components.

Kanjis can be searched by components or by radicals. For example, When I do not remember a component

# Development Environment.

## Front end

A web application developed with [Angular](https://angular.io/guide/what-is-angular) framework, using [Node.js](https://nodejs.org/en/about) as the development platform.

- Used [Bulma](https://bulma.io/) as the main framework for the CSS styling and HTML components.
- For the listing tables, [AG Grid](https://www.ag-grid.com/) for Angular was adapted to the web application.
- The file assets (such as the group collection images) are stored in Google Cloud Storage, not in the app.

> ⚠️ Due to security reasons, since anyone with access can create, update, and delete information, the application and the database require authentication.  
> Please contact [@feriosch](https://github.com/feriosch) if interested in a live demo.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.3.

## Back end

A Python Flask application providing HTTP endpoints for the front end app to communicate with the database and to obtain aditional information of the characters.

- Used [Flask](https://flask.palletsprojects.com/en/2.0.x/) to create the server.
- Used KanjiAlive's free [API](https://rapidapi.com/KanjiAlive/api/learn-to-read-and-write-japanese-kanji/details) for kanji information (e.g. pronunciation, meaning, examples).

> ℹ️ To save server costs, front end and backend servers are turned off most of the time.
> Please contact [@feriosch](https://github.com/feriosch) if you are interested in running the environment.
