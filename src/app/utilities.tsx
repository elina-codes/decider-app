import React from 'react';
import { currentUser } from '../sample-data';

export const isCurrentUser = (userId: string): boolean => userId === currentUser.id;

export const multiClass = (...classes: any[]): string => classes.join(' ');

export const createListItem = (key: string | number, text: string) => (
  <>
    <li key={key}>{text}</li>
  </>
);

// TODO: replace with API call
export const createDecision = (title: string) => {
  const id = '9' + Math.round(Math.random() * 99);
  return {
    id: id,
    title: title,
    completed: false,
    members: [currentUser],
    url: '/' + id
  };
};
