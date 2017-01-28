$(document).ready(function() {
    var player = 'X';
    var ai = 'O';
    var playerChoices = [];
    var aiChoices = ['5'];
    var yourTurn = true;
    var isGameOver = false;

    $('.no-element').hover(function() {
        if (isGameOver === false) {
            if ($(this).hasClass('no-element'))
                $(this).html('<span>' + player + '</span>');
        }

    }, function() {
        if (isGameOver === false) {
            if ($(this).hasClass('no-element'))
                $(this).html('<span></span>');
        }
    });

    //Radio buttons
    $('input[name=mode]:radio').change(function() {
        reset();
        if (player === 'X') {
            player = 'O';
            ai = 'X';
            $('#5').html("<span>X</span>");
        } else {
            player = 'X';
            ai = 'O';
            $('#5').html("<span>O</span>");
        }
    });

    //Players plays
    $('.no-element').click(function() {
        if (yourTurn && isGameOver === false) {
            if ($(this).hasClass('no-element')) {
                $(this).removeClass('no-element');
                $(this).html('<span>' + player + '</span>');
                playerChoices.push($(this)[0].id);
                makeTurn();
                if (checkForWin('player')[0] === 'true') {
                    for (i = 0; i < 10; i++) {
                        $('#' + i).removeClass('no-element');
                    }
                    isGameOver = true;
                    for (i = 1; i < 4; i++) {
                        $('#' + checkForWin('player')[i]).addClass('grey');
                    }
                } else if (checkForWin('ai')[0] === 'true') {
                    for (i = 0; i < 10; i++) {
                        $('#' + i).removeClass('no-element');
                    }
                    for (i = 1; i < 4; i++) {
                        $('#' + checkForWin('ai')[i]).addClass('grey');
                    }
                    isGameOver = true;
                }
            }
        }
    });

    //AI plays
    function makeTurn() {
        var number = 0;

        $('.grid-element').each(function(index) {
            number = number + 1;
        });
        var rnd = Math.floor((Math.random() * number) + 1);


        while (!$('#' + rnd).hasClass('no-element')) {
            rnd = Math.floor((Math.random() * number) + 1);
        }

        $('#' + rnd).html('<span>' + ai + '</span>');
        $('#' + rnd).removeClass('no-element');

        aiChoices.push($('#' + rnd)[0].id);


        yourTurn = true;

        if (checkForWin('player')[0] === 'true') {
            for (i = 0; i < 10; i++) {
                $('#' + i).removeClass('no-element');
            }
            isGameOver = true;
            for (i = 1; i < 4; i++) {
                $('#' + checkForWin('player')[i]).addClass('greybg');
            }
            setTimeout(reset, 2000);
        } else if (checkForWin('ai')[0] === 'true') {
            for (i = 0; i < 10; i++) {
                $('#' + i).removeClass('no-element');
            }
            for (i = 1; i < 4; i++) {
                $('#' + checkForWin('ai')[i]).addClass('greybg');
            }
            isGameOver = true;
            setTimeout(reset, 2000);
        }
        console.log(aiChoices);
    }

    function checkForWin(player) {
        //123, 456, 789, 147, 258, 369, 357, 159
        var choices;

        if (player === 'player')
            choices = playerChoices;
        else
            choices = aiChoices;
        //123
        if ($.inArray('1', choices) !== -1 && $.inArray('2', choices) !== -1 && $.inArray('3', choices) !== -1) {
            return ['true', '1', '2', '3'];
        }
        //456
        if ($.inArray('4', choices) !== -1 && $.inArray('5', choices) !== -1 && $.inArray('6', choices) !== -1) {
            return ['true', '4', '5', '6'];
        }
        //789
        if ($.inArray('7', choices) !== -1 && $.inArray('8', choices) !== -1 && $.inArray('9', choices) !== -1) {
            return ['true', '7', '8', '9'];
        }
        //147
        if ($.inArray('1', choices) !== -1 && $.inArray('4', choices) !== -1 && $.inArray('7', choices) !== -1) {
            return ['true', '1', '4', '7'];
        }
        //258
        if ($.inArray('2', choices) !== -1 && $.inArray('5', choices) !== -1 && $.inArray('8', choices) !== -1) {
            return ['true', '2', '5', '8'];
        }
        //369
        if ($.inArray('3', choices) !== -1 && $.inArray('6', choices) !== -1 && $.inArray('9', choices) !== -1) {
            return ['true', '3', '6', '9'];
        }
        //357
        if ($.inArray('3', choices) !== -1 && $.inArray('5', choices) !== -1 && $.inArray('7', choices) !== -1) {
            return ['true', '3', '5', '7'];
        }
        //159
        if ($.inArray('1', choices) !== -1 && $.inArray('5', choices) !== -1 && $.inArray('9', choices) !== -1) {
            return ['true', '1', '5', '9'];
        }
        return ['false'];

    }

    function reset() {
        playerChoices = [];
        aiChoices = [];
        yourTurn = true;
        isGameOver = false;

        for (i = 0; i < 10; i++) {
            if (i !== 5) {
                $('#' + i).html("<span></span>");
                $('#' + i).addClass('no-element');
            }
            $('#' + i).removeClass('greybg');
        }
    }

    function tie() {
    	var stuff = 0;
        for (i = 0; i < 10; i++) {
            if(!$('#' + i).hasClass('no-element')) {
            	stuff = stuff +1;
            }
        }

        if(stuff >= 10) {
        	setTimeout(reset, 2000);
        }
    }

    setInterval(tie, 10);

});
