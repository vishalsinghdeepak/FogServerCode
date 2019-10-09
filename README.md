# FogServerCode
This NodeJS code enables a system to behave as a server which can be used as a fog server for applications.

• Currently it has the a REST API service to upload any file to this server. 
Here the steps to do it.
1. Extract the zip file
2. Enter the folder and Start the server using the command - node server.js (it will start the server currenlty it will open at 8080 port, you can change the port by modifying the server.js file)
3. Send your POST request to upload the content you wish to send at this path
http://localhost:8080/upload 
4. Add the following headers in your request
name=content-type
value=multipart/form-data
5. Attach your file in the request
name=myFile 
value=xyz.mp3 (xyz is your file you wish to send here)

(Don't change this field, name has to be "myFile", this is the key for the file you are attaching in the server.js)
