# device-rotation

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
