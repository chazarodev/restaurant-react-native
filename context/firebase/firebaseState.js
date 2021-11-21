import React, { useReducer } from 'react';
import firebaseApp from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';
import _ from 'lodash';

import { OBTENER_PRODUCTOS_EXITO } from '../../types';

const FirebaseState = props => {

    //Crear state inicial
    const initialState = {
        menu: []
    }

    //useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    //Función que se ejecuta para obtener los productos
    const obtenerProductos = () => {
        
        firebaseApp.db.collection('productos').where('existencia', '==', true) .onSnapshot(handleSnapshot);

        function handleSnapshot (snapshot) {
            let platillos = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            //Ordenar por categoria con loadlash
            platillos = _.sortBy(platillos, 'categoria');

            //Tenemos resultado de la base de datos
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload: platillos
            });
        }
    }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebaseApp,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
}

export default FirebaseState;