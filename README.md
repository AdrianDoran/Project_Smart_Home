## UNDER ./API
That is the main API, you can browse the enpoints under api.js.**

## UNDER ./DEVICEAPI
That is the API that communicates with the Particle Photon, you can browse the enpoints under api.js.

## UNDER ./WEB
That is the frontend, find details within the folder.

## UNDER ./PARTICLE
That is everything that is needed for the particle Photon to communicate with the frontend.
    - Setup the particle photon, ensure all libraries are included through the IDE.
    - Use a custom webhook and paste ours within, replace the ID that you've used for your device on the frontend.


**
## FOR DEVS
    If there are issues with CORS, both of the API's can be run locally, replace the ApiBase url within the frontend (there's only two references), and replace it with the main api's local address. There shouldn't be issues with the device api as it only communicates with the particle photon.