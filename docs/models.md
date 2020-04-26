# Models

## cache

> Store any kinds of cached information.

| key      | type   | description             |
| -------- | ------ | ----------------------- |
| `_id`    | string | function string         |
| `expire` | int    | timestamp at expiration |
| `data`   | Object | data                    |

## archive

> Store any kinds of archive information, mainly for analysis usage.

| key         | type   | description                          |
| ----------- | ------ | ------------------------------------ |
| `_id`       | string | a label                              |
| `type`      | string | indicate the type of the information |
| `timestamp` | int    | timestamp at creation                |
| `data`      | Object | data                                 |

## info

> Store any kinds of static information.

| key         | type   | description           |
| ----------- | ------ | --------------------- |
| `_id`       | string | key                   |
| `timestamp` | int    | timestamp at creation |
| `data`      | Object | data                  |

## professor

> Store the indexed professor by RMP

| key    | type   | description                      |
| ------ | ------ | -------------------------------- |
| `_id`  | string | id, same as on RMP               |
| `name` | string | Professor's name (`last, first`) |

## course

> Course Information

| key           | type   | description                           |
| ------------- | ------ | ------------------------------------- |
| `_id`         | string | courseId (all Uppercase and no space) |
| `title`       | string | title of the course                   |
| `description` | string | description of the course             |
| `college`     | string | college of the course                 |
| `grading`     | string | grading option of the course          |
| `level`       | string | level of the course                   |
| `min_unit`    | int    | mininum unit                          |
| `max_unit`    | int    | maximun unit                          |
| `GE`          | Array  | GE code (`CollegeCode-GECode`)        |

## section

> classSection Information

| key           | type    | description                                |
| ------------- | ------- | ------------------------------------------ |
| `_id`         | string  | last two digits of quarter plus enrollCode |
| `lecture`     | boolean | whether it is a lecture                    |
| `course`      | string  | courseId of the section                    |
| `session`     | Object  | session information of the section         |
| `disabled`    | boolean | whether it is disabled                     |
| `max`         | int     | Capacity of enroll                         |
| `space`       | int     | Current space                              |
| `instructors` | Array   | information of instructors                 |
| `periods`     | Array   | information of time & locations            |
| `sections`    | Array   | id of sections, when `lecture = true`      |

## task

> operators for task

| key           | type   | description                                   |
| ------------- | ------ | --------------------------------------------- |
| `_id`         | string | unique id for task                            |
| `description` | string | description                                   |
| `interval`    | int    | operation interval in seconds, 0 for one time |
| `due`         | int    | timestamp at which it should be done          |
| `func`        | string | operator function                             |
| `para`        | Object | parameters that passed into the function      |