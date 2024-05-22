export function isPerfectNumber(n) {
    if (n <= 0n) {
        return false
    }
    let sum = 0n
    for (let i = 1n; i < n; i++) {
        if (n % i === 0n) {
            sum += i
        }
    }
    return sum === n
}
