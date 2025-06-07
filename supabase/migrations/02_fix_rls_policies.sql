-- Remover políticas existentes para recriar
DROP POLICY IF EXISTS "Users can read their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;

-- Permitir que usuários não autenticados insiram seus próprios dados durante o cadastro
CREATE POLICY "Enable insert for authentication" ON public.users
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Permitir que usuários autenticados leiam seus próprios dados
CREATE POLICY "Users can read their own data" ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Permitir que usuários autenticados atualizem seus próprios dados
CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);
