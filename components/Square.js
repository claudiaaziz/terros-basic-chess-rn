import { View, StyleSheet } from 'react-native';

const Square = ({ isLight }) => {
	return <View style={[styles.square, { backgroundColor: isLight ? '#EBECD0' : '#779556' }]} />;
};

const styles = StyleSheet.create({
	square: {
		width: 40,
		height: 40,
	},
});

export default Square;
