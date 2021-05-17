// User Stories

// I should see the timer increment every second once the page is loaded.
            // building a counter function with setInterval being 1000ms
            // probably a for loop?
            // this should be hooked to the innerHTML of elementId "counter"

// I can manually increment and decrement the counter using plus and minus buttons.
            // onClick eventListener to add or subtract from the the for loop 

// I can 'like' an individual number of the counter.
// I should see the number of 'likes' associated with the number displayed at click.
            // propose an onClick eventListener 
            // output innerHTML to unordered list (UL) - times clicked at counter time.
            // UL class= "likes" - assume will work in similar fashion to todo list challenge.


// I can pause the counter with a pause button. This:
        // pauses the counter
        // disables all buttons except pause
        // switches the button label from pause to resume 
            // onClick eventListener required
            // Will setTimeout and pause the counter function
            // Will disable buttons - CSS grey out to review
            // Change text and possibly elementId label to resume


// I should be able to click the restart button to restart the counter and re-enable the buttons 
// *** assuming restart here is referring to resume button ***
            // onClick eventListener will revert to original state            
            // to resume will use clearTimeout() function
            
// I can leave comments on the 'gameplay' such as: "Wow, what a fun game this is."
            // this will be similar to the todo list eventListener where it triggers from submit and lists output.
            // innerHTML to be hooked at elementId = "list"
            // CSS style required to remove list ornamentation (the bullet points!) yolo'd and just used paragraphs rather than list!


// Workflow Priority order (or which order I think I can get done more easily)

// 1 - Comments section

// Variables to locate Id's in DOM
const commentForm = document.getElementById("comment-form");
const commentText = document.getElementById("comment-input");
const commentSection = document.getElementById("list");

// Variable to create comments array
const comments = [];

// function to put comment text into array list
const commentObject = (text) => {
    comments.push(text);
    return comments;
};

// function to set HTML formatting for comments list
const formatComments = (input) => {
    return input.map( comment => {
        return `<p>${comment}</p>`
    });
};

// function to display comments on webpage
const displayComments = () => {
    return commentSection.innerHTML = formatComments(comments).join("");
};

// eventListener for submitting comments to page.
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    commentObject(commentText.value);
    e.target.reset();
    displayComments()
});


// 2 - Pause to Resume to disable remaining buttons
        // set other buttons to "buttonID".disabled = true; and vice versa

// variables to locate button Id's in DOM
const pauseButton = document.getElementById("pause");
// these Id's to be 'disabled' 
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const submitButton = document.getElementById("submit");
// commentText input variable declared globally above

// moved pause button to bottom as users the variables declared for the set interval need to be above it in the script.

// 3 - likes button will return UL list similar to todo, possibly easier than pause! (Narrator: it was not)

// DOM Variables
// heartButton variable in DOM declared above
const likesList = document.querySelector("ul.likes");

// create array to store likes
const likeArray = [];

// value for the counter
const counterElement = document.querySelector("h1#counter"); 
let counterValue = parseInt(counterElement.innerText);


// value for the likes
let likes = 0
// will need on counter change reset likes 
// increments the like counter on click - probably should be added to another function (e.g. likeObject)
const likeCounter = () => {
    likes++
};

// push to likeArray Current Counter Value, current number of clicks of Like
const likeObject = (counterVal, likeVal) => {
    let repeatCounterValue = likeArray.find( array => array.counterNumber === counterVal)
    if (!!repeatCounterValue) {
        repeatCounterValue.likeNumber.splice(-1, 1, likeVal);
    } else{ 
        likeArray.push({counterNumber: counterVal, likeNumber: [likeVal]})
    } 
    return likeArray
};



// format the like output to desired text - if/else to plural the output. 
// string similar to the example (reverse engineering it) but can be shortened data-num & span tags.
const formatLikes = (input) => {
    return input.map( array => {
        if(array.likeNumber == 1) {
        return `<li data-num="${array.counterNumber}"> ${array.counterNumber} has been liked <span>${array.likeNumber}</span> time.</li>`
        } else {
          return `<li data-num="${array.counterNumber}"> ${array.counterNumber} has been liked <span>${array.likeNumber}</span> times.</li>`
        }
    });
};
  
// function to display likes text.

const displayLikes = () => {
    return likesList.innerHTML = formatLikes(likeArray).join("");
}

 // What I believe is happening innerHTML <li> tag to say:
    // `<li data-num="${counterValue}"> ${counterValue} has been liked <span>${numberOfLikes}</span> time(s).</li>`
    // there is some form of an if/else for numberOfLikes >1 to assign " time" or " times"
    // there is no bullet formatting, there is no sorting by liked value (feature?)
heartButton.addEventListener("click", (e) =>{
    likeCounter(); // increases likes 'score' every click.
    likeObject(counterValue, likes); // calls function to push the counters value and the likes value to the likeArray.
    displayLikes(); // calls the string format of the array, joins it together and returns it to the innerHTML
});

// 4 - Counter function as everything else is dependent on it(!) 

// adds 1 to counter when called
const addToCounter = () => {
    counterValue++;
    displayCounter();
};
// displays the counter value to the webpage inner html.
const displayCounter = () => {
    return counterElement.innerHTML = counterValue
};
// sets the interval to call the addToCounter function. 
let counterInterval = setInterval(addToCounter, 1000);

// eventListener which on load calls the counter interval to start it off.
document.addEventListener("DOMContentLoaded", () => {
    counterInterval;
});

// 5 - increment decrement
    // no need to worry about going negative the example can as well!

//minus one to counter value, display the value on click.
minusButton.addEventListener("click", () =>{
    counterValue--;
    displayCounter();
});
// plus one to counter value, display the value on click.
plusButton.addEventListener("click", () => {
    counterValue++;
    displayCounter();
});


// 6 - pause and resume counter - add to the pauseResume function or pauseButton eventListener above

// pauseResume function - IF text value = pause, disable everything and change to resume ELSE enable and set pause.
const pauseResume = () => {
    if (pauseButton.innerText === "pause"){
            clearInterval(counterInterval);
            pauseButton.innerText = "resume";
            minusButton.disabled = true;
            plusButton.disabled = true;
            heartButton.disabled = true;
            submitButton.disabled = true;
            commentText.disabled = true;
    }else{
        counterInterval = setInterval(addToCounter, 1000);
        pauseButton.innerText = "pause";
        minusButton.disabled = false;
        plusButton.disabled = false;
        heartButton.disabled = false;
        submitButton.disabled = false;
        commentText.disabled = false;
    }
};


// event listener for pause button
pauseButton.addEventListener("click", (e) =>{
    // stop counter - setTimeOut function. (this is the pause!)
    pauseResume();
});


