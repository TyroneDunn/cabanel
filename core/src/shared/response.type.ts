export type Response = {
    status: number
    error?: string,
    collection?: any[],
    count?: number,
    index?: number,
    limit?: number,
};
