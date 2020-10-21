# device-rotation
![GitHub package.json version](https://img.shields.io/github/package-json/v/drinkins85/device-rotation)
![npm bundle size](https://img.shields.io/bundlephobia/min/device-rotation)
![GitHub top language](https://img.shields.io/github/languages/top/drinkins85/device-rotation)
![GitHub](https://img.shields.io/github/license/drinkins85/device-rotation)

### [Demo](https://drinkins85.github.io/device-rotation/demos/base/)

## Install
```
npm i device-rotation --save
```
or
```
<script src="https://unpkg.com/device-rotation@1.0.3/lib/index.js"></script>
```
## Usage
```
import deviceRotation from 'device-rotation';

const cb = function(position) {
    console.log(position.x, position.y);
}

if (DeviceRotation.isAvailable()) {
    deviceRotation.setCallback(cb);
    deviceRotation.start();
}
```
#### [Request permission](https://www.w3.org/TR/orientation-event/#dom-deviceorientationevent-requestpermission) in iOS 13.
It must be triggered on user action (click, tap or equivalent)
```
let permissionButton = document.getElementById('permissionButton');

if (DeviceRotation.isAvailable()) {
    if (DeviceRotation.needPermission()) {
        permissionButton.onclick = function () {
            DeviceRotation.start({ withPermission: true });
        }
    } else {
        DeviceRotation.start();
    }
}
```
