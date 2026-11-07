# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { upsertUser, createConsultationSession, addConsultationMessage, getUser, listUserSessions, getSessionMessages } from '@astronex/dataconnect';


// Operation UpsertUser:  For variables, look at type UpsertUserVars in ../index.d.ts
const { data } = await UpsertUser(dataConnect, upsertUserVars);

// Operation CreateConsultationSession:  For variables, look at type CreateConsultationSessionVars in ../index.d.ts
const { data } = await CreateConsultationSession(dataConnect, createConsultationSessionVars);

// Operation AddConsultationMessage:  For variables, look at type AddConsultationMessageVars in ../index.d.ts
const { data } = await AddConsultationMessage(dataConnect, addConsultationMessageVars);

// Operation GetUser:  For variables, look at type GetUserVars in ../index.d.ts
const { data } = await GetUser(dataConnect, getUserVars);

// Operation ListUserSessions:  For variables, look at type ListUserSessionsVars in ../index.d.ts
const { data } = await ListUserSessions(dataConnect, listUserSessionsVars);

// Operation GetSessionMessages:  For variables, look at type GetSessionMessagesVars in ../index.d.ts
const { data } = await GetSessionMessages(dataConnect, getSessionMessagesVars);


```