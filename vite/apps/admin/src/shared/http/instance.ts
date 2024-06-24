import { createHttpInstance } from '../../../../../packages/shared/api/src';

const API_URL = import.meta.env.VITE_API_URL;

const instance = createHttpInstance(API_URL);

export const http = instance;
