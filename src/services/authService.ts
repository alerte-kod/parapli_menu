import { supabase } from '../lib/supabase';
import type { User } from '../types';

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data?.user ? { id: data.user.id, email: data.user.email || '' } : null;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (session && session.user) {
      callback({ id: session.user.id, email: session.user.email || '' });
    } else {
      callback(null);
    }
  });
  
  return data.subscription.unsubscribe;
};