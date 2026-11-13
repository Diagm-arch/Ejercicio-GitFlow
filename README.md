# Práctica: Git-flow e Integración Continua

Ingeniería de Software, I-2026

---

## Objetivo

En esta actividad usted practicará un flujo básico de **Git-flow** usando un sistema pequeño.
La idea es simular el paso de una funcionalidad por las ramas:

```text
feature → develop → release → main
```

Además, al final deberá responder algunas preguntas directamente en este mismo archivo `README.md`.

**Duración estimada:** 20 a 30 minutos.

---

## Sistema base

El repositorio contiene un sistema pequeño para calcular descuentos.

Estructura esperada del proyecto:

```text
.
├── package.json
├── src
│   └── descuentos.js
├── test
│   └── descuentos.test.js
└── README.md
```

El archivo principal es:

```text
src/descuentos.js
```

La función principal recibe el precio de un producto y el tipo de cliente, y retorna el precio final con descuento.

Ejemplo:

```js
calcularPrecioFinal(10000, "normal")
```

---

## Pre-condición

Clonar el repositorio y entra a la carpeta del proyecto:

```bash
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_REPOSITORIO
```

Instala las dependencias:

```bash
npm install
```

Ejecuta las pruebas:

```bash
npm test
```

Antes de modificar el código, verifique que las pruebas iniciales pasen correctamente.

---

## Parte 1: preparar Git-flow

Primero, asegurar de estar en la rama principal:

```bash
git checkout main
```

Crear la rama `develop` a partir de `main`:

```bash
git checkout -b develop
git push -u origin develop
```

La rama `main` representa el código en producción.
La rama `develop` representa el código en desarrollo.

---

## Parte 2: crear una feature branch

Crea una rama para implementar una nueva funcionalidad:

```bash
git checkout -b feature/descuento-estudiante develop
```

Ahora implementa la siguiente funcionalidad:

> Si el tipo de cliente es `"estudiante"`, el sistema debe aplicar un descuento del 15%.

Ejemplo esperado:

```js
calcularPrecioFinal(10000, "estudiante")
```

Resultado esperado:

```js
8500
```

Debe modificar el archivo:

```text
src/descuentos.js
```

También debe agregar o completar una prueba en:

```text
test/descuentos.test.js
```

Ejecuta las pruebas:

```bash
npm test
```

Cuando todo funcione, realice un commit:

```bash
git add .
git commit -m "Agrega descuento para estudiantes"
```

---

## Parte 3: integrar la feature en develop

Vuelva a la rama `develop`:

```bash
git checkout develop
```

Integre la rama de funcionalidad usando `--no-ff`:

```bash
git merge --no-ff feature/descuento-estudiante -m "Integra feature descuento estudiante"
```

El parámetro `--no-ff` fuerza la creación de un commit de merge.
Esto permite dejar registrado que la funcionalidad fue desarrollada en una rama separada.

Elimine la rama local de la funcionalidad:

```bash
git branch -d feature/descuento-estudiante
```

Suba los cambios:

```bash
git push origin develop
```

---

## Parte 4: crear una release branch

Cree una rama de release desde `develop`:

```bash
git checkout -b release/1.0 develop
```

En esta rama, realiza una corrección menor en el archivo `README.md`.
Por ejemplo, agrega una breve descripción del sistema en la siguiente sección:

### Descripción del sistema

Escribe aquí una descripción breve del sistema:

> Respuesta del estudiante: Sistema desarrollado para el cálculo dinámico de precios y aplicación de descuentos según el tipo de cliente.

Luego realice un commit:

```bash
git add README.md
git commit -m "Actualiza documentación para release 1.0"
```

---

## Parte 5: publicar la release en main

Cambie a la rama `main`:

```bash
git checkout main
```

Integre la release:

```bash
git merge --no-ff release/1.0 -m "Publica release 1.0"
```

Cree una etiqueta para la versión:

```bash
git tag -a 1.0 -m "Versión 1.0"
```

Suba los cambios y la etiqueta:

```bash
git push origin main
git push origin 1.0
```

---

## Parte 6: devolver cambios a develop

Las correcciones hechas en la rama `release/1.0` también deben volver a `develop`.

```bash
git checkout develop
git merge --no-ff release/1.0 -m "Integra release 1.0 en develop"
```

Elimine la rama de release:

```bash
git branch -d release/1.0
```

Suba los cambios:

```bash
git push origin develop
```

---

## Parte 7: revisar el historial

Ejecute:

```bash
git log --oneline --graph --all
```

Observe el historial y verifique que aparezcan las ramas, los commits y los merges realizados durante la práctica.

---

## Preguntas

Responda las siguientes preguntas directamente en este archivo `README.md`.

### 1. ¿Cuál es la diferencia entre `main` y `develop` en Git-flow?

Respuesta: main (o master) contiene estrictamente el código estable que se encuentra actualmente en producción y listo para los usuarios finales, en cambio, develop es la rama de integración donde se consolidan todas las nuevas funcionalidades (features) y correcciones que formarán parte del siguiente lanzamiento.

---

### 2. ¿Por qué la funcionalidad se desarrolló en una rama `feature` y no directamente en `main`?

Respuesta: Para mantener el entorno de producción (main) limpio y libre de errores o código incompleto. Trabajar en una rama feature aísla el desarrollo, permitiendo experimentar, probar y corregir sin afectar el código base ni interferir con el trabajo de otros desarrolladores.

---

### 3. ¿Qué hace el comando `git merge --no-ff`?

Respuesta: Fuerza la creación explícita de un commit de fusión (merge commit) incluso si el merge se pudiera resolver mediante un avance rápido (fast-forward). Esto preserva de forma visual en el historial la existencia de la rama y el contexto de que un grupo de cambios pertenecía a una funcionalidad o release específica.

---

### 4. ¿Qué diferencia habría si Git hiciera un merge con fast-forward?

Respuesta: Con un fast-forward, Git simplemente movería el puntero de la rama destino hacia adelante sin dejar rastro de que los commits provinieron de una rama separada, el historial lineal resultante haría mucho más difícil identificar visualmente dónde empezó o terminó el desarrollo de una funcionalidad específica.

---

### 5. Después del merge, ¿los commits hechos en `feature/descuento-estudiante` quedan en el historial de `develop`?

Respuesta: Sí. Todos los commits individuales realizados en la rama feature se incorporan formalmente al historial de la rama develop al realizar la fusión.

---

### 6. ¿Qué rol cumple una rama `release`?

Respuesta: Permite preparar el terreno para una nueva versión a producción. Facilita realizar tareas de última hora como correcciones menores de bugs, pruebas finales de integración, actualización de versiones, documentación o metadatos, aislando este proceso mientras el equipo puede seguir avanzando en nuevas funcionalidades sobre la rama develop.

---

### 7. ¿Es posible usar Integración Continua con Git-flow? Justifica brevemente.

Respuesta: Sí, es totalmente compatible. Se pueden configurar servidores de Integración Continua para que automaticen la ejecución de pruebas unitarias y linters cada vez que se haga un push o un pull request hacia las ramas clave como develop, feature/* o release/*, asegurando la calidad del código antes de que llegue a producción.

---

## Generar evidencia 

Ejecuta el siguiente comando en PowerShell (Windows) o Bash (Linux), dentro de la carpeta del repositorio:

Windows:
```powershell
powershell -ExecutionPolicy Bypass -File .\generar-evidencia.ps1
```
Linux:
```bash
chmod +x generar-evidencia.sh
./generar-evidencia.sh```
```

En campus virtual subir:

```text
1. Archivo evidencia_gitflow.txt.
2. README.md con las respuestas completas.
```
