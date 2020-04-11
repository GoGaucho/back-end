# Data Access Objects

## index

If you want to cache the result of a function, use the function exported by index.

For example, you want to call `dining.Hours('2020-01-11')`, but you want the result to be cached, just do the following things:
```js
const daos = require([path of daos/index.js]);

daos(`dining.Hours("2020-04-11")`)
  .then(res => {
    console.log(res);
  })
```
as writen, input the targeted function as a string, and **daos** will automatically check by hash the input function string, and decide to read from models or run it to get the new data.

> the input function string must:
> - Use " instead of '
> - Have a space after each comma
> - Have no extra space

If you want to adjust the expire time (by default it is 1 day), pass in another integer indicating the expiration in seconds.