import React, { useReducer } from 'react';
import PedidoReducer from './pedidosReducer';
import PedidoContext from './pedidosContext';
import { 
    SELECCIONAR_PRODUCTO, 
    CONFIRMAR_ORDEN_PLATILLO ,
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO
} from '../../types';

const PedidoState = props => {
    
    //Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idpedido: ''
    }

    //useReducer
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    //Selecciona el producto 
    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        });
    }

    //Cuando el usuario confirma un platillo
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDEN_PLATILLO,
            payload: pedido
        })
    }

    //Muestra el total a pagar en el Resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        });
    }

    //Elimina un artículo del carrito
    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        });
    }

    const pedidoRealizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }

    return (  
        <PedidoContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idpedido: state.idpedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado
            }}
        >
            {props.children}
        </PedidoContext.Provider>
    );
}
 
export default PedidoState;