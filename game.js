class gameboard {
    constructor (arr = []) {
        this._arr = arr;
        this._current_player = "o";
        this._winner = "";
    }
    set(x,y,symbol) {
        let idx = (x-1)+(y-1)*3;
        this.insert(idx,symbol);
    }
    insert(idx,symbol) {
        this._arr[idx] = symbol;
    }
    get(x,y) {
        let idx = (x-1)+(y-1)*3;
        return this._arr[idx];
    }
    is_free(x,y) {
        let tmp = this.get(x,y);
        return (!is_valid_symbol(tmp));
    }
    switch_player() {
        if (this._current_player == "o") this._current_player = "x";
        else this._current_player = "o";
    }
    is_game_over() {
        for (let i=0; i < 3; i++) {
            if (is_valid_symbol(this._arr[i]) && this._arr[i] == this._arr[i+3] && this._arr[i] == this._arr[i+6]) {
                this._winner = this._arr[i];
                return true;
            }
                
            if (is_valid_symbol(this._arr[0+i*3]) && this._arr[0+i*3] == this._arr[1+i*3] && this._arr[0+i*3] == this._arr[2+i*3]) {
                this._winner = this._arr[0+i*3];
                return true;
            }
                
        }
        if (is_valid_symbol(this._arr[0]) && this._arr[0] == this._arr[4] && this._arr[0] == this._arr[8]) {
            this._winner = this._arr[0];
            return true;
        }
            
        if (is_valid_symbol(this._arr[2]) && this._arr[2] == this._arr[4] && this._arr[2] == this._arr[6]) {
            this._winner = this._arr[2];
            return true;
        }
            
        for (let i=0; i < 9; i++) {
            if (!is_valid_symbol(this._arr[i])) break;
            if (i == 8) return true;
        }
        return false;
    }
    get_winner() {
        if (this._winner == "") return null;
        else return this._winner;
    }
    get_available_moves() {
        let arr = [];
        for (let i=0; i < 9; i++) {
            if (!is_valid_symbol(this._arr[i]))
                arr.push(i);
        }
        return arr;
    }
}

function is_valid_symbol(sym) {
    return (sym == "o" || sym == "x");
}
