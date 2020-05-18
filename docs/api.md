# API Routers

Base: `/api`

## Info

- **GET** `/info/:key` get info by key

## Dining

- **GET** `/dining/hours` dining hours
- **GET** `/dining/menus/:dc` dining menus

## Waitz

- **GET** `/waitz` get waitz data

## Professor

- **GET** `/professor/:name` search professor by name

## Course

- **GET** `/course/:quarter?s=[search]` search course
- **GET** `/course/:quarter/:code` query course by courseId

## User
- **POST** `/user?code=[code]` Login
- **PUT** `/user/:random` Bind Account

## Student
- **GET** `/student/schedule` Student schedule
- **GET** `/student/registration` Student registration info