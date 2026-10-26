import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  MapPin,
  ArrowUpRight,
  Sun,
  Moon,
  Video,
  Film,
  User,
  Mail,
  ChevronUp,
  Link as LinkIcon,
} from 'lucide-react';

const DEFAULT_SITE_CONFIG = {
  personal: {
    displayName: 'Nguyên Sang',
    nickname: 'Tiểu thư Dolia',
    fullTitle: 'Nguyên Sang ( Tiểu thư Dolia )',
    occupations: [
      'Video Editor | semi-professional content creator',
      'Video Editor & Visual Storyteller',
      'Semi-professional Content Creator',
    ],
    primaryOccupation: 'Video Editor | semi-professional content creator',
    slogan: 'Dolia xinh nhất cái đất AOV',
    bio: 'Xin chào! Mình là Nguyên Sang, một người yêu thích sáng tạo nội dung, chỉnh sửa video và công nghệ. Đây là không gian cá nhân nơi mình chia sẻ những dự án, sản phẩm sáng tạo và các nền tảng để kết nối với mình.',
    location: 'Việt Nam',
    avatarUrl: 'https://i.postimg.cc/CMmf1xjV/Dolia-(1).jpg',
    email: 'sangpn1506@gmail.com',
    isOpenForCollab: true,
  },
  socials: [
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Trang cá nhân.',
      iconType: 'facebook',
      brandColor: '#1877F2',
      url: 'https://www.facebook.com/tieuthudolia',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Video và nội dung sáng tạo.',
      iconType: 'tiktok',
      brandColor: '#FF0050',
      url: 'https://www.tiktok.com/@tieuthudolia',
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Liên hệ hợp tác.',
      iconType: 'email',
      brandColor: '#EC4899',
      url: 'sangpn1506@gmail.com',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Video đã chỉnh sửa — Showreel & Highlight',
      category: 'Video Editing',
      description: 'Tổng hợp các phân đoạn cắt dựng theo nhịp nhạc (Beat Sync) và chuyển cảnh mượt mà.',
      projectUrl: '',
      tags: ['Video Editing', 'Beat Sync', 'Color Grading'],
    },
    {
      id: 'proj-2',
      title: 'Nội dung sáng tạo nổi bật — AOV & Gaming',
      category: 'Sáng tạo nội dung',
      description: 'Chuỗi video ngắn sáng tạo lấy cảm hứng từ Tiểu thư Dolia và AOV.',
      projectUrl: '',
      tags: ['Content Creation', 'AOV', 'Short-form'],
    },
  ],
};

async function copyTextToClipboard(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback
  }
  return false;
}

function normalizeSocialHref(social, fallbackEmail = '') {
  const raw = (social?.url || '').trim();
  if (!raw) {
    if (social?.iconType === 'email' && fallbackEmail) {
      return `mailto:${fallbackEmail.trim()}`;
    }
    return '';
  }
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('mailto:')) {
    return raw;
  }
  if (raw.includes('@') && !raw.includes('/')) {
    return `mailto:${raw}`;
  }
  return `https://${raw}`;
}

const BrandIcon = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      );
    case 'email':
      return <Mail className={className} />;
    default:
      return <LinkIcon className={className} />;
  }
};

