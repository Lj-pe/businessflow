# BusinessFlow

## Product Requirements Document

**Versión:** 1.0  
**Estado:** Draft  
**Tipo:** Plataforma web de gestión empresarial  

---

## 1. Información general

### 1.1 Nombre del producto

BusinessFlow

### 1.2 Descripción

BusinessFlow es una plataforma web orientada a pequeños comercios,
inicialmente enfocada en la gestión integral de un minimarket.

La plataforma permitirá centralizar y gestionar las principales
operaciones del negocio, incluyendo productos, inventario, ventas,
clientes, proveedores, usuarios y reportes.

### 1.3 Cliente inicial

Minimarket "El Sol"

### 1.4 Equipo del proyecto

- Developer 1: Lenny
- Developer 2: ChatGPT

### 1.5 Objetivo del documento

Definir los requisitos, alcance, reglas de negocio, actores,
procesos y características principales de BusinessFlow v1.0
antes de iniciar su desarrollo.


---

## 2. Contexto y problema

### 2.1 Contexto del negocio

El cliente inicial de BusinessFlow es el "Minimarket El Sol",
un pequeño comercio dedicado a la venta de productos de consumo
diario.

Actualmente, el negocio cuenta con:

- 1 administrador.
- 2 vendedores.
- Aproximadamente 800 productos.
- 1 establecimiento.
- Operaciones de venta realizadas diariamente.

Parte de la información del negocio se gestiona mediante procesos
manuales y herramientas independientes, lo que dificulta mantener
un control centralizado de las operaciones.

### 2.2 Situación actual

Actualmente, el negocio presenta las siguientes situaciones:

- El inventario no se encuentra completamente centralizado.
- El registro y seguimiento de algunas operaciones se realiza
  manualmente.
- La información sobre las ventas se encuentra dispersa.
- El administrador tiene dificultades para obtener información
  consolidada sobre el negocio.
- El control de los movimientos de inventario es limitado.
- No existe un mecanismo centralizado para consultar las acciones
  realizadas por cada usuario.

### 2.3 Problemas identificados

Los principales problemas identificados son:

**P-001 — Control de inventario**

Existe dificultad para conocer de forma rápida y confiable el
stock disponible de los productos.

**P-002 — Registro de ventas**

El registro manual de las ventas puede generar errores y
dificultar la consulta del historial de operaciones.

**P-003 — Control de usuarios**

No existe un control centralizado sobre las operaciones que
realiza cada usuario dentro del negocio.

**P-004 — Información para la toma de decisiones**

El administrador no dispone de información consolidada que le
permita analizar fácilmente las ventas, productos y niveles de
inventario.

**P-005 — Seguimiento de operaciones**

Existe dificultad para determinar quién realizó determinadas
operaciones y cuándo fueron realizadas.

### 2.4 Necesidad del cliente

El cliente necesita una plataforma centralizada que permita
gestionar las principales operaciones del minimarket, controlar
el inventario, registrar las ventas y proporcionar información
actualizada para facilitar la operación diaria y la toma de
decisiones.

### 2.5 Oportunidad

BusinessFlow busca transformar los procesos manuales del negocio
en procesos digitales centralizados, permitiendo mejorar el
control operativo, reducir errores y proporcionar información
útil para la gestión del negocio.



---

## 3. Actores y roles

### 3.1 Actores del sistema

BusinessFlow contará inicialmente con los siguientes actores:

- Administrador.
- Vendedor.
- Encargado de inventario.
- Supervisor.

Cada actor tendrá un conjunto específico de permisos de acuerdo
con sus responsabilidades dentro del negocio.

---

### 3.2 Administrador

#### Descripción

El administrador es responsable de la configuración y gestión
general del sistema y del negocio.

#### Responsabilidades

- Gestionar usuarios.
- Gestionar roles y permisos.
- Gestionar productos.
- Gestionar categorías.
- Gestionar proveedores.
- Gestionar inventario.
- Consultar ventas.
- Gestionar clientes.
- Consultar reportes.
- Consultar dashboard.
- Consultar registros de auditoría.

#### Permisos principales

- Crear, consultar, actualizar y desactivar usuarios.
- Asignar roles a usuarios.
- Crear, consultar, actualizar y desactivar productos.
- Crear y gestionar categorías.
- Registrar y gestionar proveedores.
- Consultar y gestionar movimientos de inventario.
- Consultar ventas.
- Gestionar clientes.
- Consultar reportes.
- Consultar auditoría.

---

### 3.3 Vendedor

#### Descripción

El vendedor es responsable de realizar las operaciones
relacionadas con la atención al cliente y el registro de ventas.

#### Responsabilidades

- Consultar productos.
- Consultar disponibilidad de productos.
- Registrar ventas.
- Registrar clientes.
- Consultar sus propias ventas.

#### Permisos principales

- Consultar productos activos.
- Consultar stock disponible.
- Crear ventas.
- Registrar clientes.
- Consultar las ventas realizadas por el propio usuario.

#### Restricciones

El vendedor no podrá:

- Gestionar usuarios.
- Gestionar roles.
- Eliminar productos.
- Modificar configuraciones del sistema.
- Gestionar proveedores.
- Modificar directamente el stock.
- Consultar operaciones administrativas no relacionadas con
  sus responsabilidades.

---

### 3.4 Encargado de inventario

#### Descripción

El encargado de inventario es responsable del control y seguimiento
de las existencias de productos.

#### Responsabilidades

- Consultar productos.
- Consultar niveles de stock.
- Registrar entradas de inventario.
- Registrar salidas de inventario.
- Registrar ajustes de inventario.
- Consultar movimientos de inventario.
- Identificar productos con stock bajo.

#### Permisos principales

- Consultar productos.
- Consultar stock.
- Registrar movimientos de inventario.
- Consultar historial de movimientos.
- Gestionar operaciones relacionadas con el inventario.

#### Restricciones

El encargado de inventario no podrá:

