import { ChangeEvent, FocusEvent, ReactNode } from 'react';
import { UserType } from '../redux/types/authType';

export type RouteProps = { children: ReactNode };

export type StateType = {
  authData: UserType;
};

export type InputFieldType = {
  label: string;
  name: string;
  type: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  touched: boolean | undefined;
};

export type DropdownProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  onChange: (selectedValue: string) => void;
  value: string;
  onBlur: (e: FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  touched: boolean | undefined;
};

// View Qualification
export type Qualification = {
  id: string;
  degree: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type PaginationData = {
  page: number;
  items: number;
  count: number;
  from: number;
  last: number;
  next: number | null;
  pages: number;
  to: number;
};

export type ApiResponse = {
  status: boolean;
  qualifications: Qualification[];
  pagination: PaginationData;
};

export type PaginationProps = {
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  totalPages: number;
};

// View Doctor

export type Doctor = {
  id: string;
  first_name: string;
  password: string;
  password_confirmation: string;
  last_name: string;
  email: string;
  contact_number: string;
  qualifications: Qualification[];
};

export type DoctorFormData = {
  first_name: string;
  password: string;
  password_confirmation: string;
  last_name: string;
  email: string;
  contact_number: string;
  qualifications: string[];
};

export type DoctorApiResponse = {
  status: boolean;
  doctors: Doctor[];
  pagination: PaginationData;
};

export type Schedule = {
  id: string;
  date: string;
  created_at: string;
  updated_at: string;
  is_holiday: boolean;
};

export type ScheduleApiResponse = {
  status: boolean;
  schedules: Schedule[];
  pagination: PaginationData;
};

// common
export const initialPage = {
  page: 1,
  items: 0,
  count: 0,
  from: 0,
  last: 0,
  next: null,
  pages: 0,
  to: 0,
};
