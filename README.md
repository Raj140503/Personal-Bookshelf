## Personal BookShelf 
## Overview
This project is a React application that allows users to search for books using the Open Library API and maintain a personal bookshelf using localStorage. The application is built with React, Bootstrap, and jQuery for a responsive and interactive user experience.

## Technologies Used
React

Tailwind CSS

Open Library API

localStorage API

## Demo
https://main--celadon-tanuki-d85742.netlify.app/

## Prerequisites
Ensure you have the following installed on your local machine:

Node.js (v14 or later)

npm (v6 or later)

## Installation
Clone the repository:
```
git clone https://github.com/your-username/personal-bookshelf-.git
cd book-search-app
```

Install the dependencies:

```
npm install
```
## Run
To start the application, run:
```
npm start
```
The application will be available at http://localhost:3000.

## Directory
```
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── components
│   │   ├── BookCard.js
│   │   ├── DisplayBooks.js
│   │   ├── Bookshelf.js
│   │   └── Navbar.js
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── ...
├── package.json
└── README.md
```
## Functionalities
**Book Search Page -**

Search Input: An input field where users can type the name of a book.

Real-Time Search Results: As users type, search results are fetched from the Open Library API and displayed in a list of cards.

Add to Bookshelf: Users can add books to their personal bookshelf by clicking the "Add to Bookshelf" button on each book card.

**Personal Bookshelf Page -**

Display Bookshelf: Displays the list of books added to the personal bookshelf.

Remove from Bookshelf: Users can remove books from the bookshelf by clicking the "Remove from Bookshelf" button on each book card.

**Responsiveness-**

The application is designed to be responsive and works well on both desktop and mobile devices. The layout adjusts to different screen sizes to ensure a user-friendly experience.

