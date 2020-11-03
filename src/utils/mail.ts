export function getDomainFromEmailAddress(email: string): string {
    var index = email.indexOf("@");
    return email.slice((index+1),email.length);
}

export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}