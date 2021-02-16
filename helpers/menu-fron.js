
 const getMenu = (rol = 'USER_ROLE') => {
    const MENU = [
        {
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Gráfica', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Observables', url: 'observables' }
            ]
        },
        {
            titulo: 'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                //{ titulo: 'Usuarios', url: 'usuarios' },
                { titulo: 'Medicos', url: 'medicos' },
                { titulo: 'Hospitales', url: 'hospitales' },
            ]
        },
    ];

    if (rol === 'ADMIN_ROLE') {
        MENU[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' });
    }

    return MENU;
}


module.exports = {
    getMenu
}