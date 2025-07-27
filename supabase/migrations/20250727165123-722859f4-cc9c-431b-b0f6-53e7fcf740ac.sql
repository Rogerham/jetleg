
-- Create table for saved searches
CREATE TABLE public.saved_searches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  search_criteria JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for alert preferences
CREATE TABLE public.alert_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  saved_search_id UUID REFERENCES public.saved_searches(id) ON DELETE CASCADE NOT NULL,
  email_notifications BOOLEAN DEFAULT false,
  phone_notifications BOOLEAN DEFAULT false,
  email_address TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_preferences ENABLE ROW LEVEL SECURITY;

-- RLS policies for saved_searches
CREATE POLICY "Users can view their own saved searches" 
  ON public.saved_searches 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved searches" 
  ON public.saved_searches 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved searches" 
  ON public.saved_searches 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved searches" 
  ON public.saved_searches 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS policies for alert_preferences
CREATE POLICY "Users can view their own alert preferences" 
  ON public.alert_preferences 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.saved_searches 
    WHERE id = alert_preferences.saved_search_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create their own alert preferences" 
  ON public.alert_preferences 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.saved_searches 
    WHERE id = alert_preferences.saved_search_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own alert preferences" 
  ON public.alert_preferences 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.saved_searches 
    WHERE id = alert_preferences.saved_search_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own alert preferences" 
  ON public.alert_preferences 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.saved_searches 
    WHERE id = alert_preferences.saved_search_id 
    AND user_id = auth.uid()
  ));
