import {
    SET_USER,
    GET_USER,
    ADICIONAR_PRODUCTO,
    DISMINUIR_PRODUCTO,
    CAMBIAR_MESA,
    CAMBIAR_ID_VENTA,
    CARGAR_VENTA
} from '../Constants'

// USER
const setUsuario = (user) => {
    return {
        type: SET_USER,
        user
    }
}

const getUsuario = () => {
    return {
        type: GET_USER
    }
}
// VENTA
const adicionar = (item) => {
    return {
        type: ADICIONAR_PRODUCTO,
        item
    }
}


const disminuir = (item) => {
    return {
        type: DISMINUIR_PRODUCTO,
        item
    }
}

const cambiarMesa = (idMesa) => {
    return {
        type: CAMBIAR_MESA,
        idMesa
    }
}

const cambiarIdVenta = (idVenta) => {
    return {
        type: CAMBIAR_ID_VENTA,
        idVenta
    }
}

const cargarVenta = (venta) => {
    return {
        type: CARGAR_VENTA,
        venta
    }
}

// usuario
export const obtenerUsuario = () => {
    return (dispatch) => {
        dispatch(getUsuario())
    }
}

export const establecerUsuario = (user) => {
    return (dispatch) => {
        dispatch(setUsuario(user))
    }
}

// venta
export const disminuirProducto = (item) => {
    return (dispatch) => {
        dispatch(disminuir(item))
    }
}

export const adicionarProducto = (item) => {
    return (dispatch) => {
        dispatch(adicionar(item))
    }
}

export const actualizarMesa = (idMesa) => {
    return (dispatch) => {
        dispatch(cambiarMesa(idMesa))
    }
}

export const actualizarIdVenta = (idVenta) => {
    return (dispatch) => {
        dispatch(cambiarIdVenta(idVenta))
    }
}

export const cargarDatosVenta = (venta) => {
    return (dispatch) => {
        dispatch(cargarVenta(venta))
    }
}