import { View, StyleSheet } from 'react-native';
import Square from './Square';
import { useState } from 'react';

const ChessBoard = () => {
	// black lower case, white upper case
	const [board, setBoard] = useState([
		['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
		['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
		['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
	]);

	const [selectedPiece, setSelectedPiece] = useState(null);
	const [isWhiteTurn, setIsWhiteTurn] = useState(true);

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
			setIsWhiteTurn(!isWhiteTurn); // Switch turns after a move
		} else {
			// Deselect the current piece
			setSelectedPiece(null);
		}
	};

	const rows = Array(8).fill(null);
	const cols = Array(8).fill(null);

	return (
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
	);
};

const styles = StyleSheet.create({
	board: {
		borderWidth: 2,
		borderColor: 'black',
	},
	row: {
		flexDirection: 'row',
	},
});

export default ChessBoard;
