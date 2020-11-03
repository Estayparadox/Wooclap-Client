import { isNullOrUndefined } from "util";

export function getDomainFromEmailAddress(email: string): string {
    var index = email.indexOf("@");
    return email.slice((index+1),email.length);
}

export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function checkInputs(name: string, email: string, orga: string, job: string): Promise<boolean> {
    if ((name.length !== 0 && !isNullOrUndefined(name)) &&
        (email.length !== 0 && !isNullOrUndefined(email) && isValidEmail(email)) &&
        (orga.length !== 0 && !isNullOrUndefined(orga)) &&
        (job.length !== 0 && !isNullOrUndefined(job)))
        return true
    return false
}