

let app = {};
let comp = {};
let diff = 0;

window.onload = () => {
    $(".game").hide();
    $(".game_btn").hide();

    $("#start_game").click(() => {
        $(".game").show();
        $(".inside_form").hide();
        $(".game_btn").show();
        $("#p1").html(0); $("#p2").html(0);
        app = new gameboard();
        diff = $("#diff").val();
        console.log(diff);
        comp = new engine(diff);
        resize();
        start();
    });

    $("#new_game").click(() => {
        app = new gameboard();
        comp = new engine(diff);
        start();
    });

    $("#home").click(() => {
        $(".game").hide();
        $(".game_btn").hide();
        $(".inside_form").show();
    });
}

window.onresize = resize;

function start() {
    clear();
    // add click listener
    for(let x = 1; x <= 3; x++) {
        for(let y = 1; y <= 3; y++) {
            $("#"+x+"_"+y).click(() => {
                if (!app.is_free(x,y)) return;
                app.set(x,y,app._current_player);
                app.switch_player();
                draw();

                if (app.is_game_over()) {
                    if (app.get_winner() == "o")
                        $("#p1").html(Number($("#p1").html())+1);
                    else if (app.get_winner() == "x")
                        $("#p2").html(Number($("#p2").html())+1);
                    remove_listener();
                    return;
                }

                app.insert(comp.evaluate(app),app._current_player); // engine
                app.switch_player();
                draw();

                if (app.is_game_over()) {
                    if (app.get_winner() == "o")
                        $("#p1").html(Number($("#p1").html())+1);
                    else if (app.get_winner() == "x")
                        $("#p2").html(Number($("#p2").html())+1);
                    remove_listener();
                    return;
                }
            });
        }
    }
}


function resize() {
    $(".box").css("height",$(".box").css("width"));
}


function draw() {
    clear();
    for(let x = 1; x <= 3; x++) {
        for(let y = 1; y <= 3; y++) {
            let symbol = app.get(x,y);
            if (symbol == "o")
                $("#"+x+"_"+y).html("<image xlink:href='img/O.svg' x='5%' y='5%' height='90%' width='90%'></image>");
            else if (symbol == "x")
                $("#"+x+"_"+y).html("<image xlink:href='img/X.svg' x='5%' y='5%' height='90%' width='90%'></image>");
        }
    }
}

function clear() {
    for(let x = 1; x <= 3; x++) {
        for(let y = 1; y <= 3; y++) {
            $("#"+x+"_"+y).html("");
        }
    }
}


function remove_listener() {
    for(let x = 1; x <= 3; x++) {
        for(let y = 1; y <= 3; y++) {
            $("#"+x+"_"+y).off("click");
        }
    }
}
