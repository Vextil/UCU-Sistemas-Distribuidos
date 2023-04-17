# Desafío 1
Este proyecto contiene dos aplicaciones, una escrita en Go (Gin) y otra en Node.js (Express), que se ejecutan simultáneamente utilizando Docker.

## Estructura

go - Contiene el código fuente de la aplicación en Go. El archivo principal es main.go.

node - Contiene el código fuente de la aplicación en Node.js. El archivo principal es main.js.

docker-compose.yml - Contiene la configuración de Docker Compose para iniciar las aplicaciones.

## Ejecutar

Ejecutar el siguiente comando dentro de la carpeta del proyecto (donde se encuentra el archivo docker-compose.yml) para iniciar los servidores:
```
docker-compose up
```
Los servidores se ejecutarán en los puertos 80 (servidor1, Go) y 81 (servidor2, Node.js).

---

Podemos probar las aplicaciones desde las siguientes URL en el host:

Go: `http://localhost:80/ping`

Node.js: `http://localhost:81/ping`

--- 
Para comunicar los servidores entre sí, podemos usar el nombre de los contenedores (servidor1 y servidor2). Por ejemplo, para hacer la llamada anidada desde el host:

```http://localhost/forward?url=http://server2/forward?url=http://server1/ping```
