# Photo Album Project

The Photo Album Project is a comprehensive, feature-rich web application built using TypeScript, Node.js, Express, Socket.io, MySQL, and Sequelize. It showcases a dynamic platform where users can upload, share, and comment on photos in real-time. With a blend of traditional web and real-time capabilities, it ensures a lively and interactive user experience. Below are the details on how to set up, run, and utilize the application.

## Features

### User Section:
- **Home Page**: Features a menu for navigating the main sections (Home | Photos | Users | Contacts), displays the latest 10 photos as links, and includes forms for user registration and login.
- **Photos**: Users can view all photos sorted by upload date in descending order with pagination (10 per page).
- **Photo View**: Includes a simple form below the photo for adding comments (registered users only), and the photo's author can delete the photo.
- **Users**: Lists all users sorted by the number of uploaded photos in descending order with pagination (10 per page).
- **Contacts**: Contains a simple contact form (name, email, message) to send messages to the system email and save them in the database.
- **Logged-in Users**: Offers additional menu options for photo upload and profile modification, including the ability to log out.

### Administrator Section:
- **Home**: Provides a menu for navigating through the admin sections (Home | Photos | Users), displays simple statistics about the latest 5 registered users and uploaded photos including the uploader's info.
- **Photos**: Allows viewing of uploaded photos with a link to their comments, pagination (10 photos per page), and photo deletion capability.
- **Photo Comments**: Displays photo and its comments with the option to delete comments.
- **Users**: Lists users in descending order by registration date with pagination (10 per page), allowing deletion of users and viewing of their uploaded photos.

### General Notes:
- A user can upload a maximum of 9 photos.
- A photo can have a maximum of 10 comments.

## Setup and Installation

### Prerequisites
- Node.js
- MySQL

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/DanielDimitrov5/Photo-Album.git
cd photo-album-project
npm install
npm start
```

## Environment Setup

To properly configure your development environment, you'll need to set environment variables critical for the application's operations, such as database credentials, session secret, and email configuration for the contact form.

Create a `.env` file in the root of your project and populate it with the following variables:

```env
DB_NAME=<YourDatabaseName>
DB_USER=<YourDatabaseUsername>
DB_PASSWORD=<YourDatabasePassword>

SESSION_SECRET=<YourSecret>

MAX_PHOTOS=9
MAX_COMMENTS=10

EMAIL_USER=<YourEmailUsername>
EMAIL_PASSWORD=<YourEmailPassword>
```

## Real-time Notifications
- Utilizing Socket.io, the application sends real-time notifications to all connected users when a new photo is uploaded. This feature enhances the interactive experience by keeping users informed of new content instantly.