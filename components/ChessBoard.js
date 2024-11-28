import { View, Text, StyleSheet, Button } from 'react-native';
import Square from './Square';
import { useState } from 'react';

const ChessBoard = () => {
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

	const [board, setBoard] = useState(INITIAL_BOARD);
	const [selectedPiece, setSelectedPiece] = useState(null);
	const [isWhiteTurn, setIsWhiteTurn] = useState(true);
	const [moveCount, setMoveCount] = useState(1);
	const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });

	const isValidMove = (fromRow, fromCol, toRow, toCol) => {
		const piece = board[fromRow][fromCol];

		// Pawn movement rules
		if (piece?.toLowerCase() === 'p') {
			const isWhitePawn = piece === 'P';
			const direction = isWhitePawn ? -1 : 1; // White moves up (-1), Black moves down (+1)

			// Simple forward move
			if (fromCol === toCol) {
				// One square forward
				if (toRow === fromRow + direction) {
					return true;
				}

				// First move can be two squares
				const startRow = isWhitePawn ? 6 : 1;
				if (fromRow === startRow && toRow === fromRow + direction * 2) {
					return true;
				}
			}
		}

		// Knight movement rules
		if (piece?.toLowerCase() === 'n') {
			const rowDiff = Math.abs(toRow - fromRow);
			const colDiff = Math.abs(toCol - fromCol);

			// 2 squares in one direction and 1 in the other
			return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
		}

		// Rook movement rules
		if (piece?.toLowerCase() === 'r') {
			if (fromRow === toRow || fromCol === toCol) {
				const rowDirection = fromRow === toRow ? 0 : toRow > fromRow ? 1 : -1;
				const colDirection = fromCol === toCol ? 0 : toCol > fromCol ? 1 : -1;

				let currentRow = fromRow + rowDirection;
				let currentCol = fromCol + colDirection;

				// check if path is clear
				while (currentRow !== toRow || currentCol !== toCol) {
					if (board[currentRow][currentCol]) {
						return false;
					}
					currentRow += rowDirection;
					currentCol += colDirection;
				}
				return true;
			}
		}

		return false;
	};

	// Either selecting a piece or making a move
	const handleSquarePress = (row, col) => {
		const piece = board[row][col];
		const isWhitePiece = piece && piece.toUpperCase() === piece;

		// If the square is already selected, deselect it
		if (piece === selectedPiece) {
			setSelectedPiece(null);
			return;
		}

		// Only allow selecting pieces of current player's color
		if (!selectedPiece && piece) {
			if ((isWhiteTurn && isWhitePiece) || (!isWhiteTurn && !isWhitePiece)) {
				setSelectedPiece({ row, col });
			}
			return;
		}

		if (selectedPiece) {
			// First check if the move is valid
			if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
				// If there's a piece at destination, we'll capture it. TODO: Improve validation
				if (piece) {
					const isWhitePieceCaptured = piece.toUpperCase() === piece;
					setCapturedPieces((prev) => ({
						white: isWhitePieceCaptured ? [...prev.white, piece] : prev.white,
						black: !isWhitePieceCaptured ? [...prev.black, piece] : prev.black,
					}));
				}

				// Make the move
				const newBoard = [...board];
				newBoard[row][col] = board[selectedPiece.row][selectedPiece.col];
				newBoard[selectedPiece.row][selectedPiece.col] = null;
				setBoard(newBoard);
				setIsWhiteTurn(!isWhiteTurn);
				setMoveCount((prev) => prev + 1);
			}

			// Move is invalid, deselect the piece for now
			setSelectedPiece(null);
		}
	};

	const resetGame = () => {
		setBoard(INITIAL_BOARD);
		setSelectedPiece(null);
		setIsWhiteTurn(true);
		setMoveCount(1);
		setCapturedPieces({ white: [], black: [] });
	};

	const rows = Array(8).fill(null);
	const cols = Array(8).fill(null);

	return (
		<View style={styles.container}>
			<Text style={styles.turnIndicator}>{isWhiteTurn ? "White's Turn" : "Black's Turn"}</Text>
			<Text style={styles.moveCounter}>Move: {moveCount}</Text>
			<View style={styles.capturedContainer}>
				<Text>White captured: {capturedPieces.black.join(' ')}</Text>
				<Text>Black captured: {capturedPieces.white.join(' ')}</Text>
			</View>
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
	capturedContainer: {
		marginVertical: 10,
		alignItems: 'center',
	},
});

export default ChessBoard;
