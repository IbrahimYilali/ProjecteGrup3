import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FButton({ 
    selectedIcon,
    unselectedIcon,
    id,
    isSelected,
    onPress,
    isCircular = false // Propiedad para determinar si es circular
}) {
    return (
        <TouchableOpacity onPress={() => onPress(id)} style={styles.buttonContainer}>
            <View style={[styles.iconContainer, isCircular && styles.circular]}>
                <Icon
                    name={isSelected ? selectedIcon : unselectedIcon}
                    size={isCircular ? 40 : 30} // Tamaño del ícono
                    style={styles.icon}
                />
                {isSelected && <View style={styles.selectedLine} />}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    circular: {
        backgroundColor: '#FFF', // Fondo blanco para el botón circular
        borderRadius: 50, // Hacemos el botón circular
        padding: 10, // Espaciado interno
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Sombra para darle profundidad
    },
    icon: {
        margin: 5,
    },
    selectedLine: {
        height: 2,
        backgroundColor: 'black',
        width: 50,
        marginTop: 5,
    },
});
