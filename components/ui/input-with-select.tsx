import { ChangeEventHandler } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { Input } from './input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

interface InputWithSelectProps {
  inputPlaceholder?: string;
  inputClassName?: string;
  inputContainerClassName?: string;
  selectPlaceholder?: string;
  selectClassName?: string;
  inputName: string;
  selectName: string;
  inputType?: 'number' | 'text';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  selectDefaultValue?: string;
  selectOptions: {
    value: string;
    label: string;
  }[];
  inputDefaultValue?: string | number;
}

export default function InputWithSelect({
  inputPlaceholder = 'Course durations',
  inputClassName = 'flex-1',
  inputContainerClassName = 'w-full',
  selectPlaceholder = 'Select a unit',
  selectClassName = 'w-fit',
  inputName,
  selectName,
  inputType = 'text',
  selectOptions,
  setValue,
  selectDefaultValue = undefined,
  inputDefaultValue = undefined,
}: InputWithSelectProps) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (inputType === 'number') {
      setValue(inputName, Number(e.target.value));
    } else {
      setValue(inputName, e.target.value);
    }
  };

  const handleSelectChange = (value: string) => {
    setValue(selectName, value);
  };

  return (
    <div className="flex">
      <Input
        type={inputType}
        placeholder={inputPlaceholder}
        className={inputClassName}
        inputContainerClassName={inputContainerClassName}
        onChange={handleInputChange}
        defaultValue={inputDefaultValue}
      />
      <Select
        defaultValue={selectDefaultValue}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className={selectClassName}>
          <SelectValue placeholder={selectPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
