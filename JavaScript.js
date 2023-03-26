const rows = [
  [
    document.getElementById("row1Num1"),
    document.getElementById("row1Num2"),
    document.getElementById("row1Num3"),
    document.getElementById("row1Num4"),
    document.getElementById("row1Num5"),
  ],
  [
    document.getElementById("row2Num1"),
    document.getElementById("row2Num2"),
    document.getElementById("row2Num3"),
    document.getElementById("row2Num4"),
    document.getElementById("row2Num5"),
  ],
  [
    document.getElementById("row3Num1"),
    document.getElementById("row3Num2"),
    document.getElementById("row3Num3"),
    document.getElementById("row3Num4"),
    document.getElementById("row3Num5"),
  ],
  [
    document.getElementById("row4Num1"),
    document.getElementById("row4Num2"),
    document.getElementById("row4Num3"),
    document.getElementById("row4Num4"),
    document.getElementById("row4Num5"),
  ],
  [
    document.getElementById("row5Num1"),
    document.getElementById("row5Num2"),
    document.getElementById("row5Num3"),
    document.getElementById("row5Num4"),
    document.getElementById("row5Num5"),
  ],
  [
    document.getElementById("row6Num1"),
    document.getElementById("row6Num2"),
    document.getElementById("row6Num3"),
    document.getElementById("row6Num4"),
    document.getElementById("row6Num5"),
  ],
];

let acceptableWords;
let answer = "manic";

fetch("sgb-words.txt")
  .then(function (response) {
    return response.text();
  })
  .then(function (data) {
    acceptableWords = data.trim().split("\n");
    console.log(acceptableWords);
  })
  .catch(function (error) {
    console.error(error);
  });

let guessedWord;
const topColor = "rgba(255, 255, 255, 1)";
const bottomColor = "rgba(255, 255, 0, 1)";
let message = document.getElementById("message");

let currentRow = 0;
let currentNum = 0;

let currentTile = rows[currentRow][currentNum];

let oneTimeBoolean;

let greenSpots = [];
let yellowSpots = [];
let GArray = [];
let YArray = [];
let YnGArray;

let ans1 = answer.charAt(0).toUpperCase();
let ans2 = answer.charAt(1).toUpperCase();
let ans3 = answer.charAt(2).toUpperCase();
let ans4 = answer.charAt(3).toUpperCase();
let ans5 = answer.charAt(4).toUpperCase();
console.log("HI");
document.addEventListener("keydown", function (event) {
  keyWasPressed(event.key);
  console.log("HI");
});

function keyWasPressed(keyCode) {
  currentTile = rows[currentRow][currentNum];
  oneTimeBoolean = false;

  if (/^[a-z]$/i.test(keyCode) == true) {
    keyCode = keyCode.toUpperCase();
    currentTile.innerHTML = keyCode;
    currentNum += 1;
    if (currentNum > 5) {
      currentNum = 5;
    }
  } else if (keyCode == "Backspace") {
    if (currentNum > 0) {
      currentNum -= 1;
      currentTile = rows[currentRow][currentNum];
      currentTile.innerHTML = " ";
    }
  } else if (keyCode == "Enter") {
    if (/^[a-z]+$/i.test(rows[currentRow][4].innerHTML) == true) {
      guessedWord =
        rows[currentRow][0].innerHTML +
        rows[currentRow][1].innerHTML +
        rows[currentRow][2].innerHTML +
        rows[currentRow][3].innerHTML +
        rows[currentRow][4].innerHTML;

      outerloop: for (i = 0; i < acceptableWords.length; i++) {
        if (acceptableWords[i].toUpperCase() == guessedWord) {
          YnGArray = checkYnG(guessedWord);
          console.log(YnGArray[0][0] + " GA");
          console.log(YArray + " YA");
          for (i = 0; i < 5; i++) {
            const elementHeight = rows[currentRow][YnGArray[1][i]].offsetHeight;

            if (rows[currentRow][YnGArray[0][i]] != null)
              rows[currentRow][
                YnGArray[0][i]
              ].style.backgroundColor = `linear-gradient(to bottom, ${topColor} 0%, ${topColor} 90%, ${bottomColor} 90%, ${bottomColor} 100%)`;
            if (rows[currentRow][YnGArray[1][i]] != null) {
              rows[currentRow][
                YnGArray[1][i]
              ].style.backgroundColor = `linear-gradient(to bottom, ${topColor} 0%, ${topColor} 90%, ${bottomColor} 90%, ${bottomColor} 100%)`;
            }
          }
          if (YnGArray[0].length == 5) {
            message.innerHTML = "YOU WINNNNNNNNNNNNNNNNNN";
            setTimeout(function () {
              message.innerHTML = " ";
            }, 100000);
          }
          currentRow += 1;
          currentNum = 0;

          oneTimeBoolean = true;
          break outerloop;
        }
        if (i == acceptableWords.length - 1) {
          NotAWord();
        }
      }
    } else {
      message.innerHTML = "Row Not Full";
      setTimeout(function () {
        message.innerHTML = " ";
      }, 2000);
    }
  }
}

function NotAWord() {
  if (oneTimeBoolean == false) {
    message.innerHTML = "Invalid Word";
    setTimeout(function () {
      message.innerHTML = " ";
    }, 2000);
  }
  oneTimeBoolean = false;
}

function checkYnG(guessedWordChars) {
  let gu1 = guessedWordChars.charAt(0).toUpperCase();
  let gu2 = guessedWordChars.charAt(1).toUpperCase();
  let gu3 = guessedWordChars.charAt(2).toUpperCase();
  let gu4 = guessedWordChars.charAt(3).toUpperCase();
  let gu5 = guessedWordChars.charAt(4).toUpperCase();

  greenSpots = []; // Reset greenSpots
  yellowSpots = []; // Reset yellowSpots

  guArray = [gu1, gu2, gu3, gu4, gu5];
  ansArray = [ans1, ans2, ans3, ans4, ans5];

  for (j = 0; j < 5; j++) {
    if (guArray[j] == ansArray[j]) {
      greenSpots.push(j);
    }

    if (guArray[j] == ansArray[0] && j != 0) {
      yellowSpots.push(j);
    }

    if (guArray[j] == ansArray[1] && j != 1) {
      yellowSpots.push(j);
    }

    if (guArray[j] == ansArray[2] && j != 2) {
      yellowSpots.push(j);
    }

    if (guArray[j] == ansArray[3] && j != 3) {
      yellowSpots.push(j);
    }

    if (guArray[j] == ansArray[4] && j != 4) {
      yellowSpots.push(j);
    }
  }

  console.log(greenSpots + "GREEN");
  console.log(yellowSpots + "YELLOW");
  return [greenSpots, yellowSpots];
}
