# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `astronex-connector`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUserSessions*](#listusersessions)
  - [*GetSessionMessages*](#getsessionmessages)
- [**Mutations**](#mutations)
  - [*UpsertUser*](#upsertuser)
  - [*CreateConsultationSession*](#createconsultationsession)
  - [*AddConsultationMessage*](#addconsultationmessage)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `astronex-connector`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@astronex/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@astronex/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@astronex/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `astronex-connector` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface GetUserRef {
  ...
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query requires an argument of type `GetUserVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserVariables {
  id: string;
}
```
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    id: string;
    email: string;
    name: string;
    phone?: string | null;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude?: number | null;
    longitude?: number | null;
    timezone?: string | null;
    gender?: string | null;
    astrologySystem: string;
    houseSystem: string;
    zodiacSystem: string;
    planTier: string;
    isPremium: boolean;
    avatarUrl?: string | null;
    createdAt: TimestampString;
    lastLoginAt: TimestampString;
  } & User_Key;
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser, GetUserVariables } from '@astronex/dataconnect';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser(getUserVars);
// Variables can be defined inline as well.
const { data } = await getUser({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect, getUserVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser(getUserVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef, GetUserVariables } from '@astronex/dataconnect';

// The `GetUser` query requires an argument of type `GetUserVariables`:
const getUserVars: GetUserVariables = {
  id: ..., 
};

// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef(getUserVars);
// Variables can be defined inline as well.
const ref = getUserRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect, getUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUserSessions
You can execute the `ListUserSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
listUserSessions(vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;

interface ListUserSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
}
export const listUserSessionsRef: ListUserSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserSessions(dc: DataConnect, vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;

interface ListUserSessionsRef {
  ...
  (dc: DataConnect, vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
}
export const listUserSessionsRef: ListUserSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserSessionsRef:
```typescript
const name = listUserSessionsRef.operationName;
console.log(name);
```

### Variables
The `ListUserSessions` query requires an argument of type `ListUserSessionsVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUserSessionsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `ListUserSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserSessionsData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserSessionsData {
  consultationSessions: ({
    id: UUIDString;
    specialistId: string;
    specialistName: string;
    startedAt: TimestampString;
    updatedAt: TimestampString;
  } & ConsultationSession_Key)[];
}
```
### Using `ListUserSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserSessions, ListUserSessionsVariables } from '@astronex/dataconnect';

// The `ListUserSessions` query requires an argument of type `ListUserSessionsVariables`:
const listUserSessionsVars: ListUserSessionsVariables = {
  userId: ..., 
};

// Call the `listUserSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserSessions(listUserSessionsVars);
// Variables can be defined inline as well.
const { data } = await listUserSessions({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserSessions(dataConnect, listUserSessionsVars);

console.log(data.consultationSessions);

// Or, you can use the `Promise` API.
listUserSessions(listUserSessionsVars).then((response) => {
  const data = response.data;
  console.log(data.consultationSessions);
});
```

### Using `ListUserSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserSessionsRef, ListUserSessionsVariables } from '@astronex/dataconnect';

// The `ListUserSessions` query requires an argument of type `ListUserSessionsVariables`:
const listUserSessionsVars: ListUserSessionsVariables = {
  userId: ..., 
};

// Call the `listUserSessionsRef()` function to get a reference to the query.
const ref = listUserSessionsRef(listUserSessionsVars);
// Variables can be defined inline as well.
const ref = listUserSessionsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserSessionsRef(dataConnect, listUserSessionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.consultationSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.consultationSessions);
});
```

## GetSessionMessages
You can execute the `GetSessionMessages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
getSessionMessages(vars: GetSessionMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<GetSessionMessagesData, GetSessionMessagesVariables>;

interface GetSessionMessagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSessionMessagesVariables): QueryRef<GetSessionMessagesData, GetSessionMessagesVariables>;
}
export const getSessionMessagesRef: GetSessionMessagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSessionMessages(dc: DataConnect, vars: GetSessionMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<GetSessionMessagesData, GetSessionMessagesVariables>;

interface GetSessionMessagesRef {
  ...
  (dc: DataConnect, vars: GetSessionMessagesVariables): QueryRef<GetSessionMessagesData, GetSessionMessagesVariables>;
}
export const getSessionMessagesRef: GetSessionMessagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSessionMessagesRef:
```typescript
const name = getSessionMessagesRef.operationName;
console.log(name);
```

### Variables
The `GetSessionMessages` query requires an argument of type `GetSessionMessagesVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSessionMessagesVariables {
  sessionId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSessionMessages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSessionMessagesData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetSessionMessagesData {
  consultationMessages: ({
    id: UUIDString;
    role: string;
    content: string;
    thinking?: string | null;
    groundingQuery?: string | null;
    createdAt: TimestampString;
  } & ConsultationMessage_Key)[];
}
```
### Using `GetSessionMessages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSessionMessages, GetSessionMessagesVariables } from '@astronex/dataconnect';

// The `GetSessionMessages` query requires an argument of type `GetSessionMessagesVariables`:
const getSessionMessagesVars: GetSessionMessagesVariables = {
  sessionId: ..., 
};

// Call the `getSessionMessages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSessionMessages(getSessionMessagesVars);
// Variables can be defined inline as well.
const { data } = await getSessionMessages({ sessionId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSessionMessages(dataConnect, getSessionMessagesVars);

console.log(data.consultationMessages);

// Or, you can use the `Promise` API.
getSessionMessages(getSessionMessagesVars).then((response) => {
  const data = response.data;
  console.log(data.consultationMessages);
});
```

### Using `GetSessionMessages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSessionMessagesRef, GetSessionMessagesVariables } from '@astronex/dataconnect';

// The `GetSessionMessages` query requires an argument of type `GetSessionMessagesVariables`:
const getSessionMessagesVars: GetSessionMessagesVariables = {
  sessionId: ..., 
};

// Call the `getSessionMessagesRef()` function to get a reference to the query.
const ref = getSessionMessagesRef(getSessionMessagesVars);
// Variables can be defined inline as well.
const ref = getSessionMessagesRef({ sessionId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSessionMessagesRef(dataConnect, getSessionMessagesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.consultationMessages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.consultationMessages);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `astronex-connector` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertUser
You can execute the `UpsertUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpsertUserRef {
  ...
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
}
export const upsertUserRef: UpsertUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertUserRef:
```typescript
const name = upsertUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertUserVariables {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  latitude?: number | null;
  longitude?: number | null;
  timezone?: string | null;
  gender?: string | null;
  astrologySystem?: string | null;
  houseSystem?: string | null;
  zodiacSystem?: string | null;
  planTier?: string | null;
  isPremium?: boolean | null;
  avatarUrl?: string | null;
}
```
### Return Type
Recall that executing the `UpsertUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertUserData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertUser, UpsertUserVariables } from '@astronex/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  id: ..., 
  email: ..., 
  name: ..., 
  phone: ..., // optional
  birthDate: ..., 
  birthTime: ..., 
  birthPlace: ..., 
  latitude: ..., // optional
  longitude: ..., // optional
  timezone: ..., // optional
  gender: ..., // optional
  astrologySystem: ..., // optional
  houseSystem: ..., // optional
  zodiacSystem: ..., // optional
  planTier: ..., // optional
  isPremium: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `upsertUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertUser(upsertUserVars);
// Variables can be defined inline as well.
const { data } = await upsertUser({ id: ..., email: ..., name: ..., phone: ..., birthDate: ..., birthTime: ..., birthPlace: ..., latitude: ..., longitude: ..., timezone: ..., gender: ..., astrologySystem: ..., houseSystem: ..., zodiacSystem: ..., planTier: ..., isPremium: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertUser(dataConnect, upsertUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertUser(upsertUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertUserRef, UpsertUserVariables } from '@astronex/dataconnect';

// The `UpsertUser` mutation requires an argument of type `UpsertUserVariables`:
const upsertUserVars: UpsertUserVariables = {
  id: ..., 
  email: ..., 
  name: ..., 
  phone: ..., // optional
  birthDate: ..., 
  birthTime: ..., 
  birthPlace: ..., 
  latitude: ..., // optional
  longitude: ..., // optional
  timezone: ..., // optional
  gender: ..., // optional
  astrologySystem: ..., // optional
  houseSystem: ..., // optional
  zodiacSystem: ..., // optional
  planTier: ..., // optional
  isPremium: ..., // optional
  avatarUrl: ..., // optional
};

// Call the `upsertUserRef()` function to get a reference to the mutation.
const ref = upsertUserRef(upsertUserVars);
// Variables can be defined inline as well.
const ref = upsertUserRef({ id: ..., email: ..., name: ..., phone: ..., birthDate: ..., birthTime: ..., birthPlace: ..., latitude: ..., longitude: ..., timezone: ..., gender: ..., astrologySystem: ..., houseSystem: ..., zodiacSystem: ..., planTier: ..., isPremium: ..., avatarUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertUserRef(dataConnect, upsertUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateConsultationSession
You can execute the `CreateConsultationSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
createConsultationSession(vars: CreateConsultationSessionVariables): MutationPromise<CreateConsultationSessionData, CreateConsultationSessionVariables>;

interface CreateConsultationSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConsultationSessionVariables): MutationRef<CreateConsultationSessionData, CreateConsultationSessionVariables>;
}
export const createConsultationSessionRef: CreateConsultationSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createConsultationSession(dc: DataConnect, vars: CreateConsultationSessionVariables): MutationPromise<CreateConsultationSessionData, CreateConsultationSessionVariables>;

interface CreateConsultationSessionRef {
  ...
  (dc: DataConnect, vars: CreateConsultationSessionVariables): MutationRef<CreateConsultationSessionData, CreateConsultationSessionVariables>;
}
export const createConsultationSessionRef: CreateConsultationSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createConsultationSessionRef:
```typescript
const name = createConsultationSessionRef.operationName;
console.log(name);
```

### Variables
The `CreateConsultationSession` mutation requires an argument of type `CreateConsultationSessionVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateConsultationSessionVariables {
  userId: string;
  specialistId: string;
  specialistName: string;
}
```
### Return Type
Recall that executing the `CreateConsultationSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateConsultationSessionData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateConsultationSessionData {
  consultationSession_insert: ConsultationSession_Key;
}
```
### Using `CreateConsultationSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createConsultationSession, CreateConsultationSessionVariables } from '@astronex/dataconnect';

// The `CreateConsultationSession` mutation requires an argument of type `CreateConsultationSessionVariables`:
const createConsultationSessionVars: CreateConsultationSessionVariables = {
  userId: ..., 
  specialistId: ..., 
  specialistName: ..., 
};

// Call the `createConsultationSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createConsultationSession(createConsultationSessionVars);
// Variables can be defined inline as well.
const { data } = await createConsultationSession({ userId: ..., specialistId: ..., specialistName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createConsultationSession(dataConnect, createConsultationSessionVars);

console.log(data.consultationSession_insert);

// Or, you can use the `Promise` API.
createConsultationSession(createConsultationSessionVars).then((response) => {
  const data = response.data;
  console.log(data.consultationSession_insert);
});
```

### Using `CreateConsultationSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createConsultationSessionRef, CreateConsultationSessionVariables } from '@astronex/dataconnect';

// The `CreateConsultationSession` mutation requires an argument of type `CreateConsultationSessionVariables`:
const createConsultationSessionVars: CreateConsultationSessionVariables = {
  userId: ..., 
  specialistId: ..., 
  specialistName: ..., 
};

// Call the `createConsultationSessionRef()` function to get a reference to the mutation.
const ref = createConsultationSessionRef(createConsultationSessionVars);
// Variables can be defined inline as well.
const ref = createConsultationSessionRef({ userId: ..., specialistId: ..., specialistName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createConsultationSessionRef(dataConnect, createConsultationSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.consultationSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.consultationSession_insert);
});
```

## AddConsultationMessage
You can execute the `AddConsultationMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-sdk/index.d.ts](./index.d.ts):
```typescript
addConsultationMessage(vars: AddConsultationMessageVariables): MutationPromise<AddConsultationMessageData, AddConsultationMessageVariables>;

interface AddConsultationMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddConsultationMessageVariables): MutationRef<AddConsultationMessageData, AddConsultationMessageVariables>;
}
export const addConsultationMessageRef: AddConsultationMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addConsultationMessage(dc: DataConnect, vars: AddConsultationMessageVariables): MutationPromise<AddConsultationMessageData, AddConsultationMessageVariables>;

interface AddConsultationMessageRef {
  ...
  (dc: DataConnect, vars: AddConsultationMessageVariables): MutationRef<AddConsultationMessageData, AddConsultationMessageVariables>;
}
export const addConsultationMessageRef: AddConsultationMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addConsultationMessageRef:
```typescript
const name = addConsultationMessageRef.operationName;
console.log(name);
```

### Variables
The `AddConsultationMessage` mutation requires an argument of type `AddConsultationMessageVariables`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddConsultationMessageVariables {
  sessionId: UUIDString;
  role: string;
  content: string;
  thinking?: string | null;
  groundingQuery?: string | null;
}
```
### Return Type
Recall that executing the `AddConsultationMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddConsultationMessageData`, which is defined in [dataconnect-sdk/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddConsultationMessageData {
  consultationMessage_insert: ConsultationMessage_Key;
}
```
### Using `AddConsultationMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addConsultationMessage, AddConsultationMessageVariables } from '@astronex/dataconnect';

// The `AddConsultationMessage` mutation requires an argument of type `AddConsultationMessageVariables`:
const addConsultationMessageVars: AddConsultationMessageVariables = {
  sessionId: ..., 
  role: ..., 
  content: ..., 
  thinking: ..., // optional
  groundingQuery: ..., // optional
};

// Call the `addConsultationMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addConsultationMessage(addConsultationMessageVars);
// Variables can be defined inline as well.
const { data } = await addConsultationMessage({ sessionId: ..., role: ..., content: ..., thinking: ..., groundingQuery: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addConsultationMessage(dataConnect, addConsultationMessageVars);

console.log(data.consultationMessage_insert);

// Or, you can use the `Promise` API.
addConsultationMessage(addConsultationMessageVars).then((response) => {
  const data = response.data;
  console.log(data.consultationMessage_insert);
});
```

### Using `AddConsultationMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addConsultationMessageRef, AddConsultationMessageVariables } from '@astronex/dataconnect';

// The `AddConsultationMessage` mutation requires an argument of type `AddConsultationMessageVariables`:
const addConsultationMessageVars: AddConsultationMessageVariables = {
  sessionId: ..., 
  role: ..., 
  content: ..., 
  thinking: ..., // optional
  groundingQuery: ..., // optional
};

// Call the `addConsultationMessageRef()` function to get a reference to the mutation.
const ref = addConsultationMessageRef(addConsultationMessageVars);
// Variables can be defined inline as well.
const ref = addConsultationMessageRef({ sessionId: ..., role: ..., content: ..., thinking: ..., groundingQuery: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addConsultationMessageRef(dataConnect, addConsultationMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.consultationMessage_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.consultationMessage_insert);
});
```

