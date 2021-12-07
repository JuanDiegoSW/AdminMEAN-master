const getMenuFrontEnd = (role = 'ADMIN_ROLE') => {

    const menu = [
      {
        titulo: 'Usuarios',
        icono: 'mdi mdi-stove',
        submenu: [
<<<<<<< HEAD
          { titulo: 'Lista Usuarios', url: 'usuarios' },
=======
          { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Nuevo Usuario', url: 'usuarios/nuevo' },
>>>>>>> 2fe3f05c88210751c186d7060b6d545796806a16
        ]
      },
      {
        /** 1 */
        titulo: 'Clientes',
        icono: 'mdi mdi-stove',
        submenu: [
<<<<<<< HEAD
          { titulo: 'Lista Clientes', url: 'clientes' },
=======
          { titulo: 'Clientes', url: 'clientes' },
          { titulo: 'Nuevo Clientes', url: 'cliente/nuevo' },
>>>>>>> 2fe3f05c88210751c186d7060b6d545796806a16
        ]
      },
        {
          
          titulo: 'Productos',
          icono: 'mdi mdi-cake',
          submenu: [
            { titulo: 'Lista Productos', url: 'productos' },
<<<<<<< HEAD
=======
            { titulo: 'Nuevo Producto', url: 'producto/nuevo' },
>>>>>>> 2fe3f05c88210751c186d7060b6d545796806a16
          ]
        },
        {
          titulo: 'Categorias',
          icono: 'mdi mdi-folder-multiple',
          submenu: [
<<<<<<< HEAD
            { titulo: 'Lista Categorias', url: 'categorias' },
=======
            { titulo: 'Lista Categorias', url: 'categorias' }
>>>>>>> 2fe3f05c88210751c186d7060b6d545796806a16
          ]
        },
        {
          titulo: 'Ventas',
          icono: 'mdi mdi-clipboard-check',
          submenu: [
            { titulo: 'Lista Ventas', url: 'ventas' },
          ]
        },
        {
          titulo: 'Proveedores',
          icono: 'mdi mdi-stove',
          submenu: [
<<<<<<< HEAD
            { titulo: 'Lista Proveedores', url: 'proveedores' },
=======
            { titulo: 'Proveedores', url: 'proveedores' },
            { titulo: 'Nuevo Proveedor', url: 'proveedor/nuevo' },
>>>>>>> 2fe3f05c88210751c186d7060b6d545796806a16
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
