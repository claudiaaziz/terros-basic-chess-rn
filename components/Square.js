import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Square = ({ isLight, piece, isSelected, onPress }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.square, { backgroundColor: isLight ? '#EBECD0' : '#779556' }, isSelected && styles.selected]}
		>
			<Text style={[styles.piece, { color: piece?.toLowerCase() === piece ? 'black' : 'white' }]}>{piece}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	square: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
	piece: {
		fontSize: 20,
	},
	selected: {
		backgroundColor: 'pink',
	},
});

export default Square;
