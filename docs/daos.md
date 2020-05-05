# Data Access Objects

## index

If you want to cache the result of a function, use the function exported by index.

For example, you want to call `dining.Hours('2020-01-11')`, but you want the result to be cached, just do the following things:
```js
const daos = require([path of daos/index.js]);

daos("dining.Hours", "2020-04-11")
  .then(res => {
    console.log(res);
  })
```
as writen, input the targeted function and parameters, and **daos** will automatically check the input function and parameters, and decide to read from models or run it to get the new data.

Function in **daos** layer must return an Object
```js
{
  data: data,
  life: life, // the life of the cache
  beta: beta  // decay factor, 0 for not caching
}
```

## Functions

- `dining.Hours(date)` Dining Hours of a particular day
- `dining.Menus(dc, date)` Dining Menus of a Dining Common on a particular day
- `professor.RMP(id)` RateMyProfessor data for a given professor
- `waitz.Waitz()` current waitz data
- `course.Course(q, code)` get course data

