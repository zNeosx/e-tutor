'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useModalStore } from '@/lib/store/UseModalStore';
import ResetPasswordModal from './modals/ResetPasswordModal';

export default function GlobalModal() {
  const { isOpen, type, props, closeModal } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case 'reset-password':
      return <ResetPasswordModal isOpen={isOpen} closeModal={closeModal} />;
    case 'confirm':
      return (
        <AlertDialog open={isOpen} onOpenChange={closeModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {props.title || "Confirmer l'action"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {props.description || 'Êtes-vous sûr de vouloir continuer ?'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeModal}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction onClick={props.onConfirm || closeModal}>
                Confirmer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );

    case 'alert':
      return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{props.title || 'Alerte'}</DialogTitle>
              <DialogDescription>
                {props.description ||
                  "Un message important pour l'utilisateur."}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );

    case 'custom':
      return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
          <DialogContent>{props.content}</DialogContent>
        </Dialog>
      );

    default:
      return null;
  }
}
