import { createFeatureSelector } from '@ngrx/store';
import * as fromUsersListReducer from './users-list/users-list.reducer';

export const userModuleReducersMap = {
    usersList: fromUsersListReducer.usersListReducer,
}

export interface UserModuleStateMap {
    usersList: fromUsersListReducer.State;
}