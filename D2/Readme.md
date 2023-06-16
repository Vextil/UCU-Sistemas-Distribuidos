# Desafío 2

Ejecutar el siguiente comando dentro de la carpeta del proyecto (donde se encuentra el archivo docker-compose.yml) para iniciar los servidores:
```
docker compose up
```
Los servidores se ejecutarán en los puertos 80 (servidor1) y 81 (servidor2) del host.

---

Podemos probar las aplicaciones desde las siguientes URL:

Servidor 1: `localhost:50051`
Servidor 2: `localhost:50052`

--- 
Para probar el forward encadenado entre los dos servidores, podemos hacer la siguiente llamada desde el host:

URL:
localhost:50051

Mensaje:
{
    "host": "server2:50051",
    "method": 1,
    "forward": {
        "host": "server1:50051",
        "method": 0,
        "forward": {}
    }
}