import type { InputParams } from "~/types/modelTypes";

export class ToastNotification {
  private static readonly toast = useToast();

    private constructor() {} // Prevent instantiation

    static success({ title, description, timeout }: InputParams) {
      return ToastNotification.toast.add({
        title: title ?? 'Success',
        description: description ?? 'Success',
        icon: 'i-octicon-desktop-download-24',
        timeout: timeout ?? 2000,
        color : 'emerald'
      });
    }
    static warning({ title, description, timeout }: InputParams) {
      return ToastNotification.toast.add({
        title: title ?? 'Warning',
        description: description ?? 'Warning',
        icon: 'i-octicon-desktop-download-24',
        timeout: timeout ?? 2000,
        color : 'amber'
      });
    }
    static info({ title, description, timeout }: InputParams) {
      return ToastNotification.toast.add({
        title: title ?? 'Info',
        description: description ?? 'Info',
        icon: 'i-octicon-desktop-download-24',
        timeout: timeout ?? 2000,
        color : 'blue'
      });
    }
    static error({ title, description }: InputParams) {
      return ToastNotification.toast.add({
        title: title ?? 'Error',
        description: description ?? 'Please try again later',
        icon: 'i-octicon-desktop-download-24',
        timeout: 2000,
        color : 'rose'
      });
    }
  }