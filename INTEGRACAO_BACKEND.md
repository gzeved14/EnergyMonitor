# 📱 INTEGRAÇÃO FRONTEND + BACKEND - GUIA PRÁTICO

**Data:** 20 de março de 2026  
**Status:** Em Integração

---

## ✅ Configuração Básica Já Realizada

### 1. **URLs da API Atualizadas** ✅
```
Frontend agora aponta para:
- Development: http://localhost:3000/api
- Production: http://localhost:3000/api
```

**Arquivos Atualizados:**
- `src/environments/environment.development.ts`
- `src/environments/environment.ts`

---

## ⚠️ Ajustes Necessários nos Endpoints

### Problema: Endpoints não correspondem

**Frontend está chamando:**
```typescript
POST /login        ❌ (deveria ser /auth/login)
POST /refresh      ❌ (deveria ser /auth/refresh)
POST /register     ❌ (deveria ser /pesquisador)
```

**Backend oferece:**
```typescript
POST /api/auth/login      ✅
POST /api/auth/refresh    ✅
POST /api/auth/logout     ✅
POST /api/pesquisador     ✅ (criar pesquisador)
```

---

## 🔧 Como Corrigir - Opção 1 (Recomendado)

### Atualizar o AuthService

**Arquivo:** `src/app/shared/services/auth-service.ts`

```typescript
// ANTES ❌
return this.http.post(`${this.API}/login`, credentials);
return this.http.post(`${this.API}/refresh`, { refreshToken });

// DEPOIS ✅
return this.http.post(`${this.API}/auth/login`, credentials);
return this.http.post(`${this.API}/auth/refresh`, { refreshToken });
```

### Estrutura de Resposta Esperada

**Login:**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "nome": "João",
    "email": "joao@example.com"
  }
}
```

---

## 🔄 Como Corrigir - Opção 2 (Interceptor HTTP)

Se não quiser editar todos os endpoints, crie um interceptor:

```typescript
// src/app/core/interceptors/api.interceptor.ts

import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  
  // Adiciona /auth/ antes de login/refresh/logout
  let url = req.url;
  if (url.includes('/login') || url.includes('/refresh') || url.includes('/logout')) {
    url = url.replace('/api/', '/api/auth/');
  }
  
  const clonedReq = req.clone({ 
    url,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });
  
  return next(clonedReq);
};
```

---

## 📋 Verificação de Serviços

### ✅ Serviços Já Existentes
- `auth-service.ts` - Autenticação
- `area-service.ts` - Gerenciamento de áreas
- `leitura-service.ts` - Leituras de sensores
- `sensor-service.ts` - Gerenciamento de sensores

### Precisam de Sincronização
1. Verificar se endpoints estão corretos
2. Sincronizar estrutura de respostas
3. Adicionar tratamento de erros

---

## 🚀 Passo a Passo (Recomendado)

### 1. Parar o Frontend (se estiver rodando)
```bash
Ctrl+C
```

### 2. Iniciar Backend
```bash
cd C:\Users\Eduardo\Desktop\Gabriel\api-escola-typeorm
npm run dev
```

### 3. Iniciar Frontend
```bash
cd C:\Users\Eduardo\Desktop\Gabriel\Reserva-IoT
npm start
```

*Isso abrirá em `http://localhost:4200`*

### 4. Testar Integração
1. Ir para login
2. Tentar fazer login com credenciais
3. Verificar no console se as requisições estão funcionando
4. Ajustar endpoints conforme necessário

---

## 🐛 Troubleshooting

### "CORS error" ou "No 'Access-Control-Allow-Origin'"
**Solução:** Backend já tem CORS configurado
```
Frontend: http://localhost:4200 ✅
Backend: http://localhost:3000 ✅
CORS: Habilitado ✅
```

### "Unauthorized 401"
**Causa possível:** 
- Token expirado
- Token não enviado no header
- Secret JWT não bate

**Solução:**
```typescript
// Adicionar Authorization header
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Endpoints retornam 404
**Verificar:**
1. URL da API correta em environment.ts
2. Rota começando com `/auth/` para autenticação
3. Rota começando com `/sensor/`, `/leitura/`, `/area/` para recursos

---

## 📊 Estrutura de Requisições Esperadas

### Login
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "senha": "password123"
}
```

### Criar Pesquisador
```
POST http://localhost:3000/api/pesquisador
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "password123",
  "especialidade": "Botânica",
  "titulacao": "Mestrado",
  "matricula": "2024001",
  "dataNascimento": "1980-01-15"
}
```

### Listar Sensores (com Auth)
```
GET http://localhost:3000/api/sensor
Authorization: Bearer {token}
```

---

## ✅ Checklist de Implementação

- [x] Frontend configurado para porta 3000
- [x] Backend rodando em http://localhost:3000
- [ ] Verificar endpoints do frontend
- [ ] Atualizar ou criar interceptor
- [ ] Testar fluxo de login
- [ ] Testar requisições autenticadas
- [ ] Conectar dashboard a dados da API
- [ ] Testes E2E

---

## 🎯 Próximos Passos

1. **Sincronizar Endpoints**
   - Opção 1: Editar cada serviço
   - Opção 2: Criar interceptor (mais elegante)

2. **Testar Fluxo de Autenticação**
   - Login → Salvar tokens → Redirect dashboard

3. **Conectar Componentes à API**
   - Injetar serviços nos componentes
   - Carregar dados da API
   - Atualizar quando necessário

4. **Implementar Tratamento de Erros**
   - Mensagens de erro ao usuário
   - Refresh de token automático

---

## 📞 Dúvidas?

Verifique:
1. `docs/validacao/TESTES_GUIA_RAPIDO.md` - Como testar backend
2. `docs/validacao/VALIDACAO_COMPONENTES.md` - Endpoints disponíveis
3. Console do navegador (F12) - Erros de requisição
4. Logs do backend - Erros no servidor

---

**Próximo Passo:** Você quer ajuda para:
1. ✅ Criar um interceptor HTTP?
2. ✅ Atualizar os endpoints do frontend?
3. ✅ Testar a integração?

*Gerado em 20/03/2026*
