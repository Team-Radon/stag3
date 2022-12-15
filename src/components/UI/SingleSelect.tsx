import React, { Dispatch, useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { PROJECT_STATUS } from 'src/constants'
import { Tag } from 'src/helpers/interfaces';

export type SingleTag = SingleValue<Tag>;
const options: readonly Tag[] = PROJECT_STATUS;

// single select props
interface Props {
  className?: string
  closeMenuOnSelect?: boolean
  setSelect: Dispatch<SingleTag | undefined>
}

export const SingleSelect = ({ className, setSelect, closeMenuOnSelect = true }: Props) => {
  const [userChoice, setSelectedOption] = useState<SingleTag>();

  // set selected option
  useEffect(() => {
    setSelect(userChoice);
  }, [setSelect, userChoice]);
  return (
    <Select
      className={className}
      closeMenuOnSelect={closeMenuOnSelect}
      getOptionLabel={(option) => option.title}
      getOptionValue={(option) => option.slug}
      options={options}
      onChange={(option) => setSelectedOption(option)}
    />
  )
}
