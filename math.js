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

var diagram = {
    types: {
        'digit': function (word) {
            return /^\d+$/.test(word);
        }, 'bracket_start': function (word) {
        }, 'bracket_end': function (word) {

        },
        'operator': function (word) {

        }
    },
    test: function () {

    }
};


module.exports = function (str) {
    console.log(str, Test(str));
};