import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
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
  Heart,
  Coffee,
  Copy,
  Check,
  Briefcase,
  Layers,
  Target,
  Compass,
  Send
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
  tiktokVideos: [
    'https://www.tiktok.com/@tieuthudolia/video/7660402025494072596',
    'https://www.tiktok.com/@tieuthudolia/video/7672734062368378119', 
    'https://www.tiktok.com/@tieuthudolia/video/7694540237699173639',
  ],
  donate: {
    bank: 'TPBank',
    accountName: 'PHAN NGUYEN SANG',
    accountNumber: '8200 7889 999',
    qrUrl: 'https://img.vietqr.io/image/tpbank-82007889999-compact2.png?accountName=PHAN%20NGUYEN%20SANG',
    message: 'Cảm ơn bạn đã yêu quý và ủng hộ các sản phẩm sáng tạo của Nguyên Sang (Tiểu thư Dolia)! Mọi sự ủng hộ dù nhỏ nhất đều là động lực to lớn để mình ra thêm nhiều video hay hơn.'
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
  about: {
    whoAmI: 'Mình là Nguyên Sang (hay còn gọi là Tiểu thư Dolia) — một người trẻ đam mê kể chuyện bằng hình ảnh, âm thanh và công nghệ hiện đại.',
    currentWork: 'Hiện tại mình hoạt động với vai trò Video Editor và Semi-professional Content Creator, tập trung vào việc biên tập video sáng tạo, dựng highlight và xây dựng nội dung số chỉn chu.',
    interests: ['Chỉnh sửa Video (Video Editing)', 'Sáng tạo nội dung đa nền tảng', 'Công nghệ & AI sáng tạo', 'Thế giới AOV (Liên Quân Mobile)', 'Motion Graphics & Color Grading'],
    skills: [
      { name: 'Video Editing & Rhythm Cut', tag: 'Chuyên sâu' },
      { name: 'Visual Effects & Transitions', tag: 'Sáng tạo' },
      { name: 'Short-form Content (TikTok/Reels/Shorts)', tag: 'Xu hướng' },
      { name: 'Sound Design & Audio Sync', tag: 'Tinh tế' },
      { name: 'Storyboarding & Concept', tag: 'Tư duy' },
      { name: 'Ứng dụng Công nghệ số', tag: 'Hiện đại' },
    ],
    futureGoals: 'Không ngừng nâng cao kỹ thuật hậu kỳ, định hình phong cách hình ảnh mang đậm dấu ấn cá nhân và hợp tác cùng các nhà sáng tạo, thương hiệu để tạo ra những sản phẩm truyền cảm hứng.',
  }
};

async function copyTextToClipboard(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { }
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textArea);
    return ok;
  } catch {
    return false;
  }
}

function normalizeSocialHref(social, fallbackEmail = '') {
  const raw = (social?.url || '').trim();
  if (!raw) {
    if (social?.iconType === 'email' && fallbackEmail) return `mailto:${fallbackEmail.trim()}`;
    return '';
  }
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('mailto:')) return raw;
  if (raw.includes('@') && !raw.includes('/')) return `mailto:${raw}`;
  return `https://${raw}`;
}

function getTikTokVideoId(url) {
  if (!url) return null;
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

const BrandIcon = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      );
    case 'email':
      return <Mail className={className} />;
    default:
      return <LinkIcon className={className} />;
  }
};

/**
 * BỘ LỌC VÀ CSS KÍNH LỎNG 3D (Đã phục hồi hoàn toàn)
 */
