# API

## List

### Mobile Support APIs
- /api/library_hours
- /api/studentSchedule
- /api/ios/studentSchedule
- /api/studentScheduleS
- /api/app_notice
- /api/dining/refresh
- /api/dining/time
- /api/dining
- /api/authCheck
- /api/authTest
- /api/studentRegistration
- /api/waitz
- /api/study/library

### Course and Schedule APIs

- /api/getQuarterInfo
    - Description: This API retrieves important dates of a quarter from UCSB API
    - method: get
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
    - response: a `List`, but containing only one element, of [UCSB.QuarterInfo](#ucsbquarterinfo)

- /api/rmp
    - Description: This API retrieves the ratings and links to the RateMyProfessor Website, searches for corresponding professor, and return the data for all matching results. 
    - method: get
    - parameter: 
        - prof: String, professor name, no format requirements, used for RMP search
    - response: a `List` of [RMP_RESPONSE](#rmp_response)

- /api/sche/getQuarter
    - Description: This API returns a list of QUARTER_CODE and the suggested default quarter.
    - method: get
    - parameter: none
    - response: [QUARTER_LIST](#quarter_list)

- /api/sche/getDeptList
    - Description: This API returns a list of department codes for a given quarter
    - method: get
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
    - response: a `List` of [DEPT_CODE](#dept_code)

- /api/sche/getGEList
    - Description: This API returns the GE data for a given quarter
    - method: get
    - paramter:
        - q: String, [QUARTER_CODE](#quarter_code)
    - response: a `List` of [GE_COLL](#ge_coll)

- /api/sche/getClassByDept
    - Description: This API returns a list of course ids for a given quarter and department
    - method: get
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
        - dept: String, [DEPT_CODE](#dept_code), url-encoded
    - response: a `List` of [COURSE_ID](#course_id)

- /api/sche/getClassByID
    - Description: This API returns all data of the specified course in a given quarter
    - method: get
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
        - id: String, [COURSE_ID](#course_id), url-encoded
    - response: [UCSB.class](#ucsbclass)
    
- /api/sche/getClassesByID
    - Description: convenience method to retrieve a large number of course data
    - method: post
    - parameter: 
        - q: String, [QUARTER_CODE](#quarter_code)
    - body: a `List` of [COURSE_ID](#course_id)
    - response: a `List` of [UCSB.class](#ucsbclass)

- /api/sche/getClassHistByID
    - Description: convenience method to retrieve a class in all available quarters
    - method: get
    - parameter:
        - id: String, [COURSE_ID](#course_id), url-encoded
    - response: a `List` of [COURSE_HIST](#course_hist)

- /api/sche/getHistories
    - Description: This API returns the enroll history of the given quarter of a given course
    - method: post
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
    - body: a `List` of [ENROLL_CODE](#enroll_code)
    - response: a `List` of [ENROLL_HISTORY](#enroll_history)

- /api/sche/searchClass
    - Description: This API implements the search feature
        - currently supports search for [COURSE_ID](#course_id), title, and description
    - method: get
    - parameter: 
        - q: String, [QUARTER_CODE](#quarter_code)
        - key: String, url-encoded
    - response: a `List` of [COURSE_ID](#course_id)

### unused APIs
- /api/sche/getProfList
    - Description: This API returns a list of professor names for given quarter
    - method: get
    - parameter: 
        - q: String, [QUARTER_CODE](#quarter_code)
    - response: a `List` of [PROF_LIST](#prof_list)

- /api/sche/getClassByProf
    - Description: This API retrieves all coursed taught by given professor
    - method: get
    - parameter:
        - prof: String, [PROF_NAME](#prof_name), url-encoded
    - response: a `List` of [PROF_TEACH](#prof_teach)

- /api/sche/getClassList
    - Description: For mobile, retrieves a list of all courses and corresponding MD5 hash
    - method: get
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
    - response: a `List` of [CLASS_LIST](#class_list)

- /api/sche/getAllData
    - Description: For mobile, retrieves a list of all course data
    - method: get
    - parameter:
        - q: String, [QUARTER_CODE](#quarter_code)
    - response: the entire [collection](./models.md#c_quarter)

- Unused Sche APIs
    - /api/sche/getSpaceByEnrollCode
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

## String Format Definitions

### QUARTER_CODE
`QUARTER_CODE`: String
- in the formate of yyyyq
- q: `1` for winter, `2` for spring, `3` for summer, `4` for fall
- example: `20202` for 2020 Spring

### DEPT_CODE
`DEPT_CODE`: String
- 5 characters long
- includes `A`-`Z` and `&`, end fills with ` `
- note: when used as parameter:
    - url-encode `&` and ` `
    - or replace `&` with `-`, replace ` ` with `_` or `+`

### COLL_CODE
`COLL_CODE`: String
- 4 characters long
- includes `A`-`Z` and `&`, end fills with ` `

### AREA_CODE
`AREA_CODE`: String
- 3 characters long
- includes `A`-`Z`, end fills with ` `

### COURSE_ID
`COURSE_ID`: String
- no fixed length
- includes `A`-`Z`, `-`, and `&`
- note: it is the shortened version of `UCSB.courseid`
- note: when used as parameter, url-encode `&`

### ENROLL_CODE
`ENROLL_CODE`: String
- 5 digit number

### SECTION_CODE
`SECTION_CODE`: String
- 4 digit number
- first two number represents lecture id
- last two number repreents section id
- example: `0100` means lecture 1, `0203` means lecture 2, section 3

### SESSION_CODE
`SESSION_CODE`: String
- 5 `0`, a char in `A` - `G` representing session, and a white space
- example: `00000C ` means session C

### PROF_NAME
`PROF_NAME`: String
- all upper case
- full last name, followed by first name initial and, optionally, middle name initial

## Object Format Definitions

### RMP_RESPONSE
`RMP_RESPONSE`: Object
- `rate`: float, 1.0 ~ 5.0
- `diff`: float, 1.0 ~ 5.0
- `name`: String, no format
- `dept`: String, no format
- `rmpid`: int, for link generation only

### QUARTER_LIST
`QUARTER_LIST`: Object
- `qlist`: a `List` of [QUARTER_CODE](#quarter_code), a list of available quarters
- `default`: [QUARTER_CODE](#quarter_code), the recommended default quarter choice

### GE_COLL
`GE_COLL`: Object
- `col`: String, [COLL_CODE](#coll_code)
- `codes`: a `List` of [GE_LIST](#ge_list)

### GE_LIST
`GE_LIST`: Object
- `code`: String, [AREA_CODE](#area_code)
- `list`: a `List` of [COURSE_ID](#course_id)

### COURSE_HIST
`COURSE_HIST`: Object
- `q`: String, [QUARTER_CODE](#quarter_code)
- `data`: [UCSB.class](#ucsbclass)

### ENROLL_HISTORY
`ENROLL_HISTORY`: Object
- `code`: String, [ENROLL_CODE](#enroll_code)
- `data`: a `List` of [ENROLL_HISTORY_ENTRY](#enroll_history_entry)

### ENROLL_HISTORY_ENTRY
`ENROLL_HISTORY_ENTRY`: Object
- `date`: int, the time of this entry, use `new Date(date*1000)` to get actual date
- `sp`: int, remaining space

### PROF_LIST
`PROF_LIST`: Object
- `dept`: [DEPT_CODE](#dept_code)
- `list`: a `List` of [PROF_NAME](#prof_name)

### PROF_TEACH
`PROF_TEACH`: Object
- `q`: [QUARTER_CODE](#quarter_code)
- `data`: a `List` of [COURSE_ID](#course_id)

## Mobile Specific Object Format Definitions

### CLASS_LIST
`CLASS_LIST`: Object
- `dept`: String, [DEPT_CODE](#dept_code)
- `cids`: a `List` of [MD5_PAIR](#md5_pair)

### MD5_PAIR
`MD5_PAIR`: Object
- `id`: String, [COURSE_ID](#course_id)
- `md5`: String, md5 hash



## String Format Definitions for Date and Time

### TIME
`TIME`: String
- In the format of `hh:mm`

### ISO.DateTime
`ISO.DateTime`: String
- In the format of `yyyy-mm-ddThh:mm:ss`

### UCSB.days
`UCSB.days`: String
- 7 characters long, MTWRFSS, missing days replaced with white space
- example: Tuesday and Thursday is ` T R   `, Monday, Wednesday, and Friday is `M W F  `

## UCSB API Models

### UCSB.QuarterInfo
`UCSB.QuarterInfo`: Object  
see Models - QuarterCalendar in [UCSB API](https://developer.ucsb.edu/content/academic-quarter-calendar)
- `quarter`: String, [QUARTER_CODE](#quarter_code)
- `qyy`: String, example: `S20`
- `name`: String, example: `SUMMER 2019`
- `category`: String, example: `SUMMER`
- `academicYear`: String, example: `2018-2019`
- `firstDayOfClasses`: [ISO.DateTime](#isodatetime)
- `lastDayOfClasses`: [ISO.DateTime](#isodatetime)
- `firstDayOfFinals`: [ISO.DateTime](#isodatetime)
- `lastDayOfFinals`: [ISO.DateTime](#isodatetime)
- `firstDayOfQuarter`: [ISO.DateTime](#isodatetime)
- `lastDayOfSchedule`: [ISO.DateTime](#isodatetime)
- `pass1Begin`: [ISO.DateTime](#isodatetime)
- `pass2Begin`: [ISO.DateTime](#isodatetime)
- `pass3Begin`: [ISO.DateTime](#isodatetime)
- `feeDeadline`: [ISO.DateTime](#isodatetime)
- `lastDayToAddUnderGrad`: [ISO.DateTime](#isodatetime)
- `lastDayToAddGrad`: [ISO.DateTime](#isodatetime)
- `lastDayThirdWeek`: nullable, [ISO.DateTime](#isodatetime)

### UCSB.class
`UCSB.class`: Object  
see Models - Class in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)  
Here are some important fields:
- `quarter`: String, [QUARTER_CODE](#quarter_code)
- `courseId`L String, full version of [COURSE_ID](#course_id) with additional spaces
- `title`: String
- `description`: String
- `college`: String, [COLL_CODE](#coll_code), but with no white space
- `unitsFixed`: float
- `unitsVariableHigh`: float
- `unitsVariableLow`: float
- `gradingOption`: String
- `deptCode`: String, [DEPT_CODE](#dept_code)
- `generalEducation`: a `List` of [UCSB.ge](#ucsbge)
- `classSections`: a `List` of [UCSB.section](ucsbsection)  
Other Fields:
- `contactHours`
- `objLevelCode`
- `subjectArea`
- `delayedSectioning`
- `inProgressCourse`
- `InstrcutionType`
- `onLineCourse`

### UCSB.ge
`UCSB.ge`: Object  
see Models - GeneralEducation in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)  
Here are some important fields:
- `geCode`: String, [AREA_CODE](#area_code)
- `geCollege`: String, [COLL_CODE](#coll_code)

### UCSB.section
`UCSB.section`: Object  
see Models - ClassSection in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)  
Here are some important fields:
- `enrollCode`: String, [ENROLL_CODE](#enroll_code)
- `section`: String, [SECTION_CODE](#section_code)
- `session`: String, null for non-summer courses, [SESSION_CODE](#session_code)
- `classClosed`: String, null or "Y"
- `classCancelled`: String, null or "C         " (9 white spaces)
- `enrolledTotal`: int
- `maxEnroll`: int
- `timeLocations`: a `List` of [UCSB.TimeLication](#ucsbtimelocation)
- `instructors`: a `List` of [UCSB.Instructor](#ucsbinstructor)  
Other Fields:
- `gradingOptionCode`
- `secondaryStatus`
- `departmentApprovalRequired`
- `instructorApprovalRequired`
- `restrictionLevel`
- `restrictionMajor`
- `restrictionMajorPass`
- `restrictionMinor`
- `restrictionMinorPass`
- `concurrentCourses`

### UCSB.TimeLocation
`UCSB.TimeLocation`: Object  
see Models - ClassTimeLocation in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)  
Note: all fields are nullable
- `room`: String
- `building`: String
- `roomCapacity`: int
- `days`: String, [UCSB.days](#ucsbdays)
- `beginTime`: String, [TIME](#time)
- `endTime`: String, String, [TIME](#time)

### UCSB.Instructor
`UCSB.Instructor`: Object  
see Models - ClassInstructor in [UCSB API](https://developer.ucsb.edu/content/academic-curriculums)
- `name`: [PROF_NAME](#prof_name)
- `functionalCode`: String