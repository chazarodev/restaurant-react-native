import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1,
    },
    titulo: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 30
    },
    imagen: {
        height: 300,
        width: '100%'
    },
    cantidad: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold'
    },  
    boton: {
        backgroundColor: '#FFDA00'
    },
    botonTexto: {
        textTransform: "uppercase",
        fontWeight: 'bold',
        color: '#000',
        fontSize: 16
    }
});

export default globalStyles;