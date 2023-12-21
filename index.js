var Path = [], cnt, level, flag = 0;

//adding event listeners
$('.box').on('click',function()
{
    handleClick(this);
});

//start game only when flag 0
$(document).on('keydown', function() { 
    if(flag == 0)
        playgame()
});

//starting game setting initial values and pushing a new element in path
function playgame()
{
    if(flag == 0)
    {
        Path = [];
        cnt = 0;
        level = 1;
        flag = 1;
        $('h1').text('Level ' + (level));
    }

    let rand = Math.floor(Math.random()*4);

    //generate random number and select a element from box arr and then pushing its class
    const BoxGenerated = document.querySelectorAll('.box')[rand];
    
    Path.push(BoxGenerated.classList[1])

    //only css selector work in this so animate like this
    $('.'+BoxGenerated.classList[1]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(BoxGenerated.classList[1]);    
    
    console.log(Path);
}

function handleClick(object)
{
    if(cnt < Path.length && flag == 1)
    {
        $('.'+object.classList[1]).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(object.classList[1]);        
       

        console.log(object.classList[1]);
        console.log(Path[cnt]);
        

        if(object.classList[1] == Path[cnt])
        {
            cnt++;
        }

        else
        {
            GameEnd();
        }
        
    }

    if(cnt == Path.length)
    {
        console.log('level increased to',level);
        
        cnt = 0;
       
        setTimeout(function() {

            $('h1').text('Level ' + (++level));
            playgame()

        },1000);
    }

}

function GameEnd()
{    
    playSound('wrong');     

    $('body').css('backgroundColor','red');

    setTimeout(function()
    {
        $('body').css('backgroundColor','#011f3f')
    },500)

    
    $('h1').text('Game Over, Press Any Key to Restart');
    flag = 0;
}

function playSound(str)
{
    let sound = new Audio('./sounds/' + str + '.mp3')
    sound.play();
}

//basically what i am doing is 

// 1) first create event listeners on all divs

// 2) create an event handler on keypress that triggers playgame()

// 3) inside plag game we check if game is fresh or being played again

// 4) in any case we generate a random number between 0-3 and select the div
// using query selector and abstract its class name from classList 
// and push it into Path array

// 5) now we wait for click to happen if click is on same object as the onemptied
// present on cnt index in array then you increase cnt 

// 6) we keep repeating this till cnt is equal to array length meaning no misclick
// and increase the level

// 7) if misclick happen we call Endgame method and change body and h1 style

//improvement

// now we set handleClick as it will only work when flag = 1 and 
// since in last click we got into endgame() means cnt cannot equal to 
// arr length as even for index 4 arr length is 5 