- Gestionar usuarios.
- Gestionar roles.
- Registrar ventas.
- Modificar información financiera de las ventas.
- Acceder a configuraciones administrativas.

---

### 3.5 Supervisor

#### Descripción

El supervisor es responsable de supervisar las operaciones
del negocio y consultar información para la toma de decisiones.

#### Responsabilidades

- Supervisar ventas.
- Consultar inventario.
- Consultar productos.
- Consultar clientes.
- Consultar reportes.
- Consultar dashboard.
- Supervisar determinadas operaciones del negocio.

#### Permisos principales

- Consultar productos.
- Consultar inventario.
- Consultar ventas.
- Consultar clientes.
- Consultar reportes.
- Consultar indicadores del dashboard.

#### Restricciones

El supervisor tendrá permisos principalmente de consulta
y no podrá modificar información crítica del sistema, salvo
aquellas operaciones que posteriormente sean definidas
explícitamente.


---

## 4. Objetivos del producto

### 4.1 Objetivo general

Desarrollar una plataforma web centralizada que permita al
Minimarket "El Sol" gestionar sus principales operaciones
comerciales y administrativas, mejorando el control de ventas,
inventario, productos, clientes y usuarios.

### 4.2 Objetivos de negocio

#### OB-001 — Centralizar la información

Centralizar la información relacionada con productos, ventas,
clientes, proveedores e inventario en una única plataforma.

#### OB-002 — Mejorar el control del inventario

Permitir al negocio conocer el estado actual de su inventario
y detectar oportunamente productos con niveles de stock bajos.

#### OB-003 — Mejorar el control de las ventas

Facilitar el registro, consulta y seguimiento de las ventas
realizadas en el negocio.

#### OB-004 — Mejorar la toma de decisiones

Proporcionar información e indicadores que permitan al
administrador y supervisor analizar el comportamiento del
negocio.

#### OB-005 — Mejorar la trazabilidad

Permitir identificar qué usuario realizó determinadas
operaciones dentro del sistema.

### 4.3 Objetivos del sistema

#### OS-001 — Gestión de usuarios

Permitir administrar usuarios, roles y permisos de acuerdo
con las responsabilidades definidas.

#### OS-002 — Gestión de productos

Permitir registrar, consultar, actualizar y desactivar
productos y categorías.

#### OS-003 — Gestión de inventario

Permitir controlar las entradas, salidas y ajustes de
inventario mediante movimientos registrados.

#### OS-004 — Gestión de ventas

Permitir registrar ventas, validar disponibilidad de productos
y actualizar automáticamente el inventario.

#### OS-005 — Gestión de clientes

Permitir registrar y consultar información de los clientes
y su historial de compras.

#### OS-006 — Gestión de proveedores

Permitir registrar y consultar información de proveedores
relacionados con la operación del negocio.

#### OS-007 — Reportes y dashboard

Proporcionar indicadores y reportes sobre las principales
operaciones del negocio.

#### OS-008 — Auditoría

Registrar las operaciones críticas realizadas por los usuarios
para permitir su posterior consulta y seguimiento.


---

## 5. Requisitos funcionales

Los requisitos funcionales describen las funcionalidades y
comportamientos que BusinessFlow debe proporcionar a sus usuarios.

---

### 5.1 Autenticación y gestión de sesión

#### RF-001 — Inicio de sesión

El sistema debe permitir a los usuarios registrados iniciar
sesión mediante sus credenciales.

#### RF-002 — Validación de credenciales

El sistema debe validar que las credenciales proporcionadas
correspondan a un usuario registrado y activo.

#### RF-003 — Control de acceso

El sistema debe restringir el acceso a las funcionalidades
según el rol y los permisos asignados al usuario.

#### RF-004 — Cierre de sesión

El sistema debe permitir al usuario cerrar su sesión.

#### RF-005 — Usuarios desactivados

El sistema no debe permitir iniciar sesión a usuarios que se
encuentren desactivados.

---

### 5.2 Gestión de usuarios

#### RF-006 — Registrar usuario

El administrador debe poder registrar nuevos usuarios.

#### RF-007 — Consultar usuarios

El administrador debe poder consultar los usuarios registrados.

#### RF-008 — Actualizar usuario

El administrador debe poder actualizar la información de un
usuario.

#### RF-009 — Desactivar usuario

El administrador debe poder desactivar usuarios sin eliminar
permanentemente su información.

#### RF-010 — Asignar rol

El administrador debe poder asignar un rol a cada usuario.

---

### 5.3 Gestión de roles y permisos

#### RF-011 — Consultar roles

El sistema debe permitir consultar los roles disponibles.

#### RF-012 — Aplicar permisos por rol

El sistema debe aplicar las restricciones correspondientes
según el rol del usuario autenticado.

#### RF-013 — Protección de operaciones

El sistema debe impedir que un usuario ejecute operaciones
para las cuales no posee permisos.

---

### 5.4 Gestión de categorías

#### RF-014 — Registrar categoría

El administrador debe poder registrar nuevas categorías.

#### RF-015 — Consultar categorías

Los usuarios autorizados deben poder consultar las categorías
registradas.

#### RF-016 — Actualizar categoría

El administrador debe poder actualizar la información de una
categoría.

#### RF-017 — Desactivar categoría

El administrador debe poder desactivar una categoría.

---

### 5.5 Gestión de productos

#### RF-018 — Registrar producto

El administrador debe poder registrar nuevos productos.

El producto debe contener como mínimo:

- Código.
- Nombre.
- Descripción.
- Categoría.
- Precio de venta.
- Stock inicial.
- Stock mínimo.
- Estado.

#### RF-019 — Consultar productos

Los usuarios autorizados deben poder consultar los productos
registrados.

#### RF-020 — Buscar productos

El sistema debe permitir buscar productos por información
relevante como código o nombre.

#### RF-021 — Filtrar productos

El sistema debe permitir filtrar productos por criterios como
categoría y estado.

#### RF-022 — Actualizar producto

