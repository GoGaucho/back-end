# Models

## cache

> Store any kinds of static information.

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