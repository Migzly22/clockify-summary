export interface InputParams {
    title?: string;
    description?: string;
    timeout?: number,
    color?: NotificationColor,
    icon?: string,
}

type NotificationColor = 'emerald' | 'rose' | 'amber' | 'blue';

export interface BaseResponse<T> {
    response ?: T,
    row ?: Array<T>,
    count ?: number,
    error?: {
        code?: number;
        message?: string;
        description?: string;
        details?: object;
    };
}