# Feature and Functionality

* Login using Google (Firebase Authentication)
* Create a new post
* Share photos and videos 
* Realtime update  posts
* Auto authenticate user on refresh
* Sign Out

# How to build your own ..?

1. Clone this  repo
2. Install all the dependencies ```npm i```
3. Setup Firebase
    * Create Firebase account
    * Create a new project
    * create a web app for that
    * Copy your config from there
   				* Select config option
   				* Paste those config inside firbase/config.js file
   	* Setup authentication using Google
4. Let's build  the optimized version
```npm run build```

5. Now for hosting on Firebase lets config Firebase locally
			* Install Firebase CLI
			* Login to Firebase
			* firebase login
      * Initialize Firebase
            ``` firebase init```
      * Select hosting in the menu
      * Select your respective project from the list
      * Select 'build' as your hosting directory and other options as you want
      * Let's deploy our clone and make it live
           ```firebase deploy```
	


