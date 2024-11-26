import { View, StyleSheet } from 'react-native';
import Square from './Square';

const ChessBoard = () => {
	const rows = Array(8).fill(null);
	const cols = Array(8).fill(null);

	return (
		<View style={styles.board}>
			{rows.map((_, rowIndex) => (
				<View key={rowIndex} style={styles.row}>
					{cols.map((_, colIndex) => (
						<Square key={`${rowIndex}-${colIndex}`} isLight={(rowIndex + colIndex) % 2 === 0} />
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
