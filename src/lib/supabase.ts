import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ohvgmgpjajslrtxfbesb.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_nOEqmWszAixu_gk7K3Aprw_5qiSyJkl'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
