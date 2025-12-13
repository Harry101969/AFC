import { JerseyVariant, ColorOption } from '../types/jersey';

export const colorOptions: ColorOption[] = [
  { name: 'Red', value: '#dc2626' },
  { name: 'Yellow', value: '#fbbf24' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#1f2937' },
];

export const defaultVariants: JerseyVariant[] = [
  {
    id: 'black-white',
    name: 'Black & White',
    primaryColor: '#1f2937',
    secondaryColor: '#ffffff',
    pattern: 'plain',
  },
  {
    id: 'white-black',
    name: 'White & Black',
    primaryColor: '#ffffff',
    secondaryColor: '#1f2937',
    pattern: 'plain',
  },
  {
    id: 'red-yellow',
    name: 'Red & Yellow',
    primaryColor: '#dc2626',
    secondaryColor: '#fbbf24',
    pattern: 'plain',
  },
  {
    id: 'blue-red',
    name: 'Blue & Red',
    primaryColor: '#2563eb',
    secondaryColor: '#dc2626',
    pattern: 'plain',
  },
  {
    id: 'red-blue',
    name: 'Red & Blue',
    primaryColor: '#dc2626',
    secondaryColor: '#2563eb',
    pattern: 'plain',
  },
];
