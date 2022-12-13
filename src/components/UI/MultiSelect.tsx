import React, { Dispatch, useEffect, useState } from 'react';
import Select, { components, MultiValue, MultiValueGenericProps } from 'react-select';
import { TAGS } from 'src/constants'
import { Tag } from 'src/helpers/interfaces';

export const options: readonly Tag[] = TAGS;

const MultiValueContainer = (props: MultiValueGenericProps<Tag>) => (
  <components.MultiValueContainer {...props} />
);

// multiselect props
interface Props {
  className?: string
  closeMenuOnSelect?: boolean
  setSelect: Dispatch<MultiValue<Tag> | undefined>
}
export const MultiSelect = ({ className, setSelect, closeMenuOnSelect = true }: Props) => {
  const [userChoice, setSelectedOption] = useState<MultiValue<Tag>>([]);

  // set selected option
  useEffect(() => {
    setSelect(userChoice);
  }, [setSelect, userChoice]);
  return (
    <Select
      className={className}
      closeMenuOnSelect={closeMenuOnSelect}
      components={{ MultiValueContainer }}
      getOptionLabel={(option) => option.title}
      getOptionValue={(option) => option.slug}
      defaultValue={[]}
      isMulti
      options={options}
      onChange={(option) => setSelectedOption(option)}
    />
  )
}