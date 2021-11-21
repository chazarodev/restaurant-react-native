import React, {useContext, useEffect, Fragment} from 'react';
import { StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import globalStyles from '../styles/global';
import FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import {
    Container,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body
} from 'native-base'

const Menu = () => {

    //Context de firebase
    const {menu, obtenerProductos} = useContext(FirebaseContext);

    //Context Pedido
    const {seleccionarPlatillo} = useContext(PedidoContext);

    //Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerProductos();
    }, [])

    const mostrarHeading = (categoria, i) => {

        if (i > 0) {
            const categoriaAnterior = menu[i - 1].categoria;
            if (categoriaAnterior !== categoria) {
                return (
                    <Separator style={styles.separador}>
                        <Text style={styles.separadorTexto}>{categoria}</Text>
                    </Separator>
                )
            }
        } else {
            return (
                <Separator style={styles.separador}>
                    <Text style={styles.separadorTexto}>{categoria}</Text>
                </Separator>
            )
        }
    }

    return (  
        <Container style={globalStyles.contenedor}>
            <Content style={{backgroundColor: '#FFF'}}>
                <List>
                    {menu.map((platillo, i) => {
                        const {imagen, nombre, descripcion,precio, categoria, id} = platillo;
                        return (
                            <Fragment key={id}>
                                {mostrarHeading(categoria, i)}
                                <ListItem
                                    onPress={() => {
                                        seleccionarPlatillo(platillo);
                                        navigation.navigate("DetallePlatillo");
                                    }}
                                >
                                    <Thumbnail large source={{uri: imagen }}/>
                                    <Body>
                                        <Text>{nombre}</Text>
                                        <Text note numberOfLines={2}>{descripcion}</Text>
                                        <Text>Precio: ${precio}</Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000'
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold',
        fontSize: 16,
        textTransform: 'uppercase'
    }
});
 
export default Menu;