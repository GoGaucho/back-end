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

## info

> Store any kinds of static information.
```js
{
  _id: "string", // key
  timestamp: int, // time of creation
  data: Object //data
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

## course

> course info
```js
{
  _id: "string", // id ("quarter-courseId")
  info: {
    title: "string", // title of the course
    description: "string", // description of the course
    college: "string", // code of college
    grading: "string"|null, // grading option
    level: "string", // level
    restriction: null,
    min_unit: int, // min unit
    max_unit: int, // max unit
    GE: ["string"] // GE codes ("collegeCode-GECode")
  },
  sections: {
    "string": { // enrollCode
      close: boolean, // if it is closed
      cancel: boolean, // if it is cancelled
      section: "string", // section code
      final: { // final info for lecture, currently all empty
        time: "string", // final time ("yyyy-mm-dd D. hh:mm - hh:mm")
        comment: "string" // comment of final
      },
      instructors: ["string"], // name of instructors
      periods: [{ // periods
        days: "string", // days
        begin: "string", // start time ("hh:mm")
        end: "string", // end time ("hh:mm")
        location: "string"|null // location ("building-room")
      }]
    }
  },
  tree: { // relationship of all sections
    "main": { // sessions, "main" for normal quarter
      "string": ["string"] // lecture enrollCode and section enrollCodes
    }
  }
}
```