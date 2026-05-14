export type FormationLevel = 'TS' | 'T' | 'Q' | 'S';

export interface Module {
  id: string;
  code: string;
  title: string;
  year: '1ère année' | '2ème année';
}

export interface Branch {
  id: string;
  level: FormationLevel;
  domain: string; // e.g. "Infrastructure Digitale", "Développement Digital"
  specialization: string; // e.g. "Option Systèmes et Réseaux", "Option Full Stack"
  slug: string;
  description: string;
  modules: Module[];
}

export interface VideoItem {
  id: string;
  branch_id: string;
  module_id: string;
  title: string;
  youtube_id: string;
  created_at?: string;
}

export interface PdfItem {
  id: string;
  branch_id: string;
  module_id: string;
  title: string;
  file_url: string;
  created_at?: string;
}

export type ExerciseType = 'pratique' | 'efm' | 'controle';

export interface ExerciseItem {
  id: string;
  branch_id: string;
  module_id: string;
  title: string;
  type: ExerciseType;
  file_url?: string;
  content?: string;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  user_name: string;
  branch_id: string;
  content: string;
  created_at: string;
}

export interface CertificateItem {
  id: string;
  user_id: string;
  user_name: string;
  branch_id: string;
  branch_name: string;
  issued_at: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  level: FormationLevel;
  created_at?: string;
}
