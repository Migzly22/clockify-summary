export interface InputParams {
    title?: string;
    description?: string;
    timeout?: number,
    color?: NotificationColor,
    icon?: string,
}

type NotificationColor = 'emerald' | 'rose' | 'amber' | 'blue';