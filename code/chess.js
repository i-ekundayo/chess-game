const box = document.querySelectorAll('.box');

function insertImages(){
    box.forEach((image) => {
        if(image.innerText.length !== 0) {
            if(image.innerText == 'Wpawn' || image.innerText == 'Bpawn') {
                image.innerHTML = `${image.innerText} <img class='allImg allPawn' src='../images/${image.innerText}.png'>`;
                image.style.cursor = 'pointer';
            }
            else{
                image.innerHTML = `${image.innerText} <img class='allImg' src='../images/${image.innerText}.png'>`;
                image.style.cursor = 'pointer';
            }
        }
    })
}
insertImages();

// coloring
function coloring() {
    box.forEach((color) => {
        var getId, arr, aside, aup, a;
        getId = color.id;
        arr = Array.from(getId);
        arr.shift();
        aside =  eval(arr.pop());
        aup = eval(arr.shift());
        a = aside + aup;

        if(a % 2 == 0) {
            color.style.background = 'rgb(240, 201, 150)';
        }
        else {
            color.style.background = 'rgb(100, 75, 43)';
        }
    })
}
coloring();

// replacing a promoted pawn
function promote() {
    
}

// to red the same element
function reddish() {
    box.forEach((i1) => {
        var greenText, greenColor, pinkText, pinkColor;
        if (i1.style.backgroundColor == 'pink') {
            box.forEach((i2) => {
                if(i2.style.backgroundColor == 'green' && i2.innerText.length !== 0) {
                    greenText = i2.innerText;
                    pinkText = i1.innerText;

                    pinkColor = ((Array.from(pinkText)).shift()).toString();
                    greenColor = ((Array.from(greenText)).shift()).toString();

                    if(pinkColor == greenColor) {
                        i2.style.backgroundColor = 'rgb(253, 60, 60)'
                    }
                }
            })
        }
    })
}


