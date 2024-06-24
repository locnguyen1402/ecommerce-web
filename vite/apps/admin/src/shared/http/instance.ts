import { createHttpInstance } from '@vklink/api';

const API_URL = import.meta.env.VITE_API_URL;

const instance = createHttpInstance(API_URL);

export const http = instance;
