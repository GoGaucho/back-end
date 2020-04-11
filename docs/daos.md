# Data Access Objects

## static

> this function should only be called inside the DAOS layer.

All static information is accessed by passing the following Query Object to info function:

```js
{
  source: "https://api.ucsb.edu", // data source
  router: "/dining/menu/v1/", // router of the data source
  querys: "", // query string
  expire: 0 // expiration of cache, 0 for no cache
}
```

the querys must be in the dictionary order of keys.

**static** function will automatically get, cache, and response information.