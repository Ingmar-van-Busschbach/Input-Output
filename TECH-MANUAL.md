This prototype uses the "Tensorflow" and "PoseNet" API's to generate a list of 2D coordinates that can be used by the game. This happens through Camera input
The camera needs to be set up facing away from the screen, much like a laptop webcam would be mounted compared to its screen. It does not matter whether it is mounted below or above the mirror, as long as it can reasonably capture the entire upper body of an user.
We use a local host server, that listens to port 3000, to process the camera input and write to the ..\Server\public\json\poseNetData.json

This json file contains the following data per "bone joint":
Name: string which identifies the bone joint, which is represented by names of human body parts, such as nose, or left shoulder
Position: Vector2D which represents the location of that bone joint
Score: float that represents how accurately Tensorflow was able to read that bone joint's location. Lower scores should either be blended towards, or filtered out, to prevent jitter

The current prototype contains data for the following bone joints, with a left and right variant where applicable:
Nose
Eyes
Ears
Shoulders
Elbows
Wrists
Hips
Knees
Ankles

We only use the data from the hip up, as the legs are not relevant to this prototype's function
This data is updated 10 times a second to keep performance cost low

Once this data is written to the json file, we use the html+js to display this for the user and turn it into a game. These files are in the ..\Website\ folder
The index.html is the actual game, while the spallys.html is the start screen
The game itself runs at an update rate of 60 per second, to smoothen out the animations that are not related to the Tensorflow locations
This is not an issue for Tensorflow as it will simply load and display the same data 6 times before Tensorflow updates the poseNetData.json
The game uses a simple 2D JS library to generate random circles on the screen. If any of those circles is touched by the user's wrists, they disappear.
More circles are generated over time through a spawn function, which uses a random interfal, random colors for the circles, and a random location to spawn them at.