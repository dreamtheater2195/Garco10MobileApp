import { createSelector } from 'reselect';

export const loHangsSelector = createSelector(
    state => state.garco10.lohang,
    lohang => lohang
)