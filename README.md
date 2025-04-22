# Portal do Licitante

Sistema web para gerenciamento de processos licitatórios, com funcionalidades voltadas para o controle de editais, pregões, lotes, órgãos públicos, empresas e funcionários, utilizando autenticação via JWT.

---

## 📘 Minimundo

A empresa AutoVrio atua na transformação de veículos especiais e participa ativamente de licitações públicas. O processo inicia-se com a publicação de um Edital de Licitação por um Órgão Público, que possui nome, CNPJ e endereço. O edital contém informações como número da licitação, documentação obrigatória, valor estimado, órgão responsável, data de abertura, prazo de entrega e exigências técnicas.
Cada edital está associado a um Pregão Eletrônico, identificado por um número, modalidade e status. Um pregão é composto por um ou mais Lotes, que possuem número, quantidade de veículos e objeto a ser transformado. Cada lote inclui veículos com modelo, ano de fabricação e tipo (carro, moto, caminhão etc.).

A AutoVrio possui dois tipos de funcionários: analistas de licitações e motoristas. Todos os funcionários possuem nome, CPF, e-mail corporativo, telefones e status. Analistas de licitações participam obrigatoriamente dos pregões, com registro do período de participação. Motoristas são responsáveis pelas entregas dos veículos transformados.
De acordo com o resultado do pregão, uma Empresa — identificada por CNPJ, endereço e telefone — pode arrematar um ou mais lotes.


---

## 🚀 Tecnologias Utilizadas

### Backend (Spring Boot)
- Java 17
- Spring Boot 3.x
- Spring Web
- Spring Security (JWT)
- JDBC Puro (sem ORMs)
- MySQL
- BCrypt para criptografia de senhas

### Frontend (React)
- React (Create React App)
- React Router DOM
- Fetch API
- CSS Modules
- Armazenamento de token JWT no `localStorage`

---

## 🗂️ Estrutura do Projeto

PortalDoLicitante/ ├── portallicitante/ # Backend (Spring Boot) │ ├── config/ │ ├── controller/ │ ├── dto/ │ ├── model/ │ ├── repository/ │ ├── security/ │ ├── service/ │ └── PortallicitanteApplication.java │ ├── portallicitante-frontend/ # Frontend (React) │ ├── src/ │ │ ├── assets/ │ │ ├── components/ │ │ ├── pages/ │ │ ├── routes/ │ │ └── services/ │ ├── public/ │ └── package.json


---

## 🔧 Como Executar o Projeto

### Pré-requisitos

- Java 17
- Node.js e npm
- MySQL
- IDEs como IntelliJ e VS Code

### Frontend

1. Acesse a pasta `portallicitante-frontend`
2. Execute o projeto com sua IDE ou com o comando:

```bash
./npm start
```

### Backend

1. Acesse a pasta `portallicitante`
2. Configure o `application.properties` com suas credenciais do MySQL
3. Execute o projeto com sua IDE ou com o comando:

```bash
./mvnw spring-boot:run


