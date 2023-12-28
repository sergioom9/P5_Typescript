Práctica 5 - API GraphQL Gestor de Cómics
Se utilizarán tres tipos principales: Usuario, Comic y Colección de Comics.
Tipos de Datos:
1. Usuario:
   - Atributos: `id`, `nombre`, `correoElectrónico`, 'colección de comics.
   - Objetivo: Gestionar información sobre usuarios que pueden tener cómics asociados.
2. Comic:
   - Atributos: `id`, `título`, `descripción`, `formato`.
   - Objetivo: Manejar información individual de cómics.
3. Colección de Comics:
   - Atributos: `id`, `nombre`, `comics` (una lista de cómics pertenecientes a la colección).
   - Objetivo: Administrar colecciones que contienen cómics específicos.
Funcionalidades Esperadas:
- Usuarios:
  - Crear un nuevo usuario.
  - Obtener información de un usuario por su ID.
  - Obtener una lista de todos los usuarios.
  - Actualizar información de un usuario existente.
  - Eliminar un usuario.
- Cómics:
  - Crear un nuevo cómic.
  - Obtener información de un cómic por su ID.
  - Obtener una lista de todos los cómics.
  - Actualizar información de un cómic existente.
  - Eliminar un cómic.
Encadenado de Información:
Se esperan consultas GraphQL que permitan obtener información encadenada. Por ejemplo, en una colección de un usuario guardaremos los comics como un array de IDs y después lo devolveremos como un objeto completo gracias a un encadenado.


-----------------------------------------------

El trabajo será exclusivamente individual sin permitir hacer parejas o entregas conjuntas de ningún tipo.
La entrega se hará en una release de GitHub en un repositorio, un trabajo que no cumpla esta cláusulas de entrega será evaluado automáticamente con un 0.
