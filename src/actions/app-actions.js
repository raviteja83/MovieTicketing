import { createAction } from 'redux-actions';
import {
    ADD_BOOKING,
    SAVE_SEATS,
    SAVE_CURRENT_INFO,
    ENABLE_SELECTION
} from '../constants/action-types';
import { selectCurrentInfo } from '../selectors/app-selectors';

const currentInfoSelector = selectCurrentInfo();

export const saveSeats = createAction(SAVE_SEATS);

export const saveCurrentInfo = createAction(SAVE_CURRENT_INFO);

export function saveBooking() {
    return (dispatch, getState) => {
        const state = getState();
        const currentInfo = currentInfoSelector(state);
        dispatch(addBooking(currentInfo));
    };
}

export const addBooking = createAction(ADD_BOOKING);

export const enableSelection = createAction(ENABLE_SELECTION);