El administrador debe poder actualizar la información de un
producto.

#### RF-023 — Desactivar producto

El administrador debe poder desactivar un producto sin
eliminar permanentemente su información.

#### RF-024 — Validar información del producto

El sistema debe validar que los datos obligatorios del producto
sean correctos antes de registrarlo o actualizarlo.

---

### 5.6 Gestión de proveedores

#### RF-025 — Registrar proveedor

El administrador debe poder registrar proveedores.

#### RF-026 — Consultar proveedores

Los usuarios autorizados deben poder consultar los proveedores.

#### RF-027 — Actualizar proveedor

El administrador debe poder actualizar la información de un
proveedor.

#### RF-028 — Desactivar proveedor

El administrador debe poder desactivar un proveedor.

---

### 5.7 Gestión de clientes

#### RF-029 — Registrar cliente

Los usuarios autorizados deben poder registrar clientes.

#### RF-030 — Consultar clientes

Los usuarios autorizados deben poder consultar los clientes
registrados.

#### RF-031 — Actualizar cliente

Los usuarios autorizados deben poder actualizar la información
de un cliente.

#### RF-032 — Consultar historial de compras

Los usuarios autorizados deben poder consultar el historial
de compras asociado a un cliente.

---

### 5.8 Gestión de inventario

#### RF-033 — Consultar stock

Los usuarios autorizados deben poder consultar el stock
actual de los productos.

#### RF-034 — Registrar entrada de inventario

El encargado de inventario y los usuarios autorizados deben
poder registrar entradas de productos al inventario.

#### RF-035 — Registrar salida de inventario

El encargado de inventario y los usuarios autorizados deben
poder registrar salidas de productos del inventario.

#### RF-036 — Registrar ajuste de inventario

El encargado de inventario y los usuarios autorizados deben
poder registrar ajustes de inventario indicando el motivo
correspondiente.

#### RF-037 — Registrar movimientos

El sistema debe registrar cada movimiento de inventario
indicando como mínimo:

- Producto.
- Tipo de movimiento.
- Cantidad.
- Usuario.
- Fecha.
- Motivo.

#### RF-038 — Alertar stock bajo

El sistema debe identificar los productos cuyo stock actual
sea igual o inferior al stock mínimo configurado.

#### RF-039 — Consultar historial de inventario

Los usuarios autorizados deben poder consultar el historial
de movimientos de inventario.

---

### 5.9 Gestión de ventas

#### RF-040 — Crear venta

El vendedor y los usuarios autorizados deben poder registrar
una nueva venta.

#### RF-041 — Agregar productos a una venta

El sistema debe permitir agregar uno o más productos a una
venta.

#### RF-042 — Validar disponibilidad

El sistema debe verificar que exista stock suficiente antes
de confirmar una venta.

#### RF-043 — Calcular subtotal

El sistema debe calcular automáticamente el subtotal de cada
producto incluido en una venta.

#### RF-044 — Calcular total

El sistema debe calcular automáticamente el total de la venta.

#### RF-045 — Registrar venta

Al confirmar una venta, el sistema debe almacenar la información
de la operación y sus respectivos detalles.

#### RF-046 — Actualizar inventario por venta

Al confirmar una venta, el sistema debe descontar del inventario
las cantidades correspondientes.

#### RF-047 — Registrar movimiento por venta

Cada venta confirmada debe generar los movimientos de salida
de inventario correspondientes.

#### RF-048 — Consultar ventas

Los usuarios autorizados deben poder consultar las ventas
registradas.

#### RF-049 — Consultar ventas propias

El vendedor debe poder consultar las ventas realizadas por
su propio usuario.

#### RF-050 — Anular venta

Los usuarios con permisos suficientes deben poder anular una
venta de acuerdo con las reglas de negocio definidas.

#### RF-051 — Reintegrar inventario por anulación

Cuando una venta sea anulada, el sistema debe reintegrar al
inventario las cantidades correspondientes.

---

### 5.10 Dashboard

#### RF-052 — Consultar ventas del día

El sistema debe mostrar el total de ventas realizadas durante
el día actual.

#### RF-053 — Consultar ventas del período

El sistema debe permitir consultar indicadores de ventas
para períodos determinados.

#### RF-054 — Mostrar productos más vendidos

El sistema debe mostrar los productos con mayor cantidad de
unidades vendidas.

#### RF-055 — Mostrar productos con stock bajo

El dashboard debe mostrar los productos cuyo stock se encuentre
por debajo del nivel mínimo configurado.

#### RF-056 — Mostrar indicadores generales

El dashboard debe mostrar indicadores relevantes para la
gestión del negocio.

---

### 5.11 Reportes

#### RF-057 — Reporte de ventas

El sistema debe permitir consultar información detallada
sobre las ventas realizadas.

#### RF-058 — Reporte de inventario

El sistema debe permitir consultar información sobre el estado
del inventario.

#### RF-059 — Reporte de productos

El sistema debe permitir consultar información relacionada
con los productos registrados.

---

### 5.12 Auditoría

#### RF-060 — Registrar operaciones críticas

El sistema debe registrar las operaciones críticas realizadas
por los usuarios.

#### RF-061 — Registrar usuario responsable

Cada registro de auditoría debe identificar al usuario que
realizó la operación.

#### RF-062 — Registrar fecha y hora

Cada registro de auditoría debe almacenar la fecha y hora
en que ocurrió la operación.

#### RF-063 — Consultar auditoría

Los usuarios autorizados deben poder consultar los registros
de auditoría.

---

## 6. Requisitos no funcionales

Los requisitos no funcionales definen las características de
calidad, seguridad, rendimiento, mantenibilidad y operación
que debe cumplir BusinessFlow.

---

### 6.1 Seguridad

#### RNF-001 — Protección de credenciales

Las contraseñas de los usuarios no deben almacenarse en texto
plano. Deben almacenarse utilizando un mecanismo de hash seguro.

#### RNF-002 — Autenticación

