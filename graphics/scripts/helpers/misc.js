
export function addDots(str, len = 36) {
    if (str.length < len + 3) {
        return str;
    }
    else {
        return str.slice(0, len) + "...";
    }
}