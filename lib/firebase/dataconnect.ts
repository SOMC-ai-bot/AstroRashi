import app from './config';
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@/lib/dataconnect-sdk';

export const dataConnect = getDataConnect(app, connectorConfig);
export * from '@/lib/dataconnect-sdk';

