import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBookings } from '../selectors/app-selectors';

class TableContainer extends Component {
    getMappedSeats = seats => {
        return Object.keys(seats)
            .map(key => {
                const values = seats[key];
                return values.map(value => `${key}${value}`).join();
            })
            .filter(val => !!val)
            .join();
    };

    render() {
        const { data } = this.props;

        return (
            <div className="table-container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>No. Seats</th>
                            <th>Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ name, seats, noOfSeats }) => {
                            const mappedSeats = this.getMappedSeats(seats);
                            return (
                                <tr key={JSON.stringify(seats)}>
                                    <td>{name}</td>
                                    <td>{noOfSeats}</td>
                                    <td>{mappedSeats}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

TableContainer.propTypes = {
    data: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
    data: selectBookings()
});

export default connect(mapStateToProps)(TableContainer);
