import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
    selectIsSeatSelected,
    selectIsAlreadySeatSelected
} from '../selectors/app-selectors';

import './seat.css';

class Seat extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
        disabled: PropTypes.bool.isRequired
    };

    handleChange = e => {
        const { onChange, label, value } = this.props;
        onChange({ label, value, selected: e.target.checked });
    };

    render() {
        const { selected, value, label, disabled } = this.props;
        return (
            <div className={`seat ${selected ? 'selected' : ''}`}>
                <input
                    type="checkbox"
                    value={value}
                    checked={selected}
                    disabled={disabled}
                    id={`checkbox-${label}-${value}`}
                    onChange={this.handleChange}
                />
                <label htmlFor={`checkbox-${label}-${value}`}>{value}</label>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selected: selectIsSeatSelected(),
    disabled: selectIsAlreadySeatSelected()
});

export default connect(mapStateToProps)(Seat);
