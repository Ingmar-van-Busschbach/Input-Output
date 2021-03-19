These files contain both a prototype in Unreal Engine 4, as in pure HTML+JS.
Both use a node.js backend for processing the Tensorflow data. Read more on this in the TECH-MANUAL.md.
The UE4 prototype was made first, but we ran into some issues in compatibility between it and the node.js server.
The biggest issue was that there were instances where UE4 tried to read the json data while the node.js server was writing to it, leading to corrupted data.
We did not manage to get acceptable results from UE4 as a result.

We did consider using Unity, but we decided to go for HTML+JS instead as a full 3D game engine is not required for this prototype to work. It only adds unnecessary problems:
- Both UE4 and Unity increase the file size of the prototype.
- Both engines increase hardware requirement for the user.
- Both engines require additional documentation for the user.
- UE4 is not integratable into the website environment of Spallys, as it offers no website output, unlike Unity.
- Both engine prototypes probably would not be modifiable for the people maintaining the Spallys website.

We decided not to use any data below the legs:
- The legs are not really relevant for a reaction, unless Spallys wishes to introduce kicks as a way of reacting to something.
- The smart mirror turned out to be smaller than anticipated. displaying the entire body on screen would prove challenging,
especially as the user needs to be further away from the camera to let the camera fully capture their body, which in turn would make it harder to see what is happening on screen.

We decided to go for simple circles instead of the spallys logo:
- The spallys logo is an image, instead of a simple canvas draw function, making the program more complex.
- The spallys logo has a reasonably high resolution and could increase the performance cost of the program.