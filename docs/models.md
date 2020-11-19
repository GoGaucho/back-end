# Models

## cache

> Store any kinds of cached information.
```js
{
  _id: "string", // function string
  timestamp: int, // time of creation
  life: int, // life
  beta: float, // decay factor
  data: Object // data
}
```

## professor

> Store the indexed professor by RMP
```js
{
  _id: "string", // id, same as on RMP
  name: "string" // Professor's name ("last, first")
}
```

## space

> Store space history data
```js
{
  _id: "string", // quarter + course id
  [enrollCode]: {
    [timestamp]: int // space value at the time
  }
}
```

## task

> operators for task
```js
{
  _id: "string", // function and parameters
  description: "string", // description
  interval: int, // operation interval in seconds, 0 for one time
  due: int // timestamp at which it should be done
}
```

## info

> Store any kinds of static information.
```js
{
  _id: "string", // key
  timestamp: int, // time of creation
  data: Object //data
}
```

Following are info conventions

### Quarter

Default quarter id for front-end

### CourseSpace[q]

```js
{
  "enrollCode": [space(int), max(int)]
}
```

### CourseHash

All hashes of the data of following course-related documents

### CourseInfo[q]

```js
{
  "courseId": ["title", "description", "college", "grading"(null), "level", restriction(Object|null), min_unit(int), max_unit(int), GE(["GECodes"])]
}
```

### CourseSections[q]

```js
{
  "courseId": {
    "enrollCode": [close(boolean), cancel(boolean), "section", final(["time", "comment"]), instructors(["instructor"]), periods(["days", "start", "end", "location"])]
  }
}
```

### CourseTree[q]

```js
{
  "courseId": {
    "session": {
      "lecture": ["section"]
    }
  }
}
```
