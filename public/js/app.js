function glanceTracker(){
  JEELIZGLANCETRACKER.init({

   callbackTrack: function(isWatching){
     if (isWatching){
       console.log('Hey, you are watching bro');
       document.getElementById("demo").innerHTML = "You are watching";
     } else {
       console.log('You are not watching anymore :(');
       document.getElementById("demo").innerHTML = "You are not watching";
     }
   },
 

   callbackReady: function(error, spec){
     if (error){
       console.log('EN ERROR happens', error);
       return;
     }
     console.log('All is well :)');
   },
 

   isDisplayVideo: true,
 
   canvasId: 'glanceTrackerCanvas',
 
   
   sensibility: 0.5,
 
   NNCPath: 'dist/'
 });
}

function glanceStop(){
  JEELIZGLANCETRACKER.toggle_pause(false, true);
}











// # Jeeliz Glance Tracker

// This JavaScript/WebGL library detects if the user is looking at the screen or not. It is very robust to all lighting conditions and lightweight (only 150KB gzipped for the main script and the neural network JSON model). It is great for playing a video only if the user is watching it.

// ## Demos

// You can test it with these demos (included in this repo):

// * Simple integration demo: [live demo](https://jeeliz.com/demos/glanceTracker/demos/integration2), [source code](/demos/integration2)
// * Youtube integration demo: [live demo](https://jeeliz.com/demos/glanceTracker/demos/youtube), [source code](/demos/youtube)
// * Old and ugly integration demo: [live demo](https://jeeliz.com/demos/glanceTracker/demos/integration), [source code](/demos/integration)
// * Camera auto exposure adjuster: [live demo](https://jeeliz.com/demos/glanceTracker/demos/cameraExposureAdjuster), [source code](/demos/cameraExposureAdjuster)

// This is a video screenshot of the *Youtube integration demo*:

// <p align="center">
// <a href='https://www.youtube.com/watch?v=2FWcsA8QrHU'><img src='https://img.youtube.com/vi/2FWcsA8QrHU/0.jpg'></a>
// </p>



// ## Architecture

// This repository is composed of the following paths:

// * `/dist/`: Main library script and neural network model,
// * `/demos/`: Integration demonstrations,
// * `/libs/`: third party library.



// ## Integration

// In the HTML page, you first need to include the main script between the tags `<head>` and `</head>`:

// ```html
//  <script src="dist/jeelizGlanceTracker.js"></script>
// ```

// Then you should include a `<canvas>` HTML element in the DOM, between the tags `<body>` and `</body>`:

// ```html
// <canvas id='glanceTrackerCanvas'></canvas>
// ```

// This canvas will be used by WebGL for the computation and the display of the camera video with the face detection frame. It can be hidden using CSS rules.
// As soon as the page is loaded or when you want to enable the glance tracking feature you should call this function:

// ```javascript
// JEELIZGLANCETRACKER.init({
//   // MANDATORY:
//   // callback launched when:
//   //  * the user is watching (isWatching=true) 
//   //  * or when he stops watching (isWatching=false)
//   // it can be used to play/pause a video
//   callbackTrack: function(isWatching){
//     if (isWatching){
//       console.log('Hey, you are watching bro');
//     } else {
//       console.log('You are not watching anymore :(');
//     }
//   },

//   // FACULTATIVE (default: none):
//   // callback launched when then Jeeliz Glance Tracker is ready
//   // or if there was an error
//   // spec is an object with these attributes:
//   //   * <video> video: the video element
//   //   * <WebGLContext> GL: the webgl context
//   //   * <WebGLTexture> videoTexture: WebGL texture storing the camera video
//   //   * <WebGLTexture> videoTextureCut: WebGL texture storing the cropped face
//   callbackReady: function(error, spec){
//     if (error){
//       console.log('EN ERROR happens', error);
//       return;
//     }
//     console.log('All is well :)');
//   },

//   //FACULTATIVE (default: true):
//   //true if we display the video of the user
//   //with the face detection area on the <canvas> element
//   isDisplayVideo: true,

//   // MANDATORY:
//   // id of the <canvas> HTML element
//   canvasId: 'glanceTrackerCanvas',

