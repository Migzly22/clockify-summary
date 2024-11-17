import type { InputParams } from "~/types/modelTypes";


export function useToastNotification() {
  const toast = useToast();

  const success = ({ title, description, timeout }: InputParams) => {
    return toast.add({
      title: title ?? 'Success',
      description: description ?? 'Success',
      icon: 'i-heroicons-check-circle',
      timeout: timeout ?? 2000,
      color: 'emerald'
    });
  };

  const warning = ({ title, description, timeout }: InputParams) => {
    return toast.add({
      title: title ?? 'Warning',
      description: description ?? 'Warning',
      icon: 'i-heroicons-exclamation-triangle',
      timeout: timeout ?? 2000,
      color: 'amber'
    });
  };

  const info = ({ title, description, timeout }: InputParams) => {
    return toast.add({
      title: title ?? 'Info',
      description: description ?? 'Info',
      icon: 'i-heroicons-information-circle',
      timeout: timeout ?? 2000,
      color: 'blue'
    });
  };

  const error = ({ title, description }: InputParams) => {
    return toast.add({
      title: title ?? 'Error',
      description: description ?? 'Please try again later',
      icon: 'i-heroicons-x-circle',
      timeout: 2000,
      color: 'rose'
    });
  };

  const customToast = ({ title, description, timeout, color, icon }: InputParams) => {
    return toast.add({
      title: title ?? 'Success',
      description: description ?? 'Success',
      icon: icon ?? 'i-octicon-desktop-download-24',
      timeout: timeout ?? 2000,
      color: color ?? 'emerald'
    });
  };

  return { success, warning, info, error, customToast };
}