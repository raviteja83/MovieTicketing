import { createSelector } from 'reselect';
import { values } from 'lodash';

export const selectLocalState = () => state => state;

export const selectIsSelectable = () =>
    createSelector(selectLocalState(), state => state.enableSelection);

export const selectCurrentInfo = () =>
    createSelector(selectLocalState(), state => state.currentInfo);

export const selectCurrentName = () =>
    createSelector(selectCurrentInfo(), state => state.name);

export const selectCurrentNoOfSeats = () =>
    createSelector(selectCurrentInfo(), state => state.noOfSeats);

export const selectCurrentSeatSelection = () =>
    createSelector(selectCurrentInfo(), state => state.seats);

export const selectAllSeats = () =>
    createSelector(selectLocalState(), state => state.allSeats);

export const selectBookings = () =>
    createSelector(selectLocalState(), state => state.bookings);

export const selectTotalSeats = () =>
    createSelector(selectAllSeats(), allSeats => {
        return values(allSeats).reduce((sum, value) => {
            sum += value.length;
            return sum;
        }, 0);
    });

export const selectTotalSelectedSeats = () =>
    createSelector(selectSelectedSeats(), seats => {
        return values(seats).reduce((sum, value) => {
            sum += value.length;
            return sum;
        }, 0);
    });

export const selectMaxNoOfSeats = () =>
    createSelector(
        selectTotalSeats(),
        selectTotalSelectedSeats(),
        (total, selected) => {
            return total - selected;
        }
    );

export const selectSelectedSeats = () =>
    createSelector(selectLocalState(), state => state.selectedSeats);

export const selectCurrentSelectedSeatCount = () =>
    createSelector(selectCurrentSeatSelection(), seats => {
        return values(seats).reduce((sum, value) => {
            sum += value.length;
            return sum;
        }, 0);
    });

export const selectIsSeatSelected = () =>
    createSelector(
        selectCurrentSeatSelection(),
        (_, props) => props,
        (selection, { label, value }) => {
            const valuesForKey = selection[label] || [];
            return valuesForKey.includes(value);
        }
    );

export const selectIsAlreadySeatSelected = () =>
    createSelector(
        selectSelectedSeats(),
        (_, props) => props,
        (selection, { label, value }) => {
            const valuesForKey = selection[label] || [];
            return valuesForKey.includes(value);
        }
    );
