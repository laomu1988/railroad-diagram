/**
 * 判断数学表达式是否正确
 * 例如：
 * 1 + 1 正确,1 * 2 正确, 1 * 2(3) 错误, 1 * 2+(3) 正确， 1 * 2 + (3*)*2 错误
 * */



function Test(str) {
    if (!str) {
        return false;
    }
    var place = 0, cha = '', nowType = 0;

    function eat() {
        if (place < str.length) {
            cha = str.charAt(place);
            place += 1;
            nowType = cha >= '0' && cha <= '9' ? 'number' : isOpeator(cha) ? 'operator' : cha;
            return true;
        } else {
            place = -1;
            cha = '';
            nowType = '';
            return false;
        }
    }

    function skipSpace() {
        while (cha == ' ') {
            eat();
        }
    }

    function eatNumber() {
        while (nowType === 'number') {
            eat();
        }
    }

    function isOpeator(cha) {
        switch (cha) {
            case '+':
            case '-':
            case '*':
            case '/':
                return true;
        }
        return false;
    }

    // number | ( expr )
    function bracket() {

    }

    // bracket ( operator bracket) *
    function cal() {

    }

    /**
     * ( expr ) operator expr
     *  number [operator expr]
     * */
    function expr() {
        if (nowType == ' ') {
            skipSpace();
        }
        if (nowType == '(') {
            eat();
            expr();
            skipSpace();
            if (nowType === ')') {
                eat();
                skipSpace();
                if (cha) {
                    if (isOpeator(cha)) {
                        eat();
                        return expr();
                    }
                    console.log('error need to be operator');
                } else {
                    return true;
                }
            } else {
                console.log('error: need ")"');
            }
        } else if (nowType == 'number') {
            eatNumber();
            skipSpace();
            if (cha) {
                if (isOpeator(cha)) {
                    eat();
                    return expr();
                }
                else {
                    console.log('unexpected char "' + cha + '"');
                    return false;
                }
            }
            return true;
        }
        console.log('unexpected char "' + cha + '"');
        return false;
    }

    eat();
    return expr();
}
function Diagram(str) {
    this.init(str);
}
Diagram.prototype = {
    str: '',
    nowType: '',
    len: 0,
    place: 0,
    word: '',
    init: function (str) {
        if (str) {
            str += '';
            this.str = str;
            this.len = str.length;
        }
        return this;
    },
    // 读取一个数或者一个操作符，空格自动切换到下一个
    read: function () {
        if (this.place < this.len) {
            var cha = this.str.charAt(this.place);
            this.nowType = this.getType(cha);
            this.word = cha;
            if (this.nowType && this.nowType == ' ') {
                this.place += 1;
                // 空格自动切换到下一个
                return this.read();
            }
            if (this.nowType === 'number') {
                var i = 1;
                while ((cha = this.str.charAt(this.place + i)) && this.getType(cha) == this.nowType) {
                    this.word += cha;
                    i += 1;
                }
            }
            return this.nowType;
        } else {
            this.word = '';
            this.nowType = 'end';
            return 'end';
        }
    },
    process: function () {
        if (this.word) {
            this.place += this.word.length;
        } else {
            console.error('error');

        }
    },
    // 1 ( + 1 )
    readLineNumber: function () {
        if (this.nowType == 'number') {
            this.process();
        } else {
            console.error('error');
        }
        this.read();
        if (this.nowType == 'end') {
            return true;
        }
        else if (this.nowType == 'operator') {
            this.process();
            this.readExpr();
        }
    },
    // 带括号的表达式 ( 1 + 1 ) * 1
    readExpr: function () {
        this.read();
        if (this.nowType == 'end') {
            console.log('未预料到的结尾！');
        }
        else if (this.nowType == '(') {
            this.process();
            this.readExpr();
            this.read();
            if (this.nowType == ')') {
                this.process();
                return true;
            } else {
                console.error('缺少右括号');
                return false;
            }
        } else if (this.nowType == 'number') {
            this.process();
            this.read();
            if (this.nowType == 'end') {
                return true;
            } else if (this.nowType == 'operator') {
                this.process();
                return this.readExpr();
            }
            return false;
        } else {
            console.error('未预料到的类型：', this.nowType);
            return false;
        }
    },
    test: function () {
        console.log(this.str);
        return this.readExpr();
    },
    getType: function (cha) {
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
};

// 正则格式化算式
function format(str) {
    return str.replace(/\s*(\d+|[\+\-\*\/\{\}])\s*/g, function (cha) {
        return cha.trim() + ' ';
    });
}

module.exports = function (str) {
    console.log((new Diagram(str)).test());
};