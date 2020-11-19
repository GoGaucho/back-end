# API Routers

Base: `/api`

## Info

- **GET** `/info/:key` get info by key
- **GET** `/info` get all info (`_id`, `timestamp`)
- **PUT** `/info/
:key` upsert info
- **DELETE** `/info/:key` Delete info

## Space

- **GET** `/space/:course` get space history

## Dining

- **GET** `/dining/hours` dining hours
- **GET** `/dining/menus/:dc` dining menus

## Waitz

- **GET** `/waitz` get waitz data

## Professor

- **GET** `/professor/:name` search professor by name

## Course

- **GET** `/course/:quarter?s=[search]` search course
- **GET** `/course/:quarter/:code` query course by courseId, or query a list of courseId separated by `,`

## User

- **GET** `/user` Get user info
- **POST** `/user?code=[code]` Login
- **PUT** `/user/:random` Bind Account

## Student

- **GET** `/student/schedule` Student schedule
- **GET** `/student/registration` Student registration info

## Task (admin)
- **GET** `/task/:key` get task by key
- **GET** `/task` get all task (`_id`, `description`)
- **PUT** `/task/
:key` upsert task
- **DELETE** `/task/:key` Delete task