Las funcionalidades protegidas del sistema deben requerir
autenticación.

#### RNF-003 — Autorización

El sistema debe validar los permisos del usuario antes de
permitir el acceso a operaciones protegidas.

#### RNF-004 — Protección de información sensible

La información sensible utilizada por el sistema no debe
almacenarse directamente en el código fuente.

#### RNF-005 — Gestión de secretos

Las credenciales, claves y secretos utilizados por la aplicación
deben gestionarse mediante variables de entorno o mecanismos
seguros de gestión de secretos.

#### RNF-006 — Validación de datos

El sistema debe validar los datos recibidos desde el cliente
antes de procesarlos.

---

### 6.2 Rendimiento

#### RNF-007 — Tiempo de respuesta

Las operaciones habituales del sistema deben proporcionar
tiempos de respuesta adecuados para la operación normal del
negocio.

#### RNF-008 — Consultas eficientes

Las consultas a la base de datos deben diseñarse evitando
operaciones innecesariamente costosas.

#### RNF-009 — Paginación

Las consultas que puedan devolver grandes cantidades de
registros deben utilizar mecanismos de paginación.

---

### 6.3 Disponibilidad y confiabilidad

#### RNF-010 — Manejo de errores

El sistema debe manejar los errores de manera controlada y
proporcionar respuestas apropiadas al usuario.

#### RNF-011 — Integridad de operaciones

Las operaciones críticas, como el registro de una venta,
deben mantener la consistencia de la información.

#### RNF-012 — Recuperación ante errores

El sistema debe evitar que un error en una operación deje
información parcialmente registrada o inconsistente.

---

### 6.4 Mantenibilidad

#### RNF-013 — Organización del código

El código debe organizarse de manera modular y mantener una
separación clara de responsabilidades.

#### RNF-014 — Convenciones

El proyecto debe utilizar convenciones consistentes para
nombres de archivos, variables, funciones, clases y endpoints.

#### RNF-015 — Documentación

Las decisiones técnicas y componentes relevantes del sistema
deben estar documentados.

#### RNF-016 — Control de versiones

El código fuente debe mantenerse bajo un sistema de control
de versiones mediante Git.

---

### 6.5 Escalabilidad

#### RNF-017 — Crecimiento del sistema

La arquitectura debe permitir incorporar nuevas funcionalidades
sin requerir una reestructuración completa del sistema.

#### RNF-018 — Crecimiento de datos

La solución debe considerar que el volumen de productos,
clientes, ventas e inventario aumentará con el tiempo.

---

### 6.6 Compatibilidad

#### RNF-019 — Navegadores

La aplicación web debe funcionar correctamente en navegadores
modernos.

#### RNF-020 — Interfaz adaptable

La interfaz debe adaptarse correctamente a diferentes tamaños
de pantalla utilizados para la operación del negocio.

---

### 6.7 Despliegue y operación

#### RNF-021 — Configuración por entorno

La aplicación debe permitir manejar configuraciones diferentes
para los entornos de desarrollo, pruebas y producción.

#### RNF-022 — Reproducibilidad

La aplicación debe poder ejecutarse de manera reproducible
en diferentes entornos.

#### RNF-023 — Automatización

El proceso de construcción, pruebas y despliegue debe poder
automatizarse mediante un pipeline de integración y entrega
continua.

#### RNF-024 — Contenerización

La aplicación debe poder ser ejecutada mediante contenedores
para facilitar la consistencia entre entornos.

---

### 6.8 Observabilidad

#### RNF-025 — Registro de eventos

La aplicación debe generar registros que permitan identificar
errores y eventos relevantes.

#### RNF-026 — Diagnóstico

Los registros deben proporcionar información suficiente para
facilitar la identificación y diagnóstico de problemas.

---

### 6.9 Calidad

#### RNF-027 — Pruebas

Las funcionalidades críticas deben contar con pruebas que
permitan verificar su comportamiento esperado.

#### RNF-028 — Integración continua

Los cambios incorporados al proyecto deben poder ser validados
automáticamente mediante el proceso de integración continua.

#### RNF-029 — Calidad del código

El proyecto debe mantener estándares de calidad que faciliten
su mantenimiento y evolución.

---

## 7. Reglas de negocio

Las reglas de negocio establecen las condiciones que deben
cumplirse para garantizar que las operaciones de BusinessFlow
sean coherentes con las necesidades del negocio.

---

### 7.1 Usuarios y acceso

#### RB-001 — Usuario activo

Solo los usuarios activos pueden iniciar sesión en BusinessFlow.

#### RB-002 — Rol obligatorio

Todo usuario debe tener un rol asignado para poder acceder
a las funcionalidades del sistema.

#### RB-003 — Control de permisos

Un usuario solo puede ejecutar las operaciones permitidas
por su rol y permisos.

#### RB-004 — Usuario desactivado

La desactivación de un usuario debe impedir nuevos accesos
al sistema, pero debe conservar su información histórica.

---

### 7.2 Productos

#### RB-005 — Precio válido

El precio de venta de un producto debe ser mayor o igual a cero.

#### RB-006 — Stock válido

El stock de un producto no puede ser negativo.

#### RB-007 — Producto desactivado

Un producto desactivado no puede ser utilizado en nuevas ventas.

#### RB-008 — Código de producto

Cada producto debe tener un código único dentro del negocio.

#### RB-009 — Categoría obligatoria

Todo producto debe estar asociado a una categoría activa.

---

### 7.3 Inventario

#### RB-010 — Movimientos de inventario

Todo cambio de stock debe estar asociado a un movimiento
de inventario.

#### RB-011 — Stock no negativo

Una operación de inventario no debe permitir que el stock
resultante sea negativo.

#### RB-012 — Motivo de ajuste

Todo ajuste manual de inventario debe registrar un motivo.

#### RB-013 — Usuario responsable

Todo movimiento de inventario debe identificar al usuario
que realizó la operación.

#### RB-014 — Trazabilidad

