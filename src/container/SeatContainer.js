import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { keys, values } from 'lodash';

import Seat from '../components/Seat';

import { saveSeats, saveBooking } from '../actions/app-actions';

import {
    selectAllSeats,
    selectCurrentSelectedSeatCount,
    selectCurrentNoOfSeats,
    selectIsSelectable
} from '../selectors/app-selectors';

class SeatContainer extends Component {
    state = {
        error: ''
    };

    handleChange = value => {
        const { isSelectable, currentTotal, noOfSeats } = this.props;
        const limit = parseInt(noOfSeats, 10);

        if (!isSelectable) {
            return;
        }

        if (limit === currentTotal && value.selected) {
            this.setState({
                error:
                    'Please deselect previous selection to select another seat'
            });
            return;
        } else {
            this.setState({
                error: ''
            });
        }
        this.props.saveSeats(value);
    };

    handleSaveBooking = () => {
        this.setState({
            error: ''
        });
        this.props.saveBooking();
    };

    renderSeat = ({ key, value }) => {
        return (
            <Seat
                onChange={this.handleChange}
                key={`${key}-${value}`}
                label={key}
                value={value}
            />
        );
    };

    render() {
        const { error } = this.state;
        const { allSeats, noOfSeats, currentTotal } = this.props;

        const limit = parseInt(noOfSeats, 10);
        const disableButton = currentTotal < limit || limit === 0;
        const seatsPerRow = values(allSeats)[0];

        return (
            <div className="seat-container">
                <div className="hint-block">
                    <div className="hint">
                        <i className="hint--selected" /> <div>Selected</div>
                    </div>
                    <div className="hint">
                        <i className="hint--available" /> <div>Available</div>
                    </div>
                    <div className="hint">
                        <i className="hint--booked" /> <div>Booked</div>
                    </div>
                </div>
                <div className="error-block">{error}</div>
                <div className="screen-container">
                    <div className="screen">Screen</div>
                </div>
                <div className="seat-container__row">
                    <div className="seat seat--label" />
                    {seatsPerRow.slice(0, 5).map(value => (
                        <div key={value} className="seat-number">
                            {value}
                        </div>
                    ))}
                    <div className="seat-gap" />
                    {seatsPerRow.slice(5).map(value => (
                        <div key={value} className="seat-number">
                            {value}
                        </div>
                    ))}
                </div>
                {keys(allSeats).map(key => {
                    const seats = allSeats[key];
                    return (
                        <div className="seat-container__row" key={key}>
                            <div className="seat seat--label">{key}</div>
                            {seats
                                .slice(0, 5)
                                .map(value => this.renderSeat({ key, value }))}
                            <div className="seat-gap" />
                            {seats
                                .slice(5)
                                .map(value => this.renderSeat({ key, value }))}
                        </div>
                    );
                })}

                <div className="action-container">
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={disableButton}
                        onClick={this.handleSaveBooking}
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        );
    }
}

SeatContainer.propTypes = {
    allSeats: PropTypes.object.isRequired,
    saveBooking: PropTypes.func.isRequired,
    saveSeats: PropTypes.func.isRequired,
    currentTotal: PropTypes.number.isRequired,
    noOfSeats: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    isSelectable: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    currentTotal: selectCurrentSelectedSeatCount(),
    allSeats: selectAllSeats(),
    isSelectable: selectIsSelectable(),
    noOfSeats: selectCurrentNoOfSeats()
});

const mapDispatchToProps = {
    saveSeats,
    saveBooking
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatContainer);
