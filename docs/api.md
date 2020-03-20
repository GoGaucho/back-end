# API

## List

- Mobile Support APIs
    - /api/library_hours
    - /api/studentSchedule
    - /api/ios/studentSchedule
    - /api/studentScheduleS
    - /api/getQuarterInfo
    - /api/app_notice
    - /api/dining/refresh
    - /api/dining/time
    - /api/dining
    - /api/authCheck
    - /api/authTest
    - /api/studentRegistration
    - /api/waitz
    - /api/study/library

- GGG APIs
    - /api/rmp
        - Description: This API retrieves the ratings and links to the RateMyProfessor Website, searches for corresponding professor, and return the data for all matching results. 
        - method: get
        - parameter: 
            - prof: String, professor name, no format requirements, used for RMP search
        - response: a `List` of `RMP_RESPONSE`

    - /api/sche/getQuarter
        - Description: This API returns a list of QUARTER_CODE and the suggested default quarter.
        - method: get
        - parameter: none
        - response: `QUARTER_LIST`

    - /api/sche/getDeptList
        - Description: This API returns a list of department codes for a given quarter
        - method: get
        - parameter:
            - q: String, `QUARTER_CODE`
        - response: a `List` of `DEPT_CODE`

    - /api/sche/getGEList
        - Description: This API returns the GE data for a given quarter
        - method: get
        - paramter:
            - q: String, `QUARTER_CODE`
        - response: a `List` of `GE_COLL`

    - /api/sche/getClassByDept
        - Description: This API returns a list of course ids for a given quarter and department
        - method: get
        - parameter:
            - q: String, `QUARTER_CODE`
            - dept: String, `DEPT_CODE`, url-encoded
        - response: a `List` of `COURSE_ID`

    - /api/sche/getClassByID
        - Description: This API returns all data of the specified course in a given quarter
        - method: get
        - parameter:
            - q: String, `QUARTER_CODE`
            - id: String, `COURSE_ID`, url-encoded
        - response: `UCSB.class`
        
    - /api/sche/getClassesByID
        - Description: convenience method to retrieve a large number of course data
        - method: post
        - parameter: 
            - q: String, `QUARTER_CODE`
        - body: a `List` of `COURSE_ID`
        - response: a `List` of `UCSB.class`

    - /api/sche/getClassHistByID
        - Description: convenience method to retrieve a class in all available quarters
        - method: get
        - parameter:
            - id: String, `COURSE_ID`, url-encoded
        - response: a `List` of `COURSE_HIST`

    - /api/sche/getHistories
        - Description: This API returns the enroll history of the given quarter of a given course
        - method: post
        - parameter:
            - q: String, `QUARTER_CODE`
        - body: a `List` of `ENROLL_CODE`
        - response: a `List` of `ENROLL_HISTORY`

    - /api/sche/searchClass
        - Description: This API implements the search feature
            - currently supports search for `COURSE_ID`, title, and description
        - method: get
        - parameter: 
            - q: String, `QUARTER_CODE`
            - key: String, url-encoded
        - response: a `List` of `COURSE_ID`
        
- Unused Sche APIs
    - /api/sche/getProfList
    - /api/sche/getClassByProf
    - /api/sche/getSpaceByEnrollCode
    - /api/sche/getClassList
    - /api/sche/getAllData
    - /api/sche/getNewClassByID
    - /api/sche/getHistory
- Internal Debug APIs
    - /api/sche/refreshSche
    - /api/sche/getCSV
    - /api/sche/test
- Abandoned APIs
    - /api/sche/expScheCalc
    - /api/sche/getSchedule
    - /api/sche/impScheCalc
- Other Unused APIs
    - Dining Cameras: 3 APIs
    - Dining Dish Vote: 5 APIs
    - Old GGG: 8 APIs


# Models
- `RMP_RESPONSE`: Object
    - `rate`: float, 1.0 ~ 5.0
    - `diff`: float, 1.0 ~ 5.0
    - `name`: String, no format
    - `dept`: String, no format
    - `rmpid`: int, for link generation only

- `QUARTER_CODE`: String
    - in the formate of yyyyq
    - q: 1 for winter, 2 for spring, 3 for summer, 4 for fall
    - example: 20202 for 2020 Spring

- `QUARTER_LIST`: Object
    - `qlist`: a `List` of `QUARTER_CODE`, a list of available quarters
    - `default`: `QUARTER_CODE`, the recommended default quarter choice

- `DEPT_CODE`: String
    - 5 characters long
    - includes 'A'-'Z' and '&', end fills with ' '
    - note: when used as parameter:
        - url-encode '&' and ' '
        - or replace '&' with '-', replace ' ' with '_' or '+'

- `GE_COLL`: Object
    - `col`: String, `COLL_CODE`
    - `codes`: a `List` of `GE_LIST`

- `COLL_CODE`: String
    - 4 characters long
    - includes 'A'-'Z' and '&', end fills with ' '

- `GE_LIST`: Object
    - `code`: String, `AREA_CODE`
    - `list`: a `List` of `COURSE_ID`

- `AREA_CODE`: String
    - 3 characters long
    - includes 'A'-'Z', end fills with ' '

- `COURSE_ID`: String
    - no fixed length
    - includes 'A'-'Z', '-', and '&'
    - note: it is the shortened version of `UCSB.courseid`
    - note: when used as parameter, url-encode '&'

- `UCSB.class`: Object
    - see Model - Class in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)

- `COURSE_HIST`: Object
    - `q`: String, `QUARTER_CODE`
    - `data`: `UCSB.class`

- `ENROLL_CODE`: String
    - 5 digit number contains only '0'-'9'

- `ENROLL_HISTORY`: Object
    - `code`: String, `ENROLL_CODE`
    - `data`: a `List` of `ENROLL_HISTORY_ENTRY`

- `ENROLL_HISTORY_ENTRY`: Object
    - `date`: int, the time of this entry, use `new Date(date*1000)` to get actual date
    - `sp`: int, remaining space