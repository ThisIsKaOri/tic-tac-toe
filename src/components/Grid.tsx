import { useState } from "react";
import "./Grid.css";

type Option = 'X' | 'O' | '';

const Grid = () => {

    const [grid, setGrid] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
    const [player, setPlayer] = useState<Option>('X');
    const [winner, setWinner] = useState<Option>('');

    const onResetHandler = () => {

        setGrid([['', '', ''], ['', '', ''], ['', '', '']]);
        setPlayer('X');
        setWinner('');
    };

    const onClickHandler = (row: number, col: number, player: Option) => {

        if(!winner){

            if(!grid[row][col]) {

                grid[row][col] = player;
                setGrid([...grid]);

                if((grid[0][0] && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) ||
                   (grid[1][0] && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) ||
                   (grid[2][0] && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) ||
                   (grid[0][0] && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) ||
                   (grid[0][1] && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) ||
                   (grid[0][2] && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) ||
                   (grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) ||
                   (grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0])){
                    
                    setWinner(player);
                }
                
                setPlayer(player === 'X' ? player = 'O' : player = 'X');
            };
        }     
    }

    return(
        <>
        <h1 className="title"><kbd>Tic Tac Toe</kbd></h1>
        <h1>{!winner ? `Player ${player} move` : `Player ${winner} wins!`}</h1>
        <div className="grid">
            {grid.map((item, row) => {

                return item.map((_, col) => {

                    const winning = 
                    (grid[row][0] && grid[row][0] === grid[row][1] && grid[row][1]=== grid[row][2]) ||
                    (grid[0][col] && grid[0][col] === grid[1][col] && grid[1][col]=== grid[2][col]) ||
                    (row === col && grid[0][0] && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) ||
                    (row + col === 2 && grid[0][2] && grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]);

                    return <button className={`box outline ${winning ? "winning-box" : ""}`}
                    onClick={() => {onClickHandler(row, col, player)}}
                    >{grid[row][col]}</button>
                })
            })}
        <button id="reset" className="secondary outline"
            onClick={onResetHandler}>{!winner ? `Reset` : `Play Again`}</button>
        </div>
        </>
    );
};

export default Grid;