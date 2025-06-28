
const date = document.getElementById(`date`)
const form = document.querySelector(`.form`)
const inputsfield = document.querySelectorAll(`.day-input`)
const allContainer = document.querySelector(`.all-container`)
console.log(inputsfield)
const resultContainer = document.querySelector(`.result-container`)
const title = document.querySelector(`.headingTitle`)
const body = document.querySelector(`.bodytext`)
// const backton = document.getElementById(`backButton`)


function updateDateTime() {
    const now = new Date();

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit'
    };

    const formattedDate = now.toLocaleDateString('en-US', dateOptions);
    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

    const fullDateTime = `${formattedDate} ${formattedTime}`;

    const date = document.getElementById('date');
    if (date) {
      date.textContent = fullDateTime;
    }
}

updateDateTime();
setInterval(updateDateTime, 60000);


// form-action
form.addEventListener(`submit`, function (event) {
  event.preventDefault()

  // To remove old container when user submit
  const oldResult = document.querySelector('.result-container');
  if (oldResult) {
      oldResult.remove();
  }


  // Saved user workhours input into an array for calculation
  const dailyHours = Array.from(inputsfield).map(input => {
    return Number(input.value) || 0;
  })

  // Stored day name in an array
  const dayNames = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`]
    
  // calculating total hours worked
  const totalHours = dailyHours.reduce((sum, h) => sum + h, 0)

  // calculating average hours per day
  const average = Math.round((totalHours / 6) * 10) / 10

  // calculating Most hours and day
  const maxHours = Math.max(...dailyHours)
  const maxDayIndex = dailyHours.indexOf(maxHours)
  const topDay = dayNames[maxDayIndex]

  // calculating Days worked
  const daysWorked = dailyHours.filter(h => h > 0).length


  // calling and saving the functions for different logics and terms depending on user workhours input
  const moodMessages = getmooodmessage(totalHours)
  const maximumdayHours = getmaxmumHours(maxHours, topDay)
  const daysWork = getdayWorked(daysWorked)
  const status = getstatusMessage(totalHours)

  // The message that will show when user click submit buttons after entering their workhous for each day
  const messageResult = `Na ${totalHours} hours you don hustle this week 🔥. You do average of ${average} hours/day. ${maximumdayHours}. ${daysWork}. ${status}. See you next week`


  // Creating the result container with Javascript
  const resultContainer = document.createElement(`div`)
  resultContainer.classList.add(`result-container`)

  const resultelement = document.createElement(`div`)
  resultelement.classList.add(`result-body-content`)

  const resultheading = document.createElement(`h4`)
  resultheading.classList.add(`result`)

  const resultContent = document.createElement(`p`)
  resultContent.classList.add(`result-content`)

  const backBtn = document.createElement('button');
  backBtn.classList.add(`button`)
  backBtn.id = 'backBtn';
  backBtn.textContent = '← Go Back';

  // Appending individual container to their parents
  resultelement.append(resultheading, resultContent)
  resultContainer.appendChild(resultelement)
  resultContainer.appendChild(backBtn)
  allContainer.appendChild(resultContainer)


  // Appending the content to the container childer
  resultheading.textContent = moodMessages
  resultContent.textContent = messageResult

  // Backbutton that return the form input after submit
  backBtn.addEventListener('click', () => {
    resultContainer.remove(); 
    form.style.display = 'block';
    title.textContent = `Track your week`
    body.textContent = `See your total work hours, average hrs/day, top day, and work status `
  });

  // Form display when you submit and show the result
  form.style.display = `none`
  resultContainer.style.display = `block`
  title.textContent = `Result Don Show oo`
  body.textContent = `See wetin you do this week `
  inputsfield.forEach(input => input.value = '');

})

// Individuals functions for different user input based on work hours input

// function for mooodmessage h4
function getmooodmessage(totalHours) {
  if (totalHours >= 50) {
    return `No kill yourself oo ! Over ${totalHours} hours. Wetin happen `  
  } else if (totalHours >= 40) {
    return  `You be bravo I swear ajeh ${totalHours} hours, work-aholic! Solid grind this week`
    
  } else if (totalHours >= 35) {
    return `You self try and you no small ${totalHours} hours this week! Keep it up`
    
  } else {
    return  `${totalHours} hours? Na light week, recharge and show more energy next week oo`
  }
}

// status messages
function getstatusMessage(totalHours) {
  const isfulltime = totalHours >= 40
  if (isfulltime) {
     return  `Na full time work status for the week oo! 🔥 Abeg try rest small make you no vanish 🙏`;
  } else if (totalHours >= 35) {
    return  `Omor you really work this time around. Be like say you dey work from home or na freelance?`;
  } else if (totalHours >=25){
    return  `Be like say you enjoy yourself gan this week do, na part time work you do. E no reach full-time/freelance hours`;
  }
}

// maximum hours worked
function getmaxmumHours(maxHours,topDay) {

  if (maxHours >= 15) {
    return  `You do nightshift for ${topDay}? ${maxHours} hours?? 😳 Na money matter dey your mind ehnn`;
       
  } else if (maxHours >= 10) {
    return  `You work most on ${topDay} for ${maxHours} hours 💼 Idan chasing the bag grinding`;
  } else {
    return `${topDay} no bad, ${maxHours} hours steady grind 👌🏾🧱`;
  }

}

// Days worked
function getdayWorked(daysWorked) {

  if (daysWorked === 6) {
    return  `You no gree rest at all. ${daysWorked} days straight? `
  } else if (daysWorked >= 3) {
    return `You balance am well. You dey consistent for ${daysWorked} days`
  } else if (daysWorked >= 2) {
    return `You dey manage sha, at least you show face ${daysWorked} days`
  } else {
    return `Just ${daysWorked} days? e small oo. Try pull up more next time.`
  }
}

// To validate user input workhours to match normal daily work hours
inputsfield.forEach(function (inputfield) {
  inputfield.addEventListener('keyup', function () {
    inputfield.classList.add(`touched`)
    validateWorkhoursInputNumber();
  });
});

function validateWorkhoursInputNumber() {
  let workHours = true
  const alertContent = document.querySelectorAll(`.alert`)

  inputsfield.forEach(function (input, index) {
    const value = input.value.trim();
    const number = Number(input.value)
    const alertcontent = alertContent[index]


    if (number < 0 || number > 17 || isNaN(number)) {
      workHours = false
      input.style.border = `1px solid red`
      alertcontent.style.visibility = `visible`
      alertcontent.textContent = `No way you work more than 17hrs. Working hours must be from 0 - 17`
    } else {
      input.style.border = `1px solid #374151`
      alertcontent.textContent = ``
    }
    
  }) 
}




  