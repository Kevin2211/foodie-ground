## Foodie Ground

Welcome to the Yelp Clone project! This project is a full-stack web application that allows users to search for and review restaurants. Restaurant owners are also able to add their own stores to the platform and populate them on a Google map using the Google Maps API.

Link to live demo web app: https://foodie-ground.onrender.com/ <br />
Demo Login<br />
Username: admin<br />
Password: thanh<br />

<strong>Technologies Used</strong><br/>
-React.js <br/>
-Express.js <br/>
-MongoDB<br/>
-Cloudinary<br/>
-JSON Web Tokens (JWT) for authentication<br/>
-Google Maps API<br/>
<strong>Features</strong><br/>
-Search for restaurants by location or name<br/>
-View detailed information about a specific restaurant, including its location on a map and user reviews<br/>
-Leave a review for a restaurant<br/>
-Restaurant owners can add their own stores to the platform and populate them on a Google map<br/>
-Protected routes with JWT authentication for restaurant owners to manage their stores <br/>




<img width="2352" alt="Screen Shot 2022-10-29 at 9 37 10 AM" src="https://user-images.githubusercontent.com/36496209/198837595-10fdbce8-c5ca-44f9-b6dd-b7d1472aef32.png">
Register Page:
<img width="2352" alt="Screen Shot 2022-10-29 at 10 00 00 AM" src="https://user-images.githubusercontent.com/36496209/198838563-8bf5a67a-6d95-4894-82a0-f916c4e7a3c6.png">
Login page with authenthication:
<img width="2352" alt="Screen Shot 2022-10-29 at 9 37 58 AM" src="https://user-images.githubusercontent.com/36496209/198837691-9b5a9aba-262d-4c97-8695-2e8d0e570e6f.png">
Live map with link to individual store page:
<img width="2352" alt="Screen Shot 2022-10-29 at 9 37 43 AM" src="https://user-images.githubusercontent.com/36496209/198837729-0ed39d18-867d-458e-896e-f6f460f6b04e.png">
Owner account type can create, edit their stores:
<img width="2352" alt="Screen Shot 2022-10-29 at 9 38 59 AM" src="https://user-images.githubusercontent.com/36496209/198837771-2d84a194-3e29-4460-aa51-c5eb5262afe0.png">
<img width="2352" alt="Screen Shot 2022-10-29 at 9 40 10 AM" src="https://user-images.githubusercontent.com/36496209/198837776-63562975-379d-477b-8294-fc660956dfcb.png">

## Features
## User account type:
* Users can add stores to favorites, post a review and view stores
* Users can also delete their own reviews
* Each user can upload thei own profile picture and have their own profile information
* Users can also view other people profiles.
## Owner account type:
* Owners create new stores with pictures, add items to the store's menu
* Owners can add more pictures or delete pictures from their stores
* Owners also have their own profile with a profile picture
* Owners can also post reviews for other stores

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone (https://github.com/Kevin2211/foodie-ground.git)
cd foodie-ground
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).


