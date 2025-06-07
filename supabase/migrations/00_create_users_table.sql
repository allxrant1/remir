-- Create the users table
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'visitor' CHECK (role IN ('visitor', 'member', 'ministry_user', 'ministry_leader', 'social_media')),
    ministries TEXT[] DEFAULT '{}',
    is_leader_of TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    avatar TEXT,
    -- Campos específicos para membros
    phone TEXT,
    address TEXT,
    birth_date DATE,
    baptism_date DATE,
    -- Campos específicos para usuários de ministério
    skills TEXT[] DEFAULT '{}',
    availability TEXT[] DEFAULT '{}',
    -- Campos específicos para social media
    social_networks JSONB DEFAULT '{}'::jsonb
);

-- Criar uma política RLS (Row Level Security) para a tabela
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Permitir que usuários autenticados leiam seus próprios dados
CREATE POLICY "Users can read their own data" ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Permitir que usuários autenticados atualizem seus próprios dados
CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE
    USING (auth.uid() = id);

-- Trigger para criar um registro de usuário quando um novo usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        'visitor'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que é acionado após a inserção de um novo usuário na tabela auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
