# Welcome to Stays!

Just like Airbnb, at **Stays** you can explores multiple vacation listings across the world and find the one you'd love to  **Stay** at! If you have a stay of your own that you would like to offer to others you can create your very own listing! If you stayed at a stay recently and would like to leave a review you can also do that once you are logged in to your **Stays** account. Checkout [Stays](https://stays-app.herokuapp.com/) now!

Created with: **JavaScript**, **PostgresSQL**, **Sequelize**, **Express**, **React**, **Redux**, **CSS**


## Home Page

Checkout all of **Stays** listings without having to be logged in!


## Guest/Demo User

Don't have time to Sign up and create a new account, no worries! Simply log in with our provided Demo/Guest user, and explore **Stays** and all its capabilities! Create a Listing and leave some reviews!

## Create a Listing!

Once you have signed up and logged in you can now Create your first listing within your 'My Profile' page. You can also instantly delete it or edit it as you please!

## Leave some Reviews!

Once you are logged in on Stays you can leave a review on any business and even your own business! You can also delete your review if you end up changing your mind!

## Technical Implementation Details

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

## Install Instructions

Run Stays locally! Clone the stays repo to a local folder

    git clone https://github.com/joshsalcido/stays-app.git

In both the backend directory and frontend run npm install to install all dependencies

    npm install

#### In the backend directory create a .env file, use the .env.example file as a reference and fill it out with your desired port, username, password, and database name
*now in the backend directory create, migrate, and seed the database, run:*

    npx dotenv sequelize db:create
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all

Final step, run the server, navigate to the backend directory in one terminal and in another terminal navigate to the frontend directory and run this in both:

    npm start

## To-dos/Future Features

Given the time constraint of a week, here are some features that haven't made the site yet but will be implemented soon!

 - Listing Categories ex. Cabins, Islands, Modern Design, A-frames etc.
 - Bookings
 - AWS local photo uploads
 - Favorites, save listings to a Favorites list
 - Listing Search bar
