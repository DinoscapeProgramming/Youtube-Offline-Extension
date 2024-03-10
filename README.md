# Youtube Offline Extension
The official browser extension for YouTube Offline enabling downloading your favorite content right in your browser.

## How to Install
- Download the zip file of this repository and unzip it
- Go to `chrome://extensions` on Google Chrome or `about:addons` on Mozilla Firefox
- Click on `load unpacked extension` and choise the folder with this extension at your chosen destination

## Security
If you are selfhosting YouTube Offline and worried about the security about the default WebSocket Server on port `8080`, you can change this port or/and create an authentication token for your apps (basically storing a JWT token that you need to enter once to verify the legitimacy of the browser extension to YouTube Offline's WebSocket server).
