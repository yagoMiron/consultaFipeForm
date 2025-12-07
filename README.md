# 🚗 Consulta FIPE — Formulário React (Vite)

Este projeto é uma aplicação React criada com **Vite**, desenvolvida para realizar **consultas na Tabela FIPE** de duas maneiras:

1. **Consulta pela placa do veículo** — apenas informando a placa (⚠️ ainda não implementada)
2. **Consulta sem placa** — selecionando:

   - Tipo de veículo
   - Marca
   - Modelo
   - Ano

A aplicação consome APIs externas para obter informações FIPE e exibe os resultados de forma simples e intuitiva.

---

## 📂 Tecnologias Utilizadas

- **React**
- **Vite**
- **TypeScript**
- **Axios**
- **CSS Modules**

---

## ✅ Funcionalidades

### ✔️ Já implementadas

| Funcionalidade                        | Status          | Descrição                                                      |
| ------------------------------------- | --------------- | -------------------------------------------------------------- |
| Estrutura inicial do projeto com Vite | ✔️ Implementado | Base criada com Vite + React.                                  |
| Consulta sem placa                    | ✔️ Implementado | Busca por tipo → marca → modelo → ano.                         |
| Carregamento dinâmico dos selects     | ✔️ Implementado | Campos dependentes carregam valores conforme escolha anterior. |
| Exibição do resultado FIPE            | ✔️ Implementado | Exibe valor FIPE e detalhes do veículo.                        |
| Tratamento básico de erros            | ✔️ Implementado | Exibe mensagens para erros simples de API.                     |

### ❌ Ainda não implementadas

| Funcionalidade                                | Status              | Observação                                            |
| --------------------------------------------- | ------------------- | ----------------------------------------------------- |
| Consulta apenas pela placa                    | ❌ Não implementado | Endpoint e lógica ainda não adicionados.              |
| Máscara/validação de placa                    | ❌ Não implementado | Será útil quando a consulta por placa for finalizada. |
| Loader/spinner durante requisições            | ❌ Não implementado | Recomendado para melhorar experiência.                |
| Testes automatizados (unitários e integração) | ❌ Não implementado | Ideal para versão estável.                            |

---

## ▶️ Como executar o projeto localmente

Abaixo seguem as instruções **passo a passo**, desde o clone até rodar o projeto.

---

### 1️⃣ Instalar o **Git**

Caso ainda não tenha:

- **Windows**: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Linux** (Debian/Ubuntu):

```bash
sudo apt update
sudo apt install git
```

---

### 2️⃣ Clonar o repositório

```bash
git clone https://github.com/yagoMiron/consultaFipeForm.git
```

Depois, entre na pasta:

```bash
cd SEU_REPOSITORIO
```

---

### 3️⃣ Instalar o **Node.js** + **npm**

Baixe em: [https://nodejs.org/](https://nodejs.org/)

Ou no Linux:

```bash
sudo apt install nodejs npm
```

Verifique:

```bash
node -v
npm -v
```

---

### 4️⃣ Instalar as dependências do projeto

```bash
npm install
```

ou

```bash
npm i
```

---

### 5️⃣ Rodar a aplicação

```bash
npm run dev
```

A Vite irá mostrar uma URL similar a:

```
http://localhost:5173
```

Abra no navegador.

---

## 📁 Estrutura do Projeto (exemplo)

```
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── App.jsx
 └── main.jsx
```

---

## 🚀 Próximos Passos

- Implementar a consulta por placa
- Criar testes (Jest, React Testing Library)

---

## 📄 Licença

Este projeto é livre para uso educacional ou profissional — adicione aqui sua licença caso possua.
