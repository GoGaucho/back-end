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
        - response: a `List` of [RMP_RESPONSE](##rmp_response)

    - /api/sche/getQuarter
        - Description: This API returns a list of QUARTER_CODE and the suggested default quarter.
        - method: get
        - parameter: none
        - response: [QUARTER_LIST](##quarter_list)

    - /api/sche/getDeptList
        - Description: This API returns a list of department codes for a given quarter
        - method: get
        - parameter:
            - q: String, [QUARTER_CODE](##quarter_code)
        - response: a `List` of [DEPT_CODE](##dept_code)

    - /api/sche/getGEList
        - Description: This API returns the GE data for a given quarter
        - method: get
        - paramter:
            - q: String, [QUARTER_CODE](##quarter_code)
        - response: a `List` of [GE_COLL](##ge_coll)

    - /api/sche/getClassByDept
        - Description: This API returns a list of course ids for a given quarter and department
        - method: get
        - parameter:
            - q: String, [QUARTER_CODE](##quarter_code)
            - dept: String, [DEPT_CODE](##dept_code), url-encoded
        - response: a `List` of [COURSE_ID](##course_id)

    - /api/sche/getClassByID
        - Description: This API returns all data of the specified course in a given quarter
        - method: get
        - parameter:
            - q: String, [QUARTER_CODE](##quarter_code)
            - id: String, [COURSE_ID](##course_id), url-encoded
        - response: [UCSB.class](##ucsb.class)
        
    - /api/sche/getClassesByID
        - Description: convenience method to retrieve a large number of course data
        - method: post
        - parameter: 
            - q: String, [QUARTER_CODE](##quarter_code)
        - body: a `List` of [COURSE_ID](##course_id)
        - response: a `List` of [UCSB.class](##ucsb.class)

    - /api/sche/getClassHistByID
        - Description: convenience method to retrieve a class in all available quarters
        - method: get
        - parameter:
            - id: String, [COURSE_ID](##course_id), url-encoded
        - response: a `List` of [COURSE_HIST](##course_hist)

    - /api/sche/getHistories
        - Description: This API returns the enroll history of the given quarter of a given course
        - method: post
        - parameter:
            - q: String, [QUARTER_CODE](##quarter_code)
        - body: a `List` of [ENROLL_CODE](##enroll_code)
        - response: a `List` of `ENROLL_HISTORY`

    - /api/sche/searchClass
        - Description: This API implements the search feature
            - currently supports search for [COURSE_ID](##course_id), title, and description
        - method: get
        - parameter: 
            - q: String, [QUARTER_CODE](##quarter_code)
            - key: String, url-encoded
        - response: a `List` of [COURSE_ID](##course_id)

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
## RMP_RESPONSE
`RMP_RESPONSE`: Object
- `rate`: float, 1.0 ~ 5.0
- `diff`: float, 1.0 ~ 5.0
- `name`: String, no format
- `dept`: String, no format
- `rmpid`: int, for link generation only

## QUARTER_CODE
`QUARTER_CODE`: String
- in the formate of yyyyq
- q: 1 for winter, 2 for spring, 3 for summer, 4 for fall
- example: 20202 for 2020 Spring

## QUARTER_LIST
`QUARTER_LIST`: Object
- `qlist`: a `List` of [QUARTER_CODE](##quarter_code), a list of available quarters
- `default`: [QUARTER_CODE](##quarter_code), the recommended default quarter choice

## DEPT_CODE
`DEPT_CODE`: String
- 5 characters long
- includes 'A'-'Z' and '&', end fills with ' '
- note: when used as parameter:
    - url-encode '&' and ' '
    - or replace '&' with '-', replace ' ' with '_' or '+'

## GE_COLL
`GE_COLL`: Object
- `col`: String, [COLL_CODE](##coll_code)
- `codes`: a `List` of [GE_LIST](##ge_list)

## COLL_CODE
`COLL_CODE`: String
- 4 characters long
- includes 'A'-'Z' and '&', end fills with ' '

## GE_LIST
`GE_LIST`: Object
- `code`: String, [AREA_CODE](##area_code)
- `list`: a `List` of [COURSE_ID](##course_id)

## AREA_CODE
`AREA_CODE`: String
- 3 characters long
- includes 'A'-'Z', end fills with ' '

## COURSE_ID
`COURSE_ID`: String
- no fixed length
- includes 'A'-'Z', '-', and '&'
- note: it is the shortened version of `UCSB.courseid`
- note: when used as parameter, url-encode '&'

## UCSB.class
`UCSB.class`: Object
- see Model - Class in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)

## COURSE_HIST
`COURSE_HIST`: Object
- `q`: String, [QUARTER_CODE](##quarter_code)
- `data`: [UCSB.class](##ucsb.class)

## ENROLL_CODE
`ENROLL_CODE`: String
- 5 digit number contains only '0'-'9'

## ENROLL_HISTORY
`ENROLL_HISTORY`: Object
- `code`: String, [ENROLL_CODE](##enroll_code)
- `data`: a `List` of [ENROLL_HISTORY_ENTRY](##enroll_history_entry)

## ENROLL_HISTORY_ENTRY
`ENROLL_HISTORY_ENTRY`: Object
- `date`: int, the time of this entry, use `new Date(date*1000)` to get actual date
- `sp`: int, remaining space