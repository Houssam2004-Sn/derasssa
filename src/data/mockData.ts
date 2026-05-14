import { Branch, VideoItem, PdfItem, ExerciseItem } from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  // ==========================================
  // TS - Technicien Spécialisé
  // ==========================================
  {
    id: 'ts-id-sr',
    level: 'TS',
    domain: 'Infrastructure Digitale',
    specialization: 'Option Systèmes et Réseaux',
    slug: 'infrastructure-digitale-systemes-reseaux',
    description: 'Conception, déploiement et administration des réseaux et systèmes d\'exploitation d\'entreprise.',
    modules: [
      { id: 'm1', code: 'M101', title: 'Architecture des ordinateurs et OS', year: '1ère année' },
      { id: 'm2', code: 'M102', title: 'Bases des réseaux informatiques', year: '1ère année' },
      { id: 'm3', code: 'M103', title: 'Administration Linux / Windows Server', year: '1ère année' },
      { id: 'm4', code: 'M201', title: 'Routage et Commutation avancés (CCNA)', year: '2ème année' },
      { id: 'm5', code: 'M202', title: 'Sécurité des accès et pare-feu', year: '2ème année' },
      { id: 'm6', code: 'M203', title: 'Supervision et virtualisation', year: '2ème année' },
    ]
  },
  {
    id: 'ts-id-cloud',
    level: 'TS',
    domain: 'Infrastructure Digitale',
    specialization: 'Option Cloud Computing',
    slug: 'infrastructure-digitale-cloud-computing',
    description: 'Déploiement et gestion des infrastructures virtuelles sur AWS, Azure et GCP avec conteneurisation.',
    modules: [
      { id: 'm7', code: 'M101', title: 'Bases de la virtualisation', year: '1ère année' },
      { id: 'm8', code: 'M102', title: 'Réseaux et stockage cloud', year: '1ère année' },
      { id: 'm9', code: 'M103', title: 'Introduction à AWS et Azure', year: '1ère année' },
      { id: 'm10', code: 'M201', title: 'Conteneurs et orchestration (Docker, Kubernetes)', year: '2ème année' },
      { id: 'm11', code: 'M202', title: 'Automatisation avec Terraform et Ansible', year: '2ème année' },
      { id: 'm12', code: 'M203', title: 'Architecture Cloud haute disponibilité', year: '2ème année' },
    ]
  },
  {
    id: 'ts-id-cyber',
    level: 'TS',
    domain: 'Infrastructure Digitale',
    specialization: 'Option Cybersécurité',
    slug: 'infrastructure-digitale-cybersecurite',
    description: 'Protection des systèmes d\'information, cryptographie, audit de sécurité et détection d\'intrusions.',
    modules: [
      { id: 'm13', code: 'M101', title: 'Fondamentaux de la sécurité des SI', year: '1ère année' },
      { id: 'm14', code: 'M102', title: 'Cryptographie et PKI', year: '1ère année' },
      { id: 'm15', code: 'M103', title: 'Sécurisation des OS et applications', year: '1ère année' },
      { id: 'm16', code: 'M201', title: 'Tests d\'intrusion (Ethical Hacking)', year: '2ème année' },
      { id: 'm17', code: 'M202', title: 'Analyse des malwares et Forensics', year: '2ème année' },
      { id: 'm18', code: 'M203', title: 'Gestion des incidents (SOC & SIEM)', year: '2ème année' },
    ]
  },
  {
    id: 'ts-id-iot',
    level: 'TS',
    domain: 'Infrastructure Digitale',
    specialization: 'Option Internet des Objets (IoT)',
    slug: 'infrastructure-digitale-iot',
    description: 'Systèmes embarqués, capteurs connectés, protocoles de communication IoT et intégration Cloud.',
    modules: [
      { id: 'm19', code: 'M101', title: 'Électronique de base et capteurs', year: '1ère année' },
      { id: 'm20', code: 'M102', title: 'Programmation des microcontrôleurs', year: '1ère année' },
      { id: 'm21', code: 'M201', title: 'Protocoles IoT (MQTT, LoRaWAN)', year: '2ème année' },
      { id: 'm22', code: 'M202', title: 'Plateformes Cloud IoT et Edge Computing', year: '2ème année' },
    ]
  },
  {
    id: 'ts-dev-fs',
    level: 'TS',
    domain: 'Développement Digital',
    specialization: 'Option Full Stack',
    slug: 'developpement-digital-full-stack',
    description: 'Création d\'applications web complètes, du frontend réactif au backend robuste et bases de données.',
    modules: [
      { id: 'm23', code: 'M101', title: 'Algorithmique et Logique de programmation', year: '1ère année' },
      { id: 'm24', code: 'M102', title: 'Conception de sites Web (HTML/CSS/JS)', year: '1ère année' },
      { id: 'm25', code: 'M103', title: 'Bases de données relationnelles (SQL)', year: '1ère année' },
      { id: 'm26', code: 'M201', title: 'Frontend moderne avec React', year: '2ème année' },
      { id: 'm27', code: 'M202', title: 'Backend Node.js / Express / Laravel', year: '2ème année' },
      { id: 'm28', code: 'M203', title: 'Déploiement CI/CD et DevOps de base', year: '2ème année' },
    ]
  },
  {
    id: 'ts-dev-mobile',
    level: 'TS',
    domain: 'Développement Digital',
    specialization: 'Option Applications Mobiles',
    slug: 'developpement-digital-applications-mobiles',
    description: 'Développement d\'applications natives et hybrides pour smartphones iOS et Android.',
    modules: [
      { id: 'm29', code: 'M101', title: 'Programmation Orientée Objet (Java/Kotlin)', year: '1ère année' },
      { id: 'm30', code: 'M102', title: 'UI/UX Design pour Mobile', year: '1ère année' },
      { id: 'm31', code: 'M201', title: 'Développement cross-platform (Flutter / React Native)', year: '2ème année' },
      { id: 'm32', code: 'M202', title: 'Publication et monétisation sur les stores', year: '2ème année' },
    ]
  },
  {
    id: 'ts-dev-ia',
    level: 'TS',
    domain: 'Développement Digital',
    specialization: 'Option Intelligence Artificielle & Big Data',
    slug: 'developpement-digital-ia-big-data',
    description: 'Analyse de données de masse, Machine Learning, et exploitation d\'algorithmes d\'IA.',
    modules: [
      { id: 'm33', code: 'M101', title: 'Programmation Python pour la Data', year: '1ère année' },
      { id: 'm34', code: 'M102', title: 'Statistiques et algèbre appliquées', year: '1ère année' },
      { id: 'm35', code: 'M201', title: 'Machine Learning et Deep Learning', year: '2ème année' },
      { id: 'm36', code: 'M202', title: 'Écosystème Big Data (Hadoop, Spark)', year: '2ème année' },
    ]
  },
  {
    id: 'ts-ges-com',
    level: 'TS',
    domain: 'Gestion et Commerce',
    specialization: 'Commerce et Marketing Digital',
    slug: 'gestion-commerce-marketing-digital',
    description: 'Stratégies de vente, e-commerce, gestion de la relation client (CRM) et campagnes publicitaires.',
    modules: [
      { id: 'm37', code: 'M101', title: 'Techniques de vente et négociation', year: '1ère année' },
      { id: 'm38', code: 'M102', title: 'Économie et organisation des entreprises', year: '1ère année' },
      { id: 'm39', code: 'M201', title: 'Marketing digital et Réseaux sociaux', year: '2ème année' },
      { id: 'm40', code: 'M202', title: 'Création et pilotage de boutiques E-commerce', year: '2ème année' },
    ]
  },
  {
    id: 'ts-ges-cpt',
    level: 'TS',
    domain: 'Gestion et Commerce',
    specialization: 'Gestion des Entreprises & Comptabilité',
    slug: 'gestion-commerce-comptabilite',
    description: 'Tenue des comptes, fiscalité marocaine, paie et analyse financière des structures.',
    modules: [
      { id: 'm41', code: 'M101', title: 'Comptabilité générale marocaine', year: '1ère année' },
      { id: 'm42', code: 'M102', title: 'Droit commercial et du travail', year: '1ère année' },
      { id: 'm43', code: 'M201', title: 'Comptabilité analytique et budgétaire', year: '2ème année' },
      { id: 'm44', code: 'M202', title: 'Fiscalité d\'entreprise et audit de base', year: '2ème année' },
    ]
  },
  // Added Authentic TS filières
  {
    id: 'ts-ges-log',
    level: 'TS',
    domain: 'Gestion et Commerce',
    specialization: 'Gestion de la Logistique et Transport',
    slug: 'gestion-logistique-transport',
    description: 'Optimisation des flux de marchandises, gestion d\'entrepôts, procédures douanières et affrètement.',
    modules: [
      { id: 'm-log1', code: 'M101', title: 'Gestion de la chaîne logistique (Supply Chain)', year: '1ère année' },
      { id: 'm-log2', code: 'M102', title: 'Réglementation douanière marocaine', year: '1ère année' },
      { id: 'm-log3', code: 'M201', title: 'Gestion d\'entrepôts et manutention', year: '2ème année' },
      { id: 'm-log4', code: 'M202', title: 'Techniques d\'affrètement et transport international', year: '2ème année' },
    ]
  },
  {
    id: 'ts-ges-rh',
    level: 'TS',
    domain: 'Gestion et Commerce',
    specialization: 'Gestion des Ressources Humaines',
    slug: 'gestion-ressources-humaines',
    description: 'Administration du personnel, gestion de la paie, recrutement et plans de formation en entreprise.',
    modules: [
      { id: 'm-rh1', code: 'M101', title: 'Droit social et législation du travail', year: '1ère année' },
      { id: 'm-rh2', code: 'M102', title: 'Processus de recrutement et d\'intégration', year: '1ère année' },
      { id: 'm-rh3', code: 'M201', title: 'Techniques de calcul de la paie et déclarations', year: '2ème année' },
      { id: 'm-rh4', code: 'M202', title: 'Ingénierie de la formation et GPEC', year: '2ème année' },
    ]
  },
  {
    id: 'ts-ind-esa',
    level: 'TS',
    domain: 'Génie Électrique',
    specialization: 'Électromécanique des Systèmes Automatisés (ESA)',
    slug: 'electromecanique-systemes-automatises',
    description: 'Maintenance polyvalente, contrôle des robots industriels, pneumatique et hydraulique avancée.',
    modules: [
      { id: 'm-esa1', code: 'M101', title: 'Électricité industrielle et machines tournantes', year: '1ère année' },
      { id: 'm-esa2', code: 'M102', title: 'Mécanique appliquée et dessin technique', year: '1ère année' },
      { id: 'm-esa3', code: 'M201', title: 'Automatismes industriels et capteurs', year: '2ème année' },
      { id: 'm-esa4', code: 'M202', title: 'Régulation, hydraulique et pneumatique', year: '2ème année' },
    ]
  },
  {
    id: 'ts-btp-gc',
    level: 'TS',
    domain: 'Bâtiment et Travaux Publics',
    specialization: 'Génie Civil (Option Bâtiment)',
    slug: 'genie-civil-batiment',
    description: 'Calcul de structures, métré, suivi de chantiers, résistance des matériaux et logiciels CAO.',
    modules: [
      { id: 'm-gc1', code: 'M101', title: 'Résistance des matériaux (RDM)', year: '1ère année' },
      { id: 'm-gc2', code: 'M102', title: 'Technologie du bâtiment et topographie', year: '1ère année' },
      { id: 'm-gc3', code: 'M201', title: 'Calcul de béton armé (BAEL)', year: '2ème année' },
      { id: 'm-gc4', code: 'M202', title: 'Métré, devis et organisation de chantiers', year: '2ème année' },
    ]
  },
  {
    id: 'ts-hot-mth',
    level: 'TS',
    domain: 'Tourisme et Hôtellerie',
    specialization: 'Management Touristique et Hôtelier',
    slug: 'management-touristique-hotelier',
    description: 'Gestion des établissements de loisirs, techniques d\'accueil, hébergement et marketing touristique.',
    modules: [
      { id: 'm-hot1', code: 'M101', title: 'Techniques du front office et réception', year: '1ère année' },
      { id: 'm-hot2', code: 'M102', title: 'Hygiène, sécurité et qualité alimentaire', year: '1ère année' },
      { id: 'm-hot3', code: 'M201', title: 'Commercialisation et e-tourisme', year: '2ème année' },
      { id: 'm-hot4', code: 'M202', title: 'Contrôle des coûts d\'exploitation (Food & Beverage)', year: '2ème année' },
    ]
  },
  {
    id: 'ts-art-info',
    level: 'TS',
    domain: 'Arts Graphiques et Multimédia',
    specialization: 'Infographie et Web Design',
    slug: 'arts-graphiques-infographie',
    description: 'Création d\'identités visuelles, retouche photo, illustration vectorielle et maquettage interactif.',
    modules: [
      { id: 'm45', code: 'M101', title: 'Théorie des couleurs et typographie', year: '1ère année' },
      { id: 'm46', code: 'M102', title: 'Maîtrise de Photoshop et Illustrator', year: '1ère année' },
      { id: 'm47', code: 'M201', title: 'Animation 2D et montage vidéo (After Effects)', year: '2ème année' },
      { id: 'm48', code: 'M202', title: 'Conception d\'interfaces Figma / Adobe XD', year: '2ème année' },
    ]
  },

  // ==========================================
  // T - Technicien
  // ==========================================
  {
    id: 't-main-auto',
    level: 'T',
    domain: 'Maintenance et Mécanique',
    specialization: 'Technicien en Maintenance Automobile',
    slug: 'technicien-maintenance-automobile',
    description: 'Diagnostic électronique, réparation mécanique et entretien périodique des véhicules automobiles.',
    modules: [
      { id: 'm49', code: 'M101', title: 'Moteurs thermiques et cinématique', year: '1ère année' },
      { id: 'm50', code: 'M102', title: 'Systèmes de freinage et suspension', year: '1ère année' },
      { id: 'm51', code: 'M201', title: 'Électricité et électronique embarquée', year: '2ème année' },
      { id: 'm52', code: 'M202', title: 'Diagnostic par valise et dépannage', year: '2ème année' },
    ]
  },
  {
    id: 't-elec-ind',
    level: 'T',
    domain: 'Électrotechnique',
    specialization: 'Électricité de Maintenance Industrielle',
    slug: 'technicien-electricite-industrielle',
    description: 'Câblage, automatismes industriels, et maintenance préventive des machines d\'usine.',
    modules: [
      { id: 'm53', code: 'M101', title: 'Schémas électriques et normes de sécurité', year: '1ère année' },
      { id: 'm54', code: 'M102', title: 'Installations et appareillage de commande', year: '1ère année' },
      { id: 'm55', code: 'M201', title: 'Automates Programmables Industriels (API)', year: '2ème année' },
      { id: 'm56', code: 'M202', title: 'Maintenance des variateurs et moteurs', year: '2ème année' },
    ]
  },
  {
    id: 't-reseaux',
    level: 'T',
    domain: 'Support et Réseaux',
    specialization: 'Technicien de Support en Réseaux Informatiques',
    slug: 'technicien-support-reseaux',
    description: 'Câblage structuré, configuration des postes clients et support technique bureautique.',
    modules: [
      { id: 'm57', code: 'M101', title: 'Montage et maintenance PC', year: '1ère année' },
      { id: 'm58', code: 'M102', title: 'Câblage et brassage réseau', year: '1ère année' },
      { id: 'm59', code: 'M201', title: 'Assistance aux utilisateurs et Helpdesk', year: '2ème année' },
    ]
  },
  // Added Authentic T filières
  {
    id: 't-btp-dessin',
    level: 'T',
    domain: 'Bâtiment et Travaux Publics',
    specialization: 'Dessinateur de Bâtiment',
    slug: 'dessinateur-batiment',
    description: 'Réalisation des plans architecturaux et d\'exécution, maîtrise d\'AutoCAD et modélisation de base.',
    modules: [
      { id: 'm-db1', code: 'M101', title: 'Dessin géométrique et normes de représentation', year: '1ère année' },
      { id: 'm-db2', code: 'M102', title: 'Initiation aux matériaux et éléments de construction', year: '1ère année' },
      { id: 'm-db3', code: 'M201', title: 'Métré et relevés topographiques simples', year: '2ème année' },
      { id: 'm-db4', code: 'M202', title: 'DAO sur AutoCAD et rendu d\'élévations', year: '2ème année' },
    ]
  },
  {
    id: 't-ges-sec',
    level: 'T',
    domain: 'Gestion et Commerce',
    specialization: 'Secrétariat et Bureautique',
    slug: 'secretariat-bureautique',
    description: 'Gestion de l\'accueil, correspondance commerciale, rédaction de rapports et suite bureautique Office.',
    modules: [
      { id: 'm-sec1', code: 'M101', title: 'Techniques de communication et classement', year: '1ère année' },
      { id: 'm-sec2', code: 'M102', title: 'Maîtrise de la saisie et traitement de texte', year: '1ère année' },
      { id: 'm-sec3', code: 'M201', title: 'Bureautique avancée (Word, Excel, PowerPoint)', year: '2ème année' },
      { id: 'm-sec4', code: 'M202', title: 'Organisation de réunions et agenda de direction', year: '2ème année' },
    ]
  },
  {
    id: 't-art-infot',
    level: 'T',
    domain: 'Arts Graphiques et Multimédia',
    specialization: 'Technicien en Infographie',
    slug: 'technicien-infographie',
    description: 'Mise en page de supports imprimés, traitement de l\'image et préparation des fichiers pour l\'impression.',
    modules: [
      { id: 'm-tinf1', code: 'M101', title: 'Acquisition et numérisation des images', year: '1ère année' },
      { id: 'm-tinf2', code: 'M102', title: 'Mise en page PAO (Adobe InDesign)', year: '1ère année' },
      { id: 'm-tinf3', code: 'M201', title: 'Retouche et chromie avancée sous Photoshop', year: '2ème année' },
    ]
  },
  {
    id: 't-hot-cuis',
    level: 'T',
    domain: 'Tourisme et Hôtellerie',
    specialization: 'Technicien en Art Culinaire (Cuisine)',
    slug: 'technicien-cuisine',
    description: 'Confection de plats gastronomiques, cuisine marocaine et internationale, gestion des fiches techniques.',
    modules: [
      { id: 'm-cuis1', code: 'M101', title: 'Taillages, fonds et sauces de base', year: '1ère année' },
      { id: 'm-cuis2', code: 'M102', title: 'Pâtisserie de restauration et desserts', year: '1ère année' },
      { id: 'm-cuis3', code: 'M201', title: 'Cuisine marocaine traditionnelle', year: '2ème année' },
      { id: 'm-cuis4', code: 'M202', title: 'Organisation des banquets et buffets', year: '2ème année' },
    ]
  },

  // ==========================================
  // Q - Qualification
  // ==========================================
  {
    id: 'q-bat-elec',
    level: 'Q',
    domain: 'Bâtiment et Travaux',
    specialization: 'Électricité de Bâtiment',
    slug: 'qualification-electricite-batiment',
    description: 'Mise en place des installations électriques résidentielles et raccordements de base.',
    modules: [
      { id: 'm60', code: 'M101', title: 'Circuits d\'éclairage et prises', year: '1ère année' },
      { id: 'm61', code: 'M102', title: 'Tableaux de répartition et protections', year: '1ère année' },
      { id: 'm62', code: 'M201', title: 'Domotique résidentielle simple', year: '2ème année' },
    ]
  },
  {
    id: 'q-plomb',
    level: 'Q',
    domain: 'Bâtiment et Travaux',
    specialization: 'Plomberie et Installation Thermique',
    slug: 'qualification-plomberie',
    description: 'Pose de tuyauteries, sanitaires, et chauffe-eaux résidentiels ou industriels.',
    modules: [
      { id: 'm63', code: 'M101', title: 'Façonnage des tubes et soudures', year: '1ère année' },
      { id: 'm64', code: 'M201', title: 'Pose d\'appareils sanitaires et évacuations', year: '2ème année' },
    ]
  },
  // Added Authentic Q filières
  {
    id: 'q-mec-rep',
    level: 'Q',
    domain: 'Maintenance et Mécanique',
    specialization: 'Réparateur de Véhicules Automobiles',
    slug: 'reparateur-vehicules-automobiles',
    description: 'Interventions rapides, vidanges, remplacement des pièces d\'usure et freins.',
    modules: [
      { id: 'm-rep1', code: 'M101', title: 'L\'outillage d\'atelier et levage sécurisé', year: '1ère année' },
      { id: 'm-rep2', code: 'M102', title: 'Remplacement des courroies et filtres', year: '1ère année' },
      { id: 'm-rep3', code: 'M201', title: 'Purge des circuits et contrôle géométrique', year: '2ème année' },
    ]
  },
  {
    id: 'q-met-soud',
    level: 'Q',
    domain: 'Soudure et Métallurgie',
    specialization: 'Ouvrier Qualifié en Soudure',
    slug: 'ouvrier-qualifie-soudure',
    description: 'Assemblage de structures métalliques, procédés à l\'arc électrique, TIG, MIG-MAG.',
    modules: [
      { id: 'm-soud1', code: 'M101', title: 'Soudage à l\'arc avec électrode enrobée (SAEE)', year: '1ère année' },
      { id: 'm-soud2', code: 'M201', title: 'Procédés sous protection gazeuse (MIG/MAG)', year: '2ème année' },
    ]
  },
  {
    id: 'q-tex-cout',
    level: 'Q',
    domain: 'Habillement et Textile',
    specialization: 'Coupe et Couture Industrielle',
    slug: 'coupe-couture-industrielle',
    description: 'Piquage sur machines industrielles, assemblage des pièces de prêt-à-porter et contrôle finitions.',
    modules: [
      { id: 'm-cout1', code: 'M101', title: 'Fonctionnement et enfilage des piqueuses', year: '1ère année' },
      { id: 'm-cout2', code: 'M201', title: 'Opérations de montage et repassage final', year: '2ème année' },
    ]
  },

  // ==========================================
  // S - Spécialisation
  // ==========================================
  {
    id: 's-coif',
    level: 'S',
    domain: 'Services et Esthétique',
    specialization: 'Coiffure et Soins',
    slug: 'specialisation-coiffure',
    description: 'Techniques de coupe, coloration et accueil de la clientèle en salon.',
    modules: [
      { id: 'm65', code: 'M101', title: 'Techniques de base de coupe', year: '1ère année' },
      { id: 'm66', code: 'M201', title: 'Coloration et coiffures événementielles', year: '2ème année' },
    ]
  },
  // Added Authentic S filières
  {
    id: 's-bat-macon',
    level: 'S',
    domain: 'Bâtiment et Travaux',
    specialization: 'Maçonnerie Polyvalente',
    slug: 'maconnerie-polyvalente',
    description: 'Pose de briques, parpaings, enduits de mortier et petits dallages.',
    modules: [
      { id: 'm-mac1', code: 'M101', title: 'Préparation du mortier et outillage de maçon', year: '1ère année' },
      { id: 'm-mac2', code: 'M201', title: 'Montage des murs et finitions lisses', year: '2ème année' },
    ]
  },
  {
    id: 's-main-clim',
    level: 'S',
    domain: 'Services et Maintenance',
    specialization: 'Agent d\'Entretien en Climatisation',
    slug: 'agent-entretien-climatisation',
    description: 'Nettoyage des splits, recharge de fluides et détection des pannes de base.',
    modules: [
      { id: 'm-ac1', code: 'M101', title: 'Les composants d\'un circuit frigorifique', year: '1ère année' },
      { id: 'm-ac2', code: 'M201', title: 'Maintenance préventive et dépoussiérage', year: '2ème année' },
    ]
  },
  {
    id: 's-agri-jard',
    level: 'S',
    domain: 'Agriculture et Espaces Verts',
    specialization: 'Jardinier Paysagiste',
    slug: 'jardinier-paysagiste',
    description: 'Entretien des pelouses, taille des haies, arrosage et plantation d\'arbustes.',
    modules: [
      { id: 'm-jar1', code: 'M101', title: 'Reconnaissance des végétaux et travail du sol', year: '1ère année' },
      { id: 'm-jar2', code: 'M201', title: 'Techniques de multiplication et taille de saison', year: '2ème année' },
    ]
  }
];

