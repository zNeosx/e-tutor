import { Icon } from '@phosphor-icons/react';
import { JSX } from 'react';

type UserRole = (typeof userRoleEnum.enumValues)[number];

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
  role: UserRole;
}

interface ModalProps {
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  content?: React.ReactNode;
}

// export type Step = {
//   id: string;
//   name: string;
//   icon: Icon;
//   index: number;
//   isCompleted?: boolean;
//   component: () => JSX.Element;
// };
