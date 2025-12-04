import { Speaker } from '../supabase';
import { createCrudApi } from './base';

export const speakersApi = createCrudApi<Speaker>('speakers');