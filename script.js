function Calculator(){

    const [expression, setExpression] = React.useState('');
    const [answer, setAnswer] = React.useState('');
    const [currentVal , setCurrentVal] = React.useState(0);

    const handleCurrentClickVal = (item) => {
    
        if((/[\+\-\/\*]/).test(expression[expression.length-1])){
            setCurrentVal(item);
            setExpression(prev => prev + item);
            return;
        }
        
        if(item == '.' && currentVal.includes('.'))return;
        
        if(currentVal == 0) {
            setCurrentVal(item);
            setExpression(prev => prev + item);
        }
        else{
            setCurrentVal(prev => prev + item);
            setExpression(prev => prev + item);
        }
    }
    const handleOperatorClick = (symbol) => {
        if(expression[expression.length-1] == '='){
            setExpression(answer + symbol);
            setCurrentVal(symbol);
            return;
        }

        setCurrentVal(symbol);
        setExpression(prev => prev + symbol);
    }

    const calculate = () => {
        if((/\/0+/).test(expression)){
            setCurrentVal('UNDEFINED');
            return;
        }
        let filterStr = '';
        
        for(let i =0;i<expression.length;i++){
            if((/[0-9.]/).test(expression[i])){
                filterStr+=expression[i];
                continue;
            }
            if(((/[\+\/\*\-]/).test(expression[i]) && (/[0-9.]/).test(expression[i+1]))||((/[\+\/\*\-]/).test(expression[i]) && (/[\-]/).test(expression[i+1]) && (/[0-9]/).test(expression[i+2]))){
                filterStr+= expression[i];
            }
        }
        
        let newStr = filterStr
                    .replace(/(x|\/|\+)‑/, '$1-')
                    .replace(/--/, '+')

        let result  = eval(newStr)
        setAnswer(result);
        setCurrentVal(result);
        setExpression(prev => prev + "=")
    }
    const allClear = () =>  {
        setExpression("");
        setAnswer('');
        setCurrentVal(0);
    };
   
    
    return (
         <div id="calculator">
            <div id="output">
                <div id="expression">{expression}</div>
                <div id="display">{currentVal}</div>
            </div>
            <button onClick={allClear} className="bg-danger" id="clear">AC</button>
            <button onClick={()=>{handleOperatorClick('/')}} className="operator" id="divide">/</button>
            <button onClick={()=>{handleOperatorClick('*')}} className="operator" id="multiply">*</button>
            <button onClick={()=>{ handleCurrentClickVal('7')}} id="seven">7</button>
            <button onClick={()=>{ handleCurrentClickVal('8')}} id="eight">8</button>
            <button onClick={()=>{ handleCurrentClickVal('9')}} id="nine">9</button>
            <button onClick={()=>{ handleOperatorClick('-')}} className="operator" id="subtract">-</button>
            <button onClick={()=>{ handleCurrentClickVal('4')}} id="four">4</button>
            <button onClick={()=>{ handleCurrentClickVal('5')}} id="five">5</button>
            <button onClick={()=>{ handleCurrentClickVal('6')}} id="six">6</button>
            <button onClick={()=>{ handleOperatorClick('+')}} className="operator"id="add">+</button>
            <button onClick={()=>{ handleCurrentClickVal('1')}} id="one">1</button>
            <button onClick={()=>{ handleCurrentClickVal('2')}} id="two">2</button>
            <button onClick={()=>{ handleCurrentClickVal('3')}} id="three">3</button>  
            <button onClick={calculate} className="bg-warning"id="equals">=</button>
            <button onClick={()=>{handleCurrentClickVal('0')}} id="zero">0</button>
            <button onClick={()=>{handleCurrentClickVal('.')}} id="decimal">.</button>   
        </div>
    );
}

var root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator/>)