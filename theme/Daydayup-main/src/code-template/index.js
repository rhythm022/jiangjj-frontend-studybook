module.exports = (template) => {
    const FRONT_START = '// 前置代码 start'
    const FRONT_END = '// 前置代码 end'
    const TEMPLATE_START = '// 模板 start'
    const TEMPLATE_END = '// 模板 end'
    const ANSWER_START = '// 答案 start'
    const ANSWER_END = '// 答案 end'
    const BACK_START = '// 后置代码 start'
    const BACK_END = '// 后置代码 end'

    let frontStr = ''
    let templateStr = ''
    let answerStr = ''
    let backStr = ''
    let currentToken = ''
    let currentLine
    parse(template)

 
    function isPlainLine(){
        return !isMarkLine()
    }
    function isMarkLine(mark){
        const target= currentLine.trim()
        if(mark){
            return target === mark
        }else{
            return ( 
                target === FRONT_START ||
                target === FRONT_END ||
                target === TEMPLATE_START ||
                target === TEMPLATE_END ||
                target === ANSWER_START ||
                target === ANSWER_END ||
                target === BACK_START ||
                target === BACK_END
            )
        }
    }

    //解析代码
    function parse(template) {
        const arr = template.split('\n')

        let state = init;

        arr.forEach(line => {
            currentLine = line
            state = state(line);
        })
    }

    function init(){
        // 1.只能 => FRONT_START
        if(isMarkLine(FRONT_START)){
            return frontStart
        }else if (isPlainLine()){
            return init
        }else{
            console.error('init')
        }
    }
    function frontStart2(line) {
        if(isMarkLine(FRONT_END)){
            return frontEnd()
        }
    }
    //前置开始
    function frontStart(line) {
        if (line === '') return frontStart

        if (line.trim() === FRONT_END) {
            return frontEnd()
        } else if (line.trim() === FRONT_START) {
            return frontStart
        } else {
            currentToken = `${currentToken}${line}
`
            return frontStart
        }
    }

    //前置结束
    function frontEnd() {
        frontStr = currentToken
        currentToken = ''
        return templateStart
    }

    //模板开始
    function templateStart(string) {
        if (string.trim() === TEMPLATE_END) {
            return templateEnd()
        } else if (string.trim() === TEMPLATE_START) {
            return templateStart
        } else if (string.trim() === ANSWER_START) {
            templateStr = currentToken
            currentToken = ''
            return answerStart
        } else {
            currentToken = `${currentToken}${string}
`
            return templateStart
        }
    }

    //模板结束
    function templateEnd() {
        templateStr = `${templateStr}${currentToken}` //中间会有答案，所以模板是由前后两部分组成，这里要用+
        currentToken = ''
        return backStart
    }

    //回答开始
    function answerStart(string) {
        if (string.trim() === ANSWER_END) {
            return answerEnd()
        } else if (string.trim() === ANSWER_START) {
            return answerStart
        } else {
            currentToken = `${currentToken}${string}
`
            return answerStart
        }
    }

    //回答结束
    function answerEnd() {
        answerStr = currentToken
        currentToken = ''
        return templateStart
    }

    //后置开始
    function backStart(string) {
        if (string.trim() === BACK_END) {
            return backEnd()
        } else if (string.trim() === BACK_START) {
            return backStart
        } else {
            currentToken = `${currentToken}${string}
`
            return backStart
        }
    }

    //后置结束
    function backEnd() {
        backStr = currentToken
        currentToken = ''
        return End
    }

    //结束
    function End() {}

    return {
        front: frontStr,
        template: templateStr,
        answer: answerStr,
        back: backStr
    }
};