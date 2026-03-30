function bigAdd(left, right) {
    left = left + '';
    right = right + '';
    let i = left.length - 1;
    let j = right.length - 1;
    let carry = 0;
    let res = [];

    while (i >= 0 || j >= 0 || carry !== 0) {
        let l = i >= 0 ? Number(left[i]) : 0;
        let r = j >= 0 ? Number(right[j]) : 0;
        let sum = l + r + carry;
        res.push(sum % 10);
        carry = Math.floor(sum / 10);
        i--;
        j--;
    }

    return res.reverse().join('');
}