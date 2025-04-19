'use client';

import React from 'react';
import { Label } from './label';
import { Button } from './button';
import { toast } from '@/hooks/use-toast';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem } from './form';
import InputWithCharacterLimit from './input-with-character-limit';

interface InputGroupProps {
  fieldName: string;
  maxPoints?: number;
  minPoints?: number;
  placeholder?: string;
  label?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

const InputGroup = ({
  fieldName,
  maxPoints = 8,
  minPoints = 1,
  placeholder = 'Enter your text here',
  label,
  form,
}: InputGroupProps) => {
  // console.log('render', form.watch(fieldName));

  const handleAddPoint = () => {
    const currentFields = form.getValues(fieldName) || [];
    if (currentFields.length >= maxPoints) {
      toast({
        title: 'Maximum limit reached',
        description: `You can add up to ${maxPoints} points`,
        variant: 'destructive',
      });
      return;
    }
    form.setValue(fieldName, [...currentFields, '']);
  };

  const handleRemovePoint = (index: number) => {
    const currentFields = form.getValues(fieldName) || [];
    if (currentFields.length <= minPoints) {
      toast({
        title: 'Minimum limit reached',
        description: `You can add up to ${minPoints} points`,
        variant: 'destructive',
      });
      return;
    }
    const newValue = [...currentFields];
    newValue.splice(index, 1);
    form.setValue(fieldName, newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="body-xl-500">
          {label} ({form.watch(fieldName).length ?? 0}/{maxPoints})
        </Label>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={handleAddPoint}
        >
          Add new
        </Button>
      </div>

      <div className="grid gap-4">
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          form.watch(fieldName).map((_: any, index: number) => (
            <FormField
              key={index}
              control={form.control}
              name={fieldName}
              render={({ field }) => {
                const value = field.value?.[index] ?? '';

                return (
                  <FormItem>
                    <div className="space-y-2">
                      <span className="body-m-400 text-gray-900">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <InputWithCharacterLimit
                            value={value}
                            onChange={(e) => {
                              const newValue = [...(field.value || [''])];
                              newValue[index] = e.target.value;
                              field.onChange(newValue);
                            }}
                            placeholder={placeholder}
                            maxLength={120}
                          />
                        </FormControl>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="px-3"
                            onClick={() => handleRemovePoint(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-4"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </Button>
                        )}
                      </div>
                    </div>
                  </FormItem>
                );
              }}
            />
          ))
        }
      </div>
    </div>
  );
};

export default InputGroup;
