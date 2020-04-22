const LINK = {
    // RUTAS DE SERVICIOS

    SERVICE_DEFAULT: 'http://192.168.43.80:8090/restobar/',
    //SERVICE_DEFAULT: 'http://192.168.43.80:8090',
    SERVICE_LOGIN_USER: 'usuario/obtenerUsuarioPorLogin/',
    SERVICE_CATEGORIAS: 'categoria/obtenerCategorias/',
    SERVICE_PRODUCTOS_POR_CATEGORIA: 'producto/obtenerProductosPorIdCategoria/',
    SERVICE_MESAS: 'mesa/obtenerMesas/',
    SERVICE_VENTAS_POR_COBRAR: 'venta/obtenerVentasPorCobrar/',
    SERVICE_VENTAS_GUARDAR: 'venta/guardarVenta/',
    SERVICE_VENTAS_CARGAR: 'venta/obtenerPorId/'
}

export {
    LINK
}