import { View, Text, StyleSheet, Button } from 'react-native';
import Square from './Square';
import { useState } from 'react';

// black lower case, white upper case
const INITIAL_BOARD = [
	['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
	['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
	['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

const ChessBoard = () => {
	const [board, setBoard] = useState(INITIAL_BOARD);
	const [selectedPiece, setSelectedPiece] = useState(null);
	const [isWhiteTurn, setIsWhiteTurn] = useState(true);
	const [moveCount, setMoveCount] = useState(1);

	const handleSquarePress = (row, col) => {
		const piece = board[row][col];
		const isWhitePiece = piece && piece.toUpperCase() === piece;

		// Only allow selecting pieces of current player's color
		if (!selectedPiece && piece) {
			if ((isWhiteTurn && isWhitePiece) || (!isWhiteTurn && !isWhitePiece)) {
				setSelectedPiece({ row, col });
			}
			return;
		}

		if (selectedPiece && !piece) {
			// Move piece to new position
			const newBoard = [...board];
			newBoard[row][col] = board[selectedPiece.row][selectedPiece.col]; // Place the selected piece on the new square
			newBoard[selectedPiece.row][selectedPiece.col] = null; // Remove the piece from its original square
			setBoard(newBoard);
			setSelectedPiece(null);
			setIsWhiteTurn(!isWhiteTurn);
			setMoveCount((prev) => prev + 1);
		} else {
			setSelectedPiece(null);
		}
	};

	const resetGame = () => {
		setBoard(INITIAL_BOARD);
		setSelectedPiece(null);
		setIsWhiteTurn(true);
		setMoveCount(1);
	};

	const rows = Array(8).fill(null);
	const cols = Array(8).fill(null);

	return (
		<View style={styles.container}>
			<Text style={styles.turnIndicator}>{isWhiteTurn ? "White's Turn" : "Black's Turn"}</Text>
			<Text style={styles.moveCounter}>Move: {moveCount}</Text>
			<View style={styles.board}>
				{rows.map((_, rowIndex) => (
					<View key={rowIndex} style={styles.row}>
						{cols.map((_, colIndex) => (
							<Square
								key={`${rowIndex}-${colIndex}`}
								isLight={(rowIndex + colIndex) % 2 === 0}
								piece={board[rowIndex][colIndex]}
								isSelected={selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex}
								onPress={() => handleSquarePress(rowIndex, colIndex)}
							/>
						))}
					</View>
				))}
			</View>
			<Button title='Reset Game' onPress={resetGame} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 20,
	},
	board: {
		borderWidth: 2,
		borderColor: 'black',
	},
	row: {
		flexDirection: 'row',
	},
	turnIndicator: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	moveCounter: {
		fontSize: 18,
		color: '#666',
	},
});

export default ChessBoard;
