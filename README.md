# Best Quest
[![Codeship Status for lucasEncarnacao/best-quest](https://app.codeship.com/projects/1d88837d-becf-43da-abc9-194fe8666343/status?branch=main)](https://app.codeship.com/projects/416611)

https://best-quest.herokuapp.com

## Description
Best Quest is a real world scavenger hunt app designed to be mobile-friendly. Find a quest in your area and venture forth! Play alone or with friends to decipher clues pointing to real world locations and then go there! Using your device's geolocation, check if you are close enough to the correct location to advance to the next clue. If you are stumped, you can reveal hints or give up on a particular clue to advance anyway. Complete the quest and then rate and review it to let others know which quest is the best! Users can also create their own quests by selecting locations on a Google Map and providing information for each location along the way. 

## Technologies
Best Quest is a React on Rails application with a Postgres database. It was styled with Material-UI with a focus on mobile-first development. Google maps API integration enables users to create quests and measure distances, calculating if a user is close enough to the correct locations. Action cable allows multiple users to play quests together by opening a web socket connection and syncing up users' views. User authentication was implemented using JWT tokens to allow for login page styling on the frontend. React Dropzone and Rails Carrierwave allow users to upload pictures for various locations to AWS S3 Buckets. 


## Running Locally

#### Set Up
```
$ git clone https://github.com/lucasEncarnacao/best-quest.git
$ bundle
$ yarn install
$ bundle exec rake db:create
$ bundle exec rake db:migrate
```
#### Testing
```
$ bundle exec rspec
```
#### Running
```
$ bundle exec rails s
```
###### In a new terminal window
```
$ yarn start
```
Then visit http://localhost:3000/

## TODO
- Implement search feature within Google Map
- Save quest progress to resume later
- Add My Quests page to edit / delete created quests
- Add Admin role to be able to edit / delete any quest
- Add review quest page to be able to look over quests before creation
- Allow quest creators to reorder steps with drag and drop
