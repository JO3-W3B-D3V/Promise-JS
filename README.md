# Promise-js
This is just an example project of how you can implement promises within JavaScript, especially on the client's machine. 

### How To Use This Promise Library?
To create a promise, you simply run the following code: 

```javascript
var p = new Promise();
```

To make use of the promise, you can now run the following code like so:

```javascript
p.do(function () {
  console.log("START OF DEMO");
  setTimeout(function () {
    console.log("Do method.");
    p.resolve();
  }, 500);
}).then(function () {
  console.log("Then method has run.");
  p.resolve();
}).then(function () {
  console.log("Another then method... Now throw an error");
  p.resolve();
  console.log(abc);
}).catch(function (e) {
  console.log("Catching...");
  console.log(e);
  p.resolve();
}).then(function () {
  setTimeout(function () {
    console.log("Last then method.");
    p.resolve();
  }, 500);
}).then(function () {
  console.log("END OF DEMO");
  console.log(p);
  p.resolve();
  p = null;
  console.log(p);
});

// Or if you're more into ES6, you could try this style

Promise((resolve) => {
  console.log("Set time out started.");
  setTimeout(() => {
    console.log("Time out ended");
    resolve();
  }, 500);
}).then((resolve) => {
  console.log("Then started");
  resolve();
}).then((resolve) => {
  console.log("Finale!");
  resolve();
});

```

The ```promise.do(...)``` method will be the first method to run, without this method in place then nothign will happen, but provided that you have included the do method, you must also include ```p.resolve();``` within that method's function argument. This way this simple promise library can _then_ know when it's safe to execute the ```p.then(...)``` method. 


Provided that you have the source code to the promise library loaded into the browser, you should be able to copy and paste the above demo into the developer's console and see the results for yourself. You can also play aroudn with it if you like, feel free to toy with this library, it is a very simple, lightweight and basic implementation, I **_highly_** doubt it's among the best, but it gets the job done one way or another. 

The `alternative` way of using this tool is to just treat it like a function rather than a class, you don't need to use the keyword `new` with the alternative syntax, you can simply enter the required parameter(s) and away we go. 
