# Promise-js
This is just an example project of how you can implement promises within JavaScript, especially on the client's machine. 

### How To Use This Promise Library?
To create a promise, you simply run the following code: 

```javascript
// ES6 Style 
Promise((resolve) => {
  console.log("Set time out started.");
  setTimeout(() => {
    console.log("Time out ended");
    resolve();
  }, 500);
}, (error, resolve) => {
  console.log(error);
  resolve();
}).then((resolve) => {
  console.log("Then started");
  resolve();
}).then((resolve) => {
  console.log("Finale!");
  resolve();
}).then(() => {
  console.log("I will cause an error.");
  console.log(fhdjfhjksdhfjkdhkfhdshfjhdsjfhjksd);
}, (error, resolve) => {
  console.log(error);
  resolve();
});

// ES5 Style 
var promise = new Promise();
promise.do(function(r) {
  console.log("hello");
  r();
}).then(function(r) {
  console.log("world");
  r();
}).then(function(r) {
  console.log("Error with es5");
  console.log(fkdsi23ur9ji23pm);
  r();
},function(err, r) {
  console.log(err);
  r();
}).then(function(r) {
  console.log("Finish!");
  r();
});

// TypeScript 
const promise = new Promise();
promise.then((next) => {
  console.log("started");
  next();
}).then((end) => {
  console.log("yes");
  end();
});
```

The ```promise.do(...)``` method will be the first method to run, without this method in place then nothign will happen, but provided that you have included the do method, you must also include ```p.resolve();``` within that method's function argument. This way this simple promise library can _then_ know when it's safe to execute the ```p.then(...)``` method. 


Provided that you have the source code to the promise library loaded into the browser, you should be able to copy and paste the above demo into the developer's console and see the results for yourself. You can also play aroudn with it if you like, feel free to toy with this library, it is a very simple, lightweight and basic implementation, I **_highly_** doubt it's among the best, but it gets the job done one way or another. 

The `alternative` way of using this tool is to just treat it like a function rather than a class, you don't need to use the keyword `new` with the alternative syntax, you can simply enter the required parameter(s) and away we go. 


## TypeScript Version 
The TypeScript version is slightly different, I thought there's no need for the `do` method, and 
generally it's cleaner and more readable, such is the nature of TypeScript. Generally the 
functionality is very much the same, it's just ever so slightly different in the native 
JavaScript of which it produces.
