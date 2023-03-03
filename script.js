/**
 * @author kiramei
 * @alias okCal
 */
var op1 = 0, op2 = 0
var op_code = 0
var lastAnswer = 0

var num_string = ''
var hasPoint = false

var prevBox = document.querySelector('.prevBox')
var numBox = document.querySelector('.numBox')

onkeydown = (key) => {
    if ('1234567890'.indexOf(key.key) != -1)
        func_type(parseInt(key.key))
    else if (key.key.indexOf('Backspace') != -1)
        func_DEL()
    else if ('+'.indexOf(key.key) != -1)
        func_add()
    else if ('-'.indexOf(key.key) != -1)
        func_subtract()
    else if ('*'.indexOf(key.key) != -1)
        func_multiply()
    else if ('/'.indexOf(key.key) != -1)
        func_divide()
    else if ('='.indexOf(key.key) != -1 || 'Enter'.indexOf(key.key) != -1)
        func_equal()
    else if ('.'.indexOf(key.key) != -1)
        func_point()
}

const func_type = (num) => {
    num_string += num
    notify_change()
}

const func_CE = () => {
    num_string = ''
    notify_change()
}

const func_C = () => {
    op1 = 0, op2 = 0
    op_code = 0
    lastAnswer = 0
    num_string = ''
    hasPoint = false
    prevBox.textContent = ``
    notify_change()
}

const func_add = () => {
    prepare(1)
}

const func_subtract = () => {
    prepare(2)
}

const func_multiply = () => {
    prepare(3)
}

const func_divide = () => {
    prepare(4)
}

const func_equal = () => {
    if (num_string.charAt(num_string.length - 1) == '.')
        num_string = num_string.substring(0, num_string.length - 1)
    if (op_code == 0) {
        prevBox.textContent = lastAnswer + ' = '
        num_string = lastAnswer
    }
    notify_change()
    if (processType(op_code)) {
        notify_change()
        num_string = ''
        hasPoint = false
        op_code = 0
    }
}

const prepare = (code) => {
    const op_set = ' +-×÷'
    if (num_string === '') num_string = '0'
    if (typeof (lastAnswer) === 'string')
        op1 = parseFloat(lastAnswer)
    else
        op1 = parseFloat(num_string)
    prevBox.textContent = `${op1} ${op_set[code]} `
    num_string = ''
    op_code = code
}

const processType = (code) => {
    if (!num_string.length || code == 0) {
        lastAnswer = num_string
        return true
    } prevBox.textContent += num_string + ' = '
    let answer
    op2 = parseFloat(num_string)

    if (code == 1)
        answer = op1 + op2
    else if (code == 2)
        answer = op1 - op2
    else if (code == 3)
        answer = op1 * op2
    else if (code == 4)
        if (op2 == 0) {
            alert('除数不能为零！')
            return false
        } else answer = op1 / op2
    lastAnswer = num_string = answer + ''
    return true
}

const func_DEL = () => {
    let last = num_string.length - 1
    if (num_string.charAt(last) === '.') hasPoint = false
    num_string = num_string.substring(0, last)
    notify_change()
}

const func_inverse = () => {
    if (!num_string.length) return
    if (num_string.indexOf('-') === -1)
        num_string = '-' + num_string
    else
        num_string = num_string.substring(1)
    notify_change()
}

const func_point = () => {
    if (!hasPoint) {
        hasPoint = true
        num_string += '.'
        notify_change()
    }
}

const notify_change = () => {
    if (!num_string.length) {
        numBox.textContent = '0'
        return
    }
    if (num_string.charAt(0) === '.')
        num_string = '0' + num_string
    let pre = num_string
    if (pre.indexOf('.') !== -1)
        pre = pre.substring(0, pre.indexOf('.'))
    if (pre.indexOf('-') !== -1) pre = pre.substring(1)
    let int_part = ''
    if (pre.length % 3 != 0)
        int_part += pre.substring(0, pre.length % 3) + ','
    for (let i = pre.length % 3; i < pre.length; i += 3)
        int_part += pre.substring(i, i + 3) + ','
    int_part = int_part.substring(0, int_part.length - 1)
    numBox.textContent = num_string.replace(pre, int_part)
}