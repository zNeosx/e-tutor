import { Icon } from '@phosphor-icons/react';

interface Category {
  id: number;
  name: string;
  coursesCount: number;
  icon: Icon;
  primaryColor: string;
  bgColor: string;
}

interface AuthCredentials {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}
