class engine {
    constructor (depth = -1) {
        this._nodes = new Map();
        this._max_depth = depth;
    }
    evaluate(board, max = true, depth = 0) {
        if (depth == 0) this._nodes.clear();

        if (board.is_game_over() || this._max_depth == depth) {
            if (board._winner == "x") return 100 - depth;
            else if (board._winner == "o") return -100 + depth;
            else return 0;
        }

        if (max) {
            let best = -100; // worst case
            board.get_available_moves().forEach((idx) => {
                let new_board = new gameboard(board._arr.slice());
                new_board.insert(idx,"x"); // try next move

                let eval_value = this.evaluate(new_board,false,depth+1);
                best = Math.max(eval_value,best); // check if new move is better

                if (depth == 0) {
                    // build map by seperating with ,
                    let moves = this._nodes.has(eval_value) ? `${this._nodes.get(eval_value)},${idx}` : idx;
                    this._nodes.set(eval_value,moves);
                }
            });
            if (depth == 0) {
                let return_val = 0;
                // return best move
                if (typeof this._nodes.get(best) == "string") {
                    // more best moves
                    let tmp_arr = this._nodes.get(best).split(",");
                    // select random one from the array
                    return_val = tmp_arr[Math.floor(Math.random()*tmp_arr.length)];
                }
                else {
                    // just one best move
                    return_val = this._nodes.get(best);
                }
                return return_val;
            }
            return best;
        }
        else { // if min
            let best = 100; // worst case
            board.get_available_moves().forEach((idx) => {
                let new_board = new gameboard(board._arr.slice());
                new_board.insert(idx,"o"); // try next move

                let eval_value = this.evaluate(new_board,true,depth+1);
                best = Math.min(eval_value,best); // check if new move is better

                if (depth == 0) {
                    // build map by seperating with ,
                    let moves = this._nodes.has(eval_value) ? `${this._nodes.get(eval_value)},${idx}` : idx;
                    this._nodes.set(eval_value,moves);
                }
            });
            if (depth == 0) {
                let return_val = 0;
                // return best move
                if (typeof this._nodes.get(best) == "string") {
                    // more best moves
                    let tmp_arr = this._nodes.get(best).split(",");
                    // select random one from the array
                    return_val = tmp_arr[Math.floor(Math.random()*tmp_arr.length)];
                }
                else {
                    // just one best move
                    return_val = this._nodes.get(best);
                }
                return return_val;
            }
            return best;
        }
    }
}