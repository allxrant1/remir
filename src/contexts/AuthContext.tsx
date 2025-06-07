import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types/user';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isLoading: boolean;
  profileLoading: boolean;
  hasPermission: (permission: string) => boolean;
  isMinistryLeader: (ministryId: string) => boolean;
  isMinistryMember: (ministryId: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseAuthUser, setSupabaseAuthUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [profileLoading, setProfileLoading] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    let mounted = true;
    console.log('AuthContext useEffect [onAuthStateChange/getSession] iniciado');

    const handleAuthStateChange = (_event: string, session: any | null) => {
      console.log('onAuthStateChange disparado. Event:', _event, ', Session:', session);
      if (!mounted) {
        console.log('onAuthStateChange: Componente desmontado, ignorando.');
        return;
      }

      setSupabaseAuthUser(session?.user || null);

      if (_event === 'INITIAL_SESSION') {
         setIsLoading(false);
      } else if (_event === 'SIGNED_OUT') {
         setIsLoading(false);
         setProfileLoading(false);
      } else if (_event === 'SIGNED_IN') {
          setIsLoading(false);
      }
    };

    console.log('AuthContext useEffect [onAuthStateChange/getSession]: Configurando onAuthStateChange...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('getSession inicial: Resposta recebida.', { session });
      if (mounted) {
        setSupabaseAuthUser(session?.user || null);
      }
    });

    return () => {
      console.log('AuthContext useEffect [onAuthStateChange/getSession]: Função de limpeza.');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
      let mounted = true;
      console.log('AuthContext useEffect [supabaseAuthUser?.id] iniciado', { currentAuthUserId: supabaseAuthUser?.id });

      const loadUserProfile = async (userId: string) => {
          if (!mounted) return;

          setProfileLoading(true);
          try {
              await fetchUserData(userId);
          } catch (error) {
              console.error('useEffect [supabaseAuthUser?.id]: Erro buscando dados do perfil:', error);
               if (mounted) {
                   setUser(null);
               }
          } finally {
              if (mounted) {
                  setProfileLoading(false);
              }
          }
      };

      if (supabaseAuthUser?.id) {
          console.log('useEffect [supabaseAuthUser?.id]: supabaseAuthUser detectado, acionando loadUserProfile...', supabaseAuthUser.id);
          loadUserProfile(supabaseAuthUser.id);
      } else {
          console.log('useEffect [supabaseAuthUser?.id]: Sem supabaseAuthUser. Limpando usuário e profileLoading.');
          setUser(null);
          setProfileLoading(false);
      }

      return () => {
          mounted = false;
          console.log('AuthContext useEffect [supabaseAuthUser?.id]: Função de limpeza.');
      };

  }, [supabaseAuthUser?.id]);

  async function fetchUserData(userId: string) {
    console.log('fetchUserData: Iniciando busca por usuário ID:', userId);
    try {
      console.log("fetchUserData: Chamando supabase.from('users').select()...");
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('fetchUserData: Resposta do select:', { data, error });

      if (error) {
        console.error('fetchUserData: Erro recebido do select:', error);
        if (error.code === 'PGRST116') {
           console.warn('fetchUserData: Usuário encontrado no auth, mas não na tabela \'users\'. Definindo role como visitor.');
           setUser({
                 id: userId,
                 email: supabaseAuthUser?.email || '',
                 role: 'visitor',
                 name: supabaseAuthUser?.user_metadata?.name || '',
                 createdAt: new Date(),
                 lastLogin: new Date(),
                 isActive: true
           });
        } else {
           throw error;
        }
      }

      if (data) {
        console.log('fetchUserData: Dados recebidos, definindo usuário com perfil completo.', data);
        setUser({
          ...data,
          createdAt: new Date(data.createdAt),
          lastLogin: new Date(data.lastLogin),
          birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
          baptismDate: data.baptismDate ? new Date(data.baptismDate) : undefined
        });
        console.log('fetchUserData: Estado do usuário definido com perfil completo.');
      } else {
         console.log('fetchUserData: Select não retornou dados e não foi um erro PGRST116.');
      }
    } catch (error: any) {
      console.error('fetchUserData: Erro capturado no catch:', error);
       throw error;
    } finally {
      console.log('fetchUserData: Finalizado.');
    }
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;

    const rolePermissions: Record<UserRole, string[]> = {
      visitor: ['read:public', 'read:member', 'read:community', 'read:contributions', 'read:messages'],
      member: ['read:public', 'read:member', 'create:prayer'],
      ministry_user: ['read:public', 'read:member', 'read:ministry', 'create:prayer'],
      ministry_leader: ['read:public', 'read:member', 'read:ministry', 'write:ministry', 'create:prayer'],
      social_media: ['read:public', 'read:member', 'write:public', 'write:social']
    };

    return rolePermissions[user.role]?.includes(permission) ?? false;
  };

  const isMinistryLeader = (ministryId: string): boolean => {
    return user?.isLeaderOf?.includes(ministryId) ?? false;
  };

  const isMinistryMember = (ministryId: string): boolean => {
    return user?.ministries?.includes(ministryId) ?? false;
  };

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch(error) {
       console.error('Erro durante o login:', error);
       setSupabaseAuthUser(null);
       setUser(null);
       setIsLoading(false);
       setProfileLoading(false);
       throw error;
    }
  }

  async function logout() {
    setIsLoading(true);
    setProfileLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch(error) {
       console.error('Erro durante o logout:', error);
       setSupabaseAuthUser(null);
       setUser(null);
       setIsLoading(false);
       setProfileLoading(false);
       throw error;
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      role: user?.role ?? 'visitor',
      isLoading,
      profileLoading,
      hasPermission,
      isMinistryLeader,
      isMinistryMember,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
