$(document).ready(function() {
    var canvas = $("#gameCanvas");
    var context = canvas.get(0).getContext("2d");
    var winWidth = document.body.clientWidth;
    var winHeight = document.body.clientHeight+20;
    $('#gameCanvas').attr('width',winWidth);
    $('#gameCanvas').attr('height',winHeight);
    // 画布尺寸 
    var canvasWidth  = winWidth;
    var canvasHeight  = winHeight;
    var color = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    // 游戏设置
    var playGame;
    var asteroids;
    var numAsteroids;
    var player;
    var score;
    var scoreTimeout;
    var arrowUp = 38;
    var arrowRight = 39;
    var arrowDown = 40;
    // 提示层
    var ui = $("#gameUI");
    var uiIntro = $("#gameIntro");
    var uiStats = $("#gameStats");
    var uiComplete = $("#gameComplete");
    var uiPlay = $("#gamePlay");
    var uiReset = $(".gameReset");
    var uiScore = $(".gameScore");
    // 声音
    var soundBackground = $("#gameSoundBackground").get(0);
    var soundThrust = $("#gameSoundThrust").get(0);
    var soundDeath = $("#gameSoundDeath").get(0);
    
    // 障碍物设置
    var Asteroid = function(x, y, radius, vX) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vX = vX;
    };
    // 玩家设置
    var Player = function(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;
        this.vX = 0;
        this.vY = 0;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.flameLength = 20;
    };
    function myFn(e) {
            var y = Math.round(e.beta);//y
            var z = Math.round(e.gamma);//Z
            var x = Math.round(e.alpha);//x
            if (playGame == false) {
                playGame = true;
                soundBackground.currentTime = 0;
                soundBackground.play();
                // 循环
                animate();
                timer();
            };
            console.log(player.x)
            player.x = x/90 * 200 + 150;
            player.y = y/90 * 200 + 150;
            // if ( x > 2 && x < 10 ) {
            //     console.log('右边');
            //     player.moveRight = true;
            // } else if ( x < -2 && x > -10 ) {
            //     console.log('左边');
            // } else if ( x < 2 && x > -2){
            //     player.moveRight = false;
            // }
            // if ( y > 78 && y < 88 ) {
            //     player.moveUp = true;
            //     console.log('上边');
            // } else if ( y > 92 && y < 112 ) {
            //     console.log('下边');
            //     player.moveDown = true;
            // }else if ( y < 92 && y > 88) {
            //     player.moveUp = false;
            //     player.moveDown = false;
            // }
        }
    // 初始函数
    function init() {
        uiStats.hide();
        uiComplete.hide();
        uiPlay.click(function(e) {
            e.preventDefault();
            uiIntro.hide();
            startGame();
        });
        
        uiReset.click(function(e) {
            e.preventDefault();
            uiComplete.hide();
            // Stop sound
            soundThrust.pause();
            soundBackground.pause();
            clearTimeout(scoreTimeout);
            $(window).unbind("keyup");
            $(window).unbind("keydown");
            // removeEventListenerc
            console.log(myFn)
            window.removeEventListener('deviceorientation', myFn);
            startGame();
        });
    };
    // 游戏设置函数
    function startGame() {
        // 重置游戏
        uiScore.html("0");
        uiStats.show();
        
        // 游戏设置
        playGame = false;
        asteroids = new Array();
        numAsteroids = 10;
        score = 0;
        player = new Player(150, canvasHeight/2);
        score = 0;
        // 设置Canvas
        for (var i = 0; i < numAsteroids; i++) {
            var radius = 5+(Math.random()*10);
            var x = canvasWidth+radius+Math.floor(Math.random()*canvasWidth);
            var y = Math.floor(Math.random()*canvasHeight);
            var vX = -5-(Math.random()*5);
            asteroids.push(new Asteroid(x, y, radius, vX));
        };
        // 游戏操作
        window.addEventListener('deviceorientation', myFn);
        $(window).keydown(function(e) {
            var keyCode = e.keyCode;
            if (playGame == false) {
                playGame = true;
                // 背景应音乐
                soundBackground.currentTime = 0;
                soundBackground.play();
                animate();
                timer();
            };

            if (keyCode == arrowRight) {
                player.moveRight = true;
                if (soundThrust.paused) {
                    soundThrust.currentTime = 0;
                    soundThrust.play();
                };
            } else if (keyCode == arrowUp) {
                player.moveUp = true;
            } else if (keyCode == arrowDown) {
                player.moveDown = true;
            };      
        });
        $(window).keyup(function(e) {
            var keyCode = e.keyCode;
            if (keyCode == arrowRight) {
                player.moveRight = false;
                soundThrust.pause();
            } else if (keyCode == arrowUp) {
                player.moveUp = false;
            } else if (keyCode == arrowDown) {
                player.moveDown = false;
            };
        });
        animate();
    };

    function timer() {
        if (playGame) {
            scoreTimeout = setTimeout(function() {
                uiScore.html(++score);      
                // 难度
                if (score % 5 == 0) {
                    numAsteroids += 5;
                };
                timer();
            }, 1000);
        };
    };
    
    // 循环函数
    function animate() {
        context.clearRect(0, 0, canvasWidth, canvasHeight); 
        var asteroidsLength = asteroids.length;
        for (var i = 0; i < asteroidsLength; i++) {
            var tmpAsteroid = asteroids[i];
            tmpAsteroid.x += tmpAsteroid.vX;
            // 过边界重置
            if (tmpAsteroid.x+tmpAsteroid.radius < 0) {
                tmpAsteroid.radius = 5+(Math.random()*10);
                tmpAsteroid.x = canvasWidth+tmpAsteroid.radius;
                tmpAsteroid.y = Math.floor(Math.random()*canvasHeight);
                tmpAsteroid.vX = -5-(Math.random()*5);
            };
            // 碰撞检测
            var dX = player.x - tmpAsteroid.x;
            var dY = player.y - tmpAsteroid.y;
            var distance = Math.sqrt((dX*dX)+(dY*dY));
            if (distance < player.halfWidth+tmpAsteroid.radius) {
                soundThrust.pause();
                soundDeath.currentTime = 0;
                soundDeath.play();
                // 游戏结束设置                
                playGame = false;
                clearTimeout(scoreTimeout);
                uiStats.hide();
                uiComplete.show();
                soundBackground.pause();
                // 结束后不能操作
                $(window).unbind("keyup");
                $(window).unbind("keydown");
                window.removeEventListener('deviceorientation', myFn);
                };
            // var color = `rgb(${~~(Math.random()*200 + 55)},${~~(Math.random()*200 + 55)},${~~(Math.random()*200 + 55)})`;
            // console.log(color) 闪烁彩色
            context.fillStyle = color;
            context.beginPath();
            context.arc(tmpAsteroid.x, tmpAsteroid.y, tmpAsteroid.radius, 0, Math.PI*2, true);
            context.closePath();
            context.fill();
        };
        // Update player
        player.vX = 0;
        player.vY = 0;
        if (player.moveRight) {
            player.vX = 3;
        } else {
            player.vX = -3;
        };
        if (player.moveUp) {
            player.vY = -3;
        };
        if (player.moveDown) {
            player.vY = 3;
        };
        //飞船位置
        player.x += player.vX;
        player.y += player.vY;
        //玩家边界探查
        if (player.x-player.halfWidth < 20) {
            player.x = 20+player.halfWidth;
        } else if (player.x+player.halfWidth > canvasWidth - 120 ) {
            player.x  = canvasWidth-120-player.halfWidth;
        }
        if (player.y-player.halfHeight < 20) {
            player.y = 20+player.halfHeight;
        } else if (player.y+player.halfHeight > canvasHeight - 120 ) {
            player.y = canvasHeight-120-player.halfHeight;
        };
        // canvas画玩家
        if (player.moveRight) {
            context.save();
            context.translate(player.x, player.y);
            if (player.flameLength == 20) {
                player.flameLength = 15;
            } else {
                player.flameLength = 20;
            };
            context.fillStyle = "orange";
            context.beginPath();
            context.moveTo(-12-player.flameLength, 0);
            context.lineTo(0, -5);
            context.lineTo(0, 5);
            context.closePath();
            context.fill();
            context.restore();
        };
        context.fillStyle = "rgb(255, 0, 0)";
        context.beginPath();
        context.moveTo(player.x+player.halfWidth, player.y);
        context.lineTo(player.x-player.halfWidth, player.y-player.halfHeight);
        context.lineTo(player.x-player.halfWidth, player.y+player.halfHeight);
        context.closePath();
        context.fill();
        
        // 添加新的星星                
        while (asteroids.length < numAsteroids) {
            var radius = 5+(Math.random()*10);
            var x = Math.floor(Math.random()*canvasWidth)+canvasWidth+radius;
            var y = Math.floor(Math.random()*canvasHeight);
            var vX = -5-(Math.random()*5);
            asteroids.push(new Asteroid(x, y, radius, vX));
        };
        if (playGame) {
            setTimeout(animate, 33);
        };
    };
    init();
});
