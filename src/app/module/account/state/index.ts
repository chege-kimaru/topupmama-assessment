import * as fromAccountReducer from './account.reducer';

export const accountModuleReducersMap = {
    account: fromAccountReducer.accountReducer
}

export interface AccountModuleStateMap {
    account: fromAccountReducer.State;
}