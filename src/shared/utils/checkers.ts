export function validateFirstElementInList(list: any[], check: (element: any) => boolean): boolean {
    if (Array.isArray(list)) {
        if (list.length > 0) {
            return check(list[0]);
        } else {
            return true;
        }
    } else {
        return false;
    }
}
