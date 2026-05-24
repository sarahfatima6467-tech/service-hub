import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yimzxnegmtdwwzqmjdht.supabase.co";
const supabaseKey = "sb_publishable_Reuyq6Gvt-R9_0LA4LOtMQ_KxYj7k8b";

export const supabase = createClient(supabaseUrl, supabaseKey);