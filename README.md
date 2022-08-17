## Futebol Clube
É uma aplicação que permite gerenciamento de partidas de futebol.
Realizando as ações de cadastrar, listar partidas, editar o placar e finalizar uma partida.
É possível também olhar a classificação geral dos times e aplicar filtros


<img src="./front-example.png"/>

## Construção
O front-end e o docker-compose foram fornecidos pela Trybe

Foi construido usando TypeScript, zod para fazer validações dos campos recebidos, JWT para gerar o token da api, 
os testes de integração foram construídos usando o mocha, chai e sinon

## Como executar localmente:
O docker compose utilizado estava na versão 1.29.2 e o docker na versão 20.10.17

```
git clone git@github.com:MarcosDurval/Futebol-clube.git
```
```
cd Futebol-clube
```

```
docker-compose up --build -d
```

Ao Final do processo você podera acessar a aplicação no localhost:3000

dois usuários serão cadastrados no banco de dados com os repectivos dados

email: admin@admin.com  
senha: secret_admin

email: user@user.com  
senha: secret_user

## Execute os teste do Back-end

```
docker exec -it backend npm run test
```

## Parando a execução

```
docker-compose down --rmi local --remove-orphans
```