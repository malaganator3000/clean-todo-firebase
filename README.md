# clean-todo-firebase

**clean-todo-firebase** es un proyecto de gestión de tareas (to-do) que utiliza Clean Architecture para asegurar un diseño escalable y mantenible. Esta aplicación web se basa en **React** para la interfaz de usuario, **Express** para el servidor, y **Firebase** como backend para la gestión de datos.

## Características

- **Arquitectura Limpia**: Implementa los principios de Clean Architecture para separar las preocupaciones y facilitar la evolución del código.
- **Gestión de Tareas**: Permite a los usuarios agregar, editar, eliminar y listar tareas de manera eficiente.
- **Firebase como Backend**: Utiliza Firebase Firestore para el almacenamiento de datos, ofreciendo una integración rápida y robusta con servicios en la nube.
- **SSR y Rehidratación**: Utiliza el renderizado del lado del servidor (SSR) para mejorar la experiencia del usuario y la optimización SEO, con rehidratación de componentes en el cliente.
- **Interfaz Amigable**: Desarrollada con **Tailwind CSS** para proporcionar una experiencia de usuario moderna y responsiva.

## Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, TypeScript
- **Base de Datos**: Firebase Firestore

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`
3. Establece la variable de entorno para Firebase:
   \`\`\`bash
   export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
   \`\`\`
4. Asegúrate de tener configurado un método de autenticación en Firebase y una base de datos de Firestore.
5. Compila y ejecuta el servidor:
   \`\`\`bash
   npm run dev
   \`\`\`

## Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar, abre un problema o una solicitud de extracción.