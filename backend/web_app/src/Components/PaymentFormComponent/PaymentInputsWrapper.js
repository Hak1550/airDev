import React from 'react';
import styled, { css } from 'styled-components';

const FieldWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;

  & {
    ${props =>
      props.hasErrored && props.styles.fieldWrapper
        ? props.styles.fieldWrapper.errored
        : undefined};
  }

  ${props =>
    props.styles.fieldWrapper ? props.styles.fieldWrapper.base : undefined};
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5625rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #101828;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d0d5dd;
  appearance: none;
  border-radius: 8px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  & input {
    border: unset;
    margin: unset;
    padding: unset;
    outline: unset;
    font-size: inherit;

    & {
      ${props =>
        props.hasErrored && props.styles.input
          ? props.styles.input.errored
          : undefined};
    }

    ${props => props.styles.input && props.styles.input.base};
  }

  & svg {
    margin-right: 0.6em;
    & {
      ${props => props.styles.cardImage};
    }
  }

  & input#cardNumber {
    width: 11em;
    & {
      ${props => props.styles.input && props.styles.input.cardNumber};
    }
  }

  & input#expiryDate {
    width: 4em;
    & {
      ${props => props.styles.input && props.styles.input.expiryDate};
    }
  }

  & input#cvc {
    width: 2.5em;
    & {
      ${props => props.styles.input && props.styles.input.cvc};
    }
  }

  & input#zip {
    width: 4em;
    & {
      ${props => props.styles.input && props.styles.input.zip};
    }
  }

  ${props =>
    props.styles.inputWrapper ? props.styles.inputWrapper.base : undefined};
`;
const ErrorText = styled.div`
  color: #c9444d;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: none;

  & {
    ${props =>
      props.styles.errorText ? props.styles.errorText.base : undefined};
  }
`;

function PaymentInputsWrapper(props) {
  const {
    children,
    error,
    errorTextProps,
    focused,
    inputWrapperProps,
    isTouched,
    styles,
    ...restProps
  } = props;
  const hasErrored = error && isTouched;
  return (
    <FieldWrapper hasErrored={hasErrored} styles={styles} {...restProps}>
      <InputWrapper
        focused={focused}
        hasErrored={hasErrored}
        styles={styles}
        {...inputWrapperProps}
      >
        {children}
      </InputWrapper>
      {hasErrored && (
        <ErrorText styles={styles} {...errorTextProps}>
          {error}
        </ErrorText>
      )}
    </FieldWrapper>
  );
}

PaymentInputsWrapper.defaultProps = {
  styles: {},
};

export default PaymentInputsWrapper;
