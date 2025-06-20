import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Importa jest-dom para matchers extras (usa caminho especial do Vitest)
import '@testing-library/jest-dom/vitest';

// Cria servidor MSW sem handlers iniciais; cada teste pode adicionar os seus
export const server = setupServer();
export { rest };

// Inicia/para e reseta o servidor conforme ciclo de vida dos testes
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); 