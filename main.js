
function isOdd(i) {
    //console.log((i%2) ==1)
    if ((i % 2) == 1) {
        return true

    }
    return false
}
function encrypt(str, key) {
    var cipher = (str, key) => {
        if (key < 0){ console.log('Error: Key must be bigger than 0');process.exit(1)}
        //str= '*'+str
        //console.log(str)
        //console.log(chiptertext[0])
        var strCount = (Array.from([str.length])[0] / 2)
        var maxRuns = 9999999
        for (var counter = 0; counter <= key; counter++) {
            if (counter == maxRuns) break

            var res = []
            //console.log(str)
            for (var i = 0; i <= strCount; i++) {
                // console.log((isOdd(str.length)) && (str.length >= 0), str.length, str, res)

                //console.log((!isOdd(str.length-1)),(str.length-1>=0))

                if ((!isOdd(str.length - 1)) && (str.length - 1 == 0)) {
                    //console.log(str)
                    res.push(str[0])
                    str = res.join('')
                    //console.log('inc:'+i)
                    break;
                }
                res.push(str.charAt(0))
                res.push(str.charAt(str.length - 1))

                str = str.substring(1, str.length - 1);
                if (str.length == 0) {
                    //console.log(str,str.length)

                    str = res.join('')
                    //console.log('inc:'+i)
                    break;
                }

                //console.log('Current pos str='+str,'current res:'+res.join(''),'inc:'+i)
                //console.log(res)

            }
            //console.log(str,str.length)
        }
        return [res.join('')/*.replace('*', '')*/, key]
    }
    var cipherres = cipher(`#${str}`, key)
    cipherres[0] = cipherres[0].replace('#', '')
    return cipherres
}
function parseArgs(keys) {
    var args = process.argv.slice(2)
    var res = { flags: [] }

    args.forEach((elm, index) => {
        //console.log(keys, index, keys.flags.includes(elm.replaceAll('-', '')))
        if (keys.flags.includes(elm.replaceAll('-', ''))) {
            res.flags.push(elm.replaceAll('-', ''))
        } else if (keys.options.includes(elm.replaceAll('-', ''))) {
            res[elm.replaceAll('-', '')] = args[index + 1]
        }
    });
    //console.log(res)
    return res
}
function decrypt(str, key) {
    var res = encrypt('#' + Array.from(str).reverse().join(''), key)
    res[0] = Array.from(res[0].replace('#', "")).reverse().join('')
    return res
}
function sconsole() {
    var args = parseArgs({ flags: ['e', 'd'], options: ['key', 'plaintext', 'ciphertext'] })
    try {
        if (args.flags.includes('e')) {
            var res = encrypt(args.plaintext, parseInt(args.key) - 1)
            res[1]++
            if (res == args[0]) {
                res = encrypt(args.plaintext, parseInt(args.key))
            }
        } else if (args.flags.includes('d')) {
            var res = decrypt(args.ciphertext, parseInt(args.key) - 1)
            res[1]++

        }
        console.log(`Result: ${res[0]}, Key: ${res[1]}`)
    } catch { console.log(`Error, wrong pramaters\nUsage: ${process.argv[0]} ${process.argv[1]} <mode> text key`) }



    //console.log(res)
   
}
sconsole()
