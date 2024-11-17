export const tableColumns = [
{
    key: 'Date',
    label: 'Date'
}, {
    key: 'Task',
    label: 'Task'
}, {
    key: 'Start',
    label: 'Start'
}, {
    key: 'End',
    label: 'End',

}, {
    key: 'Duration',
    label: 'Duration'
}
]

export interface DataHolder {
    Date: Date | string,
    dateTime :  Date | string,
    Task: string,
    Start: string,
    End: string,
    Duration: string
}


export interface IUserData {
    email?: string;
    firstName?: string;
    lastName?: string;
    job?: string;
    workplaceId?: string;
}