//   // FACULTATIVE (default: internal)
//   // sensibility to the head vertical axis rotation
//   // float between 0 and 1: 
//   // * if 0, very sensitive, the user is considered as not watching
//   //   if he slightly turns his head,
//   // * if 1, not very sensitive: the user has to turn the head a lot
//   //   to loose the detection. 
//   sensibility: 0.5,

//   // FACULTATIVE (default: current directory)
//   // should be given without the NNC.json
//   // and ending by /
//   // for example ../../
//   NNCPath: '/path/of/NNC.json'
// });
// ```


// ## Other methods

// After the initialization, these methods are available:

// * `JEELIZGLANCETRACKER.set_sensibility(<float> sensibility)`: adjust the sensibility (between 0 and 1),

// * `JEELIZGLANCETRACKER.toggle_pause(<boolean> isPause, <boolean> shutCamera)`: pause/resume the face tracking. if `shutCamera` is set to `true`, it will also turn off the camera light. It returns a promise,

// * `JEELIZGLANCETRACKER.toggle_display(<boolean> isDisplay)`: toggle the display of the video with the face detection area on the HTML `<canvas>` element. It is better to disable the display if the canvas element is hidden (using CSS for example). It will save some GPU resources.

// * `JEELIZGLANCETRACKER.destroy()`: Clean both graphic memory and JavaScript memory, uninit the library. After that you need to init the library again.


// You should use them after initialization, ie:

// * either after that `callbackReady` function provided as initialization argument is launched (better),
// * or when the boolean property `JEELIZGLANCETRACKER.ready` switches to `true`.



// ## Hosting

// ### HTTPS only!

// The tracker requires the user's camera video feed through `MediaStream API`. So your application should be hosted with a HTTPS server (even with a self-signed certificate). It won't work at all with unsecure HTTP, even locally with some web browsers.

// ### The scripts

// You can use our hosted and up to date version of the library, available here:

// ```
// https://appstatic.jeeliz.com/glanceTracker/jeelizGlanceTracker.js
// ```

// It is hosted on a content delivery network (CDN) using gzip compression.
// If you host the scripts by yourself, be careful to enable gzip HTTP/HTTPS compression for .JSON and .JS files. Indeed, the neuron network JSON file, `dist/NNC.json` is quite heavy, but very well compressed with GZIP. You can check the gzip compression of your server [here](https://checkgzipcompression.com/).



// ## About the tech

// ### Under the hood
// This API uses Jeeliz WebGL Deep Learning technology to detect and track the user's face using a neural network. All is done client-side.

// ### Compatibility

// * If `WebGL2` is available, it uses `WebGL2` and no specific extension is required,
// * If `WebGL2` is not available but `WebGL1`, we require either `OES_TEXTURE_FLOAT` extension or `OES_TEXTURE_HALF_FLOAT` extension,
// * If `WebGL2` is not available, and if `WebGL1` is not available or neither `OES_TEXTURE_FLOAT` or `OES_HALF_TEXTURE_FLOAT` are implemented, the user is not compatible.

// In all cases, WebRTC should be implemented in the web browser, otherwise FaceFilter API will not be able to get the camera video feed. Here are the compatibility tables from [caniuse.com](https://caniuse.com/) here: [WebGL1](https://caniuse.com/#feat=webgl), [WebGL2](https://caniuse.com/#feat=webgl2), [WebRTC](https://caniuse.com/#feat=stream).

// If a compatibility error is triggered, please post an issue on this repository. If this is a problem with the camera access, please first retry after closing all applications which could use your device (Skype, Messenger, other browser tabs and windows, ...). Please include:

// * a screenshot of [webglreport.com - WebGL1](http://webglreport.com/?v=1) (about your `WebGL1` implementation),
// * a screenshot of [webglreport.com - WebGL2](http://webglreport.com/?v=2) (about your `WebGL2` implementation),
// * the log from the web console,
// * the steps to reproduce the bug, and screenshots.



// ## License

// [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html). This application is free for both commercial and non-commercial use.



// ## References

// * [Jeeliz official website](https://jeeliz.com)