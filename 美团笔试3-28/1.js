const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    let boolean =true
    let first = true
    while(line = await readline()){
        let tokens = line.split(' ');
        // 第一次读的是多少组
        if (boolean) {
            boolean = false
            continue
        }
        let n = 0
        let a = 0
        let b = 0
        let k = 0
        // 后续第一次读的是nabk
        if (first === true) {
            n = tokens[0]
            a = tokens[1]
            b = tokens[2]
            k = tokens[3]
            first = false
        }
        // 第二次读的是an
        if (first === false) {

            let arr = tokens.sort()
            let i = arr.length - 1
            while (a > 0) {
                arr[i] = Math.floor(arr[i] / 2)
                i--
                a--
            }
            let result = 0
            for (let i = 0; i < arr.length; i++) {
                result += Number(arr[i])
            }
            console.log(1)
            console.log(result)
            // result -= k * b
            // console.log(result)
            first = true
        }
    }
}()