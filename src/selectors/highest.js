export function highest(obj) {
    const highest = obj.reduce((a, b) => a.id > b.id ? a : b)
    return highest.id;
}