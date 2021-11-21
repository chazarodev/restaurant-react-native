
import React, {useContext, useEffect} from 'react';
import { Alert, StyleSheet } from 'react-native';
import globalStyles from '../styles/global';
import PedidoContext from '../context/pedidos/pedidosContext';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import firebaseApp from '../firebase';

const ResumenPedido = () => {

    //Direccionar al menú
    const navigation = useNavigation();

    //Context del pedido
    const {pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado} = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
    }

    //Redirecciona al progreso del pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizar tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        //Crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, //array
                            creado: Date.now()
                        }

                        try {
                            //Escribir el pedido en firebase
                            const pedido = await firebaseApp.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            
                            //Redireccionar a progeso
                            navigation.navigate("ProgresoPedido");
                            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                {
                    text: 'Revisar', style: 'cancel'
                }
            ]
        )
    }

    //Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar esta órden?',
            'Presiona confirmar para eliminar el artículo',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Eliminar del state
                        eliminarProducto(id);
                    }
                },
                {
                    text: 'Cancelar', style: 'cancel'
                }
            ]
        )
    }

    return (  
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen del pedido</H1>
                {pedido.map((platillo, i) => {
                    const {nombre, cantidad, imagen, id, precio} = platillo
                    return(
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large source={{uri: imagen}} />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: ${precio}</Text>

                                    <Button
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, {color: '#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                <Text style={globalStyles.cantidad}>Total a pagar: ${total}</Text>
                <Button
                    rounded
                    block
                    full
                    style={{backgroundColor: '#FC8B3D', marginVertical: 30}}
                    onPress={() => navigation.navigate("Menu")}
                >
                    <Text style={globalStyles.botonTexto}>Ordenar Más</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                <Button
                    rounded
                    block
                    full
                    style={globalStyles.boton}
                    onPress={() => progresoPedido()}
                >
                    <Text style={globalStyles.botonTexto}>Realizar Orden</Text>
                </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
 
export default ResumenPedido;