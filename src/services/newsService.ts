import { supabase } from '../lib/supabase';
import type { NewsEvent, NewsEventInput } from '../types';

export const getNewsEvents = async (): Promise<NewsEvent[]> => {
  const { data, error } = await supabase
    .from('news_events')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getActiveNewsEvents = async (): Promise<NewsEvent[]> => {
  const { data, error } = await supabase
    .from('news_events')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const createNewsEvent = async (newsEvent: NewsEventInput): Promise<NewsEvent> => {
  const { data, error } = await supabase
    .from('news_events')
    .insert([newsEvent])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateNewsEvent = async (id: string, newsEvent: Partial<NewsEventInput>): Promise<NewsEvent> => {
  const { data, error } = await supabase
    .from('news_events')
    .update({ ...newsEvent, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteNewsEvent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('news_events')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};