# Review Questions

## What is Node.js?
Node is a software that uses the V8 JS engine to run javascript outside of the browser. 
## What is Express?
Express is a library that abstracts away some of the native Node methods required for building a server and that also endows some of Node's native objects with extra properties. 
## Mention two parts of Express that you learned about this week.
We learned about how to implement CRUD methods with Express as well as middleware related functions like next() and being able to pass middleware as an argument to CRUD methods to use them locally, or passing them to .use() in order to apply them globally.
## What is Middleware?
Middleware is a function that is responsible for carrying out some kind of action on the client's request object before it is passed to its final route handler.  
## What is a Resource?
A resource is generally any data point that can be accessed by a string that references it. 
## What can the API return to help clients know if a request was successful?
An response object with a message and status code. 
## How can we partition our application into sub-applications?
By using express.Router() and module.export functionality. 
## What is express.json() and why do we need it?
Express.json() is used to convert data into JSON format, allowing for standard RESTful communication. 



  