const LiquidGlassFilterAndStyles = ({ isDark }) => (
  <>
    <svg className="sr-only" aria-hidden="true">
      <defs>
        <filter id="dolia-liquid-refraction" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="3" seed="12" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feSpecularLighting in="noise" surfaceScale="3" specularConstant="0.9" specularExponent="28" lightingColor="#ffffff" result="specular">
            <fePointLight x="-150" y="-200" z="260" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularMask" />
          <feMerge>
            <feMergeNode in="displaced" />
            <feMergeNode in="specularMask" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <style>{`
      @keyframes liquidBlobMorph {
        0%, 100% { border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%; transform: translate3d(0, 0, 0) rotate(0deg) scale(1); }
        33% { border-radius: 42% 58% 64% 36% / 44% 62% 38% 56%; transform: translate3d(28px, -24px, 0) rotate(6deg) scale(1.06); }
        66% { border-radius: 55% 45% 35% 65% / 54% 36% 64% 46%; transform: translate3d(-20px, 22px, 0) rotate(-5deg) scale(0.96); }
      }
      @keyframes floatLiquidDroplet {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-10px) scale(1.04); }
      }
      .animate-liquid-blob-1 { animation: liquidBlobMorph 18s ease-in-out infinite; }
      .animate-liquid-blob-2 { animation: liquidBlobMorph 22s ease-in-out infinite reverse; }
      .animate-liquid-blob-3 { animation: liquidBlobMorph 25s ease-in-out 2s infinite; }
      .animate-droplet-float { animation: floatLiquidDroplet 5.5s ease-in-out infinite; }

      .liquid-btn-primary {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(236, 72, 153, 0.88) 0%, rgba(217, 70, 239, 0.85) 50%, rgba(168, 85, 247, 0.88) 100%);
        backdrop-filter: blur(20px) saturate(200%);
        border: 1px solid rgba(255, 255, 255, 0.55);
        box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -3px 10px rgba(131, 24, 67, 0.45), inset 0 0 18px rgba(255, 255, 255, 0.25), 0 12px 28px -6px rgba(236, 72, 153, 0.48), 0 4px 12px rgba(168, 85, 247, 0.28);
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .liquid-btn-primary::before {
        content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0) 100%); border-radius: inherit; pointer-events: none;
      }
      .liquid-btn-primary:hover {
        transform: translateY(-2px) scale(1.015);
        border-color: rgba(255, 255, 255, 0.85);
        box-shadow: inset 0 2.5px 4px rgba(255, 255, 255, 0.98), inset 0 -3px 12px rgba(131, 24, 67, 0.4), inset 0 0 24px rgba(255, 255, 255, 0.4), 0 18px 36px -6px rgba(236, 72, 153, 0.62), 0 6px 16px rgba(168, 85, 247, 0.35);
      }

      .liquid-btn-secondary {
        position: relative; overflow: hidden;
        background: ${isDark ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(244, 114, 182, 0.07) 100%)' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(251, 207, 232, 0.38) 100%)'};
        backdrop-filter: blur(24px) saturate(210%);
        border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(255, 255, 255, 0.85)'};
        box-shadow: ${isDark ? 'inset 0 1.5px 2px rgba(255,255,255,0.45), inset 0 -3px 10px rgba(192,132,252,0.22), inset 0 0 18px rgba(255,255,255,0.06), 0 10px 24px -6px rgba(0,0,0,0.5)' : 'inset 0 2px 3px rgba(255,255,255,0.95), inset 0 -3px 10px rgba(244,114,182,0.22), inset 0 0 20px rgba(255,255,255,0.45), 0 10px 24px -6px rgba(244,114,182,0.16)'};
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .liquid-btn-secondary::before {
        content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
        background: ${isDark ? 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 48%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0) 100%)'};
      }
      .liquid-btn-secondary:hover {
        transform: translateY(-2px); border-color: ${isDark ? 'rgba(244, 114, 182, 0.55)' : 'rgba(244, 114, 182, 0.7)'};
      }

      .liquid-icon-squircle {
        position: relative; overflow: hidden;
        box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.88), inset 0 -3px 8px rgba(0, 0, 0, 0.28), inset 0 0 14px rgba(255, 255, 255, 0.32);
      }
      .liquid-icon-squircle::after {
        content: ''; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0) 100%);
      }
    `}</style>
  </>
);

