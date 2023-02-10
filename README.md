# About

This project is full crud operation on json fake server using [JQuery ajax](https://api.jquery.com/jquery.ajax/) and [JSON Server](https://github.com/typicode/json-server)

## Installation and usage

`npx json-server --watch Data/employees.json`
the data will be found at "http://localhost:3000/employees/"

`run live server at port: 5500`

## how Ajax requests used

`$.ajax({
    url: "" ,
    type: "DELETE | POST | PUT | GET",
    success: function (re) {
      console.log(re);
    },
    catch: function (Error) {
      console.log(Error);
    },
  });`
