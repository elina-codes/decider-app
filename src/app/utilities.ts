import { currentUser } from '../sample-data';

export const isCurrentUser = (userId: string): boolean => userId === currentUser.id;
