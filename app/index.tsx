import { View, StyleSheet } from 'react-native';
import ChessBoard from '../components/ChessBoard';

export default function Index() {
	return (
		<View style={styles.container}>
			<ChessBoard />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
