/**
 * 判断数学表达式是否正确
 * 例如：
 * 1 + 1 正确,1 * 2 正确, 1 * 2(3) 错误, 1 * 2+(3) 正确， 1 * 2 + (3*)*2 错误
 * */
function getType(cha) {
    if (!cha) {
        return false;
    }
    if (cha >= '0' && cha <= '9') {
        return 'number';
    }
    switch (cha) {
        case '+':
        case '-':
        case '*':
        case '/':
            return 'operator';
        case '(':
        case ')':
        case ' ':
            return cha;
    }
    return 'unknown';
}

function Diagram(str) {
    if (!str) {
        return false;
    }
    str += '';
    var len = str.length, nowType = '', place = 0, word = '';

    // 读取一个数或者一个操作符，空格自动切换到下一个
    function getNextType() {
        if (place < len) {
            var cha = str.charAt(place);
            nowType = getType(cha);
            word = cha;
            if (nowType && nowType == ' ') {
                place += 1;
                // 空格自动切换到下一个
                return getNextType();
            }
            if (nowType === 'number') {
                var i = 1;
                while ((cha = str.charAt(place + i)) && getType(cha) == nowType) {
                    word += cha;
                    i += 1;
                }
            }
            return nowType;
        } else {
            word = '';
            nowType = 'end';
            return 'end';
        }
    }

    function process() {
        if (word) {
            place += word.length;
        } else {
            console.error('error');
        }
    }


    // 带括号的表达式 ( 1 + 1 ) * 1
    function readExpr() {
        getNextType();
        if (nowType == 'end') {
            console.log('未预料到的结尾！');
            return false;
        }
        else if (nowType == '(') {
            process();
            readExpr();
            getNextType();
            if (nowType == ')') {
                process();
                return true;
            } else {
                console.error('缺少右括号');
                return false;
            }
        } else if (nowType == 'number') {
            process();
            getNextType();
            if (nowType == 'end') {
                return true;
            } else if (nowType == 'operator') {
                process();
                return readExpr();
            }
            return false;
        } else {
            console.error('未预料到的类型：', nowType);
            return false;
        }
    }

    return readExpr();
}
// 正则格式化算式
function format(str) {
    return str.replace(/\s*(\d+|[\+\-\*\/\{\}])\s*/g, function (cha) {
        return cha.trim() + ' ';
    });
}

module.exports = function (str) {
    console.log('string:', str);
    console.log('result:', Diagram(str));
}