Los movimientos de inventario no deben eliminarse
físicamente del sistema una vez registrados.

---

### 7.4 Ventas

#### RB-015 — Stock suficiente

No se puede confirmar una venta si la cantidad solicitada
de un producto supera el stock disponible.

#### RB-016 — Venta con productos

Una venta debe contener al menos un producto.

#### RB-017 — Cantidad válida

La cantidad de cada producto vendido debe ser mayor que cero.

#### RB-018 — Precio de venta

El precio utilizado en una venta debe almacenarse como parte
del detalle de la venta.

#### RB-019 — Actualización de inventario

Una venta confirmada debe disminuir automáticamente el stock
de los productos vendidos.

#### RB-020 — Movimiento de salida

Toda venta confirmada debe generar los movimientos de salida
correspondientes en el inventario.

#### RB-021 — Venta confirmada

Una venta confirmada no debe modificarse directamente.

#### RB-022 — Anulación de venta

Una venta solo puede ser anulada por usuarios que tengan
permisos suficientes.

#### RB-023 — Reintegro de stock

La anulación de una venta debe reintegrar al inventario las
cantidades correspondientes.

#### RB-024 — Trazabilidad de anulación

Toda anulación de venta debe registrar el usuario responsable,
la fecha, la venta afectada y el motivo.

---

### 7.5 Clientes

#### RB-025 — Identificación de cliente

El sistema debe evitar registros duplicados cuando el cliente
utilice un documento de identificación registrado previamente.

#### RB-026 — Historial de compras

El historial de compras de un cliente debe conservarse aunque
el cliente sea desactivado.

---

### 7.6 Proveedores

#### RB-027 — Proveedor activo

Solo los proveedores activos podrán asociarse a nuevas
operaciones de compra.

#### RB-028 — Historial de proveedores

La desactivación de un proveedor no debe eliminar su historial
de operaciones.

---

### 7.7 Auditoría

#### RB-029 — Operaciones críticas

Las operaciones críticas deben generar un registro de auditoría.

#### RB-030 — Usuario responsable

Cada registro de auditoría debe identificar al usuario que
realizó la operación.

#### RB-031 — Fecha y hora

Cada registro de auditoría debe almacenar la fecha y hora
de la operación.

#### RB-032 — Integridad de auditoría

Los usuarios normales no deben poder modificar ni eliminar
los registros de auditoría.

---

### 7.8 Consistencia de datos

#### RB-033 — Operaciones atómicas

Las operaciones que involucren múltiples cambios relacionados
deben completarse de forma consistente.

Por ejemplo, al confirmar una venta:

1. Se registra la venta.
2. Se registran sus detalles.
3. Se actualiza el inventario.
4. Se registran los movimientos de inventario.

Si una operación crítica falla, el sistema debe evitar que
solo una parte de los cambios sea aplicada.

#### RB-034 — Integridad referencial

Las relaciones entre usuarios, productos, clientes, ventas,
inventario y demás entidades deben mantener su integridad.

#### RB-035 — Eliminación lógica

Las entidades que posean historial relevante no deben eliminarse
físicamente cuando exista información relacionada. En estos
casos se utilizará un mecanismo de desactivación lógica.


---

## 8. Casos de uso

Los casos de uso describen las principales interacciones entre
los actores y BusinessFlow para cumplir los objetivos definidos
para el negocio.

---

### CU-001 — Iniciar sesión

**Actor principal:** Todos los usuarios.

**Objetivo:** Permitir que un usuario autenticado acceda al
sistema de acuerdo con su rol y permisos.

**Precondiciones:**

- El usuario debe estar registrado.
- El usuario debe encontrarse activo.

**Flujo principal:**

1. El usuario accede a la pantalla de inicio de sesión.
2. El usuario ingresa su correo electrónico y contraseña.
3. El sistema valida las credenciales.
4. El sistema verifica que el usuario se encuentre activo.
5. El sistema identifica el rol y permisos del usuario.
6. El sistema permite el acceso.
7. El sistema muestra la interfaz correspondiente al usuario.

**Flujos alternativos:**

- Credenciales incorrectas → el sistema rechaza el acceso.
- Usuario desactivado → el sistema rechaza el acceso.
- Datos incompletos → el sistema solicita completar los campos.

**Postcondición:**

El usuario queda autenticado y puede acceder a las funcionalidades
permitidas.

---

### CU-002 — Gestionar usuarios

**Actor principal:** Administrador.

**Objetivo:** Permitir al administrador gestionar los usuarios
del sistema.

**Precondiciones:**

- El administrador debe estar autenticado.
- El administrador debe tener permisos suficientes.

**Flujo principal:**

1. El administrador accede al módulo de usuarios.
2. El sistema muestra los usuarios registrados.
3. El administrador puede registrar un nuevo usuario.
4. El administrador asigna un rol.
5. El sistema valida la información.
6. El sistema registra el usuario.
7. El administrador puede consultar o actualizar usuarios.
8. El administrador puede desactivar usuarios.

**Postcondición:**

La información de los usuarios queda actualizada.

---

### CU-003 — Gestionar productos

**Actor principal:** Administrador.

**Actores secundarios:** Vendedor, Encargado de inventario.

**Objetivo:** Gestionar los productos disponibles en el negocio.

**Flujo principal:**

1. El administrador accede al módulo de productos.
2. El sistema muestra los productos registrados.
3. El administrador puede registrar un producto.
4. El administrador selecciona una categoría.
5. El administrador establece precio y stock mínimo.
6. El sistema valida la información.
7. El sistema registra el producto.
8. El administrador puede actualizar o desactivar productos.
9. Los usuarios autorizados pueden consultar los productos.

**Postcondición:**

El producto queda disponible para las operaciones permitidas.

---

### CU-004 — Gestionar categorías

**Actor principal:** Administrador.

**Objetivo:** Organizar los productos mediante categorías.

**Flujo principal:**

