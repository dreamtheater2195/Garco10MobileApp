import { createSelector } from 'reselect';

export const currentUserSelector = createSelector(
    state => state.auth.user,
    user => user
);