
var prev_number = 0
var cur_number = 0
var cur_float = 1
var op_code = 0

var neg = false
var pre_neg = false
var hasPoint = false
var hasOperator = false
var hasCleaned = false

var prevBox = document.querySelector('.prevBox');
var numBox = document.querySelector('.numBox');

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

const func_CE = () => {
    cur_number = 0
    cur_float = 1
    hasPoint = false
    notify_change()
}

const func_C = () => {
    prev_number = 0
    cur_number = 0
    cur_float = 1
    op_code = 0

    neg = false
    pre_neg = false
    hasPoint = false
    hasOperator = false
    hasCleaned = false
    prevBox.textContent = ``
    notify_change()
}

const func_DEL = () => {
    if (hasPoint)
        if (cur_float == 1)
            hasPoint = false
        else
            cur_float = Math.floor(cur_float / 10)
    else
        cur_number = Math.floor(cur_number / 10)
    // if (cur_float == 0 && cur_number == 0)
    //     neg = false;
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

const func_inverse = () => {
    if (cur_number != 0 || cur_float != 1) {
        cur_number *= -1.0
        neg = !neg
        notify_change()
    }
}

const func_point = () => {
    if (!hasPoint) {
        hasPoint = true
        notify_change()
    }
}

const func_type = (num) => {
    if (hasOperator && !hasCleaned) {
        func_CE()
        hasCleaned = true
    }
    if (num + cur_number * 10 > 1e15
        || num + cur_float * 10 > 1e15) return
    if (hasPoint)
        cur_float = num + cur_float * 10
    else
        cur_number = num + cur_number * 10
    notify_change();
}

const func_equal = () => {
    if (op_code == 0) {
        prevBox.textContent = getStringNumber() + ' = '
        prev_number = getRealNumber()
    }
    if (processType(op_code)) {
        hasOperator = true
        hasCleaned = false
        op_code = 0
    }
}

const prepare = (code) => {
    const op_set = ' +-×÷'
    prevBox.textContent = `${getStringNumber()} ${op_set[code]} `
    console.log('prepare' + neg)
    prev_number = getRealNumber() * (neg ? -1 : 1)
    op_code = code
    hasPoint = false
    hasOperator = true
    hasCleaned = false
    neg = false
}

const processType = (code) => {
    if (code == 0) return true;
    prevBox.textContent += getStringNumber() + ' = ';
    let answer;
    let op1 = parseFloat(prev_number)
    let op2 = parseFloat(getRealNumber())

    console.log(`${op1} ${op2}`)

    if (code == 1)
        answer = op1 + op2
    else if (code == 2)
        answer = op1 - op2
    else if (code == 3)
        answer = op1 * op2
    else if (code == 4)
        if (op2 == 0) {
            alert('除数不能为零！')
            return false;
        } else answer = op1 / op2
    neg = answer < 0 ? true : false
    putAnswer(answer)
    return true;
}

const putAnswer = (ans) => {
    let mAns = ans + '';
    if (mAns.indexOf('.') != -1) {
        cur_number = parseInt(mAns.substring(0, mAns.indexOf('.')))
        cur_float = parseInt('1' + mAns.substring(mAns.indexOf('.') + 1))
        hasPoint = true
    } else
        cur_number = parseInt(mAns)
    notify_change()
}

const notify_change = () => {
    if (cur_number == 0 && cur_float == 0) {
        numBox.textContent = '0'
        return '0'
    }
    let num_string = cur_number + ""
    let int_part = ""
    let float_part = ""
    if (hasPoint) {
        float_part = '' + cur_float
        float_part = float_part.substring(1, float_part.length)
    }
    let pre = num_string;
    if (pre.indexOf('-') != -1) {
        pre = pre.substring(1)
    }
    if (pre.length % 3 != 0)
        int_part += pre.substring(0, pre.length % 3) + ','
    for (let i = pre.length % 3; i < pre.length; i += 3)
        int_part += pre.substring(i, i + 3) + ','
    int_part = int_part.substring(0, int_part.length - 1)
    numBox.textContent = (neg ? '-' : '') + int_part + (hasPoint ? '.' + float_part : '')
    return (neg && cur_number == 0 ? '-' : '') + cur_number + (hasPoint ? '.' + float_part : '')
}

const getRealNumber = () => {
    let mFloat = cur_float
    while (Math.floor(mFloat))
        mFloat /= 10
    return (cur_number + (mFloat * 10 - 1)).toPrecision(15);
}

const getStringNumber = () => {
    return notify_change()
}