var tog = 1;
box.forEach((item) => {
    item.addEventListener('click', (e)=> {
        var getId, arr, aside, aup, a;
        getId = item.id;
        arr = Array.from(getId);
        arr.shift();
        aside =  eval(arr.pop());
        arr.push('0');
        aup = eval(arr.join(''));
        a = aside + aup;

        // moving the elements
        if(item.style.backgroundColor == 'green') {
            box.forEach((i) => {
                if(i.style.background == 'pink') {
                    var pinkId = i.id;
                    var pinkText = i.innerText;

                    // pawn promotion
                    if(tog % 2 !== 0 && aup == 800 && pinkText == 'Wpawn') {
                        
                        const wOfficial = document.querySelectorAll('.Wofficial');
                        document.querySelector('.W').style.display = 'flex';
                        wOfficial.forEach((off) => {
                            off.addEventListener('click', (e) => {
                                item.innerText = off.innerText;
                                insertImages();
                                coloring();
                                document.querySelector('.W').style.display = 'none';
                            })
                        })
                    }

                    if(tog % 2 == 0 && aup == 100 && pinkText == 'Bpawn') {
                        const bOfficial = document.querySelectorAll('.Bofficial');
                        document.querySelector('.B').style.display = 'flex';
                        bOfficial.forEach((off) => {
                            off.addEventListener('click', (e) => {
                                item.innerText = off.innerText;
                                insertImages();
                                coloring();
                                document.querySelector('.B').style.display = 'none';
                            })
                        })
                    } //pawn promotion end

                    document.getElementById(pinkId).innerText = '';
                    item.innerText = pinkText;
                    coloring();
                    insertImages();
                    tog = tog + 1;

                }
            })
        }
       

        // function to display the available paths for all pieces

        function whosTurn(toggle) {
            
            // PAWN
            if(item.innerText == `${toggle}pawn`) {
                item.style.backgroundColor = 'pink';

                if(tog % 2 !== 0 && aup < 800) {
                    if(document.getElementById(`b${a + 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + 100}`).style.backgroundColor = 'green';
                    }
                    if(aside < 8 && document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green';
                    }
                    if(aside > 1 && document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green';
                    }
                }

                if(tog % 2 == 0 && aup < 800) {
                    if(document.getElementById(`b${a - 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - 100}`).style.backgroundColor = 'green';
                    }
                    if(aside < 8 && document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green';
                    }
                    if(aside > 1 && document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0) {
                        document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green';
                    }
                }  
            }

            // KING

            if(item.innerText == `${toggle}king`) {
                if(aside < 8) {
                    document.getElementById(`b${a + 1}`).style.backgroundColor = 'green';
                }

                if(aside > 1) {
                    document.getElementById(`b${a - 1}`).style.backgroundColor = 'green';
                }

                if(aup < 800) {
                    document.getElementById(`b${a + 100}`).style.backgroundColor = 'green';
                }

                if(aup > 100) {
                    document.getElementById(`b${a - 100}`).style.backgroundColor = 'green';
                }

                if(aup > 100 && aside < 8) {
                    document.getElementById(`b${a - 100 + 1}`).style.backgroundColor = 'green';
                }

                if(aup > 100 && aside > 1) {
                    document.getElementById(`b${a - 100 - 1}`).style.backgroundColor = 'green';
                }

                if(aup < 800 && aside < 8) {
                    document.getElementById(`b${a + 100 + 1}`).style.backgroundColor = 'green';
                }
                
                if(aup < 800 && aside > 1) {
                    document.getElementById(`b${a + 100 - 1}`).style.backgroundColor = 'green';
                }
                item.style.backgroundColor = 'pink';
            }

            // ROOK
            if(item.innerText == `${toggle}rook`) {
                for(let i = 1; i < 9; i++) {
                    if((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green';
                    }
                    else if((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i = 1; i < 9; i++) {
                    if((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green';
                    }
                    else if((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i = 1; i < 9; i++) {
                    if((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green';
                    }
                    else if((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i = 1; i < 9; i++) {
                    if((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green';
                    }
                    else if((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green';
                        break;
                    }
                }
                item.style.backgroundColor = 'pink';
            }

            // BISHOP
            if(item.innerText == `${toggle}bishop`) {
                item.style.backgroundColor = 'pink';

                for(let i= 1; i < 9; i++) {
                    if(i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green';
                    }
                    else if(i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green';
                    }
                    else if(i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green';
                    }
                    else if(i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green';
                    }
                    else if(i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

            }

            // QUEEN
            if(item.innerText == `${toggle}queen`) {
                item.style.backgroundColor = 'pink';

                for(let i = 1; i < 9; i++) {
                    if((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green';
                    }
                    else if((a + i * 100) < 900 && document.getElementById(`b${a + i * 100}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i = 1; i < 9; i++) {
                    if((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green';
                    }
                    else if((a - i * 100) > 100 && document.getElementById(`b${a - i * 100}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i = 1; i < 9; i++) {
                    if((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green';
                    }
                    else if((a + i) < (aup + 9) && document.getElementById(`b${a + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i = 1; i < 9; i++) {
                    if((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green';
                    }
                    else if((a - i) > (aup) && document.getElementById(`b${a - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green';
                    }
                    else if(i < (900 - aup) / 100 && i < 9 - aside && document.getElementById(`b${a + i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 + i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green';
                    }
                    else if(i < aup / 100 && i < 9 - aside && document.getElementById(`b${a - i * 100 + i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 + i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green';
                    }
                    else if(i < (900 - aup) / 100 && i < aside && document.getElementById(`b${a + i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a + i * 100 - i}`).style.backgroundColor = 'green';
                        break;
                    }
                }

                for(let i= 1; i < 9; i++) {
                    if(i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green';
                    }
                    else if(i < aup / 100 && i < aside && document.getElementById(`b${a - i * 100 - i}`).innerText.length !== 0) {
                        document.getElementById(`b${a - i * 100 - i}`).style.backgroundColor = 'green';
                        break;
                    }
                }
            }

            // KNIGHT
            if(item.innerText == `${toggle}knight`) {
                console.log((aside < 7 && aup < 800).id);
                if(aside < 7 && aup < 800) {
                    document.getElementById(`b${a + 100 + 2}`).style.backgroundColor = 'green';
                }
                if(aside < 7 && aup > 100) {
                    document.getElementById(`b${a - 100 + 2}`).style.backgroundColor = 'green';
                }
                if(aside < 8 && aup < 700) {
                    document.getElementById(`b${a + 200 + 1}`).style.backgroundColor = 'green';
                }
                if(aside > 1 && aup < 700) {
                    document.getElementById(`b${a + 200 - 1}`).style.backgroundColor = 'green';
                }
                if(aside > 2 && aup < 800) {
                    document.getElementById(`b${a + 100 - 2}`).style.backgroundColor = 'green';
                }
                if(aside > 2 && aup > 100) {
                    document.getElementById(`b${a - 100 - 2}`).style.backgroundColor = 'green';
                }
                if(aside < 8 && aup > 200) {
                    document.getElementById(`b${a - 200 + 1}`).style.backgroundColor = 'green';
                }
                if(aside > 1 && aup > 200) {
                    document.getElementById(`b${a - 200 - 1}`).style.backgroundColor = 'green';
                }

                item.style.backgroundColor = 'pink';
            }

        }

        // Toggling the turn
        if(tog % 2 !== 0) {
            document.getElementById('tog').innerText = 'White\'s Turn';
            document.getElementById('tog').style.backgroundColor = 'black';
            document.querySelector('body').style.backgroundColor = 'white';
            document.getElementById('tog').style.color = 'white';
            whosTurn('W');
        }

        if(tog % 2 == 0) {
            document.getElementById('tog').innerText = 'Black\'s Turn';
            document.getElementById('tog').style.backgroundColor = 'white';
            document.getElementById('tog').style.color = 'black';
            document.querySelector('body').style.backgroundColor = 'black';
            whosTurn('B');
        }

        reddish();


        // winning
        var numOfKings = 0;

        box.forEach((win) => {
            if(win.innerText == 'Wking' || win.innerText == 'Bking') {
                numOfKings += 1;
            }
        })

        if(numOfKings == 1) {
            setTimeout(() => {
                if(tog % 2 == 0) {
                    alert('White Wins !!')
                    location.reload();
                }
                if(tog % 2 !== 0) {
                    alert('Black Wins !!')
                    location.reload();
                }
            }, 100);
        }
    })
})


// prevents from selecting multiple elements
var z = 0;
box.forEach((ee) => {
    ee.addEventListener('click', (e) => {
        z = z + 1;
        if (z % 2 == 0 && ee.style.backgroundColor !== 'green') {
            coloring();
        }
    })
})
