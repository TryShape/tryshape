import React from 'react';
import styled from 'styled-components';

const RadioGroup = styled.div`
    margin-top: 5px;
`;

const Radio = styled.span`
    margin-right: 24px;
`;

const RadioBtn = props => {
    const value = props.value;
    const groupName = props.groupName;
    const displayValue = props.displayValue;
    const onValueChange = props.onValueChange;
    const selectedOption = props.selectedOption;
    
    return(
        <Radio className="form-radio">
          <label>
            <input
              style={{marginRight: '2px'}}
              type="radio"
              name={ groupName }
              value={ value }
              checked={ selectedOption === value }
              onChange={ onValueChange }
            />
            <span>{ displayValue }</span>
          </label>
        </Radio>
    )
}

const Radios = props => {
    
    const groupName = props.groupName;
    const options = props.options;
    const onValueChange = props.onValueChange;
    const selectedOption = props.selectedOption;
    const heading = props.heading;
    
    return(
        <>
            { heading && <span>{ heading }</span> } {' '}
            <RadioGroup className="form-radio-group">
            { 
                options && options.length > 0 && options.map((option, index) => (
                    <RadioBtn 
                        key={ index } 
                        groupName={ groupName }
                        value={ option.value } 
                        displayValue={ option.displayValue }
                        selectedOption={ selectedOption }
                        onValueChange={ onValueChange } />
                ))
            }
            </RadioGroup>
        </>
    )
}

export default Radios;