const LiquidGlassCard = ({ children, className = '', isDark = true }) => (
  <div
    style={{
      background: isDark ? 'rgba(24, 24, 38, 0.56)' : 'rgba(255, 255, 255, 0.72)',
      backdropFilter: 'blur(32px)',
      boxShadow: isDark ? '0 18px 42px -12px rgba(0,0,0,0.6)' : '0 18px 40px -12px rgba(244,114,182,0.16)',
    }}
    className={`relative overflow-hidden border ${isDark ? 'border-white/20' : 'border-white/80'} ${className}`}
  >
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

export default function App() {
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const [typingText, setTypingText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const roles = DEFAULT_SITE_CONFIG.personal.occupations;
    const currentRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 35 : 65;
    const timer = setTimeout(() => {
      if (!isDeleting && typingText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && typingText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypingText(currentRole.substring(0, typingText.length + (isDeleting ? -1 : 1)));
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typingText, isDeleting, roleIndex]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#07070c] text-zinc-100' : 'bg-[#fbf7fc] text-zinc-900'} relative overflow-x-hidden font-sans`}>
      <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-6xl mx-auto">
        <LiquidGlassCard isDark={isDark} className="rounded-[1.75rem] px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-2">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center font-extrabold text-sm text-white shadow-lg">
                NS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base leading-none flex items-center gap-1.5">
                  {DEFAULT_SITE_CONFIG.personal.displayName}
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                </span>
                <span className="text-[11px] font-semibold text-pink-200/85">{DEFAULT_SITE_CONFIG.personal.nickname}</span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border border-white/15 bg-white/5">
              {['hero', 'socials', 'about', 'projects', 'contact'].map((id) => (
                <button key={id} onClick={() => scrollToSection(id)} className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold">
                  {id === 'hero' ? 'Giới thiệu' : id === 'socials' ? 'Nền tảng' : id === 'about' ? 'Về mình' : id === 'projects' ? 'Dự án' : 'Liên hệ'}
                </button>
              ))}
            </div>

            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2.5 rounded-xl border border-white/15 bg-white/5">
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-700" />}
            </button>
          </div>
        </LiquidGlassCard>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 space-y-24">
        <section id="hero" className="pt-2 sm:pt-6">
          <LiquidGlassCard isDark={isDark} className="rounded-[2.5rem] p-6 sm:p-10 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
                <div className="relative group flex flex-col items-center">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 opacity-60 blur-2xl" />
                  <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2.5 bg-white/20 backdrop-blur-md shadow-xl flex items-center justify-center">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-950">
                      <img
                        src={DEFAULT_SITE_CONFIG.personal.avatarUrl}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-5 flex justify-center w-full">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border border-white/20 bg-white/10 text-center">
                      <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                      <span>“{DEFAULT_SITE_CONFIG.personal.slogan}”</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 text-center lg:text-left space-y-5 flex flex-col items-center lg:items-start">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 bg-white/10">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    <span>{DEFAULT_SITE_CONFIG.personal.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-white/20 bg-white/10">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    <span>Open for collaboration</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                      {DEFAULT_SITE_CONFIG.personal.displayName}
                    </span>
                  </h1>
                  <p className="text-lg sm:text-2xl font-bold tracking-wide text-purple-200">
                    ( {DEFAULT_SITE_CONFIG.personal.nickname} )
                  </p>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/20 bg-white/10">
                  <Video className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm md:text-base font-semibold">{typingText}</span>
                </div>

                <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-zinc-300">
                  {DEFAULT_SITE_CONFIG.personal.bio}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
                  <button onClick={() => scrollToSection('socials')} className="px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
                    Khám phá thêm
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="px-7 py-3.5 rounded-2xl font-bold text-sm border border-white/20 bg-white/10">
                    Liên hệ với mình
                  </button>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </section>

        <section id="socials" className="space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-extrabold">Các nền tảng của tôi</h2>
            <p className="text-sm sm:text-base text-zinc-300">Chạm vào từng thẻ kính lỏng để kết nối trực tiếp với Nguyên Sang.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEFAULT_SITE_CONFIG.socials.map((social) => {
              const targetHref = normalizeSocialHref(social, DEFAULT_SITE_CONFIG.personal.email);
              return (
                <LiquidGlassCard key={social.id} isDark={isDark} className="rounded-[1.85rem] p-6">
                  <a href={targetHref || '#socials'} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: social.brandColor }}>
                        <BrandIcon type={social.iconType} className="w-6 h-6" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-extrabold">{social.name}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-300">{social.description}</p>
                  </a>
                </LiquidGlassCard>
              );
            })}
          </div>
        </section>

        <section id="contact">
          <LiquidGlassCard isDark={isDark} className="rounded-[2.5rem] p-6 sm:p-10">
            <div className="text-center space-y-4 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold">Liên hệ với mình</h2>
              <p className="text-sm sm:text-base text-zinc-300">Gửi lời nhắn hoặc hợp tác trực tiếp qua email của Nguyên Sang.</p>
              <button
                onClick={() => {
                  copyTextToClipboard(DEFAULT_SITE_CONFIG.personal.email);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2500);
                }}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg"
              >
                {copiedEmail ? 'Đã sao chép email' : 'Sao chép địa chỉ Email'}
              </button>
            </div>
          </LiquidGlassCard>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <p>© 2026 {DEFAULT_SITE_CONFIG.personal.displayName}. Made with ✦ {DEFAULT_SITE_CONFIG.personal.nickname}</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/15 bg-white/5 font-bold hover:text-pink-400 transition"
        >
          <span>Đầu trang</span>
          <ChevronUp className="w-4 h-4 text-pink-400" />
        </button>
      </footer>
    </div>
  );
}
