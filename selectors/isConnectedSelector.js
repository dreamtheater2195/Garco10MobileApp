import { createSelector } from 'reselect';

export const isConnectedSelector = createSelector(
    state => state.network.isConnected,
    isConnected => isConnected
)