1. El administrador accede al módulo de categorías.
2. El sistema muestra las categorías existentes.
3. El administrador registra una nueva categoría.
4. El sistema valida la información.
5. El sistema registra la categoría.
6. El administrador puede actualizar o desactivar categorías.

**Postcondición:**

La categoría queda disponible para asociarla a productos.

---

### CU-005 — Registrar cliente

**Actor principal:** Vendedor.

**Actores secundarios:** Administrador, Supervisor.

**Objetivo:** Registrar información de los clientes del negocio.

**Flujo principal:**

1. El usuario accede al módulo de clientes.
2. Selecciona la opción para registrar un cliente.
3. Ingresa la información correspondiente.
4. El sistema valida los datos.
5. El sistema verifica que no exista un cliente duplicado.
6. El sistema registra al cliente.

**Postcondición:**

El cliente queda disponible para asociarlo a ventas.

---

### CU-006 — Gestionar proveedores

**Actor principal:** Administrador.

**Actor secundario:** Encargado de inventario.

**Objetivo:** Gestionar la información de los proveedores.

**Flujo principal:**

1. El usuario autorizado accede al módulo de proveedores.
2. El sistema muestra los proveedores registrados.
3. El administrador registra un proveedor.
4. El sistema valida la información.
5. El sistema registra el proveedor.
6. El administrador puede actualizar o desactivar proveedores.

**Postcondición:**

El proveedor queda registrado y disponible para operaciones
posteriores.

---

### CU-007 — Registrar entrada de inventario

**Actor principal:** Encargado de inventario.

**Actor secundario:** Administrador.

**Objetivo:** Registrar el ingreso de productos al inventario.

**Precondiciones:**

- El producto debe existir.
- El usuario debe tener permisos de inventario.

**Flujo principal:**

1. El usuario accede al módulo de inventario.
2. Selecciona la opción de entrada de inventario.
3. Selecciona el producto.
4. Ingresa la cantidad.
5. Selecciona o registra el proveedor cuando corresponda.
6. Indica el motivo de la entrada.
7. El sistema valida los datos.
8. El sistema incrementa el stock.
9. El sistema registra el movimiento.
10. El sistema registra la operación en auditoría.

**Postcondición:**

El stock del producto queda actualizado y el movimiento queda
registrado.

---

### CU-008 — Registrar ajuste de inventario

**Actor principal:** Encargado de inventario.

**Actor secundario:** Administrador.

**Objetivo:** Corregir diferencias detectadas en el inventario.

**Flujo principal:**

1. El usuario accede al producto.
2. Selecciona la opción de ajuste.
3. Indica la cantidad correspondiente.
4. Ingresa el motivo del ajuste.
5. El sistema valida la operación.
6. El sistema actualiza el stock.
7. El sistema registra el movimiento.
8. El sistema registra la operación en auditoría.

**Postcondición:**

El inventario queda actualizado y el ajuste queda trazable.

---

### CU-009 — Registrar venta

**Actor principal:** Vendedor.

**Actores secundarios:** Administrador, Supervisor.

**Objetivo:** Registrar una venta y actualizar automáticamente
el inventario.

**Precondiciones:**

- El usuario debe estar autenticado.
- Los productos deben estar activos.
- Debe existir stock suficiente.

**Flujo principal:**

1. El vendedor accede al módulo de ventas.
2. Selecciona o registra un cliente.
3. Busca un producto.
4. Selecciona la cantidad.
5. El sistema verifica el stock disponible.
6. El sistema agrega el producto a la venta.
7. El sistema calcula el subtotal.
8. El vendedor puede agregar más productos.
9. El sistema calcula el total.
10. El vendedor confirma la venta.
11. El sistema registra la venta.
12. El sistema registra los detalles de la venta.
13. El sistema descuenta las cantidades correspondientes del stock.
14. El sistema registra los movimientos de inventario.
15. El sistema registra la operación en auditoría.
16. El sistema confirma la venta.

**Flujos alternativos:**

- Stock insuficiente → el sistema no permite confirmar la venta.
- Producto desactivado → el sistema no permite agregarlo.
- Cantidad inválida → el sistema rechaza el valor.
- Error durante la operación → la operación debe revertirse
  para mantener la consistencia de los datos.

**Postcondición:**

La venta queda registrada y el inventario actualizado.

---

### CU-010 — Consultar ventas

**Actor principal:** Administrador.

**Actores secundarios:** Supervisor, Vendedor.

**Objetivo:** Consultar el historial de ventas.

**Flujo principal:**

1. El usuario accede al módulo de ventas.
2. El sistema muestra las ventas disponibles según sus permisos.
3. El usuario puede aplicar filtros.
4. El usuario selecciona una venta.
5. El sistema muestra el detalle de la operación.

**Restricción:**

El vendedor únicamente podrá consultar las ventas realizadas
por su propio usuario, salvo que posteriormente se le otorguen
permisos adicionales.

---

### CU-011 — Anular venta

**Actor principal:** Usuario autorizado.

**Objetivo:** Anular una venta previamente confirmada.

**Precondiciones:**

- La venta debe existir.
- La venta debe encontrarse en un estado que permita su anulación.
- El usuario debe tener permisos suficientes.

**Flujo principal:**

1. El usuario busca la venta.
2. Selecciona la opción de anulación.
3. El sistema solicita el motivo.
4. El usuario ingresa el motivo.
5. El sistema valida los permisos.
6. El sistema cambia el estado de la venta.
7. El sistema reintegra las cantidades al inventario.
8. El sistema registra los movimientos correspondientes.
9. El sistema registra la operación en auditoría.

**Postcondición:**

La venta queda anulada y el inventario es actualizado.

---

### CU-012 — Consultar dashboard

**Actor principal:** Administrador.

**Actor secundario:** Supervisor.

**Objetivo:** Visualizar indicadores relevantes del negocio.

**Flujo principal:**

