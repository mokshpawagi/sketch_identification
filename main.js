quick_draw_data_set=[sketch_name];

random_no = Math.floor((Math.random()*array_1.length)+1);
sketch_name = Math.floor((Math.random()*array_1.length)+1);
console.log(random_no);
Element_of_array = array_1[random_no];

var timer_counter = 0;
var timer_check = "";
var drawn_sketch = "";
var awnser_holder = "";
var score = 0;

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}
function setup(){
    canvas = createCanvas(280,280);
    background("white");
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;

}
function update_canvas(){
    background("white");

}


function draw(){
    checkSketch();
    if (drawn_sketch == sketch){
        awnser_holder = "set";
        score++;
        document.getElementById("score").innerHTML = 'score: ' + score;

    }

    strokeWeight(5);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function checkSketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML = 'timer: ' + timer_counter;
    console.log(timer_counter);
    if (timer_counter > 400){
       timer_counter = 0;
       timer_check = "completed";
       if (timer_check == "completed" ||  awnser_holder == "set"){
            timer_check = "";
           awnser_holder = "";
           update_canvas();
       }
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult)
} 
function gotResult(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

        document.getElementById('confidence').innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + '%';

    }
}
    
