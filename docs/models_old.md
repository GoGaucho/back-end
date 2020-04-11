# Database
currently there are 5 databases:
- [curriculum](#db_curriculum)
- [dining](#db_dining)
- [rmp](#db_rmp)
- [study](#db_study)
- [waitz](#db_waitz)

## DB_CURRICULUM
this data base includes two type of collections:
- [quarter](#c_quarter)
- [quarter-space](#c_quarter_space)

### C_QUARTER
this collection includes four types of document:
- [dept](#type_dept)
- [cids](#type_cids)
- [sche](#type_sche)
- [gedata](#type_gedata)
- [prof](#type_prof)

#### TYPE_DEPT
- `data`: a `List` of [DEPT_CODE](./api.md#dept_code)

#### TYPE_CIDS
- `dept`: [DEPT_CODE](./api.md#dept_code)
- `data`: a `List` of [MD5_PAIR](./api.md#md5_pair)

#### TYPE_SCHE
- `cids`: [COURSE_ID](./api.md#course_id)
- `data`: [UCSB.class](./api.md#ucsbclass)

#### TYPE_GEDATA
- `data`: a `List` of [GE_COLL](./api.md#ge_coll)

#### TYPE_PROF
- `data`: a `List` of [PROF_LIST](./api.md#prof_list)

### C_QUARTER_SPACE
- `date`: [INT_TIME](./api.md#int_time)
- `data`: a Map with base-64 [ENROLL_CODE](./api.md#enroll_code) as keys and space as values.

## DB_DINING

## DB_RMP

### C_RMPCACHE
- `prof`: [PROF_NAME](./api.md#prof_name)
- `data`: a `List` of [RMP_RESPONSE](./api.md#rmp_response)
- `date`: [INT_TIME](./api.md#int_time)

## DB_STUDY

## DB_WAITZs