import { currentUser } from '../sample-data';

export const isCurrentUser = (userId: string): boolean => userId === currentUser.id;

export const multiClass = (...classes: any[]): string => classes.join(' ');
