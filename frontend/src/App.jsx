import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SvgIcons = {
  Assistant: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
    </svg>
  ),
  Analysis: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Solver: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5"/><circle cx="12" cy="8" r="5"/></svg>,
  Text: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>,
  Coach: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6Z"/></svg>,
  Voice: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/></svg>,
  Upload: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Archive: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0 }}><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/></svg>,
  Pdf: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>,
  Chat: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0 }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  
  // İletişim İkonları
  ContactUser: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0, marginRight: '6px', marginLeft: '6px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ContactSchool: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0, marginRight: '6px', marginLeft: '6px' }}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>,
  ContactDept: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0, marginRight: '6px', marginLeft: '6px' }}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  ContactPhone: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0, marginRight: '6px', marginLeft: '6px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  ContactMail: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0, marginRight: '6px', marginLeft: '6px' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  ContactMap: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" style={{ flexShrink: 0, marginRight: '6px', marginLeft: '6px' }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
};

function App() {
  const { t, i18n } = useTranslation();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  // Alt Menü Tıklamaları İçin Durum Yönetimi (Modallar)
  const [activeModal, setActiveModal] = useState(null); // 'terms', 'privacy', 'contact'
  const [robotChecked, setRobotChecked] = useState(false);

  const changeLanguage = (lng) => { i18n.changeLanguage(lng); };

  const theme = {
    bg: isDark ? '#080c14' : '#f8fafc',
    navBg: isDark ? '#0e1726' : '#ffffff', 
    textMain: isDark ? '#ffffff' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#1e293b' : '#e2e8f0',
    iconBg: isDark ? '#1f2937' : '#f1f5f9',
    cardBg: isDark ? '#111827' : '#ffffff',
    primary: '#2563eb'
  };

  const appDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';

  const AbstractLogo = () => (
    <div style={{ width: '26px', height: '26px', background: 'linear-gradient(135deg, #38bdf8, #2563eb)', borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)' }}>
      <div style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%' }}></div>
    </div>
  );

  const SlimCardStyle = {
    backgroundColor: theme.cardBg,
    padding: '20px 32px', 
    borderRadius: '12px',
    border: `1px solid ${theme.border}`,
    textAlign: appDirection === 'rtl' ? 'right' : 'left',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '115px', 
    transition: 'transform 0.2s, border-color 0.2s'
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.textMain, minHeight: '100vh', width: '100%', fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0, transition: 'all 0.3s ease', direction: appDirection, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      
      {/* 1. NAVIGASYON BARI */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', backgroundColor: theme.navBg, borderBottom: `1px solid ${theme.border}`, zIndex: 10, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setShowAuthForm(false)}>
          <AbstractLogo />
          EduTchad
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.iconBg, border: 'none', color: theme.textMain, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          </button>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.iconBg, border: 'none', color: theme.textMain, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
          <button onClick={() => setIsDark(!isDark)} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: theme.iconBg, border: `1px solid ${theme.primary}`, color: theme.textMain, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {isDark ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', fontSize: '20px' }}>
            <span onClick={() => changeLanguage('fr')} style={{ cursor: 'pointer', opacity: i18n.language === 'fr' ? 1 : 0.25 }}>🇫🇷</span>
            <span onClick={() => changeLanguage('tr')} style={{ cursor: 'pointer', opacity: i18n.language === 'tr' ? 1 : 0.25 }}>🇹🇷</span>
            <span onClick={() => changeLanguage('en')} style={{ cursor: 'pointer', opacity: i18n.language === 'en' ? 1 : 0.25 }}>🇬🇧</span>
            <span onClick={() => changeLanguage('ar')} style={{ cursor: 'pointer', opacity: i18n.language === 'ar' ? 1 : 0.25 }}>🇸🇦</span>
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowProfile(!showProfile)} style={{ backgroundColor: theme.primary, color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              {t('profile')}
            </button>
            
            {showProfile && (
              <div style={{ position: 'absolute', top: '50px', [appDirection === 'rtl' ? 'left' : 'right']: '0', backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, padding: '20px', borderRadius: '12px', width: '260px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 50 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>?</div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px', color: theme.textMain }}>{t('guest')}</div>
                    <div style={{ fontSize: '12px', color: theme.textMuted }}>{t('not_logged_in')}</div>
                  </div>
                </div>
                <hr style={{ borderColor: theme.border, margin: '10px 0' }} />
                <button onClick={() => { setShowAuthForm(true); setIsRegister(false); setShowProfile(false); }} style={{ width: '100%', padding: '10px', backgroundColor: theme.primary, color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                   {t('login')} / {t('register')}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 2. ANA İÇERİK ALANI */}
      <main style={{ width: '100%', maxWidth: '1380px', margin: '0 auto', padding: '40px 40px 20px 40px', textAlign: 'center', flex: 1, boxSizing: 'border-box' }}>
        
        {!showAuthForm ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
              <span style={{ backgroundColor: theme.iconBg, color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: `1px solid ${theme.border}` }}>
                {t('tagline')}
              </span>
              <h1 style={{ fontSize: '46px', fontWeight: '900', maxWidth: '850px', margin: '0', lineHeight: '1.2', color: theme.textMain }}>
                {t('welcome')}
              </h1>
              <p style={{ color: theme.textMuted, fontSize: '17px', maxWidth: '700px', margin: '0', lineHeight: '1.6' }}>
                {t('slogan')}
              </p>
            </div>

            {/* BÖLÜM 1: YAPAY ZEKA DESTEKLİ */}
            <div style={{ marginTop: '55px', position: 'relative', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', direction: appDirection, gap: '15px', marginBottom: '20px' }}>
                <span style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: '800', fontSize: '14.5px', letterSpacing: '0.5px', flexShrink: 0, textTransform: 'uppercase' }}>
                  🤖 {t('ai_center')}
                </span>
                <div style={{ flexGrow: 1, height: '2px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.15)' }}></div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Assistant />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('ai_assistant')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('ai_assistant_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Analysis />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('pdf_analysis')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('pdf_analysis_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Solver />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('question_solver')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('question_solver_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Text />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('text_editing')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('text_editing_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Coach />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('study_coach')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('study_coach_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Voice />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('voice_ai')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('voice_ai_desc')}</p>
                </div>
              </div>
            </div>

            {/* BÖLÜM 2: ÖĞRENCİ MERKEZİ */}
            <div style={{ marginTop: '55px', position: 'relative', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%', direction: appDirection, gap: '15px', marginBottom: '20px' }}>
                <span style={{ color: isDark ? '#ffffff' : '#0f172a', fontWeight: '800', fontSize: '14.5px', letterSpacing: '0.5px', flexShrink: 0, textTransform: 'uppercase' }}>
                  🎓 {t('student_center')}
                </span>
                <div style={{ flexGrow: 1, height: '2px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(15, 23, 42, 0.15)' }}></div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Upload />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('upload_note')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('upload_note_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Archive />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('personal_archive')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('personal_archive_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Pdf />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('pdfs')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('pdfs_desc')}</p>
                </div>

                <div onClick={() => setShowAuthForm(true)} style={SlimCardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <SvgIcons.Chat />
                    <h4 style={{ fontSize: '16px', margin: 0, color: theme.textMain }}>{t('chat')}</h4>
                  </div>
                  <p style={{ color: theme.textMuted, fontSize: '12.5px', margin: 0, lineHeight: '1.4' }}>{t('chat_desc')}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* GİRİŞ / KAYIT FORMU */
          <div style={{ maxWidth: '440px', margin: '30px auto', backgroundColor: theme.cardBg, padding: '40px', borderRadius: '16px', border: `1px solid ${theme.border}`, textAlign: appDirection === 'rtl' ? 'right' : 'left' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', fontWeight: 'bold', color: theme.textMain }}>
              {isRegister ? t('register') : t('login')}
            </h3>
            
            <form style={{ display: 'grid', gap: '18px' }}>
              {isRegister && (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: theme.textMuted, fontSize: '14px', fontWeight: 'bold' }}>{t('fullname')}</label>
                  <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.textMain, boxSizing: 'border-box' }} required />
                </div>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textMuted, fontSize: '14px', fontWeight: 'bold' }}>{t('email')}</label>
                <input type="email" placeholder="name@domain.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.textMain, boxSizing: 'border-box' }} required />
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textMuted, fontSize: '14px', fontWeight: 'bold' }}>{t('password')}</label>
                <input type="password" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.textMain, boxSizing: 'border-box' }} required />
                <div style={{ textAlign: 'right', marginTop: '6px' }}>
                  <span style={{ fontSize: '12px', color: theme.primary, cursor: 'pointer', textDecoration: 'underline' }}>{t('forgot_password')}</span>
                </div>
              </div>

              {isRegister && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: theme.textMuted, fontSize: '14px', fontWeight: 'bold' }}>{t('university_select')}</label>
                    <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.textMuted, boxSizing: 'border-box' }}>
                      <option value="">-- {t('university_select')} --</option>
                      <option value="un">Université de N'Djaména</option>
                      <option value="ukf">Université King Faisal (UKF) de N'Djaména</option>
                      <option value="unaba">Université Adam Barka d'Abéché (UNABA)</option>
                      <option value="udm">Université de Moundou (UDM)</option>
                      <option value="toumai">Université Toumaï</option>
                      <option value="doba">Université de Doba</option>
                      <option value="mongo">Université de Mongo</option>
                      <option value="ati">Université d'Ati</option>
                      <option value="pala">Université de Pala</option>
                      <option value="sarh">Université de Sarh</option>
                      <option value="amtiman">Université d'Am Timan</option>
                      <option value="ins">Instituts Nationaux Supérieurs</option>
                      <option value="unek">Université Emi Koussi (UNEK)</option>
                      <option value="uht">Université HEC-Tchad (UHT)</option>
                      <option value="chubs">CHU Le Bon Samaritain</option>
                      <option value="iiac">Institut International d'Afrique Centrale (IIAC-SUP)</option>
                      <option value="essget">École Supérieure des Sciences de Gestion Pierre Elliot Trudeau (ESSGET)</option>
                    </select>
                    <small style={{ color: theme.textMuted, display: 'block', marginTop: '8px', fontSize: '12px' }}>{t('no_school_required')}</small>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: theme.iconBg, borderRadius: '8px', border: `1px solid ${theme.border}`, boxSizing: 'border-box' }}>
                    <input type="checkbox" checked={robotChecked} onChange={() => setRobotChecked(!robotChecked)} style={{ width: '19px', height: '19px', cursor: 'pointer' }} required />
                    <span style={{ fontSize: '13px', fontWeight: '500', color: theme.textMain }}>{t('not_robot')}</span>
                    <div style={{ marginLeft: 'auto' }}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/2048px-RecaptchaLogo.svg.png" alt="reCAPTCHA" style={{ width: '22px', height: '22px' }} />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: theme.primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}>
                {isRegister ? t('register') : t('login')}
              </button>
            </form>

            <div style={{ textAlign: 'center', margin: '12px 0', color: theme.textMuted, fontSize: '14px' }}>veya</div>
            
            <button style={{ width: '100%', padding: '12px', backgroundColor: '#ffffff', color: '#000000', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.63v3.01h3.84c2.25-2.07 3.615-5.11 3.615-8.49z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3.01c-1.07.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.27v3.11c2 3.97 6.1 6.66 10.73 6.66z"/><path fill="#FBBC05" d="M5.24 14.23c-.25-.72-.39-1.5-.39-2.23s.14-1.51.39-2.23V6.66H1.27C.46 8.27 0 10.08 0 12s.46 3.73 1.27 5.34l3.97-3.11z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0 7.37 0 3.27 2.69 1.27 6.66l3.97 3.11c.95-2.88 3.61-5.02 6.76-5.02z"/></svg>
              {t('google_login')}
            </button>
            
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: theme.textMuted }}>
              {!isRegister ? (
                <>{t('no_account')}{' '}<span onClick={() => setIsRegister(true)} style={{ color: theme.primary, cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>{t('register')}</span></>
              ) : (
                <>{t('have_account')}{' '}<span onClick={() => setIsRegister(false)} style={{ color: theme.primary, cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>{t('login')}</span></>
              )}
            </div>

            <button onClick={() => setShowAuthForm(false)} style={{ width: '100%', background: 'none', border: 'none', color: theme.textMuted, marginTop: '20px', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}>
              {t('back_home')}
            </button>
          </div>
        )}
      </main>

      {/* 3. GERÇEK SOSYAL MEDYA LİNKLERİ İLE FOOTER */}
      <footer style={{ backgroundColor: theme.navBg, borderTop: `1px solid ${theme.border}`, padding: '40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', width: '100%', boxSizing: 'border-box', marginTop: '100px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold', fontSize: '24px' }}>
            <AbstractLogo />
            EduTchad
          </div>
          <div style={{ fontSize: '13px', color: theme.textMuted, fontWeight: '500' }}>
            {t('sub_branding')}
          </div>
          <p style={{ color: theme.textMuted, fontSize: '12px', margin: '2px 0 0 0' }}>© 2026 EduTchad. All rights reserved.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', color: theme.textMuted, fontSize: '14px', fontWeight: '500' }}>
            <span onClick={() => setActiveModal('terms')} style={{ cursor: 'pointer' }}>{t('terms')}</span>
            <span>|</span>
            <span onClick={() => setActiveModal('privacy')} style={{ cursor: 'pointer' }}>{t('privacy')}</span>
            <span>|</span>
            <span onClick={() => setActiveModal('contact')} style={{ cursor: 'pointer' }}>{t('contact_us')}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '12px', color: theme.textMuted, fontWeight: 'bold' }}>{t('social_media')}:</span>
            <a href="https://www.facebook.com/share/1F5UKFDWDw/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: theme.textMuted }}><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg></a>
            <a href="https://x.com/mhtissa6223?s=11" target="_blank" rel="noreferrer" style={{ color: theme.textMuted }}><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="https://www.instagram.com/mar_isay_?igsh=czJqMWQ2bGdkYm1z&utm_source=qr" target="_blank" rel="noreferrer" style={{ color: theme.textMuted }}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="https://www.linkedin.com/in/issa-abakar-mahamat-568695349?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noreferrer" style={{ color: theme.textMuted }}><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>
      </footer>

      {/* 4. SABİT GÖRÜŞ LAMBASI (Daha yukarı kaldırıldı: bottom '40px' -> '105px') */}
      <div style={{ position: 'fixed', bottom: '105px', [appDirection === 'rtl' ? 'left' : 'right']: '40px', zIndex: 100 }}>
        <button onClick={() => setShowFeedbackModal(true)} style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: '#eab308', color: '#000000', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(234, 179, 8, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
          💡
        </button>
      </div>

      {/* 5. GÖRÜŞ SOHBET MODAL PENCERESI */}
      {showFeedbackModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, padding: '30px', borderRadius: '16px', width: '400px', textAlign: appDirection === 'rtl' ? 'right' : 'left', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', color: theme.textMain }}>💡 {t('contact_us')}</h3>
            <textarea placeholder={t('feedback_placeholder')} style={{ width: '100%', height: '120px', borderRadius: '8px', border: `1px solid ${theme.border}`, backgroundColor: theme.bg, color: theme.textMain, padding: '10px', boxSizing: 'border-box', resize: 'none' }}></textarea>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => setShowFeedbackModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: theme.iconBg, color: theme.textMain, border: 'none', borderRadius: '6px', cursor: 'pointer' }}>{t('close')}</button>
              <button onClick={() => setShowFeedbackModal(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#eab308', color: '#00', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>{t('send')}</button>
            </div>
          </div>
        </div>
      )}

      {/* 6. DİNAMİK YASAL VE GERÇEK İLETİŞİM BİLGİLERİ MODAL SİSTEMİ */}
      {activeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, padding: '30px', borderRadius: '16px', width: '460px', textAlign: appDirection === 'rtl' ? 'right' : 'left', boxSizing: 'border-box' }}>
            
            {activeModal === 'terms' && (
              <>
                <h3 style={{ margin: '0 0 15px 0', color: theme.textMain }}>📄 {t('terms_title')}</h3>
                <p style={{ color: theme.textMuted, fontSize: '14px', lineHeight: '1.6' }}>{t('terms_text')}</p>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <h3 style={{ margin: '0 0 15px 0', color: theme.textMain }}>🔒 {t('privacy_title')}</h3>
                <p style={{ color: theme.textMuted, fontSize: '14px', lineHeight: '1.6' }}>{t('privacy_text')}</p>
              </>
            )}

            {activeModal === 'contact' && (
              <>
                <h3 style={{ margin: '0 0 20px 0', color: theme.textMain, textAlign: 'center' }}>📞 {t('contact_title')}</h3>
                <div style={{ display: 'grid', gap: '16px', fontSize: '14.5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SvgIcons.ContactUser />
                    <strong style={{ color: '#38bdf8' }}>{t('contact_name')}:</strong>
                    <span style={{ marginLeft: '6px', marginRight: '6px' }}>Issa Abakar Mahamat</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SvgIcons.ContactSchool />
                    <strong style={{ color: '#38bdf8' }}>{t('contact_institution')}:</strong>
                    <span style={{ marginLeft: '6px', marginRight: '6px' }}>{t('uni_name')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SvgIcons.ContactDept />
                    <strong style={{ color: '#38bdf8' }}>{t('contact_dept')}:</strong>
                    <span style={{ marginLeft: '6px', marginRight: '6px' }}>{t('dept')}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SvgIcons.ContactPhone />
                    <strong style={{ color: '#38bdf8' }}>{t('contact_phone')}:</strong>
                    <span style={{ marginLeft: '6px', marginRight: '6px', direction: 'ltr' }}>+90 501 140 57 73</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <SvgIcons.ContactMail />
                    <strong style={{ color: '#38bdf8' }}>{t('contact_email')}:</strong>
                    <span style={{ marginLeft: '6px', marginRight: '6px' }}>edutchad26@gmail.com</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                    <SvgIcons.ContactMap />
                    <div>
                      <strong style={{ color: '#38bdf8' }}>{t('contact_address')}:</strong>
                      <span style={{ display: 'block', marginTop: '4px' }}>Hüsamettin Çelebi, Tahran Cd. No:85, 42100 Selçuklu/Konya</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <button onClick={() => setActiveModal(null)} style={{ width: '100%', padding: '12px', backgroundColor: theme.primary, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '25px' }}>
              {t('close')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;