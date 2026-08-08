# BusinessFlow - Diseño de Base de Datos

## 1. Objetivo

Definir el modelo de datos utilizado por BusinessFlow para
gestionar usuarios, productos, clientes, ventas, inventario
y auditoría.

## 2. Entidades principales

- roles
- users
- categories
- products
- customers
- suppliers
- sales
- sale_details
- inventory_movements
- audit_logs

## 3. Relaciones principales

- Un rol puede tener muchos usuarios.
- Una categoría puede tener muchos productos.
- Un cliente puede tener muchas ventas.
- Un usuario puede registrar muchas ventas.
- Una venta puede contener muchos detalles.
- Un producto puede aparecer en muchos detalles de venta.
- Un producto puede tener muchos movimientos de inventario.
- Un usuario puede registrar muchos movimientos de inventario.
- Un usuario puede generar muchos registros de auditoría.

## 4. Decisiones iniciales

### Stock actual

El stock actual se almacenará en `products.stock`.

### Historial de inventario

Los cambios de stock se registrarán en
`inventory_movements`.

### Eliminación

Las entidades con información histórica relevante
utilizarán desactivación lógica en lugar de eliminación física.

### Ventas

Las ventas y sus detalles se almacenarán de forma separada
para permitir que una venta contenga múltiples productos.


---

## 5. Modelo lógico

### 5.1 roles

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(50) | NOT NULL, UNIQUE |
| description | VARCHAR(255) | NULL |
| created_at | DATETIME | NOT NULL |

### 5.2 users

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| role_id | INT | FK → roles.id, NOT NULL |
| name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(150) | NOT NULL, UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| status | ENUM | ACTIVE, INACTIVE |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### 5.3 categories

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| name | VARCHAR(100) | NOT NULL, UNIQUE |
| description | VARCHAR(255) | NULL |
| status | ENUM | ACTIVE, INACTIVE |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### 5.4 products

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| category_id | INT | FK → categories.id |
| code | VARCHAR(50) | NOT NULL, UNIQUE |
| name | VARCHAR(150) | NOT NULL |
| description | VARCHAR(255) | NULL |
| sale_price | DECIMAL(10,2) | NOT NULL |
| stock | INT | NOT NULL, >= 0 |
| minimum_stock | INT | NOT NULL, >= 0 |
| status | ENUM | ACTIVE, INACTIVE |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### 5.5 customers

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| document_number | VARCHAR(20) | UNIQUE |
| name | VARCHAR(150) | NOT NULL |
| phone | VARCHAR(20) | NULL |
| email | VARCHAR(150) | NULL |
| status | ENUM | ACTIVE, INACTIVE |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### 5.6 suppliers

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| document_number | VARCHAR(20) | UNIQUE |
| business_name | VARCHAR(150) | NOT NULL |
| phone | VARCHAR(20) | NULL |
| email | VARCHAR(150) | NULL |
| status | ENUM | ACTIVE, INACTIVE |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### 5.7 sales

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| customer_id | INT | FK → customers.id, NULL |
| user_id | INT | FK → users.id, NOT NULL |
| sale_date | DATETIME | NOT NULL |
| total | DECIMAL(10,2) | NOT NULL |
| status | ENUM | CONFIRMED, CANCELLED |
| created_at | DATETIME | NOT NULL |
| updated_at | DATETIME | NOT NULL |

### 5.8 sale_details

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| sale_id | INT | FK → sales.id |
| product_id | INT | FK → products.id |
| quantity | INT | NOT NULL, > 0 |
| unit_price | DECIMAL(10,2) | NOT NULL |
| subtotal | DECIMAL(10,2) | NOT NULL |
| created_at | DATETIME | NOT NULL |

### 5.9 inventory_movements

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| product_id | INT | FK → products.id |
| user_id | INT | FK → users.id |
| sale_id | INT | FK → sales.id, NULL |
| movement_type | ENUM | IN, OUT, ADJUSTMENT |
| quantity | INT | NOT NULL, > 0 |
| reason | VARCHAR(255) | NULL |
| created_at | DATETIME | NOT NULL |

### 5.10 audit_logs

| Campo | Tipo | Restricciones |
|---|---|---|
| id | INT | PK, AUTO_INCREMENT |
| user_id | INT | FK → users.id |
| action | VARCHAR(50) | NOT NULL |
| entity | VARCHAR(50) | NOT NULL |
| entity_id | INT | NULL |
| details | JSON | NULL |
| created_at | DATETIME | NOT NULL |


---

## 6. Reglas de integridad y diseño

### 6.1 Eliminación lógica

Las entidades que tengan información histórica relacionada
no serán eliminadas físicamente. Se utilizará un campo de
estado para permitir su desactivación.

### 6.2 Integridad de ventas

El registro de una venta y las operaciones relacionadas con
el inventario deberán ejecutarse dentro de una transacción.

### 6.3 Movimientos de inventario

Todo cambio de stock deberá generar un movimiento de inventario.

### 6.4 Movimientos asociados a ventas

El campo `sale_id` de `inventory_movements` podrá ser NULL,
debido a que existen movimientos que no necesariamente
provienen de una venta.

### 6.5 Índices

Se crearán índices sobre campos utilizados frecuentemente
para búsquedas, filtros y relaciones.

Entre ellos:

- users.email
- users.role_id
- products.code
- products.category_id
- products.status
- sales.user_id
- sales.customer_id
- sales.sale_date
- sale_details.sale_id
- sale_details.product_id
- inventory_movements.product_id
- inventory_movements.user_id
- audit_logs.user_id
- audit_logs.created_at