import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormikValues, useField, useFormikContext } from 'formik';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type GenderOption = { label: string };

interface FormikSelectProps {
  name: string;
  options: GenderOption[];
  label?: string;
}

export default function FormikSelect({ options, name }: FormikSelectProps) {
  const { setFieldValue } = useFormikContext<FormikValues>();
  const [field] = useField<string>(name);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 335,
        maxWidth: 580,
        width: '100%',
        height: 40,
        margin: 0,
      }}
    >
      <Select
        sx={{
          background: 'var(--opacity-neutral-darkest-5)',
          color: 'var(--color-neutral)',
          borderRadius: 3,
          margin: 0,
          textTransform: 'capitalize',
          '& .MuiSelect-select': {
            padding: '10px 12px',
          },

          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '2px solid var(--color-scheme-accent)',
          },

          '& .MuiSelect-icon': {
            color: 'var(--opacity-neutral-darkest-60);',
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              background: 'var(--color-neutral-lightest)',
              borderRadius: 4,
              maxWidth: 540,
              maxHeight: 200,
              overflowY: 'auto',
              textTransform: 'capitalize',
            },
          },
        }}
        value={field.value || ''}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem disabled value="">
          <em>Оберіть стать</em>
        </MenuItem>

        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item.label}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
