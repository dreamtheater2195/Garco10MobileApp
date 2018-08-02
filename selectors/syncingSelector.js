import { createSelector } from 'reselect';

export const syncingSelector = createSelector(
    state => state.network.syncing,
    syncing => syncing
)