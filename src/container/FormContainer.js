import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { saveCurrentInfo, enableSelection } from '../actions/app-actions';

import {
    selectCurrentName,
    selectCurrentNoOfSeats,
    selectMaxNoOfSeats
} from '../selectors/app-selectors';

import './form-container.css';

class FormContainer extends Component {
    static propTypes = {
        saveCurrentInfo: PropTypes.func.isRequired,
        name: PropTypes.string,
        noOfSeats: PropTypes.number,
        maxNoOfSeats: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            noOfSeats: props.noOfSeats
        };
    }

    componentWillReceiveProps({ name, noOfSeats }) {
        if (this.state.name !== name) {
            this.setState({
                name
            });
        }

        if (this.state.noOfSeats !== noOfSeats) {
            this.setState({ noOfSeats });
        }
    }

    handleClick = e => {
        this.props.saveCurrentInfo(this.state);
        e && this.props.enableSelection();
    };

    handleChange = e => {
        const { target: { name, value } } = e;
        this.setState(
            {
                [name]: value
            },
            this.handleClick
        );
    };

    render() {
        const { name, noOfSeats } = this.state;
        const { maxNoOfSeats } = this.props;

        return (
            <div className="form-container">
                <div className="input-container">
                    <div className="form-group form-group--input">
                        <input
                            type="text"
                            className="form-control mr-10"
                            name="name"
                            value={name || ''}
                            placeholder="Enter Name"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group form-group--number">
                        <input
                            type="number"
                            className="form-control"
                            name="noOfSeats"
                            min={1}
                            max={maxNoOfSeats}
                            value={noOfSeats || 0}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                {parseInt(noOfSeats, 10) > maxNoOfSeats && (
                    <div className="help-block">
                        You can only select {maxNoOfSeats} seats
                    </div>
                )}
                <div className="action-container">
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={!name || !noOfSeats}
                        onClick={this.handleClick}
                    >
                        Start Selection
                    </button>
                </div>
            </div>
        );
    }
}

FormContainer.propTypes = {
    name: PropTypes.string,
    noOfSeats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    saveCurrentInfo: PropTypes.func.isRequired,
    enableSelection: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
    name: selectCurrentName(),
    noOfSeats: selectCurrentNoOfSeats(),
    maxNoOfSeats: selectMaxNoOfSeats()
});

const mapDispatchToProps = {
    saveCurrentInfo,
    enableSelection
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
