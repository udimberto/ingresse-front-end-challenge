/* Packages */
import React, { Component } from 'react';
import styled from '@emotion/styled';

/* Constants */
import DROPDOWN_STYLES from './dropdown.styles';

/* Components */
const DropdownStyled = styled('div')(DROPDOWN_STYLES.WRAPPER);

/* Component it self */
export default class Dropdown extends Component {
    /**
     * Constructor
     *
     * @param {object} props
     */
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            active : false,
            visible: false,
        };

        this.unmounted     = false;
        this.dropdown      = null;
        this.showDropdown  = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    /**
     * Will Unmount
     */
    componentWillUnmount() {
        this.unmounted = true;

        document.removeEventListener('click', this.closeDropdown);
    }

    /**
     * Show Dropdown
     *
     * @param {evt} DOM click event
     */
    showDropdown(evt) {
        evt.preventDefault();

        if (this.unmounted) {
            return;
        }

        this.setState({
            active : false,
            visible: true,
        }, () => {
            document.addEventListener('click', this.closeDropdown);

            setTimeout(() => {
                if (this.unmounted) {
                    return;
                }

                this.setState({
                    active: true,
                });
            }, 250);
        });
    }

    /**
     * Close Dropdown
     *
     * @param {evt} DOM click event
     */
    closeDropdown(evt) {
        if (this.unmounted ||
            (evt &&
            evt.target &&
            this.dropdown &&
            this.dropdown.contains(evt.target))) {
            return;
        }

        this.setState({
            active : false,
            visible: true,
        }, () => {
            document.removeEventListener('click', this.closeDropdown);

            setTimeout(() => {
                if (this.unmounted) {
                    return;
                }

                this.setState({
                    visible: false,
                });
            }, 250);
        });
    }

    /**
     * Render
     */
    render() {
        const { active, visible } = this.state;
        const {
            className,
            children,
            toggle,
            width,
            up    = false,
            right = false,
            left  = false,
            thin  = false,
        } = this.props;

        return (
            <DropdownStyled
                up={up}
                right={right}
                left={left}
                width={width}
                thin={thin}
                className={`dropdown${active ? ' active' : ''}${visible ? ' visible' : ''} ${className || ''}`}>
                <button onClick={this.showDropdown}
                        className="dropdown__toggle">
                    {toggle}
                </button>
                <div className={`dropdown__content${active ? ' active' : ''}${visible ? ' visible' : ''}`}
                     onClick={() => this.closeDropdown()}
                     ref={(element) => { this.dropdown = element; }}>
                    {children}
                </div>
            </DropdownStyled>
        );
    }
}
