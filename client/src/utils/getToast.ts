import { AppearanceTypes } from 'react-toast-notifications';

interface IToast {
  content: React.ReactNode;
  id: string;
  appearance: AppearanceTypes;
}

const getToast: (toasts: IToast[], toastID: string) => IToast | undefined = (toasts, toastID) =>
  toasts.find((toast) => toast.id === toastID);

export default getToast;
