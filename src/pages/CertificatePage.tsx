import React, { useState } from 'react';
import { Award, Download, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { jsPDF } from 'jspdf';

// Extra standalone certificates requested by user
const PROFESSIONAL_CERTS = [
  // Réseaux & Systèmes
  { id: 'cert-ccna1', title: 'Cisco CCNA 1 : Introduction aux Réseaux (ITN)', type: 'Réseaux & Cisco' },
  { id: 'cert-ccna2', title: 'Cisco CCNA 2 : Commutation, Routage et Sans-fil (SRWE)', type: 'Réseaux & Cisco' },
  { id: 'cert-linux', title: 'Linux Professional Institute Certification (LPIC-1)', type: 'Systèmes & OS' },
  // Cybersécurité
  { id: 'cert-ceh', title: 'Certified Ethical Hacker (CEH v12) Elite Accreditation', type: 'Cybersécurité' },
  { id: 'cert-secplus', title: 'CompTIA Security+ Certified Global Professional', type: 'Cybersécurité' },
  { id: 'cert-cisa', title: 'CISA : Certified Information Systems Auditor Elite', type: 'Cybersécurité' },
  // Programmation & IA
  { id: 'cert-python', title: 'Python Programming Professional Certified', type: 'Développement & IA' },
  { id: 'cert-java', title: 'Oracle Certified Associate, Java SE Programmer', type: 'Développement & IA' },
  { id: 'cert-cpp', title: 'C++ Institute Certified Advanced Programmer', type: 'Développement & IA' },
  // Bases de données & Big Data
  { id: 'cert-sql', title: 'Oracle Database SQL Certified Master Specialist', type: 'Data & SGBD' },
  { id: 'cert-spark', title: 'Apache Spark & Big Data Architecture Expert', type: 'Data & SGBD' },
  // Cloud & DevOps
  { id: 'cert-aws', title: 'AWS Certified Solutions Architect – Associate', type: 'Cloud & DevOps' },
  { id: 'cert-devops', title: 'DevOps & CI/CD Master Professional', type: 'Cloud & DevOps' },
  // Web, Mobile & Multimédia
  { id: 'cert-fsm', title: 'Full Stack Web Elite Master (MERN / Laravel)', type: 'Développement Web' },
  { id: 'cert-mob', title: 'Flutter & React Native Cross-Platform Master', type: 'Mobile Apps' },
  { id: 'cert-pao', title: 'Adobe Creative Cloud Graphic Design Master', type: 'Arts & Multimédia' },
];

export const CertificatePage: React.FC = () => {
  const { branches, certificates, currentUser, issueCertificate } = useApp();
  
  // Tab Switcher: "ofppt" for Branches, "pro" for Standalone IT certificates
  const [certCategory, setCertCategory] = useState<'ofppt' | 'pro'>('pro');
  
  const [selectedBranchId, setSelectedBranchId] = useState<string>(branches[0]?.id || '');
  const [selectedProCertId, setSelectedProCertId] = useState<string>(PROFESSIONAL_CERTS[0]?.id || '');
  
  // Payment states requested by user for external Pro credentials (500 DH / $50 USD)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cashplus' | 'crypto'>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const activeBranch = branches.find((b) => b.id === selectedBranchId);
  const activeProCert = PROFESSIONAL_CERTS.find((c) => c.id === selectedProCertId);

  // Compute validation strings
  const activeCertTitleToIssue = certCategory === 'ofppt' 
    ? (activeBranch ? `${activeBranch.domain} - ${activeBranch.specialization}` : '')
    : (activeProCert ? activeProCert.title : '');

  const handleIssue = async () => {
    if (certCategory === 'ofppt') {
      if (!selectedBranchId) return;
      const cert = await issueCertificate(selectedBranchId);
      if (cert) {
        setStatusMsg({
          text: `Félicitations ! Accréditation générée et rattachée au profil de ${currentUser.name}.`,
          type: 'success'
        });
      }
    } else {
      if (!selectedProCertId || !activeProCert) return;
      
      // Candidate requested simulated paid checkout flow for external visitors (500 DH / $50 USD)
      setIsProcessingPayment(true);
      setStatusMsg({
        text: `Connexion à la passerelle de paiement sécurisée via ${paymentMethod.toUpperCase()} en cours...`,
        type: 'info'
      });

      setTimeout(async () => {
        setIsProcessingPayment(false);
        const simulatedBranchId = `PRO-${selectedProCertId}`;
        const cert = await issueCertificate(branches[0]?.id || 'ts-id-sr');
        if (cert) {
          cert.branch_id = simulatedBranchId;
          cert.branch_name = activeProCert.title;
          
          let gatewayLabel = 'Carte Bancaire';
          if (paymentMethod === 'paypal') gatewayLabel = 'compte PayPal';
          if (paymentMethod === 'cashplus') gatewayLabel = 'code Cash Plus';
          if (paymentMethod === 'crypto') gatewayLabel = 'Binance Pay / Wallet Crypto';

          setStatusMsg({
            text: `Paiement de 200 DH ($20 USD) validé via ${gatewayLabel}. Certification Premium "${activeProCert.title}" accordée avec succès !`,
            type: 'success'
          });
        }
      }, 2000);
    }
  };

  const downloadPdf = (certId: string, branchTitle: string) => {
    try {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Is it a standalone professional certificate or standard branch one? Let's tune the look!
      const isPro = branchTitle.includes('Cisco') || branchTitle.includes('Certified') || branchTitle.includes('Professional') || branchTitle.includes('Master');

      // Background canvas fill
      doc.setFillColor(252, 252, 252);
      doc.rect(0, 0, 297, 210, 'F');

      if (isPro) {
        // High fidelity elegant Gold / Emerald scheme for pro international certificates
        doc.setDrawColor(217, 119, 6); // amber-600 gold
        doc.setLineWidth(3);
        doc.rect(12, 12, 273, 186);

        doc.setDrawColor(5, 150, 105); // emerald-600
        doc.setLineWidth(0.5);
        doc.rect(15, 15, 267, 180);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.setTextColor(217, 119, 6);
        doc.text("INTERNATIONAL ACADEMIC EXCELLENCE", 148.5, 36, { align: 'center' });

        doc.setFontSize(11);
        doc.setTextColor(113, 113, 122);
        doc.text("Official Technical Credential Verification & Accreditation Engine", 148.5, 43, { align: 'center' });
      } else {
        // Standard Royal Violet / Amber scheme for OFPPT paths
        doc.setDrawColor(124, 58, 237); // violet-600
        doc.setLineWidth(2);
        doc.rect(10, 10, 277, 190);

        doc.setDrawColor(245, 158, 11); // amber-500
        doc.setLineWidth(0.5);
        doc.rect(13, 13, 271, 184);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(28);
        doc.setTextColor(124, 58, 237);
        doc.text("DERASSA ACADEMY", 148.5, 35, { align: 'center' });

        doc.setFontSize(12);
        doc.setTextColor(113, 113, 122);
        doc.text("Plateforme d'Excellence & de Préparation aux Examens OFPPT", 148.5, 43, { align: 'center' });
      }

      // Title
      doc.setFontSize(36);
      doc.setTextColor(24, 24, 27);
      doc.text(isPro ? "PROFESSIONAL CERTIFICATION" : "CERTIFICAT DE RÉUSSITE", 148.5, 75, { align: 'center' });

      // Subtitle
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(82, 82, 91);
      doc.text(isPro ? "Proudly awarded under strict review requirements to :" : "Décerné avec les félicitations du jury à :", 148.5, 95, { align: 'center' });

      // Recipient Name
      doc.setFontSize(26);
      doc.setFont('helvetica', 'bold');
      if (isPro) doc.setTextColor(5, 150, 105);
      else doc.setTextColor(124, 58, 237);
      doc.text(currentUser.name.toUpperCase(), 148.5, 112, { align: 'center' });

      // Description text
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(82, 82, 91);
      doc.text(isPro ? "Having successfully validated all criteria and demonstrated expert capabilities in :" : `Pour avoir suivi et complété avec succès les modules d'entraînement de la filière :`, 148.5, 128, { align: 'center' });

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(24, 24, 27);
      doc.text(branchTitle, 148.5, 138, { align: 'center' });

      // Footer Meta
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(161, 161, 170);
      doc.text(`Verification Signature : ${certId}`, 20, 185);
      doc.text(`Issue Date : ${new Date().toLocaleDateString('fr-FR')}`, 20, 192);
      doc.text(`Candidate Status : Level ${currentUser.level}`, 20, 199);

      // Signature simulated block
      doc.setDrawColor(161, 161, 170);
      doc.setLineWidth(0.5);
      doc.line(220, 185, 270, 185);
      doc.setFontSize(10);
      doc.setTextColor(113, 113, 122);
      doc.text(isPro ? "Certification Committee" : "Direction Pédagogique", 245, 192, { align: 'center' });

      doc.save(`certificat-derassa-${currentUser.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (err) {
      console.error('jsPDF execution error:', err);
      alert("Erreur lors de la création du document PDF. Veuillez vérifier votre navigateur.");
    }
  };

  const myCerts = certificates.filter((c) => c.user_name === currentUser.name);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-black uppercase tracking-widest border border-violet-100">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>Accréditation Numérique</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          Obtenez votre Certificat de Révision
        </h1>
        <p className="text-sm text-zinc-600 max-w-xl mx-auto font-medium">
          Validez votre parcours et enrichissez votre CV. Le certificat est délivré instantanément au format PDF imprimable haute résolution avec numéro de série de vérification.
        </p>
      </div>

      {/* Simulator form */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl relative overflow-hidden">
        {/* Ribbon facade */}
        <div className="absolute top-0 right-0 bg-gradient-to-l from-violet-600 to-amber-500 text-white font-extrabold text-[10px] uppercase px-5 py-1.5 rounded-bl-xl shadow-xs tracking-wider">
          Générateur Premium
        </div>

        {/* Category Tabs Selector */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-black text-zinc-500 uppercase tracking-wider">
            Sélectionnez la catégorie du certificat :
          </label>
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-zinc-100 rounded-2xl">
            <button
              onClick={() => { setCertCategory('pro'); setStatusMsg(null); }}
              className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                certCategory === 'pro'
                  ? 'bg-white text-amber-600 shadow-sm border border-zinc-200/60'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Certifications Pro IT (CCNA, Python...)</span>
            </button>

            <button
              onClick={() => { setCertCategory('ofppt'); setStatusMsg(null); }}
              className={`py-2.5 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                certCategory === 'ofppt'
                  ? 'bg-white text-violet-600 shadow-sm border border-zinc-200/60'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-violet-500" />
              <span>Filières Accréditées OFPPT</span>
            </button>
          </div>
        </div>

        {/* Dynamic Inner Form Selectors */}
        <div className="space-y-4 max-w-xl pt-2">
          {certCategory === 'pro' ? (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="space-y-2">
                <label className="block text-xs font-black text-zinc-500 uppercase mb-1.5 tracking-wide">
                  Examen & Accréditation IT Ciblée :
                </label>
                <select
                  value={selectedProCertId}
                  onChange={(e) => {
                    setSelectedProCertId(e.target.value);
                    setStatusMsg(null);
                  }}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden transition-all"
                >
                  {PROFESSIONAL_CERTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      [{c.type}] — {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checkout pricing interface */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-700 block tracking-wider">Tarification Premium</span>
                    <span className="text-xs text-zinc-600 font-medium">Gratuit pour stagiaires OFPPT • Externe payant</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-zinc-900 block leading-none">200 DH</span>
                    <span className="text-[10px] font-bold text-amber-600 font-mono">≈ $20 USD</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-amber-200/60">
                  <label className="block text-[11px] font-bold text-zinc-700">Méthode de paiement :</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { id: 'card', label: '💳 Carte' },
                      { id: 'paypal', label: '🅿️ PayPal' },
                      { id: 'cashplus', label: '💵 Cash Plus' },
                      { id: 'crypto', label: '⚡ Crypto/USDT' }
                    ].map(method => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`py-1.5 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                          paymentMethod === method.id 
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs' 
                            : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                  {paymentMethod === 'crypto' && (
                    <span className="block text-[9px] text-amber-700 pt-1 font-mono">
                      Portefeuille supporté : Binance Pay, Trust Wallet, Metamask (Réseau TRC20 / BEP20).
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2 animate-in fade-in duration-150">
              <label className="block text-xs font-black text-zinc-500 uppercase mb-1.5 tracking-wide">
                Filière de formation OFPPT :
              </label>
              <select
                value={selectedBranchId}
                onChange={(e) => {
                  setSelectedBranchId(e.target.value);
                  setStatusMsg(null);
                }}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-800 focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all"
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.domain} — {b.specialization}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="pt-2 font-medium border-t border-zinc-100">
            <span className="block text-xs text-zinc-500">
              Délivré au nom de : <strong className="text-violet-600 font-bold">{currentUser.name}</strong> (Niveau {currentUser.level})
            </span>
            <span className="block text-[10px] text-zinc-400 pt-0.5">
              * Modifiable à tout moment depuis le bouton de profil du menu supérieur.
            </span>
          </div>

          <button
            onClick={handleIssue}
            disabled={isProcessingPayment}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 ${
              certCategory === 'pro'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 shadow-amber-600/20'
                : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/20'
            }`}
          >
            <Sparkles className={`w-4 h-4 text-white ${isProcessingPayment ? 'animate-spin' : 'animate-pulse'}`} />
            <span>{isProcessingPayment ? 'Traitement du paiement sécurisé...' : certCategory === 'pro' ? 'Régler 200 DH & Générer le Certificat' : 'Valider et Générer ce Certificat'}</span>
          </button>

          {statusMsg && (
            <div className="p-4 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>

        {/* Dynamic preview facade */}
        <div className="pt-8 border-t border-zinc-100 space-y-4">
          <h4 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
            Aperçu de votre accréditation :
          </h4>

          <div className={`aspect-[1.414] w-full max-w-lg mx-auto bg-zinc-50 border-2 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center select-none shadow-inner relative overflow-hidden transition-all ${
            certCategory === 'pro' ? 'border-amber-300 bg-linear-to-b from-amber-50/20 to-zinc-50' : 'border-zinc-200'
          }`}>
            {/* Watermark icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className={`w-64 h-64 ${certCategory === 'pro' ? 'text-amber-900' : 'text-violet-900'}`} />
            </div>

            <div className="space-y-1">
              <div className={`text-xs font-black tracking-widest ${certCategory === 'pro' ? 'text-amber-600' : 'text-violet-600'}`}>
                {certCategory === 'pro' ? 'INTERNATIONAL TECH CREDENTIAL' : 'DERASSA ACADEMY'}
              </div>
              <div className="text-lg sm:text-xl font-black text-zinc-900 pt-2">
                {certCategory === 'pro' ? 'PROFESSIONAL CERTIFICATION' : 'CERTIFICAT DE RÉUSSITE'}
              </div>
              <div className="text-[10px] text-zinc-400 font-medium">
                {certCategory === 'pro' ? 'Demonstrated industry expert practical standard' : 'Délivré au profit du stagiaire OFPPT'}
              </div>
            </div>

            <div className="space-y-1 my-auto py-4">
              <div className={`text-base sm:text-lg font-black bg-white py-1.5 px-4 rounded-xl inline-block shadow-xs border border-zinc-100/80 ${
                certCategory === 'pro' ? 'text-emerald-600 border-amber-100' : 'text-violet-700'
              }`}>
                {currentUser.name.toUpperCase()}
              </div>
              <div className="text-xs font-black text-zinc-700 max-w-md mx-auto line-clamp-2 pt-2">
                {activeCertTitleToIssue || 'Filière ou Examen Sélectionné'}
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] text-zinc-400 border-t border-zinc-200/60 pt-2 font-bold">
              <span>ID: SIMULATED-PREVIEW</span>
              <span className={certCategory === 'pro' ? 'text-emerald-600' : 'text-amber-600'}>
                Niveau {currentUser.level}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Mes certificats rattachés */}
      <div className="space-y-4">
        <h3 className="text-base font-black text-zinc-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-violet-600" />
          <span>Mes Certificats Générés ({myCerts.length})</span>
        </h3>

        {myCerts.length === 0 ? (
          <p className="text-xs text-zinc-400 italic font-medium">Aucun certificat généré pour l'instant avec ce nom d'étudiant.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myCerts.map((cert) => {
              const isProBadge = cert.branch_name.includes('Cisco') || cert.branch_name.includes('Certified') || cert.branch_name.includes('Master') || cert.branch_name.includes('Programmer');

              return (
                <div key={cert.id} className={`p-4 bg-white rounded-2xl border flex items-center justify-between gap-3 shadow-xs transition-colors ${
                  isProBadge ? 'border-amber-200 hover:border-amber-400 bg-amber-50/5' : 'border-zinc-200 hover:border-violet-300'
                }`}>
                  <div className="space-y-1 pr-2">
                    <span className={`text-[9px] font-black px-2.5 py-0.5 rounded-md ${
                      isProBadge ? 'bg-amber-100 text-amber-800' : 'bg-violet-50 text-violet-700'
                    }`}>
                      {isProBadge ? '★ Pro IT' : 'OFPPT'}
                    </span>
                    <h4 className="text-xs font-black text-zinc-800 line-clamp-1">
                      {cert.branch_name}
                    </h4>
                    <span className="block text-[10px] text-zinc-400 font-medium">
                      Délivré le {new Date(cert.issued_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  <button
                    onClick={() => downloadPdf(cert.id, cert.branch_name)}
                    className={`p-3 rounded-xl transition-colors shrink-0 ${
                      isProBadge ? 'bg-amber-100 hover:bg-amber-200 text-amber-700' : 'bg-violet-50 hover:bg-violet-100 text-violet-600'
                    }`}
                    title="Télécharger en PDF HD"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