1. El usuario accede al dashboard.
2. El sistema consulta la información correspondiente.
3. El sistema muestra indicadores de ventas.
4. El sistema muestra productos más vendidos.
5. El sistema muestra productos con stock bajo.
6. El sistema muestra otros indicadores disponibles.

**Postcondición:**

El usuario obtiene una visión resumida del estado del negocio.

---

### CU-013 — Consultar reportes

**Actor principal:** Administrador.

**Actor secundario:** Supervisor.

**Objetivo:** Consultar información detallada para apoyar la
toma de decisiones.

**Flujo principal:**

1. El usuario accede al módulo de reportes.
2. Selecciona el tipo de reporte.
3. Define filtros y período.
4. El sistema procesa la información.
5. El sistema muestra los resultados.

**Reportes iniciales:**

- Reporte de ventas.
- Reporte de inventario.
- Reporte de productos.

---

### CU-014 — Consultar auditoría

**Actor principal:** Administrador.

**Objetivo:** Consultar las operaciones críticas realizadas
dentro del sistema.

**Flujo principal:**

1. El administrador accede al módulo de auditoría.
2. El sistema muestra los registros disponibles.
3. El administrador puede filtrar por usuario, operación
   o período.
4. El sistema muestra la información correspondiente.

**Postcondición:**

El administrador puede identificar las operaciones realizadas
dentro del sistema.


---

## 9. Alcance del MVP

### 9.1 Definición del MVP

El MVP (Minimum Viable Product) de BusinessFlow corresponde a
la primera versión funcional del sistema que permitirá al
Minimarket "El Sol" gestionar sus operaciones principales
de usuarios, productos, inventario, clientes y ventas.

El objetivo del MVP es proporcionar una solución funcional
que permita validar el flujo principal del negocio antes de
incorporar funcionalidades avanzadas.

---

### 9.2 Funcionalidades incluidas en el MVP

#### Autenticación

- Inicio de sesión.
- Cierre de sesión.
- Validación de credenciales.
- Control de acceso según rol.
- Bloqueo de usuarios desactivados.

#### Usuarios y roles

- Gestión de usuarios por parte del administrador.
- Asignación de roles.
- Activación y desactivación de usuarios.
- Control de permisos.

#### Categorías

- Registro de categorías.
- Consulta de categorías.
- Actualización de categorías.
- Desactivación de categorías.

#### Productos

- Registro de productos.
- Consulta de productos.
- Búsqueda de productos.
- Filtrado de productos.
- Actualización de productos.
- Desactivación de productos.
- Configuración de stock mínimo.

#### Clientes

- Registro de clientes.
- Consulta de clientes.
- Actualización de clientes.
- Consulta del historial de compras.

#### Proveedores

- Registro de proveedores.
- Consulta de proveedores.
- Actualización de proveedores.
- Desactivación de proveedores.

#### Inventario

- Consulta de stock.
- Registro de entradas.
- Registro de salidas.
- Registro de ajustes.
- Historial de movimientos.
- Alertas de stock bajo.

#### Ventas

- Creación de ventas.
- Selección de cliente.
- Selección de productos.
- Validación de stock.
- Cálculo automático de subtotales.
- Cálculo automático del total.
- Registro de ventas.
- Actualización automática del inventario.
- Registro de movimientos de inventario.
- Consulta de ventas.
- Anulación de ventas con permisos suficientes.
- Reintegro de inventario al anular una venta.

#### Dashboard

- Ventas del día.
- Ventas del período seleccionado.
- Productos más vendidos.
- Productos con stock bajo.
- Indicadores generales.

#### Auditoría

- Registro de operaciones críticas.
- Usuario responsable.
- Fecha y hora.
- Consulta de registros de auditoría.

---

### 9.3 Priorización del MVP

Las funcionalidades del MVP se priorizarán de acuerdo con
su importancia para el funcionamiento principal del negocio.

#### Prioridad alta

- Autenticación.
- Usuarios y roles.
- Categorías.
- Productos.
- Clientes.
- Inventario.
- Ventas.

#### Prioridad media

- Dashboard.
- Proveedores.
- Auditoría.

#### Prioridad complementaria

- Reportes iniciales.

Las funcionalidades de prioridad alta deberán estar operativas
antes de considerar terminado el MVP.

---

### 9.4 Flujo principal del MVP

El flujo principal que deberá funcionar de extremo a extremo es:

1. El usuario inicia sesión.
2. El sistema identifica su rol.
3. El usuario accede a las funcionalidades permitidas.
4. El administrador registra productos y categorías.
5. El encargado de inventario registra existencias.
6. El vendedor consulta los productos disponibles.
7. El vendedor registra una venta.
8. El sistema valida el stock.
9. El sistema registra la venta.
10. El sistema actualiza el inventario.
11. El sistema registra el movimiento de inventario.
12. El sistema registra la operación en auditoría.
13. El administrador consulta los resultados mediante el
    dashboard.

Este flujo representa el recorrido principal que deberá ser
validado antes de considerar estable la primera versión.

---

### 9.5 Criterio general para considerar terminado el MVP

El MVP se considerará funcional cuando los usuarios autorizados
puedan completar correctamente el flujo principal del negocio
sin inconsistencias en la información de ventas, productos e
inventario, y cuando las funcionalidades críticas hayan sido
validadas mediante pruebas.


---

## 10. Fuera de alcance

Las siguientes funcionalidades no forman parte del MVP de
BusinessFlow y podrán evaluarse para versiones posteriores:

### 10.1 Facturación electrónica

No se incluirá inicialmente integración con sistemas de
facturación electrónica ni emisión de comprobantes electrónicos.

### 10.2 Integración con SUNAT

No se incluirá inicialmente integración directa con servicios
de SUNAT.

### 10.3 Pasarelas de pago

No se incluirá inicialmente integración con tarjetas,
Yape, Plin u otras plataformas de pago.

### 10.4 Aplicación móvil

El MVP será una aplicación web. El desarrollo de aplicaciones
nativas para Android o iOS queda fuera del alcance inicial.

### 10.5 Múltiples sucursales

