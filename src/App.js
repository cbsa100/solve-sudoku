import Header from './components/Header';
import Grid from './components/Grid';

const App = () => {
    // function board_to_line(list) {
    //   let board = []
    //   if (list.length === 9) {
    //     list.forEach(i => { board.push(i) })
    //     return board
    //   }

    //   else {
    //     return list
    //   }
    // }
    function line_to_board(list_) {
        let list = [...list_];
        let board = [];
        if (list.length === 81) {
            let line = [];
            list.forEach((x) => {
                line.push(x);
                if (line.length % 9 === 0) {
                    board.push(line);
                    line = [];
                }
            });
            return board;
        } else {
            return list;
        }
    }
    function check_box(x, y, cb_bl, n) {
        let cb_board = line_to_board(cb_bl);
        for (let i = n; i < 10; i++) {
            cb_board[x][y] = i;
            if (valid_solution(cb_board)) {
                return i;
            }
        }
        return -1;
    }
    function no_zeros(list_to_check) {
        // removes all zeros from list"
        list_to_check.sort();
        while (list_to_check.includes(0)) {
            list_to_check.shift();
        }
        return list_to_check;
    }
    function removeDuplicates(arr) {
        var returnarr = [];
        returnarr = arr.filter(
            (value, index, array) => array.indexOf(value) === index
        );
        return returnarr;
    }
    function valid_solution(vs_board) {
        //check if current board is ok
        let lx = 0,
            rx = 0;
        let block = [];
        for (let i = 0; i < 9; i++) {
            // checks for lines and rows
            let row = [];
            var nz_line = no_zeros([...vs_board[i]]);
            if (nz_line.length !== removeDuplicates(nz_line).length) {
                return false;
            }
            for (let j = 0; j < 9; j++) {
                row.push(vs_board[j][i]);
            }
            var nz_row = no_zeros([...row]);
            if (nz_row.length !== removeDuplicates(nz_row).length) {
                return false;
            }
        }

        while (lx < 8) {
            rx = 0;
            while (rx < 8) {
                for (let i = lx; i < lx + 3; i++) {
                    for (let j = rx; j < rx + 3; j++) {
                        block.push(vs_board[i][j]);
                    }
                }
                rx += 3;
                let nz_block = no_zeros([...block]);
                if (nz_block.length !== removeDuplicates(nz_block).length) {
                    return false;
                }
                block = [];
            }
            lx += 3;
        }
        return true;
    }
    const solver = (_board_line) => {
        let board_line = [..._board_line];
        let los = [];
        let n = 1;
        while (board_line.includes(0) === true) {
            let first_missing = board_line.indexOf(0);
            let cb_return = check_box(
                Math.floor(first_missing / 9),
                first_missing % 9,
                board_line,
                n
            );
            n = 1;
            if (cb_return === -1) {
                let to_continue = true;
                while (to_continue) {
                    if (los.length === 0) {
                        return 'unsolvable';
                    }
                    if (los[los.length - 1][0] === 9) {
                        board_line[los[los.length - 1][1]] = 0;
                        los.pop();
                    } else {
                        board_line[los[los.length - 1][1]] = 0;
                        n = los[los.length - 1][0] + 1;
                        los.pop();
                        to_continue = false;
                    }
                }
            } else {
                los.push([cb_return, first_missing]);
                board_line[first_missing] = cb_return;
            }
        }
        return valid_solution(line_to_board(board_line))
            ? board_line
            : 'unsolvable';
    };

    const solveSudoku = () => {
        var arr = [];
        var allInputs = document.querySelectorAll('.cell-input');
        allInputs.forEach((ele) =>
            ele.value === '' ? arr.push(0) : arr.push(Number(ele.value))
        );
        var finalArr = solver(arr);
        if (finalArr === 'unsolvable') {
            alert('this sudoku is unsolvable');
            for (let i = 0; i < 81; i++) {
                allInputs[i].value = null;
            }
        } else {
            for (let i = 0; i < 81; i++) {
                allInputs[i].value = finalArr[i];
            }
        }
    };
    return (
        <div className='container'>
            <Header />
            <Grid solveSudoku={solveSudoku} />
        </div>
    );
};

export default App;
