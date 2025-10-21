# Bot de WhatsApp con Node.js

## Descripción del Proyecto
Estructura básica para crear un bot de WhatsApp utilizando Node.js y Express.

## Tecnologías
- **Backend**: Node.js, Express
- **Frontend**: React, Vite, TypeScript
- **Almacenamiento**: En memoria (MemStorage)

## Estructura del Proyecto

### Backend (`/server`)
- `index.ts` - Punto de entrada del servidor Express
- `routes.ts` - Rutas de la API (webhooks de WhatsApp)
- `storage.ts` - Capa de almacenamiento en memoria

### Frontend (`/client`)
- Interfaz opcional para administración del bot
- Componentes UI con Shadcn/UI y Tailwind CSS

### Esquema Compartido (`/shared`)
- `schema.ts` - Tipos y esquemas compartidos entre frontend y backend

## Configuración

### Variables de Entorno
Crea un archivo `.env` con las siguientes variables:
```
WHATSAPP_VERIFY_TOKEN=tu_token_de_verificacion
WHATSAPP_ACCESS_TOKEN=tu_token_de_acceso
WHATSAPP_PHONE_NUMBER_ID=tu_phone_number_id
```

### Iniciar el Proyecto
El servidor se ejecuta automáticamente con el workflow "Start application" que ejecuta:
```bash
npm run dev
```

Esto inicia:
- Express server en el puerto configurado
- Vite dev server para el frontend

## Próximos Pasos
1. Configurar credenciales de WhatsApp Business API
2. Implementar lógica de webhook para recibir mensajes
3. Agregar lógica de respuesta automática
4. Implementar persistencia si es necesaria

## Recursos Útiles
- [WhatsApp Business API Docs](https://developers.facebook.com/docs/whatsapp)
- [Express.js Docs](https://expressjs.com/)
- [Shadcn/UI Components](https://ui.shadcn.com/)