El MVP estará orientado a un único establecimiento.

La arquitectura deberá permitir evaluar esta funcionalidad
en futuras versiones.

### 10.6 Inteligencia artificial

No se incluirán funcionalidades de inteligencia artificial
en el MVP.

### 10.7 Microservicios

El MVP utilizará inicialmente una arquitectura de aplicación
modular, sin introducir microservicios innecesariamente.

### 10.8 Kubernetes

La orquestación mediante Kubernetes no forma parte del MVP.

Podrá evaluarse posteriormente dependiendo de las necesidades
de infraestructura.

### 10.9 Aplicaciones para proveedores

No se desarrollará inicialmente un portal independiente para
proveedores.

### 10.10 Integraciones externas

Las integraciones con sistemas externos no serán necesarias
para la primera versión, salvo aquellas que posteriormente
se consideren indispensables para el funcionamiento del MVP.


---

## 11. Criterios de aceptación

Los criterios de aceptación establecen las condiciones que deben
cumplirse para considerar que una funcionalidad ha sido
implementada correctamente.

### 11.1 Autenticación

#### CA-001 — Inicio de sesión exitoso

Dado un usuario registrado y activo, cuando ingrese credenciales
válidas, el sistema debe permitirle acceder a BusinessFlow.

#### CA-002 — Credenciales incorrectas

Dado un usuario registrado, cuando ingrese una contraseña
incorrecta, el sistema debe rechazar el acceso y mostrar un
mensaje apropiado.

#### CA-003 — Usuario desactivado

Dado un usuario desactivado, cuando intente iniciar sesión,
el sistema debe rechazar el acceso.

---

### 11.2 Usuarios y roles

#### CA-004 — Crear usuario

Dado un administrador autenticado, cuando registre un usuario
con información válida, el sistema debe crear correctamente
el usuario y asignarle el rol seleccionado.

#### CA-005 — Restricción por rol

Dado un vendedor autenticado, cuando intente acceder a una
funcionalidad administrativa para la cual no tiene permisos,
el sistema debe rechazar la operación.

---

### 11.3 Productos

#### CA-006 — Crear producto

Dado un usuario autorizado, cuando registre un producto con
información válida, el sistema debe almacenarlo correctamente.

#### CA-007 — Datos inválidos

Dado un usuario autorizado, cuando intente registrar un producto
con datos inválidos, el sistema debe rechazar la operación e
informar los errores correspondientes.

#### CA-008 — Producto desactivado

Cuando un producto sea desactivado, no debe poder utilizarse
en nuevas ventas.

---

### 11.4 Inventario

#### CA-009 — Entrada de inventario

Dado un producto con stock conocido, cuando se registre una
entrada válida, el stock debe incrementarse correctamente.

#### CA-010 — Salida de inventario

Dado un producto con stock suficiente, cuando se registre una
salida válida, el stock debe disminuir correctamente.

#### CA-011 — Stock negativo

El sistema no debe permitir una operación que genere un stock
inferior a cero.

#### CA-012 — Trazabilidad

Cada movimiento de inventario debe registrar el producto,
tipo de movimiento, cantidad, usuario, fecha y motivo cuando
corresponda.

---

### 11.5 Ventas

#### CA-013 — Venta válida

Dado un producto activo con stock suficiente, cuando el vendedor
registre una venta válida, el sistema debe:

1. Registrar la venta.
2. Registrar sus detalles.
3. Calcular correctamente el total.
4. Descontar el stock.
5. Registrar los movimientos de inventario.
6. Registrar la operación en auditoría.

#### CA-014 — Stock insuficiente

Dado un producto con stock inferior a la cantidad solicitada,
el sistema no debe permitir confirmar la venta.

#### CA-015 — Producto desactivado

El sistema no debe permitir agregar productos desactivados
a una nueva venta.

#### CA-016 — Anulación de venta

Cuando un usuario autorizado anule una venta válida, el sistema
debe cambiar su estado y reintegrar las cantidades correspondientes
al inventario.

#### CA-017 — Consistencia de la venta

Si ocurre un error durante una operación crítica de venta,
el sistema debe evitar que solo una parte de la operación sea
registrada.

---

### 11.6 Clientes

#### CA-018 — Registrar cliente

Dado un usuario autorizado, cuando registre un cliente con
información válida, el sistema debe almacenarlo correctamente.

#### CA-019 — Cliente duplicado

El sistema debe evitar registrar clientes duplicados cuando
utilicen un documento de identificación ya registrado.

#### CA-020 — Historial

El sistema debe permitir consultar las ventas asociadas
a un cliente.

---

### 11.7 Dashboard

#### CA-021 — Indicadores

El dashboard debe mostrar correctamente los indicadores
correspondientes al período seleccionado.

#### CA-022 — Stock bajo

El dashboard debe identificar los productos cuyo stock actual
sea igual o inferior al stock mínimo configurado.

---

### 11.8 Auditoría

#### CA-023 — Registro de operación

Las operaciones críticas deben generar un registro de auditoría.

#### CA-024 — Información de auditoría

El registro de auditoría debe identificar como mínimo:

- Usuario.
- Operación.
- Fecha y hora.
- Recurso afectado.

#### CA-025 — Protección de auditoría

Los usuarios sin permisos administrativos no deben poder
modificar ni eliminar registros de auditoría.

---

### 11.9 Calidad general

#### CA-026 — Validación de datos

Las entradas proporcionadas por los usuarios deben validarse
antes de procesarse.

#### CA-027 — Manejo de errores

Los errores deben manejarse de forma controlada sin exponer
información sensible.

#### CA-028 — Pruebas

Las funcionalidades críticas deben contar con pruebas que
validen sus escenarios principales y alternativos.

#### CA-029 — Integración

Los cambios incorporados al proyecto deben poder ser validados
mediante el proceso de integración continua.

#### CA-030 — Despliegue

La aplicación debe poder construirse y desplegarse mediante
un proceso reproducible y documentado.