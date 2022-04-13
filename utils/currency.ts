export const format = (value: number) => {
    //Format the value to a currency format
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    return formatter.format(value);
}