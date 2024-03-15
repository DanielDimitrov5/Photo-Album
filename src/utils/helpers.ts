const helpers = {
    formatDate: (date: Date) => date ? date.toISOString().split('T')[0] : '',
    gt: (a: number, b: number) => a > b,
    eq: (a: number, b: number) => a === b,
    increment: (value: number) => value + 1,
    decrement: (value: number) => value - 1,
    range: (from: number, to: number) => {
        const range = [];
        for (let i = from; i <= to; i++) {
            range.push(i);
        }
        return range;
    },
    currentYear: () => new Date().getFullYear(),
}
    
export default helpers;