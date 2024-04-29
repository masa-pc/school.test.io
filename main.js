let question = [
    [
        "",
        "",
        "",
        "",
        "1"
    ],
    [
        "",
        "",
        "",
        "",
        "2"
    ],
    [
        "",
        "",
        "",
        "",
        "3"
    ]
];

let quiz = document.getElementById("question");
let ans1 = document.getElementById("ans1");
let ans2 = document.getElementById("ans2");
let ans3 = document.getElementById("ans3");
let num = question.length
let previous_score = localStorage.getItem("score");

console.log(num);

let correct = 0;
let quizCnt = 0;

function quizSet() {
    quiz.textContent = question[quizCnt][0];
    quiz.textContent = question[quizCnt][1];
    quiz.textContent = question[quizCnt][2];
    quiz.textContent = question[quizCnt][3];
}

quizSet();

function ansPercent(input_correct,input_quiz_num) {
    let before_percent = input_correct / input_quiz_num * 100
    percent = Math.round(before_percent);
    return percent;
}

function ansEvaluation(input_previous_score,input_score){
    let before_evaluation = input_score - input_previous_score
    let evaluation = Math.abs(before_evaluation);
    return evaluation;
}

function answerCheck(ans) {
    if(ans == question[quizCnt][4]){
        alert("正解！！");
        correct++
    } else{
        alert("不正解、、、");
    }
    quizCnt++
    console.log(`よくできました${quizCnt}問目完了`);
    if(quizCnt == question.length){

        if(previous_score > 0){
            h5.innerText = `前回の正解率${previous_score}%`;
        }else{
            h5.innerText = "次回から今回の正解率が表示されます"
        }


        localStorage.removeItem("score");

        let ans_percent = ansPercent(correct,num);

        localStorage.setItem("score",ans_percent);

        document.getElementById("form").style.display = "none";
        document.getElementById("answer1").style.display = "none";
        document.getElementById("answer2").style.display = "none";
        document.getElementById("answer3").style.display = "none";
        
        let ansEvaluation_let = ansEvaluation(previous_score,ans_percent);

        console.log(ansEvaluation_let);

        if(ans_percent > previous_score){
            h6.innerText = `前回より${ansEvaluation_let}点アップ！！`
        }else if(ans_percent == previous_score){
            h6.innerText = "前回と同じ点数です"
        }else{
            h6.innerText = `前回より${ansEvaluation_let}点ダウン、、`
        }

        h1.innerText = "正解率" + ans_percent + "%";

        quiz.textContent = `${num}問中、${correct}問正解でした！`
        ans1.textContent = "";
        ans2.textContent = "";
        ans3.textContent = "";
    } else{
        quizSet();
    }
}


form.addEventListener("submit",function(event){
    event.preventDefault();
    console.log(input.value);
    answerInput();
})

function answerInput(){
    let ansText = "";
    ansText = input.value;
    answerCheck(ansText);
    input.value = "";
}

// ほとんど完成。あとボタンを消して、questionの変数とquizCntの文字列を直す
// 追加の機能としてローカルストレージを使って、前回の正解率も出るようにする

