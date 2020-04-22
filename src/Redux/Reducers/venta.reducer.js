import {
  ADICIONAR_PRODUCTO,
  DISMINUIR_PRODUCTO,
  CAMBIAR_MESA,
  CAMBIAR_ID_VENTA,
  CARGAR_VENTA
} from "../Constants";
export const initialState = {
  items: [],
  cantidadTotal: 0,
  idVenta: 0,
  idSucursal: 1,
  idCliente: 1,
  fechaVenta: new Date(),
  importeTotalVenta: 0,
  importeIce: 0,
  importeExento: 0,
  ventasTasaCero: 0,
  subTotal: 0,
  descuentos: 0,
  importeBaseCF: 0,
  idMesa: undefined,
  idUsuarioMesero: 1,
  idParEstadoVenta: 16
};
export default reducer = (state = initialState, action) => {
  switch (action.type) {
    case CARGAR_VENTA:
      let sum = action.venta.items.reduce(
        (sum, current) => sum + current.cantidad,
        0
      );
      return {
        ...state,
        items: action.venta.items,
        cantidadTotal: sum,
        idVenta: action.venta.idVenta,
        idSucursal: action.venta.idSucursal,
        idCliente: action.venta.idCliente,
        fechaVenta: action.venta.fechaVenta,
        importeTotalVenta: action.venta.importeTotalVenta,
        importeIce: action.venta.importeIce,
        importeExento: action.venta.importeExento,
        ventasTasaCero: action.venta.ventasTasaCero,
        subTotal: action.venta.subTotal,
        descuentos: action.venta.descuentos,
        importeBaseCF: action.venta.importeBaseCF,
        idMesa: action.venta.idMesa,
        idUsuarioMesero: action.venta.idUsuarioMesero,
        idParEstadoVenta: action.venta.idParEstadoVenta
      };
    case CAMBIAR_ID_VENTA:
      return {
        ...state,
        idVenta: action.idVenta
      };
    case CAMBIAR_MESA:
      return {
        ...state,
        idMesa: action.idMesa
      };
    case ADICIONAR_PRODUCTO:
      let existe = state.items.find(
        val => val.idProducto === action.item.idProducto
      );
      if (existe) {
        // detalle
        existe.cantidad += 1;
        existe.montoVenta += Math.round(action.item.precio * 100) / 100;
        existe.montoTotalVenta += Math.round(action.item.precio * 100) / 100;

        return {
          ...state,
          items: state.items,
          importeTotalVenta:
            state.importeTotalVenta +
            Math.round(action.item.precio * 100) / 100,
          subTotal: state.subTotal + Math.round(action.item.precio * 100) / 100,
          importeBaseCF:
            state.subTotal - Math.round(state.descuentos * 100) / 100,
          cantidadTotal: state.cantidadTotal + 1
        };
      } else {
        // se adicionan los campos de la venta detalle
        action.item.idVentaDetalle = 0;
        action.item.idVenta = state.idVenta;
        action.item.idCompraDetalle = 0;
        action.item.cantidad = 1;
        action.item.precioUnidad = Math.round(action.item.precio * 100) / 100;
        action.item.descuentoUnidad = 0;
        action.item.montoVenta = Math.round(action.item.precio * 100) / 100;
        action.item.descuentoVenta = 0;
        action.item.montoTotalVenta =
          Math.round(action.item.precio * 100) / 100;
        action.item.observacion = "";
        action.item.existencia = 0;
        //
        return {
          ...state,
          items: state.items.concat(action.item),
          importeTotalVenta:
            state.importeTotalVenta +
            Math.round(action.item.precio * 100) / 100,
          subTotal: state.subTotal + Math.round(action.item.precio * 100) / 100,
          importeBaseCF:
            state.subTotal - Math.round(state.descuentos * 100) / 100,
          cantidadTotal: state.cantidadTotal + 1
        };
      }

    case DISMINUIR_PRODUCTO:
      let existe2 = state.items.find(
        val => val.idProducto === action.item.idProducto
      );

      if (existe2) {
        if (existe2.cantidad > 1) {
          existe2.cantidad -= 1;
          existe2.montoVenta -= Math.round(action.item.precio * 100) / 100;
          existe2.montoTotalVenta -= Math.round(action.item.precio * 100) / 100;
          return {
            ...state,
            items: state.items,
            importeTotalVenta:
              state.importeTotalVenta -
              Math.round(action.item.precio * 100) / 100,
            subTotal:
              state.subTotal - Math.round(action.item.precio * 100) / 100,
            importeBaseCF:
              state.subTotal - Math.round(state.descuentos * 100) / 100,

            cantidadTotal: state.cantidadTotal - 1
          };
        } else {
          let new_items = state.items.filter(
            item => action.item.idProducto !== item.idProducto
          );

          return {
            ...state,
            items: new_items,
            importeTotalVenta:
              state.importeTotalVenta -
              Math.round(action.item.precio * 100) / 100,
            subTotal:
              state.subTotal - Math.round(action.item.precio * 100) / 100,
            importeBaseCF:
              state.subTotal - Math.round(state.descuentos * 100) / 100,

            cantidadTotal: state.cantidadTotal - 1
          };
        }
      } else {
        return state;
      }
  }
  return state;
};
