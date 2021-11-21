import { CONFIRMAR_ORDEN_PLATILLO, ELIMINAR_PRODUCTO, MOSTRAR_RESUMEN, PEDIDO_ORDENADO, SELECCIONAR_PRODUCTO } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO: 
            return{
                ...state,
                platillo: action.payload
            }

        case CONFIRMAR_ORDEN_PLATILLO: 
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }

        case MOSTRAR_RESUMEN: 
            return {
                ...state,
                total: action.payload
            }

        case ELIMINAR_PRODUCTO: 
            return {
                ...state,
                pedido: state.pedido.filter(articulo => articulo.id !== action.payload)
            }

        case PEDIDO_ORDENADO: 
            return {
                ...state,
                pedido: [],
                total: 0,
                idpedido: action.payload
            }
        
        default:
            return state;
    }
}