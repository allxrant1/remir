import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it, vi, beforeEach } from 'vitest';

// Caminho absoluto graças ao alias "@" definido no Vite
import { useEventos } from '../useEventos';

vi.mock('@/services/eventService', () => {
  // Dados mockados declarados dentro do factory para evitar problemas de hoisting
  const mockEvents = [
    {
      id: '1',
      titulo: 'Evento 1',
      tipo: 'palestra',
      data: '2025-01-01',
      hora: '10:00',
      local: 'Auditório',
      descricao: 'Descrição',
      created_at: '',
      updated_at: '',
    },
  ];

  const getEvents = vi.fn().mockResolvedValue(mockEvents);

  return {
    eventService: {
      getEvents,
    },
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useEventos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve buscar eventos com sucesso', async () => {
    const { result } = renderHook(() => useEventos(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.length).toBe(1);
    expect(result.current.data?.[0]?.titulo).toBe('Evento 1');
  });
}); 