/**
 * THẺ BỀ MẶT KÍNH LỎNG 3D (Phục hồi logic chuột và nghiêng 3D)
 */
const LiquidGlassCard = ({
  children,
  className = '',
  isDark = true,
  glassMode = 'crystal',
  brandColor = '',
  tilt = false,
  as: Component = 'div',
  onClick,
  ...rest
}) => {
  const cardRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 50, y: 50, active: false });
  const [tiltAngles, setTiltAngles] = useState({ rotateX: 0, rotateY: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const pctX = Math.max(0, Math.min(100, (relX / rect.width) * 100));
    const pctY = Math.max(0, Math.min(100, (relY / rect.height) * 100));

    setPointer({ x: pctX, y: pctY, active: true });

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((relY - centerY) / centerY) * -3.5;
      const rotY = ((relX - centerX) / centerX) * 3.5;
      setTiltAngles({ rotateX: rotX, rotateY: rotY });
    }
  };

  const handleMouseLeave = () => {
    setPointer((prev) => ({ ...prev, active: false }));
    if (tilt) setTiltAngles({ rotateX: 0, rotateY: 0 });
  };

  const surfaceBg = isDark
    ? glassMode === 'crystal'
      ? 'linear-gradient(135deg, rgba(24, 24, 38, 0.34) 0%, rgba(16, 16, 28, 0.18) 55%, rgba(46, 26, 62, 0.26) 100%)'
      : 'linear-gradient(135deg, rgba(24, 24, 38, 0.56) 0%, rgba(15, 15, 24, 0.42) 55%, rgba(42, 24, 58, 0.48) 100%)'
    : glassMode === 'crystal'
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 245, 250, 0.28) 55%, rgba(243, 232, 255, 0.36) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 247, 251, 0.56) 55%, rgba(245, 235, 255, 0.62) 100%)';

  const backdropBlurValue = glassMode === 'crystal' ? 'blur(18px) saturate(240%) brightness(1.04)' : 'blur(32px) saturate(210%)';

  const meniscusBoxShadow = isDark
    ? `inset 0 1.5px 2px rgba(255,255,255,0.42), inset 0 -3px 12px ${brandColor ? `${brandColor}44` : 'rgba(192,132,252,0.28)'}, inset 0 0 24px rgba(255,255,255,0.07), 0 18px 42px -12px rgba(0,0,0,0.6), 0 0 28px -8px ${brandColor ? `${brandColor}33` : 'rgba(244,114,182,0.12)'}`
    : `inset 0 2px 3px rgba(255,255,255,0.95), inset 0 -3px 10px ${brandColor ? `${brandColor}38` : 'rgba(244,114,182,0.28)'}, inset 0 0 26px rgba(255,255,255,0.38), 0 18px 40px -12px rgba(244,114,182,0.16), 0 4px 16px -4px rgba(168,85,247,0.1)`;

  const glossyDomeGradient = isDark
    ? 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 48%, transparent 100%)'
    : 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0) 100%)';

  const glareAccentColor = brandColor || (isDark ? '#f472b6' : '#ec4899');

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        background: surfaceBg,
        backdropFilter: backdropBlurValue,
        WebkitBackdropFilter: backdropBlurValue,
        boxShadow: meniscusBoxShadow,
        transform: tilt && !prefersReducedMotion ? `perspective(1000px) rotateX(${tiltAngles.rotateX}deg) rotateY(${tiltAngles.rotateY}deg)` : undefined,
        transition: pointer.active ? 'transform 0.12s ease-out, box-shadow 0.35s ease, border-color 0.35s ease' : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease',
      }}
      className={`relative overflow-hidden border ${isDark ? 'border-white/20 hover:border-white/35' : 'border-white/80 hover:border-pink-300/90'} ${className}`}
      {...rest}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-t-[inherit] z-0" style={{ background: glossyDomeGradient }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] z-0 opacity-90" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 35%, rgba(244,114,182,0.85) 65%, transparent 100%)' }} />
      
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: pointer.active ? 1 : 0,
            background: `radial-gradient(360px circle at ${pointer.x}% ${pointer.y}%, ${isDark ? 'rgba(255,255,255,0.17)' : 'rgba(255,255,255,0.65)'} 0%, ${glareAccentColor}22 35%, transparent 72%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};

const FloatingLiquidDroplets = ({ isDark }) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden z-0" aria-hidden="true">
    <div
      className="animate-droplet-float absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-80"
      style={{
        background: isDark ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(244,114,182,0.18) 55%, rgba(168,85,247,0.08) 100%)' : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(244,114,182,0.28) 60%, rgba(168,85,247,0.12) 100%)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark ? 'inset 0 2px 4px rgba(255,255,255,0.65), inset 0 -3px 8px rgba(244,114,182,0.4), 0 8px 20px rgba(0,0,0,0.35)' : 'inset 0 3px 5px rgba(255,255,255,0.98), inset 0 -3px 8px rgba(244,114,182,0.35), 0 8px 20px rgba(244,114,182,0.18)',
      }}
    />
    <div
      className="animate-droplet-float absolute top-12 right-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full opacity-75"
      style={{
        animationDelay: '1.6s',
        background: isDark ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(192,132,252,0.22) 60%, transparent 100%)' : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(192,132,252,0.35) 60%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -2px 6px rgba(168,85,247,0.35)',
      }}
    />
    <div
      className="animate-droplet-float absolute bottom-8 right-1/3 w-6 h-6 sm:w-9 sm:h-9 rounded-full opacity-70"
      style={{
        animationDelay: '2.8s',
        background: isDark ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(244,114,182,0.2) 65%, transparent 100%)' : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(244,114,182,0.3) 65%, transparent 100%)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -2px 6px rgba(244,114,182,0.35)',
      }}
    />
  </div>
);

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const config = DEFAULT_SITE_CONFIG;

  const [theme, setTheme] = useState('dark');
  const [glassMode, setGlassMode] = useState('crystal');
  const isDark = theme === 'dark';

  const [typingText, setTypingText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  useEffect(() => {
    const roles = config.personal.occupations;
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
  }, [typingText, isDeleting, roleIndex, config.personal.occupations]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-pink-400/30 selection:text-pink-500 ${isDark ? 'bg-[#07070c] text-zinc-100' : 'bg-[#fbf7fc] text-zinc-900'} relative overflow-x-hidden font-sans`}>
      <LiquidGlassFilterAndStyles isDark={isDark} />

      {/* =====================================================================
          NỀN CỰC QUANG CHẤT LỎNG CHUYỂN ĐỘNG
          ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className={`animate-liquid-blob-1 absolute -top-24 -left-24 w-[30rem] h-[30rem] sm:w-[38rem] sm:h-[38rem] blur-[95px] transition-opacity duration-700 ${isDark ? 'bg-gradient-to-br from-pink-500/30 via-rose-400/20 to-fuchsia-600/25' : 'bg-gradient-to-br from-pink-300/75 via-rose-200/65 to-fuchsia-300/60'}`} />
        <div className={`animate-liquid-blob-2 absolute top-1/4 -right-28 w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] blur-[105px] transition-opacity duration-700 ${isDark ? 'bg-gradient-to-tr from-purple-500/30 via-violet-400/20 to-pink-500/20' : 'bg-gradient-to-tr from-purple-300/75 via-violet-200/65 to-pink-200/65'}`} />
        <div className={`animate-liquid-blob-3 absolute bottom-10 left-1/4 w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] blur-[100px] transition-opacity duration-700 ${isDark ? 'bg-gradient-to-r from-fuchsia-500/25 via-pink-400/20 to-indigo-500/20' : 'bg-gradient-to-r from-pink-200/80 via-fuchsia-200/65 to-purple-200/75'}`} />
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]' : 'bg-[radial-gradient(rgba(236,72,153,0.12)_1px,transparent_1px)]'} [background-size:28px_28px] opacity-65`} />
      </div>

      {/* =====================================================================
          THANH ĐIỀU HƯỚNG NỔI KÍNH LỎNG 3D
          ===================================================================== */}
      <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-6xl mx-auto">
        <LiquidGlassCard as="nav" isDark={isDark} glassMode={glassMode} className="rounded-[1.75rem] px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-2">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="flex items-center gap-2.5 group">
              <div className="liquid-icon-squircle w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-fuchsia-400 to-purple-500 flex items-center justify-center font-extrabold text-sm text-white shadow-lg shadow-pink-500/30 transition-transform duration-300 group-hover:scale-105">
                NS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-tight leading-none flex items-center gap-1.5">
                  {config.personal.displayName}
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6] animate-pulse" />
                </span>
                <span className={`text-[11px] font-semibold ${isDark ? 'text-pink-200/85' : 'text-purple-700'}`}>
                  {config.personal.nickname}
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border border-white/15 bg-white/5">
              {[
                { id: 'hero', label: 'Giới thiệu' },
                { id: 'projects', label: 'Dự án TikTok' },
                { id: 'socials', label: 'Nền tảng' },
                { id: 'about', label: 'Về mình' },
                { id: 'donate', label: 'Donate' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${isDark ? 'text-zinc-200 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]' : 'text-zinc-700 hover:text-zinc-950 hover:bg-white/70 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setGlassMode((prev) => prev === 'crystal' ? 'frosted' : 'crystal')}
                className="liquid-btn-secondary px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                title="Chuyển đổi hiệu ứng Kính Lỏng"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="hidden sm:inline">{glassMode === 'crystal' ? 'Kính: Pha lê lỏng' : 'Kính: Sương mờ'}</span>
              </button>

              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="liquid-btn-secondary p-2.5 rounded-xl"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-purple-700" />}
              </button>
            </div>
          </div>
        </LiquidGlassCard>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 space-y-20">
        
        {/* ===================================================================
            1. TRANG GIỚI THIỆU (HERO) - CĂN GIỮA HOÀN HẢO
            =================================================================== */}
        <section id="hero" className="pt-2 sm:pt-6">
          <LiquidGlassCard isDark={isDark} glassMode={glassMode} className="rounded-[2.5rem] p-6 sm:p-10 md:p-14">
            <FloatingLiquidDroplets isDark={isDark} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Cột ảnh đại diện */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center w-full mx-auto">
                <div className="relative group flex flex-col items-center">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-400 via-fuchsia-400 to-purple-500 opacity-60 blur-2xl group-hover:opacity-90 transition duration-500" />
                  
                  <div
                    className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2.5 transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      background: isDark ? 'linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(244,114,182,0.22) 50%, rgba(168,85,247,0.3) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(251,207,232,0.65) 50%, rgba(233,213,255,0.8) 100%)',
                      backdropFilter: 'blur(20px) saturate(200%)',
                      boxShadow: isDark ? 'inset 0 3px 5px rgba(255,255,255,0.75), inset 0 -4px 12px rgba(244,114,182,0.45), 0 20px 50px rgba(0,0,0,0.6)' : 'inset 0 4px 6px rgba(255,255,255,1), inset 0 -4px 12px rgba(244,114,182,0.4), 0 20px 45px rgba(244,114,182,0.25)',
                    }}
                  >
                    <div className={`w-full h-full rounded-full overflow-hidden relative border ${isDark ? 'bg-zinc-950 border-white/30' : 'bg-pink-50 border-white/90'}`}>
                      <img src={config.personal.avatarUrl} alt="Avatar" className="w-full h-full object-cover object-center" />
                      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)' }} />
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center w-full">
                    <div className="liquid-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold">
                      <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                      <span className={isDark ? 'text-pink-100' : 'text-pink-800'}>“{config.personal.slogan}”</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cột thông tin */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-5 flex flex-col items-center lg:items-start">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    <span>{config.personal.location}</span>
                  </span>
                  <span className="liquid-btn-secondary inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    <span>Open for collaboration</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                      {config.personal.displayName}
                    </span>
                  </h1>
                  <p className={`text-lg sm:text-2xl font-bold tracking-wide ${isDark ? 'text-purple-200/95' : 'text-purple-800'}`}>
                    ( {config.personal.nickname} )
                  </p>
                </div>

                <div className="liquid-btn-secondary inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl min-h-[2.85rem]">
                  <Video className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className={`font-mono text-xs sm:text-sm md:text-base font-semibold ${isDark ? 'text-pink-200' : 'text-pink-700'}`}>
                    {typingText}
                  </span>
                  <span className="w-0.5 h-4 bg-pink-400 animate-pulse" />
                </div>

                <p className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isDark ? 'text-zinc-200/90' : 'text-zinc-700'}`}>
                  {config.personal.bio}
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button onClick={() => scrollToSection('projects')} className="liquid-btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white active:scale-95">
                    <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    <span>Khám phá dự án</span>
                  </button>
                  <button onClick={() => scrollToSection('contact')} className="liquid-btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base active:scale-95">
                    <Send className="w-4 h-4 text-pink-400" />
                    <span>Liên hệ với mình</span>
                  </button>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </section>

        {/* ===================================================================
            2. DỰ ÁN NỔI BẬT & TIKTOK (Chuyển lên vị trí 2)
            =================================================================== */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 text-center sm:text-left">
              <div className="liquid-btn-secondary inline-flex items-center justify-center sm:justify-start gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-pink-400 mx-auto sm:mx-0">
                <Film className="w-3.5 h-3.5" />
                <span>Sản phẩm sáng tạo</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Dự án & Video Nổi Bật
              </h2>
              <p className={`text-sm sm:text-base max-w-2xl ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Những video mới nhất trên kênh TikTok của Tiểu thư Dolia. Lướt và xem trực tiếp ngay tại đây!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.tiktokVideos.map((url, idx) => {
              const videoId = getTikTokVideoId(url);
              if (!videoId) return null;
              return (
                <LiquidGlassCard key={idx} isDark={isDark} glassMode={glassMode} tilt className="rounded-[2rem] h-[580px] p-0 overflow-hidden">
                  <iframe 
                    src={`https://www.tiktok.com/embed/v2/${videoId}`} 
                    className="w-full h-full border-none rounded-[2rem]" 
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen 
                  />
                </LiquidGlassCard>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            3. NỀN TẢNG MẠNG XÃ HỘI
            =================================================================== */}
        <section id="socials" className="space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-extrabold">Các nền tảng của tôi</h2>
            <p className="text-sm sm:text-base text-zinc-300">Chạm vào từng thẻ kính lỏng để kết nối trực tiếp với Nguyên Sang.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.socials.map((social) => {
              const targetHref = normalizeSocialHref(social, config.personal.email);
              return (
                <LiquidGlassCard key={social.id} isDark={isDark} glassMode={glassMode} brandColor={social.brandColor} tilt className="rounded-[1.85rem] p-6">
                  <a href={targetHref || '#socials'} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="liquid-icon-squircle w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: social.brandColor }}>
                        <BrandIcon type={social.iconType} className="w-6 h-6 relative z-10" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-pink-400" />
                    </div>
                    <h3 className="text-xl font-extrabold">{social.name}</h3>
                    <p className={`mt-1 text-xs sm:text-sm ${isDark ? 'text-zinc-300/90' : 'text-zinc-600'}`}>{social.description}</p>
                  </a>
                </LiquidGlassCard>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            4. VỀ MÌNH (Hồ sơ sáng tạo)
            =================================================================== */}
        <section id="about" className="space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">Hồ sơ sáng tạo</h2>
            <p className="text-sm sm:text-base text-zinc-300">Góc nhìn ngắn gọn về hành trình và kỹ năng của Nguyên Sang.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-6 h-full">
              <LiquidGlassCard isDark={isDark} glassMode={glassMode} tilt className="p-6 sm:p-8 rounded-[2rem] h-full">
                <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white mb-4">
                  <User className="w-5 h-5 relative z-10" />
                </div>
                <h3 className="text-xl font-extrabold mb-2">Tôi là ai?</h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-200/90' : 'text-zinc-700'}`}>{config.about.whoAmI}</p>
              </LiquidGlassCard>
            </div>
            
            <div className="md:col-span-6 h-full">
              <LiquidGlassCard isDark={isDark} glassMode={glassMode} tilt className="p-6 sm:p-8 rounded-[2rem] h-full">
                <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white mb-4">
                  <Briefcase className="w-5 h-5 relative z-10" />
                </div>
                <h3 className="text-xl font-extrabold mb-2">Công việc hiện tại</h3>
                <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-200/90' : 'text-zinc-700'}`}>{config.about.currentWork}</p>
              </LiquidGlassCard>
            </div>

            <div className="md:col-span-5 h-full">
              <LiquidGlassCard isDark={isDark} glassMode={glassMode} tilt className="p-6 sm:p-8 rounded-[2rem] h-full">
                <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center text-white mb-4">
                  <Heart className="w-5 h-5 relative z-10" />
                </div>
                <h3 className="text-xl font-extrabold mb-4">Lĩnh vực quan tâm</h3>
                <div className="flex flex-wrap gap-2.5">
                  {config.about.interests.map((interest, idx) => (
                    <span key={idx} className="liquid-btn-secondary px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold">
                      ✦ {interest}
                    </span>
                  ))}
                </div>
              </LiquidGlassCard>
            </div>

            <div className="md:col-span-7 h-full">
              <LiquidGlassCard isDark={isDark} glassMode={glassMode} tilt className="p-6 sm:p-8 rounded-[2rem] h-full">
                <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white mb-4">
                  <Layers className="w-5 h-5 relative z-10" />
                </div>
                <h3 className="text-xl font-extrabold mb-4">Kỹ năng nổi bật</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.about.skills.map((skill, idx) => (
                    <div key={idx} className="liquid-btn-secondary p-3.5 rounded-2xl flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-bold">{skill.name}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-400 shrink-0">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>
            </div>

            <div className="md:col-span-12 h-full">
              <LiquidGlassCard isDark={isDark} glassMode={glassMode} brandColor="#ec4899" className="p-6 sm:p-8 rounded-[2rem] h-full border-pink-500/30">
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  <div className="liquid-icon-squircle w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shrink-0">
                    <Target className="w-6 h-6 relative z-10" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold">Mục tiêu trong tương lai</h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-zinc-100' : 'text-zinc-800'}`}>
                      {config.about.futureGoals}
                    </p>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. DONATE / ỦNG HỘ (Mã QR VietQR)
            =================================================================== */}
        <section id="donate" className="scroll-mt-24 space-y-8">
          <div className="space-y-2 text-center sm:text-left">
            <div className="liquid-btn-secondary inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400 mx-auto sm:mx-0">
              <Coffee className="w-3.5 h-3.5" />
              <span>Donate & Ủng hộ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">
              Mời Sang một ly cà phê
            </h2>
          </div>

          <LiquidGlassCard isDark={isDark} glassMode={glassMode} brandColor="#fbbf24" className="rounded-[2.5rem] p-6 sm:p-10 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-pink-500/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-zinc-200' : 'text-zinc-700'}`}>
                  {config.donate.message}
                </p>
                
                <div className="space-y-4">
                  <div className="liquid-btn-secondary p-5 rounded-2xl">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Ngân hàng</p>
                    <p className={`text-lg font-extrabold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{config.donate.bank}</p>
                  </div>
                  
                  <div className="liquid-btn-secondary p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Số tài khoản</p>
                      <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">
                        {config.donate.accountNumber}
                      </p>
                      <p className="text-sm font-semibold text-zinc-400 mt-1">{config.donate.accountName}</p>
                    </div>
                    <button 
                      onClick={() => {
                        copyTextToClipboard(config.donate.accountNumber.replace(/\s/g, ''));
                        setCopiedBank(true);
                        setTimeout(() => setCopiedBank(false), 2500);
                      }}
                      className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-amber-300"
                    >
                      {copiedBank ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center md:justify-end">
                <div className="p-4 rounded-[2rem] bg-white w-full max-w-[280px] shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform duration-500">
                  <img 
                    src={config.donate.qrUrl} 
                    alt="Mã QR Chuyển Khoản" 
                    className="w-full h-auto rounded-xl"
                  />
                  <p className="text-center text-zinc-800 text-xs font-bold mt-4 mb-1">
                    Quét mã QR bằng App Ngân Hàng
                  </p>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </section>

        {/* ===================================================================
            6. LIÊN HỆ
            =================================================================== */}
        <section id="contact" className="scroll-mt-24">
          <LiquidGlassCard isDark={isDark} glassMode={glassMode} className="rounded-[2.5rem] p-6 sm:p-10 md:p-12">
            <div className="text-center space-y-4 max-w-lg mx-auto">
              <div className="liquid-btn-secondary inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-pink-400 mx-auto">
                <Mail className="w-3.5 h-3.5" />
                <span>Kết nối trực tiếp</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold">Liên hệ với mình</h2>
              <p className={`text-sm sm:text-base mb-6 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Bạn có ý tưởng video thú vị, dự án sáng tạo nội dung hoặc lời mời hợp tác? Đừng ngần ngại gửi email cho Nguyên Sang nhé!
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <button
                  onClick={() => {
                    copyTextToClipboard(config.personal.email);
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2500);
                  }}
                  className="liquid-btn-secondary w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedEmail ? 'Đã sao chép email' : 'Sao chép Email'}
                </button>
                <a
                  href={`mailto:${config.personal.email}?subject=${encodeURIComponent('Liên hệ hợp tác cùng Nguyên Sang')}`}
                  className="liquid-btn-primary w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Mở App Email gửi ngay
                </a>
              </div>
            </div>
          </LiquidGlassCard>
        </section>
      </main>

      {/* =====================================================================
          FOOTER CHUẨN (KHÔNG CÒN BÁNH RĂNG)
          ===================================================================== */}
      <footer className="relative z-10 px-4 sm:px-6 pb-8 max-w-6xl mx-auto">
        <LiquidGlassCard isDark={isDark} glassMode={glassMode} className="rounded-[2rem] px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm font-extrabold">© 2026 {config.personal.displayName}.</p>
              <p className={`text-xs flex items-center justify-center sm:justify-start gap-1.5 font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                <span>Made with creativity.</span>
                <span className="text-pink-400">✦</span>
                <span>{config.personal.nickname}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {config.socials.map((social) => {
                const targetHref = normalizeSocialHref(social, config.personal.email);
                return (
                  <a key={social.id} href={targetHref || '#socials'} target="_blank" rel="noopener noreferrer" className="liquid-btn-secondary p-2.5 rounded-xl hover:text-pink-400">
                    <BrandIcon type={social.iconType} className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <div>
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold">
                <span>Đầu trang</span>
                <ChevronUp className="w-4 h-4 text-pink-400" />
              </button>
            </div>
          </div>
        </LiquidGlassCard>
      </footer>
    </div>
  );
}
