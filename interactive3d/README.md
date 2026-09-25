# Interactive geometry and diffusion

Open index.html or a numbered scene page in a modern browser with WebGL 2. Everything runs in JavaScript. No backend, CDN, package installation or remote data request is required at runtime.

Drag to orbit; scroll to zoom; Shift-drag/right-drag to pan. Touch: one finger rotates; pinch zooms; two fingers pan. Camera motion is independent of playback. Pause, speed, loop, restart and the timeline control the scan. Reset view changes only the camera. The midpoint button pauses at x/L = 1/2. The fixed front-view inset remains readable while orbiting.

The first two scenes show fixed 3D channels; only the selected station moves. The axial length is schematic. Orange arrows show the transverse cell gradient with fixed display scaling, not particle motion. The conformal construction and bounds graph are mathematical planes embedded in the viewer, with no invented physical variable.

The pinned Three.js version is 0.186.1. See THREE_LICENSE.txt and the official OrbitControls documentation: https://threejs.org/docs/pages/OrbitControls.html. app.bundle.js includes the engine, controls, scene code and the eight supplied FEM values. The mathematical formulas match the paper.

Development sources remain in the author's workspace. To rebuild there, run npm ci, npm run build and npm test. Tests check area and centroid, the gradient against independently differentiated normal wall motion, the zero-energy midpoint and analytic bounds against all eight cached FEM samples. They do not certify numerical PDE error.

The presentation embeds the same pages using ?embed=1. Rendering pauses while the frame is off screen, without changing its play/pause selection.
