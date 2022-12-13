import React, { Dispatch, useEffect, useState } from 'react';
import Select, { components, MultiValue, MultiValueGenericProps } from 'react-select';
import { tags } from '../../../constants'

export interface SelectOption {
  readonly label: string
  readonly value: string
}

export const options: readonly SelectOption[] = tags;

const MultiValueContainer = (props: MultiValueGenericProps<SelectOption>) => (
  <components.MultiValueContainer {...props} />
);

// multiselect props
interface Props {
  className?: string
  closeMenuOnSelect?: boolean
  setSelect: Dispatch<MultiValue<SelectOption> | undefined>
}
export const MultiSelect = ({ className, setSelect, closeMenuOnSelect = true }: Props) => {
  const [userChoice, setSelectedOption] = useState<MultiValue<SelectOption>>([]);

  // set selected option
  useEffect(() => {
    setSelect(userChoice);
  }, [setSelect, userChoice]);
  return (
    <Select
      className={className}
      closeMenuOnSelect={closeMenuOnSelect}
      components={{ MultiValueContainer }}
      defaultValue={[]}
      isMulti
      options={options}
      onChange={(choice) => setSelectedOption(choice)}
    />
  )
}
