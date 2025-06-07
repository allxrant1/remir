-- Permitir inserção de novos usuários
CREATE POLICY "Users can insert their own data" ON public.users
    FOR INSERT
    WITH CHECK (auth.uid() = id);