// Rich predefined default content arrays mapped directly to legacy and added branches
export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    branch_id: 'ts-id-sr',
    module_id: 'm1',
    title: 'Comprendre l\'architecture des processeurs et la mémoire RAM',
    youtube_id: 'dQw4w9WgXcQ', // Standard stable demo
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'v2',
    branch_id: 'ts-id-sr',
    module_id: 'm2',
    title: 'Modèle OSI vs TCP/IP expliqué simplement',
    youtube_id: '3QhU9jd03a0',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'v3',
    branch_id: 'ts-dev-fs',
    module_id: 'm26',
    title: 'Introduction à React 19 et aux Hooks personnalisés',
    youtube_id: 'Tn6-PIqc4UM',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'v4',
    branch_id: 'ts-id-cloud',
    module_id: 'm10',
    title: 'Docker en 20 minutes : Conteneurs et Images',
    youtube_id: 'fqMOX6JJhGo',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'v5',
    branch_id: 'ts-id-cyber',
    module_id: 'm13',
    title: 'Les 10 failles de sécurité majeures de l\'OWASP',
    youtube_id: 'bXQ5cWfKspc',
    created_at: new Date().toISOString()
  },
  // Added sample instructional videos mapping to the new entries
  {
    id: 'v-log1',
    branch_id: 'ts-ges-log',
    module_id: 'm-log1',
    title: 'Les 5 piliers clés de la Supply Chain Moderne',
    youtube_id: '3QhU9jd03a0',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'v-esa1',
    branch_id: 'ts-ind-esa',
    module_id: 'm-esa3',
    title: 'Tutoriel Automates Programmables (API) et Grafcet',
    youtube_id: 'fqMOX6JJhGo',
    created_at: new Date().toISOString()
  },
  {
    id: 'v-gc1',
    branch_id: 'ts-btp-gc',
    module_id: 'm-gc1',
    title: 'Comprendre les contraintes de Flexion et Cisaillement en RDM',
    youtube_id: 'Tn6-PIqc4UM',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: 'v-cuis1',
    branch_id: 't-hot-cuis',
    module_id: 'm-cuis3',
    title: 'Secrets des Chefs : Les épices fondamentales de la Cuisine Marocaine',
    youtube_id: 'dQw4w9WgXcQ',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

export const INITIAL_PDFS: PdfItem[] = [
  {
    id: 'p1',
    branch_id: 'ts-id-sr',
    module_id: 'm1',
    title: 'Support de cours officiel : Architecture PC & OS de base',
    file_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: 'p2',
    branch_id: 'ts-id-sr',
    module_id: 'm2',
    title: 'Guide complet CCNA 1 : Introduction aux Réseaux',
    file_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: 'p3',
    branch_id: 'ts-dev-fs',
    module_id: 'm23',
    title: 'Manuel des algorithmes et structures de données usuelles',
    file_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    created_at: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: 'p4',
    branch_id: 'ts-dev-fs',
    module_id: 'm25',
    title: 'Mémento SQL et Requêtes complexes optimisées',
    file_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  // Added PDFs mapping to new branches
  {
    id: 'p-log1',
    branch_id: 'ts-ges-log',
    module_id: 'm-log2',
    title: 'Code des Douanes et Impôts Indirects au Maroc',
    file_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    created_at: new Date().toISOString()
  },
  {
    id: 'p-gc1',
    branch_id: 'ts-btp-gc',
    module_id: 'm-gc3',
    title: 'Formules pratiques pour le ferraillage de Poutres et Poteaux',
    file_url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  }
];

export const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: 'ex1',
    branch_id: 'ts-id-sr',
    module_id: 'm2',
    title: 'Pratic Exercice : Calcul de sous-réseaux (Subnetting VLSM)',
    type: 'pratique',
    content: 'Découpez l\'adresse réseau 192.168.10.0/24 pour satisfaire aux besoins de 4 départements : Direction (50 hôtes), Ventes (30 hôtes), RH (12 hôtes) et IT (6 hôtes). Donnez le masque, la plage d\'adresses et l\'adresse de diffusion de chaque sous-réseau.',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString()
  },
  {
    id: 'ex2',
    branch_id: 'ts-id-sr',
    module_id: 'm2',
    title: 'EFM Contrôle : Examen de Fin de Module Réseaux de base',
    type: 'efm',
    content: 'Partie 1: Théorie du routage IP.\nPartie 2: Configuration pratique sur simulateur d\'un commutateur (VLANs, Trunking) et d\'un routeur de bordure.\nDurée recommandée : 2h30.',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'ex3',
    branch_id: 'ts-dev-fs',
    module_id: 'm24',
    title: 'Pratic Exercice : Intégration d\'une maquette e-commerce Responsive',
    type: 'pratique',
    content: 'En utilisant HTML5 sémantique et CSS Grid/Flexbox, reproduisez la fiche produit fournie en maquette. Le bouton "Ajouter au panier" doit déclencher une animation simple.',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString()
  },
  {
    id: 'ex4',
    branch_id: 'ts-dev-fs',
    module_id: 'm26',
    title: 'Contrôle Continu : Gestion d\'état complexe avec Redux Toolkit',
    type: 'controle',
    content: 'Créez une application de liste de tâches gérant le filtrage, le tri par priorité et la persistance dans le localStorage. Soumettez votre lien GitHub en réponse.',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'ex5',
    branch_id: 'ts-id-cloud',
    module_id: 'm10',
    title: 'EFM Contrôle : Déploiement multi-conteneurs Docker Compose',
    type: 'efm',
    content: 'Rédigez le fichier docker-compose.yml complet pour faire tourner une application Node.js connectée à une base MongoDB et un cache Redis. Implémentez des variables d\'environnement sécurisées.',
    created_at: new Date().toISOString()
  },
  // Added practical items maps to the new entries
  {
    id: 'ex-log1',
    branch_id: 'ts-ges-log',
    module_id: 'm-log3',
    title: 'Pratic Exercice : Calcul de la rotation d\'entrepôt et méthodes FIFO/LIFO',
    type: 'pratique',
    content: 'À partir des entrées et sorties constatées du mois de mai (fournies en tableau ci-joint), déterminez la valeur finale du stock selon la méthode FIFO et calculez le coefficient de rotation global.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'ex-esa1',
    branch_id: 'ts-ind-esa',
    module_id: 'm-esa3',
    title: 'EFM Contrôle : Pilotage de chariot élévateur automatisé',
    type: 'efm',
    content: 'Dessinez le Grafcet complet (niveaux 1 et 2) permettant à un bras robotisé d\'aller saisir une caisse sur le tapis roulant A dès l\'activation du capteur de présence, puis de la déposer sur le quai B.',
    created_at: new Date().toISOString()
  },
  {
    id: 'ex-gc1',
    branch_id: 'ts-btp-gc',
    module_id: 'm-gc1',
    title: 'Contrôle Continu : Vérification d\'une poutre continue en béton',
    type: 'controle',
    content: 'Évaluez le diagramme des moments fléchissants d\'une poutre soumise à une charge répartie uniforme de 15 kN/m sur 6 mètres de portée. Indiquez la contrainte maximale.',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'msg1',
    user_id: 'usr-demo1',
    user_name: 'Youssef El Alami',
    branch_id: 'ts-id-sr',
    content: 'Salut l\'équipe ! Est-ce que quelqu\'un a réussi l\'exercice de VLSM sur le module M102 ?',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'msg2',
    user_id: 'usr-demo2',
    user_name: 'Fatima Zahra',
    branch_id: 'ts-id-sr',
    content: 'Oui, il faut d\'abord trier les sous-réseaux par ordre décroissant du nombre d\'hôtes nécessaires. Ça évite le gaspillage d\'adresses.',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'msg3',
    user_id: 'usr-demo1',
    user_name: 'Youssef El Alami',
    branch_id: 'ts-id-sr',
    content: 'Super, merci beaucoup ! Je vais appliquer cette règle tout de suite.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'msg4',
    user_id: 'usr-demo3',
    user_name: 'Amine Dev',
    branch_id: 'ts-dev-fs',
    content: 'Hello, avez-vous des recommandations pour bien préparer l\'EFM de React en 2ème année ?',
    created_at: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  // Accompanying initial interactions for new branches
  {
    id: 'msg-log1',
    user_id: 'usr-log1',
    user_name: 'Sara Logistique',
    branch_id: 'ts-ges-log',
    content: 'Bonjour à tous, la déclaration douanière sur le système BADR a légèrement changé pour les expéditions maritimes, faites attention au code régime !',
    created_at: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'msg-esa1',
    user_id: 'usr-esa1',
    user_name: 'Rachid Autom',
    branch_id: 'ts-ind-esa',
    content: 'Est-ce que l\'un de vous possède les fiches de câblage pour les variateurs de vitesse Schneider Electric ? On a un TP de 2ème année demain.',
    created_at: new Date().toISOString()
  }
];
