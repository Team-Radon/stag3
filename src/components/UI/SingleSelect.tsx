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
  initialSelected: SingleTag | undefined
}

export const SingleSelect = ({ className, setSelect, initialSelected, closeMenuOnSelect = true }: Props) => {
  const [userChoice, setSelectedOption] = useState<SingleTag | undefined>(initialSelected || undefined);

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
      defaultValue={initialSelected}
      onChange={(option) => setSelectedOption(option)}
    />
  )
}
