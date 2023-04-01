import React, { useEffect, useRef, useState } from 'react';

function Questions() {

    
    const [quesArr, setstate] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [testOver, setTestOver] = useState(false);
    const [scoreOver, setScoreOver] = useState(false);
    const [err, setErr] = useState(false);
    const Color = useRef();
    useEffect(()=>{
        setScoreOver(false)
        fetch('https://opentdb.com/api.php?amount=10&type=multiple')
                .then(res => res.json())
                .then(data => {
                setstate(data.results)
                setScoreOver(true)
        })
    },[])

    function handleAnswerClick(answer) {
        setErr(true)
        if(answer) {
            Color.current.className = 'lime';
            setScore(score + 1);
        }else {
            Color.current.className = 'red';    
        }
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        if (currentQuestionIndex === quesArr.length - 1) {
            setTestOver(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }

    if (testOver) {
        return (
            <div className='testOver'>
                <h1  className='title'>Test Over</h1>
                <p  className='text'> Your score {score}</p>
            </div>
        )
    }
    if(err){
        setTimeout(()=>{
            Color.current.className = '';
        }, 400)
    }

    return (
        <div ref={Color}>        
            {scoreOver? 
            <div>
                <h1 className='title'>Question {currentQuestionIndex + 1}</h1>
                <p className='text'>{quesArr[currentQuestionIndex].question}</p>
                <ul>
                    <li><button onClick={() => handleAnswerClick(true)}>{quesArr[currentQuestionIndex].correct_answer}</button></li>
                    {quesArr[currentQuestionIndex].incorrect_answers.map(item => <li  key={item}><button onClick={() => handleAnswerClick(false)}>{item}</button> </li>)}
                </ul>
                <p className='textScore'>Score {score}</p>
            </div>: <p className='Loading'> <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbkEUleF3nCVdro2mBkmhWxidHPC_jiW849g&usqp=CAU" alt="img"/></p>}
        </div>
    )
}

export default Questions;

