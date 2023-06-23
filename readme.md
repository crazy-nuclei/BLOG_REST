To create the image and run mongodb docker container : 
- cd mongodb 
- docker build -t my-mongodb .
- docker run -d -p 27017:27017 --name mongodb-container -v mongodb-data:/data/db my-mongodb
- to check if it is running : docker ps 


