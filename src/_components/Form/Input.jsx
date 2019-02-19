/* Packages */
import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Framework Helpers */
import { COLORS, RADIUS } from 'aphrodite-react';

/* Styles */
const InputStyles = (props) => ({
    display: 'block',
    width  : '100%',
    padding: `14px ${props.icon ? '55px' : '15px'} 11px 15px`,

    color     : (props.disabled ? COLORS.GET('WHITE', 0.15) : COLORS.WHITE),
    background: COLORS.GET('WHITE', 0.05),
    border    : 0,
    outline   : 0,

    minWidth  : '100%',
    maxWidth  : '100%',
    height    : (props.textArea ? null : '50px'),
    lineHeight: (props.textArea ? null : '20px'),
    fontSize  : '20px',
    fontWeight: '400',

    borderRadius: RADIUS.XS,

    transition: 'color, 0.2s linear, background 0.2s linear',

    WebkitAppearance: 'none',

    '&:focus': {
        background: (props.disabled ? COLORS.GET('WHITE', 0.05) : COLORS.GET('WHITE', 0.1)),
    },

    '&[type="search"]': {
        '&::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration': {
            webkitAppearance: 'none',
            display: 'none',
        },
    },

    ...props.styles,
});

const Wrapper = styled('div')((props) => ({
    position: 'relative',
    display : 'block',
    width   : '100%',
    margin  : (props.margin || null),
}));
const IconWrapper = styled('span')((props) => ({
    position: 'absolute',
    right   : '10px',
    bottom  : '6.5px',
    opacity : 0.25,
}));
const LabelWrapper = styled('label')(({
    display: 'block',
    width  : '100%',
    margin : '0 0 10px 15px',
    color  : COLORS.WHITE,

    fontSize  : '14px',
    lineHeight: '10px',

    textTransform: 'uppercase',

    '&[for], &[htmlFor]': {
        cursor: 'pointer',
    },
}));
const InputWrapper    = styled('input')(InputStyles);
const TextAreaWrapper = styled('textarea')(InputStyles);

/* Component */
const Input = (props) => {
    const {
        forwardRef,
        icon,
        iconProps,
        iconButtonProps,
        iconButtonText,
        label,
        margin,
        textArea,
    } = props;

    return (
        <Wrapper margin={margin}>
            {(!label) ? (null) : (
                <LabelWrapper htmlFor={props.id}>
                    <strong>{label}</strong>
                </LabelWrapper>
            )}
            {(textArea) ? (
                <TextAreaWrapper
                    ref={forwardRef}
                    {...props}
                />
            ) : (
                <InputWrapper
                    ref={forwardRef}
                    {...props}
                />
            )}
            {(!icon) ? (null) : (
                <IconWrapper
                    transparent
                    {...iconButtonProps}>
                    {iconButtonText || ''}
                    <FontAwesomeIcon
                        icon={icon}
                        fixedWidth
                        {...iconProps}
                    />
                </IconWrapper>
            )}
        </Wrapper>
    );
};

/* Exporting */
export default Input;
