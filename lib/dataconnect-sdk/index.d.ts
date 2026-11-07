import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddConsultationMessageData {
  consultationMessage_insert: ConsultationMessage_Key;
}

export interface AddConsultationMessageVariables {
  sessionId: UUIDString;
  role: string;
  content: string;
  thinking?: string | null;
  groundingQuery?: string | null;
}

export interface ConsultationMessage_Key {
  id: UUIDString;
  __typename?: 'ConsultationMessage_Key';
}

export interface ConsultationSession_Key {
  id: UUIDString;
  __typename?: 'ConsultationSession_Key';
}

export interface CreateConsultationSessionData {
  consultationSession_insert: ConsultationSession_Key;
}

export interface CreateConsultationSessionVariables {
  userId: string;
  specialistId: string;
  specialistName: string;
}

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

export interface GetSessionMessagesVariables {
  sessionId: UUIDString;
}

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

export interface GetUserVariables {
  id: string;
}

export interface ListUserSessionsData {
  consultationSessions: ({
    id: UUIDString;
    specialistId: string;
    specialistName: string;
    startedAt: TimestampString;
    updatedAt: TimestampString;
  } & ConsultationSession_Key)[];
}

export interface ListUserSessionsVariables {
  userId: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

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

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface CreateConsultationSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConsultationSessionVariables): MutationRef<CreateConsultationSessionData, CreateConsultationSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateConsultationSessionVariables): MutationRef<CreateConsultationSessionData, CreateConsultationSessionVariables>;
  operationName: string;
}
export const createConsultationSessionRef: CreateConsultationSessionRef;

export function createConsultationSession(vars: CreateConsultationSessionVariables): MutationPromise<CreateConsultationSessionData, CreateConsultationSessionVariables>;
export function createConsultationSession(dc: DataConnect, vars: CreateConsultationSessionVariables): MutationPromise<CreateConsultationSessionData, CreateConsultationSessionVariables>;

interface AddConsultationMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddConsultationMessageVariables): MutationRef<AddConsultationMessageData, AddConsultationMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddConsultationMessageVariables): MutationRef<AddConsultationMessageData, AddConsultationMessageVariables>;
  operationName: string;
}
export const addConsultationMessageRef: AddConsultationMessageRef;

export function addConsultationMessage(vars: AddConsultationMessageVariables): MutationPromise<AddConsultationMessageData, AddConsultationMessageVariables>;
export function addConsultationMessage(dc: DataConnect, vars: AddConsultationMessageVariables): MutationPromise<AddConsultationMessageData, AddConsultationMessageVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserVariables): QueryRef<GetUserData, GetUserVariables>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;
export function getUser(dc: DataConnect, vars: GetUserVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserData, GetUserVariables>;

interface ListUserSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUserSessionsVariables): QueryRef<ListUserSessionsData, ListUserSessionsVariables>;
  operationName: string;
}
export const listUserSessionsRef: ListUserSessionsRef;

export function listUserSessions(vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;
export function listUserSessions(dc: DataConnect, vars: ListUserSessionsVariables, options?: ExecuteQueryOptions): QueryPromise<ListUserSessionsData, ListUserSessionsVariables>;

interface GetSessionMessagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSessionMessagesVariables): QueryRef<GetSessionMessagesData, GetSessionMessagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSessionMessagesVariables): QueryRef<GetSessionMessagesData, GetSessionMessagesVariables>;
  operationName: string;
}
export const getSessionMessagesRef: GetSessionMessagesRef;

export function getSessionMessages(vars: GetSessionMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<GetSessionMessagesData, GetSessionMessagesVariables>;
export function getSessionMessages(dc: DataConnect, vars: GetSessionMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<GetSessionMessagesData, GetSessionMessagesVariables>;

