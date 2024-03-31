Deploy link : https://face-auth-detection.vercel.app

a. Setting up the back end 
  - npm install  
  - export MONGOURL=“your/mongodb/url” ( for Linux-based systems)
                                                           Or 
  - set MONGOURL=“your_mongodb_connection_url” (For Windows-based systems)
   - npm run dev (for development )
  - npm run start (for production )
    
  b. Setting up the front-end
  
  -npm install 
   - set the environmental variables in the util.js file 
   - npm run start

Architecture :
 - High Level
     ![image](https://github.com/thattallman/face-auth/assets/82497615/0f40d276-526d-42d1-a77e-7dd43aec7ae0)
-Low Level
     ![image](https://github.com/thattallman/face-auth/assets/82497615/1978a858-2dd4-4bc6-b929-7a9de39740c4)


 Project  Screen Shots :
  a. User Registration
 ![image](https://github.com/thattallman/face-auth/assets/82497615/04cc7f11-2dcb-4e15-bfd4-1912e60eddd9)

b. User Login- https://face-auth-detection.vercel.app/login
 (without login conditions  - stare at the camera for few seconds ) 
 ![image](https://github.com/thattallman/face-auth/assets/82497615/e1da4852-6528-4a7c-821a-1772a1d4b85b)
               
 Face recognition and authentication
 ![image](https://github.com/thattallman/face-auth/assets/82497615/b4e19239-a5dd-4334-a00b-d1b09a7cfb8f)

c. Home Screen with facial detection and descriptors 

![image](https://github.com/thattallman/face-auth/assets/82497615/4f0ac002-d587-4995-9a3c-448323a1b32c)

d. Face matcher - Compared two different faces and recognise similarity and differences 

![image](https://github.com/thattallman/face-auth/assets/82497615/dc12f3ed-216c-4e27-be26-d5b4c89b8c1f)

![image](https://github.com/thattallman/face-auth/assets/82497615/76d5565f-822f-4dfe-8cc7-d3a219c59560)

               

 
 
