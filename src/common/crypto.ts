export function encrypt<T>(data: T) {
    let dataToEncrypt = typeof data === "object" ? JSON.stringify(data) : String(data);
    return btoa(dataToEncrypt);
}

export function decrypt<T>(data: string) {
    return JSON.parse(atob(data)) as T;
}