import initialState from './initialState';
import { combineReducers } from 'redux';
import { difference } from 'lodash';
import {
    SAVE_CURRENT_INFO,
    ADD_BOOKING,
    SAVE_SEATS,
    ENABLE_SELECTION
} from '../constants/action-types';

function currentInfo(state = initialState.currentInfo, action) {
    switch (action.type) {
        case SAVE_CURRENT_INFO:
            return {
                ...state,
                ...action.payload
            };
        case SAVE_SEATS: {
            let { seats } = { ...state };
            const { value, label, selected } = action.payload;
            let selection = seats[label] || [];
            if (selected) {
                selection = [...selection, value];
            } else {
                selection = difference(selection, [value]);
            }
            return {
                ...state,
                seats: {
                    ...seats,
                    [label]: selection
                }
            };
        }
        case ADD_BOOKING:
            return initialState.currentInfo;
        default:
            return state;
    }
}

function bookings(state = initialState.bookings, action) {
    switch (action.type) {
        case ADD_BOOKING:
            return [action.payload, ...state];
        default:
            return state;
    }
}

function allSeats(state = initialState.allSeats, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function enableSelection(state = initialState.enableSelection, action) {
    switch (action.type) {
        case ENABLE_SELECTION:
            return true;
        case ADD_BOOKING:
            return initialState.enableSelection;
        default:
            return state;
    }
}

function selectedSeats(state = initialState.selectedSeats, action) {
    switch (action.type) {
        case ADD_BOOKING: {
            const newState = { ...state };
            const { seats } = action.payload;
            Object.keys(seats).forEach(key => {
                const prevState = newState[key] || [];
                const currState = seats[key];
                newState[key] = [...currState, ...prevState];
            });
            return newState;
        }
        default:
            return state;
    }
}

export default combineReducers({
    currentInfo,
    bookings,
    allSeats,
    enableSelection,
    selectedSeats
});
