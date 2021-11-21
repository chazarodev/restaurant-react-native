import React, {useState, useContext, useEffect} from 'react';
import { Alert } from 'react-native';
import globalStyles from '../styles/global';
import PedidoContext from '../context/pedidos/pedidosContext';
import {
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const FormularioPlatillo = () => {

    //State para cantidades
    const [cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(0);

    //Context
    const {platillo, guardarPedido} = useContext(PedidoContext);
    const {precio} = platillo;

    //Redireccionar
    const navigation = useNavigation();

    //En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad])

    //Calcula el total del platillo 
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    //Decrementar uno
    const decrementarUno = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);    
        }
    }

    //Incrementa en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }

    //COnfirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido?',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        //Almacenar el pedido en el pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        }
                        guardarPedido(pedido);

                        //Navegar hacía el resumen
                        navigation.navigate("ResumenPedido");
                    },
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    }

    return (  
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button 
                                props
                                dark
                                style={{height: 80, justifyContent: 'center', width: '100%'}}
                                onPress={() => decrementarUno()}
                            >
                                <Icon style={{fontSize: 40}} name="remove"/>
                            </Button>
                        </Col>
                        <Col>
                            <Input 
                                style={{textAlign: 'center', fontSize: 20}}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText={cantidad => guardarCantidad(cantidad)}
                            />
                        </Col>
                        <Col>
                        <Button 
                                props
                                dark
                                style={{height: 80, justifyContent: 'center', width: '100%'}}
                                onPress={() => incrementarUno()}
                            >
                                <Icon style={{fontSize: 40}} name="add"/>
                            </Button>
                        </Col>
                    </Grid>
                    <Text style={globalStyles.cantidad}>SubTotal: ${total}</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button 
                        style={globalStyles.boton}
                        onPress={() => confirmarOrden()}
                    >
                        <Text style={globalStyles.botonTexto}>Agregar al pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
 
export default FormularioPlatillo;