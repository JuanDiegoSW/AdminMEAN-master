const getMenuFrontEnd = (role = 'ADMIN_ROLE') => {

    const menu = [
      {
        titulo: 'Usuarios',
        icono: 'mdi mdi-stove',
        submenu: [
          { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Lista Usuarios', url: 'usuarios' },
        ]
      },
      {
        /** 1 */
        titulo: 'Clientes',
        icono: 'mdi mdi-stove',
        submenu: [
          { titulo: 'Clientes', url: 'clientes' },
          { titulo: 'Lista Clientes', url: 'clientes' },
        ]
      },
        {
          
          titulo: 'Productos',
          icono: 'mdi mdi-cake',
          submenu: [
            { titulo: 'Lista Productos', url: 'productos' },
            { titulo: 'Nuevo Producto', url: 'productos' },
          ]
        },
        {
          titulo: 'Categorias',
          icono: 'mdi mdi-folder-multiple',
          submenu: [
            { titulo: 'Lista Categorias', url: 'categorias' },
            { titulo: 'Nueva Categoria', url: 'categorias' },
          ]
        },
        {
          titulo: 'Ventas',
          icono: 'mdi mdi-clipboard-check',
          submenu: [
            { titulo: 'Lista Ventas', url: 'hospitales' },
            { titulo: 'Nueva Venta', url: 'medicos' },
          ]
        },
        {
          titulo: 'Proveedores',
          icono: 'mdi mdi-stove',
          submenu: [
            { titulo: 'Proveedores', url: 'productos' },
            { titulo: 'Lista Proveedores', url: 'productos' },
          ]
        }/*,   
        {
          titulo: 'Usuarios',
          icono: 'mdi mdi-stove',
          submenu: [
            { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Lista Usuarios', url: 'usuarios' },
          ]
        },*/
      ];

    if ( role === 'ADMIN_ROLE' ) {
      menu.unshift(
        {
            titulo: "Dashboard", 
            icono: 'mdi mdi-view-dashboard', 
            submenu: [
              { titulo: 'Main', url: '/' },
              { titulo: 'Gráficas', url: 'grafica1' },
              { titulo: 'Rxjs', url: 'rxjs' },
              { titulo: 'Promesas', url: 'promesas' },
              { titulo: 'ProgressBar', url: 'progress' },
            ]
        }
      )
      
    }
    if ( role === 'USER_ROLE' ) {
      menu.shift({ 
        titulo: "Dashboard", 
        icono: 'mdi mdi-view-dashboard', 
        submenu: [
          { titulo: 'Main', url: '/' },
          { titulo: 'Gráficas', url: 'grafica1' },
          { titulo: 'Rxjs', url: 'rxjs' },
          { titulo: 'Promesas', url: 'promesas' },
          { titulo: 'ProgressBar', url: 'progress' },
        ]
      })
      /*
      menu[5].submenu.shift({ 
        titulo: "Usuarios"
      });
      menu[5].submenu.shift({ 
        titulo: "Lista Usuarios"
      });*/
      

      //menu[0].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
      //menu[4].submenu.unshift({ titulo: 'Agregar Nuevo', url: 'medicos'});

      //menu[5].submenu.shift({ titulo: 'Usuarios', url: 'usuarios' });

      
    }
    return menu;
}

module.exports = {
    getMenuFrontEnd
}
