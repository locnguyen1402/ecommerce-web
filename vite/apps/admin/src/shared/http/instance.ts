import { applyTransformResponseInterceptor, createHttpInstance } from '@vklink/api';

const API_URL = import.meta.env.VITE_API_URL;

const instance = createHttpInstance(API_URL);

applyTransformResponseInterceptor(instance);

export const http = instance;
