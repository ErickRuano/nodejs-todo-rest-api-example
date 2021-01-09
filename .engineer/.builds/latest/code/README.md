# nodejs-todo-rest-api-example API Documentation

- [FormSpace API REST API Documentation](#formspace-api-rest-api-documentation)
  * [Host](#host)
  * [Headers](#headers)
- [Models](#models)
  * [Organization](#organization)
    + [organization model](#organization-model)
  * [Session](#session)
    + [session model](#session-model)
  * [Organization](#organization)
    + [Organization model](#organization-model)
  * [User](#user)
    + [User model](#user-model)
      - [User parent models](#user-parent-models)
      - [User child models](#user-child-models)
  * [Task](#task)
    + [Task model](#task-model)
      - [Task parent models](#task-parent-models)
      - [Task child models](#task-child-models)
  * [TaskLog](#task_log)
    + [TaskLog model](#task_log-model)
      - [TaskLog parent models](#task_log-parent-models)
- [Predefined values](#predefined-values)
  * [LogAction enum](#logaction-enum)
  * [UserType enum](#usertype-enum)
- [Queries](#queries)
  * [Query string parameters](#query-string-parameters)
    + [Sorting](#prisma-sorting)
    + [Filtering](#prisma-filtering)
    + [selecting](#prisma-selecting)

## Host
> http://localhost:3000

## Headers
Header | Value | Description
------------ | ------------- | -------------
Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6MiwibmFtZSI6IkdhbGVubyJ9.M7aiCB-TY9-BzPkk0zN5jsXJMHbbqoXT-zjehyOtMuw |  JWT generated through this APIs authentication endpoint
Content-Type | application/json | Requests body must be JSON

# Models

## Organization
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/organization | Find many profile | Organization | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
POST | /api/organization | Create organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
PUT | /api/organization/:id | Edit organization | Organization | [Organization](#organization-model) or [Organization](#organization-model) or [[Organization](#organization-model)]
DELETE | /api/organization/:id | Delete organization | Organization | [Organization](#organization-model)

### organization model
```
model Organization {
  id    String    @default(uuid()) @id
  createdAt DateTime    @default(now()) 
  title String
  description String?
  logo String?
  user User[]
}
```

## Session
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/session | Find many profile | Session | N/A
GET | /api/session/:id | Find one profile | [[Session](#session-model)] | N/A
POST | /api/session | Create session | Session | [Session](#session-model) or [[Session](#session-model)]
PUT | /api/session/:id | Edit session | Session | [Session](#session-model) or [Session](#session-model) or [[Session](#session-model)]
DELETE | /api/session/:id | Delete session | Session | [Session](#session-model)

### session model
```
model Session {
  access_token          String
  createdAt             DateTime @default(now())
  device                String?
  device_info           String?
  id                    String   @id @default(uuid())
  id_token              String
  ip                    String?
  isAlive               Boolean
  refresh_token         String
  refresh_token_expires String?
  userId                String
  user                  User     @relation(fields: [userId], references: [id])
}
```

## Organization
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/organization | Find many organization | Organization | N/A
GET | /api/organizationCount | Count organization | [[Organization](#organization-model)] | N/A
GET | /api/organization/:id | Find one organization | [[Organization](#organization-model)] | N/A
POST | /api/organization | Create organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
PUT | /api/organization/:id | Update organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
DELETE | /api/organization/:id | Delete organization | Organization | [Organization](#organization-model)

### organization model
```
model Organization {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    name String   
    description String?   
    logo String?   
}
```



## User
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/user | Find many user | User | N/A
GET | /api/userCount | Count user | [[User](#user-model)] | N/A
GET | /api/user/:id | Find one user | [[User](#user-model)] | N/A
GET | /api/organization/:id/user | Find user through its parent organization | [[User](#user-model)] | N/A
POST | /api/user | Create user | User | [User](#user-model) or [[User](#user-model)]
PUT | /api/user/:id | Update user | User | [User](#user-model) or [[User](#user-model)]
DELETE | /api/user/:id | Delete user | User | [User](#user-model)

### user model
```
model User {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    authId String?   
    authData Json?   
    email String  @unique 
    name String   
    picture String?   
    type UserType   
    organizationId String?
    organization  Organization?  @relation(fields: [organizationId], references: [id])
    task Task[]
    session Session[]
}
```

#### user parent models

Models on which User depends on

- [Organization](#organization-model)

#### user child models

Models that depend on User

- [Task](#task-model)
- [Session](#session-model)


## Task
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/task | Find many task | Task | N/A
GET | /api/taskCount | Count task | [[Task](#task-model)] | N/A
GET | /api/task/:id | Find one task | [[Task](#task-model)] | N/A
GET | /api/user/:id/task | Find task through its parent user | [[Task](#task-model)] | N/A
POST | /api/task | Create task | Task | [Task](#task-model) or [[Task](#task-model)]
PUT | /api/task/:id | Update task | Task | [Task](#task-model) or [[Task](#task-model)]
DELETE | /api/task/:id | Delete task | Task | [Task](#task-model)

### task model
```
model Task {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    deletedAt DateTime?
    isArchived Boolean @default(false)
    title String   
    description String?   
    body Json?   
    userId String?
    user  User?  @relation(fields: [userId], references: [id])
    task_log TaskLog[]
}
```

#### task parent models

Models on which Task depends on

- [User](#user-model)

#### task child models

Models that depend on Task

- [TaskLog](#task_log-model)


## TaskLog
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/task_log | Find many task_log | TaskLog | N/A
GET | /api/task_logCount | Count task_log | [[TaskLog](#task_log-model)] | N/A
GET | /api/task_log/:id | Find one task_log | [[TaskLog](#task_log-model)] | N/A
GET | /api/task/:id/task_log | Find task_log through its parent task | [[TaskLog](#task_log-model)] | N/A
GET | /api/user/:id/task_log | Find task_log through its parent user | [[TaskLog](#task_log-model)] | N/A
POST | /api/task_log | Create task_log | TaskLog | [TaskLog](#task_log-model) or [[TaskLog](#task_log-model)]
PUT | /api/task_log/:id | Update task_log | TaskLog | [TaskLog](#task_log-model) or [[TaskLog](#task_log-model)]
DELETE | /api/task_log/:id | Delete task_log | TaskLog | [TaskLog](#task_log-model)

### task_log model
```
model TaskLog {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    action LogAction   
    record Json   
    taskId String
    task  Task  @relation(fields: [taskId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### task_log parent models

Models on which TaskLog depends on

- [Task](#task-model)
- [User](#user-model)



# Predefined values


## LogAction enum

- OPEN
- DELETE
- UPDATE
- CREATE

## UserType enum

- ADMIN
- USER

# Queries

This API implements [qs](https://github.com/ljharb/qs) on a middleware to parse query string parameters.  You can use [qs.Stringify](https://github.com/ljharb/qs#stringifying) on your frontend to encode your queries as strings (already implemented in API Client).  Since this project implements [Prisma.io](https://prisma.io) as client to access DB, please refer to the following docs:

## Prisma sorting

- [Prisma sorting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/sorting)

## Prisma filtering

- [Prisma filtering reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering)

## Prisma selecting

- [Prisma selecting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection)