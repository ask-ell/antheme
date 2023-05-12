export function encrypt<T>(data: T) {
    let dataToEncrypt = typeof data === "object" ? JSON.stringify(data) : String(data);
    // TODO: update encryption method
    return btoa(dataToEncrypt);
}

export function decrypt<T>(data: string) {
    // TODO: update decryption method
    return JSON.parse(atob(data)) as T;
}