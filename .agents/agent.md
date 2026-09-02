# AGENTS.md — Pintzepol

## Idioma y codificación

* Todo el contenido visible para el usuario debe estar escrito en **español correcto**.
* Escribir siempre los caracteres españoles de forma natural:

  * á, é, í, ó, ú
  * ü
  * ñ
  * ¿ ?
  * ¡ !
* **PROHIBIDO introducir mojibake**, por ejemplo:

  * `TelÃ©fono`
  * `DirecciÃ³n`
  * `EspaÃ±a`
* **PROHIBIDO sustituir letras españolas por secuencias extrañas**, escapes Unicode o soluciones similares para representar tildes o `ñ`.
* Escribir directamente:

  * `Teléfono`
  * `Dirección`
  * `España`
* Mantener los archivos de texto/código en **UTF-8 sin BOM**.
* Antes de terminar cualquier cambio que incluya textos, comprobar que no se ha introducido ningún carácter corrupto.

## Forma de trabajar

* Analizar primero el código existente antes de modificarlo.
* Hacer únicamente los cambios necesarios para la tarea solicitada.
* No hacer refactors generales si no se han pedido.
* No reorganizar carpetas ni arquitectura sin autorización.
* No cambiar nombres de componentes, clases o archivos salvo necesidad real.
* No eliminar código existente porque parezca innecesario sin comprobar antes sus dependencias.
* No instalar librerías nuevas sin autorización.
* No sustituir una solución existente por otra librería porque parezca más moderna.
* No modificar partes de la web ajenas a la tarea solicitada.
* Priorizar cambios pequeños, controlados y fáciles de revisar.

## Stack existente

Mantener el stack actual salvo indicación expresa:

* React 18
* Vite 5
* JavaScript / JSX
* SCSS
* Framer Motion

No añadir nuevas dependencias sin autorización.

## Estilos

* Mantener SCSS como sistema de estilos.
* Respetar la estructura existente de:

  * `src/styles/core`
  * `src/styles/components`
* Reutilizar variables y mixins existentes cuando sea posible.
* No introducir CSS inline salvo que exista una razón clara.
* No crear sistemas de diseño, utilidades o abstracciones nuevas innecesarias.

## Responsive

* Trabajar con enfoque mobile-first cuando se creen o modifiquen secciones.
* Revisar siempre:

  * móvil
  * tablet
  * desktop
* Evitar arreglos que solucionen un breakpoint y rompan otro.
* No añadir breakpoints arbitrarios sin comprobar primero los existentes.

## Diseño

* No cambiar el diseño por iniciativa propia.
* Respetar las referencias visuales proporcionadas.
* Si una decisión solicitada genera un problema claro de UX, responsive, jerarquía o legibilidad, indicarlo antes de ejecutarla.
* Evitar animaciones decorativas innecesarias.
* Las animaciones deben ser sobrias, rápidas y coherentes con una empresa industrial.

## Imágenes y vídeo

* No sustituir assets sin autorización.
* No cambiar proporciones o recortes importantes sin revisar cómo afectan a desktop y móvil.
* Evitar deformar imágenes.
* Los vídeos de hero deben mantener:

  * `autoplay`
  * `muted`
  * `loop`
  * `playsInline`
* Optimizar peso sin degradar visiblemente el material.

## Contenido

* No inventar servicios, características técnicas, datos de empresa, cifras o procesos.
* Usar únicamente contenido proporcionado por el cliente o aprobado.
* No utilizar textos genéricos de plantilla como contenido definitivo.
* Mantener tildes, `ñ`, signos de apertura y ortografía española correcta.

## Antes de finalizar cualquier tarea

Comprobar:

1. Que el cambio solicitado está hecho.
2. Que no se han cambiado zonas no relacionadas.
3. Que no hay errores de consola introducidos por el cambio.
4. Que no hay mojibake.
5. Que las tildes y `ñ` están escritas como caracteres normales.
6. Que no se han añadido dependencias sin permiso.
7. Que desktop y móvil siguen funcionando.
8. Que no se ha realizado ningún refactor innecesario.

## Regla principal

**No ampliar el alcance de una tarea. Primero entender, después modificar y finalmente verificar.**
## Entorno de trabajo

- El proyecto se trabaja desde **Ubuntu / WSL**.
- No usar PowerShell para ejecutar comandos del proyecto.
- No dar instrucciones pensadas para PowerShell.
- Los comandos deben estar escritos para terminal Ubuntu/Linux.
- Usar rutas Linux/WSL, no rutas de PowerShell.
- Evitar trabajar directamente sobre `node_modules` dentro de `/mnt/c` si puede generar problemas de permisos o rendimiento.
- Para instalar dependencias, ejecutar scripts, build o desarrollo, usar terminal Ubuntu.