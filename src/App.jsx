import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Sparkles,
  MapPin,
  ArrowUpRight,
  Compass,
  Send,
  Copy,
  Check,
  Sun,
  Moon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Settings,
  Edit3,
  Video,
  Film,
  Cpu,
  Layers,
  Target,
  User,
  Briefcase,
  Heart,
  ExternalLink,
  Play,
  X,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Mail,
  ChevronUp,
  Eye,
  Code2,
  Sliders,
  Image as ImageIcon,
  Link as LinkIcon,
  Wand2,
} from 'lucide-react';

/**
 * ============================================================================
 * 1. CẤU HÌNH TRUNG TÂM CHÍNH THỨC (DEFAULT_SITE_CONFIG)
 * ============================================================================
 * Đã tích hợp sẵn toàn bộ thông tin cá nhân, ảnh đại diện, Email và các liên kết
 * chính thức của Nguyên Sang (Tiểu thư Dolia).
 */
const DEFAULT_SITE_CONFIG = {
  seo: {
    title: 'Nguyên Sang (Tiểu thư Dolia) — Video Editor & Content Creator',
    description:
      'Xin chào! Mình là Nguyên Sang, một người yêu thích sáng tạo nội dung, chỉnh sửa video và công nghệ. Khám phá các dự án và kết nối với mình.',
    ogImage: '',
  },
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
    avatarUrl: 'https://ibb.co/hJ7BBFxS',
    email: 'sangpn1506@gmail.com',
    isOpenForCollab: true,
    formEndpoint: '',
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
    whoAmI:
      'Mình là Nguyên Sang (hay còn gọi là Tiểu thư Dolia) — một người trẻ đam mê kể chuyện bằng hình ảnh, âm thanh và công nghệ hiện đại.',
    currentWork:
      'Hiện tại mình hoạt động với vai trò Video Editor và Semi-professional Content Creator, tập trung vào việc biên tập video sáng tạo, dựng highlight và xây dựng nội dung số chỉn chu.',
    interests: [
      'Chỉnh sửa Video (Video Editing)',
      'Sáng tạo nội dung đa nền tảng',
      'Công nghệ & AI sáng tạo',
      'Thế giới AOV (Liên Quân Mobile)',
      'Motion Graphics & Color Grading',
    ],
    skills: [
      {
        name: 'Video Editing & Rhythm Cut',
        tag: 'Chuyên sâu',
      },
      {
        name: 'Visual Effects & Transitions',
        tag: 'Sáng tạo',
      },
      {
        name: 'Short-form Content (TikTok/Reels/Shorts)',
        tag: 'Xu hướng',
      },
      {
        name: 'Sound Design & Audio Sync',
        tag: 'Tinh tế',
      },
      {
        name: 'Storyboarding & Concept',
        tag: 'Tư duy',
      },
      {
        name: 'Ứng dụng Công nghệ số',
        tag: 'Hiện đại',
      },
    ],
    futureGoals:
      'Không ngừng nâng cao kỹ thuật hậu kỳ, định hình phong cách hình ảnh mang đậm dấu ấn cá nhân và hợp tác cùng các nhà sáng tạo, thương hiệu để tạo ra những sản phẩm truyền cảm hứng.',
  },
  projects: [
    {
      id: 'proj-1',
      title: 'Video đã chỉnh sửa — Showreel & Highlight',
      category: 'Video Editing',
      description:
        'Tổng hợp các phân đoạn cắt dựng theo nhịp nhạc (Beat Sync), chuyển cảnh mượt mà và hiệu ứng thị giác ấn tượng.',
      thumbnailUrl: '',
      projectUrl: '',
      videoEmbedUrl: '',
      tags: ['Video Editing', 'Beat Sync', 'Color Grading'],
    },
    {
      id: 'proj-2',
      title: 'Nội dung sáng tạo nổi bật — AOV & Gaming',
      category: 'Sáng tạo nội dung',
      description:
        'Chuỗi video ngắn sáng tạo lấy cảm hứng từ Tiểu thư Dolia và những khoảnh khắc ấn tượng trong thế giới AOV.',
      thumbnailUrl: '',
      projectUrl: '',
      videoEmbedUrl: '',
      tags: ['Content Creation', 'AOV', 'Short-form Video'],
    },
    {
      id: 'proj-3',
      title: 'Dự án Công nghệ & Không gian số cá nhân',
      category: 'Dự án đã thực hiện',
      description:
        'Ứng dụng công nghệ web hiện đại và quy trình số hóa để tối ưu hóa sản xuất nội dung và kết nối cộng đồng.',
      thumbnailUrl: '',
      projectUrl: '',
      videoEmbedUrl: '',
      tags: ['Tech Project', 'Workflow', 'Creative Portfolio'],
    },
  ],
};

const STORAGE_KEY = 'nguyen_sang_dolia_portfolio_v2_prod';

/**
 * Hàm sao chép an toàn (tự động dùng fallback nếu trình duyệt/iframe chặn Clipboard API)
 */
async function copyTextToClipboard(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Chuyển sang cơ chế dự phòng bên dưới
  }
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

/**
 * Hook tự động phân giải link trang xem ảnh ImgBB (VD: https://ibb.co/hJ7BBFxS)
 * sang link ảnh trực tiếp (https://i.ibb.co/...) để hiển thị mượt mà trong thẻ <img>.
 */
function useResolvedImage(rawUrl) {
  const [resolvedUrl, setResolvedUrl] = useState(() => {
    if (!rawUrl) return '';
    if (!rawUrl.startsWith('https://ibb.co/')) return rawUrl;
    try {
      return localStorage.getItem(`ns_ibb_direct_${rawUrl}`) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    if (!rawUrl) {
      setResolvedUrl('');
      return;
    }
    if (!rawUrl.startsWith('https://ibb.co/')) {
      setResolvedUrl(rawUrl);
      return;
    }

    let isMounted = true;
    const cacheKey = `ns_ibb_direct_${rawUrl}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setResolvedUrl(cached);
        return;
      }
    } catch {
      // Ignore storage error
    }

    const resolveImgBB = async () => {
      const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rawUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(rawUrl)}`,
      ];

      for (const proxyUrl of proxies) {
        try {
          const res = await fetch(proxyUrl);
          if (!res.ok) continue;
          const html = await res.text();
          const ogMatch =
            html.match(
              /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i
            ) || html.match(/https:\/\/i\.ibb\.co\/[^\s"'<>]+/i);
          const directLink = ogMatch ? ogMatch[1] || ogMatch[0] : '';
          if (directLink && directLink.startsWith('https://i.ibb.co/')) {
            if (isMounted) setResolvedUrl(directLink);
            try {
              localStorage.setItem(cacheKey, directLink);
            } catch {
              // Ignore storage error
            }
            return;
          }
        } catch {
          // Thử proxy tiếp theo
        }
      }
    };

    resolveImgBB();
    return () => {
      isMounted = false;
    };
  }, [rawUrl]);

  return resolvedUrl;
}

/**
 * Chuẩn hóa đường dẫn mạng xã hội & Email (tự động thêm mailto: nếu là địa chỉ email)
 */
function normalizeSocialHref(social, fallbackEmail = '') {
  const raw = (social?.url || '').trim();
  if (!raw) {
    if (social?.iconType === 'email' && fallbackEmail) {
      return `mailto:${fallbackEmail.trim()}`;
    }
    return '';
  }
  if (
    raw.startsWith('http://') ||
    raw.startsWith('https://') ||
    raw.startsWith('mailto:')
  ) {
    return raw;
  }
  if (raw.includes('@') && !raw.includes('/')) {
    return `mailto:${raw}`;
  }
  return `https://${raw}`;
}

/**
 * ============================================================================
 * 2. BỘ ICON THƯƠNG HIỆU CHÍNH XÁC (SVG BRAND ICONS)
 * ============================================================================
 */
const BrandIcon = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'facebook':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case 'discord':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      );
    case 'zalo':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.259c0 2.893 1.434 5.474 3.682 7.172-.16.924-.585 2.345-.672 2.642-.106.364.132.51.394.374.316-.164 2.138-1.22 3.046-1.745.995.276 2.054.426 3.15.426 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm-2.38 11.89H5.89v-1.14l2.44-3.13H6.06V8.48h3.51v1.11L7.12 12.73h2.5v1.16zm3.26 0h-1.23v-.42c-.27.32-.66.5-1.14.5-.89 0-1.56-.74-1.56-1.76 0-1.03.67-1.77 1.56-1.77.48 0 .87.18 1.14.5v-.41h1.23v3.36zm1.89 0h-1.23V8.21h1.23v5.68zm2.68.08c-1.06 0-1.83-.74-1.83-1.76 0-1.03.77-1.77 1.83-1.77s1.83.74 1.83 1.77c0 1.02-.77 1.76-1.83 1.76z" />
        </svg>
      );
    case 'github':
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );
    case 'email':
      return <Mail className={className} />;
    default:
      return <LinkIcon className={className} />;
  }
};

/**
 * ============================================================================
 * 3. HÀM TIỆN ÍCH NHÚNG VIDEO YOUTUBE & TIKTOK TỰ ĐỘNG
 * ============================================================================
 */
function parseVideoEmbed(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // Kiểm tra YouTube (watch?v=, youtu.be/, shorts/, embed/)
  const ytRegex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = trimmed.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return {
      provider: 'youtube',
      videoId: ytMatch[1],
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`,
    };
  }

  // Kiểm tra TikTok (tiktok.com/@user/video/123456789)
  const ttRegex = /tiktok\.com\/.*\/video\/(\d+)/;
  const ttMatch = trimmed.match(ttRegex);
  if (ttMatch && ttMatch[1]) {
    return {
      provider: 'tiktok',
      videoId: ttMatch[1],
      embedUrl: `https://www.tiktok.com/embed/v2/${ttMatch[1]}`,
    };
  }

  return null;
}

/**
 * ============================================================================
 * 4. KHUNG ẢNH ĐẠI DIỆN NGHỆ THUẬT MẶC ĐỊNH (DOLIA PASTEL ILLUSTRATION)
 * ============================================================================
 * Hiển thị khi người dùng chưa tải ảnh cá nhân lên, mang phong cách
 * "Tiểu thư Dolia" dịu dàng với sắc hồng pastel - tím nhạt và sóng âm thanh.
 */
const DefaultDoliaAvatar = () => (
  <svg
    viewBox="0 0 240 240"
    className="w-full h-full object-cover"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Nguyên Sang - Tiểu thư Dolia Avatar"
  >
    <defs>
      <linearGradient id="doliaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbcfe8" />
        <stop offset="50%" stopColor="#e9d5ff" />
        <stop offset="100%" stopColor="#c4b5fd" />
      </linearGradient>
      <linearGradient id="doliaHair" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="60%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="doliaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fbcfe8" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Nền Pastel */}
    <rect width="240" height="240" fill="url(#doliaBg)" />

    {/* Hiệu ứng bọt biển & ánh sáng Dolia */}
    <circle cx="48" cy="54" r="18" fill="url(#doliaGlow)" />
    <circle cx="195" cy="70" r="12" fill="url(#doliaGlow)" />
    <circle cx="182" cy="180" r="24" fill="url(#doliaGlow)" />
    <circle cx="45" cy="175" r="10" fill="url(#doliaGlow)" />

    {/* Vòng hào quang âm nhạc biển cả */}
    <circle
      cx="120"
      cy="120"
      r="86"
      stroke="white"
      strokeOpacity="0.6"
      strokeWidth="2"
      strokeDasharray="6 6"
    />

    {/* Biểu tượng cách điệu nhân vật sáng tạo */}
    <path
      d="M65 195C72 158 94 144 120 144C146 144 168 158 175 195"
      fill="url(#doliaHair)"
      opacity="0.9"
    />
    <circle cx="120" cy="102" r="34" fill="#fff1f2" />
    {/* Mái tóc bồng bềnh sắc hồng tím */}
    <path
      d="M82 104C82 74 99 58 122 58C145 58 162 75 160 108C152 92 138 84 120 84C102 84 90 92 82 104Z"
      fill="url(#doliaHair)"
    />
    {/* Chiếc nơ / vương miện san hô Tiểu thư Dolia */}
    <path
      d="M145 66C153 56 166 59 164 71C162 81 149 80 145 66Z"
      fill="#ec4899"
    />
    <circle cx="146" cy="70" r="5" fill="#fff" />

    {/* Đôi mắt lấp lánh */}
    <circle cx="108" cy="104" r="3.8" fill="#4c1d95" />
    <circle cx="132" cy="104" r="3.8" fill="#4c1d95" />
    <circle cx="109.5" cy="102.5" r="1.3" fill="#ffffff" />
    <circle cx="133.5" cy="102.5" r="1.3" fill="#ffffff" />

    {/* Má hồng pastel */}
    <ellipse cx="101" cy="111" rx="5" ry="2.8" fill="#f472b6" opacity="0.55" />
    <ellipse cx="139" cy="111" rx="5" ry="2.8" fill="#f472b6" opacity="0.55" />

    {/* Nụ cười nhẹ */}
    <path
      d="M115 115C118 118 122 118 125 115"
      stroke="#db2777"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Chữ ký viết tắt NS */}
    <rect
      x="85"
      y="196"
      width="70"
      height="22"
      rx="11"
      fill="#18181b"
      fillOpacity="0.75"
    />
    <text
      x="120"
      y="211"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="10"
      fontWeight="700"
      fontFamily="sans-serif"
      letterSpacing="1.5"
    >
      DOLIA • NS
    </text>
  </svg>
);

/**
 * ============================================================================
 * 4B. HỆ THỐNG KÍNH LỎNG 3D (LIQUID GLASS ENGINE & INTERACTIVE SURFACE)
 * ============================================================================
 * Mô phỏng hiệu ứng khúc xạ ánh sáng quang học (Optical Meniscus), viền phản quang
 * (Specular Rim Lighting), vòm bóng ướt (Glossy Dome Sheen) và tia sáng đuổi theo
 * chuột thời gian thực theo phong cách Apple Liquid Glass & VisionOS.
 */
const LiquidGlassFilterAndStyles = ({ isDark }) => (
  <>
    {/* Bộ lọc khúc xạ quang học SVG cho hiệu ứng giọt nước & viền kính lỏng */}
    <svg className="sr-only" aria-hidden="true">
      <defs>
        <filter
          id="dolia-liquid-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.022"
            numOctaves="3"
            seed="12"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feSpecularLighting
            in="noise"
            surfaceScale="3"
            specularConstant="0.9"
            specularExponent="28"
            lightingColor="#ffffff"
            result="specular"
          >
            <fePointLight x="-150" y="-200" z="260" />
          </feSpecularLighting>
          <feComposite
            in="specular"
            in2="SourceAlpha"
            operator="in"
            result="specularMask"
          />
          <feMerge>
            <feMergeNode in="displaced" />
            <feMergeNode in="specularMask" />
          </feMerge>
        </filter>
      </defs>
    </svg>

    <style>{`
      @keyframes liquidBlobMorph {
        0%, 100% {
          border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%;
          transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
        }
        33% {
          border-radius: 42% 58% 64% 36% / 44% 62% 38% 56%;
          transform: translate3d(28px, -24px, 0) rotate(6deg) scale(1.06);
        }
        66% {
          border-radius: 55% 45% 35% 65% / 54% 36% 64% 46%;
          transform: translate3d(-20px, 22px, 0) rotate(-5deg) scale(0.96);
        }
      }

      @keyframes floatLiquidDroplet {
        0%, 100% {
          transform: translateY(0px) scale(1);
        }
        50% {
          transform: translateY(-10px) scale(1.04);
        }
      }

      .animate-liquid-blob-1 {
        animation: liquidBlobMorph 18s ease-in-out infinite;
      }
      .animate-liquid-blob-2 {
        animation: liquidBlobMorph 22s ease-in-out infinite reverse;
      }
      .animate-liquid-blob-3 {
        animation: liquidBlobMorph 25s ease-in-out 2s infinite;
      }
      .animate-droplet-float {
        animation: floatLiquidDroplet 5.5s ease-in-out infinite;
      }

      /* Nút bấm Kính Lỏng Chính (Primary Liquid Glass CTA) */
      .liquid-btn-primary {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, rgba(236, 72, 153, 0.88) 0%, rgba(217, 70, 239, 0.85) 50%, rgba(168, 85, 247, 0.88) 100%);
        backdrop-filter: blur(20px) saturate(200%);
        -webkit-backdrop-filter: blur(20px) saturate(200%);
        border: 1px solid rgba(255, 255, 255, 0.55);
        box-shadow:
          inset 0 2px 3px rgba(255, 255, 255, 0.9),
          inset 0 -3px 10px rgba(131, 24, 67, 0.45),
          inset 0 0 18px rgba(255, 255, 255, 0.25),
          0 12px 28px -6px rgba(236, 72, 153, 0.48),
          0 4px 12px rgba(168, 85, 247, 0.28);
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .liquid-btn-primary::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0) 100%);
        border-radius: inherit;
        pointer-events: none;
      }
      .liquid-btn-primary:hover {
        transform: translateY(-2px) scale(1.015);
        border-color: rgba(255, 255, 255, 0.85);
        box-shadow:
          inset 0 2.5px 4px rgba(255, 255, 255, 0.98),
          inset 0 -3px 12px rgba(131, 24, 67, 0.4),
          inset 0 0 24px rgba(255, 255, 255, 0.4),
          0 18px 36px -6px rgba(236, 72, 153, 0.62),
          0 6px 16px rgba(168, 85, 247, 0.35);
      }

      /* Nút bấm Kính Lỏng Phụ (Secondary Translucent Liquid Capsule) */
      .liquid-btn-secondary {
        position: relative;
        overflow: hidden;
        background: ${
          isDark
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(244, 114, 182, 0.07) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(251, 207, 232, 0.38) 100%)'
        };
        backdrop-filter: blur(24px) saturate(210%);
        -webkit-backdrop-filter: blur(24px) saturate(210%);
        border: 1px solid ${
          isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(255, 255, 255, 0.85)'
        };
        box-shadow: ${
          isDark
            ? 'inset 0 1.5px 2px rgba(255,255,255,0.45), inset 0 -3px 10px rgba(192,132,252,0.22), inset 0 0 18px rgba(255,255,255,0.06), 0 10px 24px -6px rgba(0,0,0,0.5)'
            : 'inset 0 2px 3px rgba(255,255,255,0.95), inset 0 -3px 10px rgba(244,114,182,0.22), inset 0 0 20px rgba(255,255,255,0.45), 0 10px 24px -6px rgba(244,114,182,0.16)'
        };
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .liquid-btn-secondary::before {
        content: '';
        position: absolute;
        inset: 0;
        background: ${
          isDark
            ? 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 48%, transparent 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.1) 48%, rgba(255,255,255,0) 100%)'
        };
        border-radius: inherit;
        pointer-events: none;
      }
      .liquid-btn-secondary:hover {
        transform: translateY(-2px);
        border-color: ${
          isDark ? 'rgba(244, 114, 182, 0.55)' : 'rgba(244, 114, 182, 0.7)'
        };
      }

      /* Ô nhập liệu Kính Lỏng (Liquid Glass Input) */
      .liquid-input {
        background: ${
          isDark
            ? 'linear-gradient(180deg, rgba(12, 12, 20, 0.58) 0%, rgba(24, 24, 38, 0.42) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.68) 0%, rgba(253, 242, 248, 0.52) 100%)'
        };
        backdrop-filter: blur(20px) saturate(190%);
        -webkit-backdrop-filter: blur(20px) saturate(190%);
        border: 1px solid ${
          isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(244, 114, 182, 0.32)'
        };
        box-shadow: ${
          isDark
            ? 'inset 0 2px 6px rgba(0, 0, 0, 0.55), inset 0 -1px 2px rgba(255, 255, 255, 0.18)'
            : 'inset 0 2px 5px rgba(244, 114, 182, 0.1), inset 0 -1.5px 2px rgba(255, 255, 255, 0.9)'
        };
        transition: all 0.25s ease;
      }
      .liquid-input:focus {
        outline: none;
        border-color: rgba(236, 72, 153, 0.75);
        box-shadow:
          inset 0 1.5px 3px rgba(255, 255, 255, 0.4),
          0 0 0 3px rgba(236, 72, 153, 0.22),
          0 8px 20px -4px rgba(236, 72, 153, 0.25);
      }

      /* Squircle Icon Kính Lỏng 3D */
      .liquid-icon-squircle {
        position: relative;
        overflow: hidden;
        box-shadow:
          inset 0 2px 3px rgba(255, 255, 255, 0.88),
          inset 0 -3px 8px rgba(0, 0, 0, 0.28),
          inset 0 0 14px rgba(255, 255, 255, 0.32);
      }
      .liquid-icon-squircle::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.08) 46%, rgba(255, 255, 255, 0) 100%);
        border-radius: inherit;
        pointer-events: none;
      }
    `}</style>
  </>
);

/**
 * Component Bề mặt Kính Lỏng 3D Tương tác (`LiquidGlassCard`)
 * - Theo dõi vị trí con trỏ chuột (x, y) để tạo vầng sáng khúc xạ (Caustic Glare)
 * - Tích hợp lớp viền quang học Meniscus & lớp vòm bóng ướt (Glossy Dome Sheen)
 * - Hỗ trợ độ nghiêng 3D nhẹ khi di chuột (Perspective Tilt)
 */
const LiquidGlassCard = ({
  children,
  className = '',
  isDark = true,
  glassMode = 'frosted', // 'frosted' (Sương mờ) | 'crystal' (Pha lê lỏng)
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
    if (tilt) {
      setTiltAngles({ rotateX: 0, rotateY: 0 });
    }
  };

  // Độ trong suốt & độ mờ theo chế độ "Pha lê lỏng" (crystal) hoặc "Sương mờ" (frosted)
  const surfaceBg = isDark
    ? glassMode === 'crystal'
      ? 'linear-gradient(135deg, rgba(24, 24, 38, 0.34) 0%, rgba(16, 16, 28, 0.18) 55%, rgba(46, 26, 62, 0.26) 100%)'
      : 'linear-gradient(135deg, rgba(24, 24, 38, 0.56) 0%, rgba(15, 15, 24, 0.42) 55%, rgba(42, 24, 58, 0.48) 100%)'
    : glassMode === 'crystal'
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 245, 250, 0.28) 55%, rgba(243, 232, 255, 0.36) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 247, 251, 0.56) 55%, rgba(245, 235, 255, 0.62) 100%)';

  const backdropBlurValue =
    glassMode === 'crystal'
      ? 'blur(18px) saturate(240%) brightness(1.04)'
      : 'blur(32px) saturate(210%)';

  // Optical Meniscus & Specular Rim Lighting đa tầng đúng chuẩn Liquid Glass
  const meniscusBoxShadow = isDark
    ? `inset 0 1.5px 2px rgba(255,255,255,0.42), inset 0 -3px 12px ${
        brandColor ? `${brandColor}44` : 'rgba(192,132,252,0.28)'
      }, inset 0 0 24px rgba(255,255,255,0.07), 0 18px 42px -12px rgba(0,0,0,0.6), 0 0 28px -8px ${
        brandColor ? `${brandColor}33` : 'rgba(244,114,182,0.12)'
      }`
    : `inset 0 2px 3px rgba(255,255,255,0.95), inset 0 -3px 10px ${
        brandColor ? `${brandColor}38` : 'rgba(244,114,182,0.28)'
      }, inset 0 0 26px rgba(255,255,255,0.38), 0 18px 40px -12px rgba(244,114,182,0.16), 0 4px 16px -4px rgba(168,85,247,0.1)`;

  // Lớp vòm bóng ướt (Glossy Dome / Wet-Look Sheen)
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
        transform:
          tilt && !prefersReducedMotion
            ? `perspective(1000px) rotateX(${tiltAngles.rotateX}deg) rotateY(${tiltAngles.rotateY}deg)`
            : undefined,
        transition: pointer.active
          ? 'transform 0.12s ease-out, box-shadow 0.35s ease, border-color 0.35s ease'
          : 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease',
      }}
      className={`relative overflow-hidden border ${
        isDark
          ? 'border-white/20 hover:border-white/35'
          : 'border-white/80 hover:border-pink-300/90'
      } ${className}`}
      {...rest}
    >
      {/* 1. Lớp vòm phản chiếu bóng ướt nửa trên (Glossy Dome Sheen) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%] rounded-t-[inherit] z-0"
        style={{ background: glossyDomeGradient }}
      />

      {/* 2. Viền khúc xạ cầu vồng mỏng ở đỉnh (Top Specular Meniscus Line) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-[1.5px] z-0 opacity-90"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 35%, rgba(244,114,182,0.85) 65%, transparent 100%)',
        }}
      />

      {/* 3. Ánh sáng Kính Lỏng đuổi theo con trỏ chuột (Interactive Liquid Glare & Caustic Refraction) */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: pointer.active ? 1 : 0,
            background: `
              radial-gradient(360px circle at ${pointer.x}% ${pointer.y}%, ${
              isDark ? 'rgba(255,255,255,0.17)' : 'rgba(255,255,255,0.65)'
            } 0%, ${glareAccentColor}22 35%, transparent 72%)
            `,
          }}
        />
      )}

      {/* Nội dung bên trong thẻ */}
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};

/**
 * Các giọt thủy tinh lỏng 3D trôi nổi trang trí quanh Hero Section (Phù hợp chủ đề Tiểu thư Dolia)
 */
const FloatingLiquidDroplets = ({ isDark }) => (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    aria-hidden="true"
  >
    {/* Giọt kính lỏng lớn góc trái trên */}
    <div
      className="animate-droplet-float absolute top-6 left-6 w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-80"
      style={{
        background: isDark
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(244,114,182,0.18) 55%, rgba(168,85,247,0.08) 100%)'
          : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(244,114,182,0.28) 60%, rgba(168,85,247,0.12) 100%)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(255,255,255,0.65), inset 0 -3px 8px rgba(244,114,182,0.4), 0 8px 20px rgba(0,0,0,0.35)'
          : 'inset 0 3px 5px rgba(255,255,255,0.98), inset 0 -3px 8px rgba(244,114,182,0.35), 0 8px 20px rgba(244,114,182,0.18)',
      }}
    />
    {/* Giọt kính lỏng nhỏ góc phải trên */}
    <div
      className="animate-droplet-float absolute top-12 right-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full opacity-75"
      style={{
        animationDelay: '1.6s',
        background: isDark
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(192,132,252,0.22) 60%, transparent 100%)'
          : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(192,132,252,0.35) 60%, transparent 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow:
          'inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -2px 6px rgba(168,85,247,0.35)',
      }}
    />
    {/* Giọt kính lỏng góc dưới */}
    <div
      className="animate-droplet-float absolute bottom-8 right-1/3 w-6 h-6 sm:w-9 sm:h-9 rounded-full opacity-70"
      style={{
        animationDelay: '2.8s',
        background: isDark
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(244,114,182,0.2) 65%, transparent 100%)'
          : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(244,114,182,0.3) 65%, transparent 100%)',
        backdropFilter: 'blur(8px)',
        boxShadow:
          'inset 0 2px 3px rgba(255,255,255,0.85), inset 0 -2px 6px rgba(244,114,182,0.35)',
      }}
    />
  </div>
);

/**
 * ============================================================================
 * 5. COMPONENT CHÍNH (APP)
 * ============================================================================
 */
export default function App() {
  const prefersReducedMotion = useReducedMotion();

  // Chế độ Quản trị (Mặc định tắt để khách truy cập thấy giao diện sạch đẹp nhất)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [avatarLoadError, setAvatarLoadError] = useState(false);

  // State lưu cấu hình trang (khởi tạo từ localStorage hoặc DEFAULT_SITE_CONFIG)
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          personal: {
            ...DEFAULT_SITE_CONFIG.personal,
            ...(parsed.personal || {}),
          },
          about: { ...DEFAULT_SITE_CONFIG.about, ...(parsed.about || {}) },
          socials: Array.isArray(parsed.socials)
            ? parsed.socials
            : DEFAULT_SITE_CONFIG.socials,
          projects: Array.isArray(parsed.projects)
            ? parsed.projects
            : DEFAULT_SITE_CONFIG.projects,
        };
      }
    } catch (e) {
      console.error('Không thể đọc cấu hình đã lưu:', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  // Tự động phân giải link ảnh đại diện (hỗ trợ cả link trang xem ảnh ImgBB https://ibb.co/...)
  const resolvedAvatarUrl = useResolvedImage(config.personal.avatarUrl);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [resolvedAvatarUrl]);

  // Chế độ Sáng / Tối (Light / Dark Mode)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('ns_theme_mode') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Chế độ bề mặt Kính Lỏng: 'frosted' (Sương mờ) | 'crystal' (Pha lê lỏng)
  const [glassMode, setGlassMode] = useState(() => {
    try {
      return localStorage.getItem('ns_liquid_glass_mode') || 'crystal';
    } catch {
      return 'crystal';
    }
  });

  const isDark = theme === 'dark';

  // Lưu cấu hình mỗi khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Lỗi khi lưu cấu hình:', e);
    }
  }, [config]);

  // Cập nhật SEO document.title
  useEffect(() => {
    document.title = `${config.personal.displayName} ( ${config.personal.nickname} ) — Portfolio`;
  }, [config.personal.displayName, config.personal.nickname]);

  // Lưu theme & chế độ kính lỏng
  useEffect(() => {
    try {
      localStorage.setItem('ns_theme_mode', theme);
      localStorage.setItem('ns_liquid_glass_mode', glassMode);
    } catch (e) {
      // Ignore storage error
    }
  }, [theme, glassMode]);

  // State cho hiệu ứng Typing Animation ở Hero Section
  const [typingText, setTypingText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // State điều khiển giao diện tương tác
  const [isManageSocials, setIsManageSocials] = useState(false);
  const [activeSocialModal, setActiveSocialModal] = useState(null);
  const [socialUrlDraft, setSocialUrlDraft] = useState('');
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);
  const [newSocialForm, setNewSocialForm] = useState({
    name: '',
    description: '',
    iconType: 'facebook',
    brandColor: '#EC4899',
    url: '',
  });

  // State cho Dự án nổi bật
  const [selectedProjectCategory, setSelectedProjectCategory] =
    useState('Tất cả');
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [editingProjectModal, setEditingProjectModal] = useState(null);

  // State cho Drawer "Tùy chỉnh trang"
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [studioTab, setStudioTab] = useState('personal');

  // State cho Thông báo (Toast)
  const [toast, setToast] = useState(null);
  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3400);
  };

  // State cho Sao chép Email
  const [copiedEmail, setCopiedEmail] = useState(false);

  // State cho Form liên hệ
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState({});
  const [contactStatus, setContactStatus] = useState('idle');

  const fileInputRef = useRef(null);

  // Logic Typing Animation cho dòng chữ nghề nghiệp
  useEffect(() => {
    const roles =
      config.personal.occupations && config.personal.occupations.length > 0
        ? config.personal.occupations
        : [config.personal.primaryOccupation];

    if (prefersReducedMotion) {
      setTypingText(roles[0]);
      return;
    }

    const currentRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 35 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && typingText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && typingText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypingText(
          currentRole.substring(0, typingText.length + (isDeleting ? -1 : 1))
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [
    typingText,
    isDeleting,
    roleIndex,
    config.personal.occupations,
    config.personal.primaryOccupation,
    prefersReducedMotion,
  ]);

  // Cuộn mượt tới khu vực bất kỳ
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Xử lý tải ảnh đại diện từ máy tính
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      triggerToast(
        'Vui lòng chọn định dạng tệp hình ảnh (PNG, JPG, WEBP).',
        'error'
      );
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      triggerToast(
        'Kích thước ảnh quá lớn (tối đa 4MB). Hãy chọn ảnh nhẹ hơn nhé!',
        'error'
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setConfig((prev) => ({
        ...prev,
        personal: {
          ...prev.personal,
          avatarUrl: reader.result,
        },
      }));
      triggerToast('Đã cập nhật ảnh đại diện cá nhân thành công!');
    };
    reader.readAsDataURL(file);
  };

  // Xử lý khi click vào thẻ Social Link
  const handleSocialCardClick = (social, e) => {
    if (isManageSocials) {
      e.preventDefault();
      return;
    }

    const normalizedHref = normalizeSocialHref(social, config.personal.email);

    if (!normalizedHref) {
      e.preventDefault();
      if (isAdminMode) {
        setActiveSocialModal(social);
        setSocialUrlDraft('');
      } else {
        triggerToast(`Liên kết ${social.name} đang được cập nhật!`);
      }
      return;
    }
  };

  // Lưu đường dẫn cho 1 nền tảng mạng xã hội
  const handleSaveSocialUrl = (e) => {
    e.preventDefault();
    if (!activeSocialModal) return;
    let formattedUrl = socialUrlDraft.trim();

    if (
      formattedUrl &&
      !formattedUrl.startsWith('http://') &&
      !formattedUrl.startsWith('https://') &&
      !formattedUrl.startsWith('mailto:')
    ) {
      if (
        activeSocialModal.iconType === 'email' &&
        formattedUrl.includes('@')
      ) {
        formattedUrl = `mailto:${formattedUrl}`;
      } else {
        formattedUrl = `https://${formattedUrl}`;
      }
    }

    setConfig((prev) => ({
      ...prev,
      socials: prev.socials.map((item) =>
        item.id === activeSocialModal.id ? { ...item, url: formattedUrl } : item
      ),
    }));
    setActiveSocialModal(null);
    triggerToast(`Đã cập nhật đường dẫn cho ${activeSocialModal.name}!`);
  };

  // Sắp xếp thứ tự nền tảng (Lên / Xuống)
  const moveSocialItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= config.socials.length) return;
    const updated = [...config.socials];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setConfig((prev) => ({ ...prev, socials: updated }));
  };

  // Xóa nền tảng mạng xã hội
  const deleteSocialItem = (id, name) => {
    setConfig((prev) => ({
      ...prev,
      socials: prev.socials.filter((s) => s.id !== id),
    }));
    triggerToast(`Đã xóa nền tảng ${name}.`);
  };

  // Thêm nền tảng mạng xã hội mới
  const handleAddSocialPlatform = (e) => {
    e.preventDefault();
    if (!newSocialForm.name.trim()) {
      triggerToast('Vui lòng nhập tên nền tảng!', 'error');
      return;
    }
    let cleanUrl = newSocialForm.url.trim();
    if (
      cleanUrl &&
      !cleanUrl.startsWith('http://') &&
      !cleanUrl.startsWith('https://') &&
      !cleanUrl.startsWith('mailto:')
    ) {
      cleanUrl = `https://${cleanUrl}`;
    }

    const newItem = {
      id: `custom-${Date.now()}`,
      name: newSocialForm.name.trim(),
      description: newSocialForm.description.trim() || 'Liên kết kết nối.',
      iconType: newSocialForm.iconType,
      brandColor: newSocialForm.brandColor || '#EC4899',
      url: cleanUrl,
    };

    setConfig((prev) => ({
      ...prev,
      socials: [...prev.socials, newItem],
    }));
    setNewSocialForm({
      name: '',
      description: '',
      iconType: 'facebook',
      brandColor: '#EC4899',
      url: '',
    });
    setShowAddSocialModal(false);
    triggerToast(`Đã thêm nền tảng ${newItem.name} thành công!`);
  };

  // Lọc dự án theo danh mục
  const projectCategories = useMemo(() => {
    const cats = new Set(['Tất cả']);
    config.projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [config.projects]);

  const filteredProjects = useMemo(() => {
    if (selectedProjectCategory === 'Tất cả') return config.projects;
    return config.projects.filter(
      (p) => p.category === selectedProjectCategory
    );
  }, [config.projects, selectedProjectCategory]);

  // Lưu chỉnh sửa Dự án
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!editingProjectModal) return;
    if (!editingProjectModal.title.trim()) {
      triggerToast('Vui lòng nhập tên dự án!', 'error');
      return;
    }

    setConfig((prev) => {
      const exists = prev.projects.some((p) => p.id === editingProjectModal.id);
      const updatedProjects = exists
        ? prev.projects.map((p) =>
            p.id === editingProjectModal.id ? editingProjectModal : p
          )
        : [...prev.projects, editingProjectModal];
      return { ...prev, projects: updatedProjects };
    });
    setEditingProjectModal(null);
    triggerToast('Đã lưu thông tin dự án!');
  };

  const handleDeleteProject = (id) => {
    setConfig((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    triggerToast('Đã xóa dự án.');
  };

  // Sao chép Email
  const handleCopyEmail = async (customEmail) => {
    const emailToCopy = (customEmail || config.personal.email || '').trim();
    if (!emailToCopy) {
      if (isAdminMode) {
        setIsStudioOpen(true);
        setStudioTab('personal');
      }
      triggerToast('Chưa có địa chỉ Email để sao chép.', 'error');
      return;
    }
    await copyTextToClipboard(emailToCopy);
    setCopiedEmail(true);
    triggerToast(`Đã sao chép địa chỉ Email: ${emailToCopy}`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Kiểm tra dữ liệu đầu vào Form Liên hệ
  const validateContactForm = () => {
    const errors = {};
    if (!contactForm.name.trim() || contactForm.name.trim().length < 2) {
      errors.name = 'Vui lòng nhập tên của bạn (tối thiểu 2 ký tự).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !contactForm.email.trim() ||
      !emailPattern.test(contactForm.email.trim())
    ) {
      errors.email = 'Vui lòng nhập địa chỉ email hợp lệ.';
    }
    if (!contactForm.subject.trim()) {
      errors.subject = 'Vui lòng nhập tiêu đề liên hệ.';
    }
    if (!contactForm.message.trim() || contactForm.message.trim().length < 10) {
      errors.message = 'Nội dung tin nhắn cần ít nhất 10 ký tự.';
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý gửi Form Liên hệ
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    const endpoint = config.personal.formEndpoint?.trim();
    if (endpoint && endpoint.startsWith('https://')) {
      try {
        setContactStatus('submitting');
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(contactForm),
        });
        if (response.ok) {
          setContactStatus('success');
          setContactForm({ name: '', email: '', subject: '', message: '' });
          triggerToast(
            'Tin nhắn của bạn đã được gửi thành công qua dịch vụ xử lý!'
          );
        } else {
          setContactStatus('no-backend');
          triggerToast(
            'Dịch vụ xử lý phản hồi lỗi. Bạn có thể gửi trực tiếp qua ứng dụng Email.',
            'error'
          );
        }
      } catch {
        setContactStatus('no-backend');
        triggerToast('Không thể kết nối tới máy chủ xử lý form.', 'error');
      }
    } else {
      setContactStatus('no-backend');
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 selection:bg-pink-400/30 selection:text-pink-500 ${
        isDark ? 'bg-[#07070c] text-zinc-100' : 'bg-[#fbf7fc] text-zinc-900'
      } relative overflow-x-hidden font-sans`}
    >
      {/* Bộ lọc khúc xạ SVG & CSS Kính Lỏng */}
      <LiquidGlassFilterAndStyles isDark={isDark} />

      {/* Input ẩn để tải ảnh đại diện */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarFileUpload}
        className="hidden"
      />

      {/* =====================================================================
          NỀN CỰC QUANG CHẤT LỎNG CHUYỂN ĐỘNG (MORPHING LIQUID AURORA BLOBS)
          Giúp các lớp kính lỏng bên trên khúc xạ ánh sáng hồng pastel & tím nhạt
          ===================================================================== */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Khối chất lỏng Hồng Pastel */}
        <div
          className={`animate-liquid-blob-1 absolute -top-24 -left-24 w-[30rem] h-[30rem] sm:w-[38rem] sm:h-[38rem] blur-[95px] transition-opacity duration-700 ${
            isDark
              ? 'bg-gradient-to-br from-pink-500/30 via-rose-400/20 to-fuchsia-600/25'
              : 'bg-gradient-to-br from-pink-300/75 via-rose-200/65 to-fuchsia-300/60'
          }`}
        />
        {/* Khối chất lỏng Tím Lavender */}
        <div
          className={`animate-liquid-blob-2 absolute top-1/4 -right-28 w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] blur-[105px] transition-opacity duration-700 ${
            isDark
              ? 'bg-gradient-to-tr from-purple-500/30 via-violet-400/20 to-pink-500/20'
              : 'bg-gradient-to-tr from-purple-300/75 via-violet-200/65 to-pink-200/65'
          }`}
        />
        {/* Khối chất lỏng Ngọc Trai / Hồng Tím ở giữa trang */}
        <div
          className={`animate-liquid-blob-3 absolute bottom-10 left-1/4 w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] blur-[100px] transition-opacity duration-700 ${
            isDark
              ? 'bg-gradient-to-r from-fuchsia-500/25 via-pink-400/20 to-indigo-500/20'
              : 'bg-gradient-to-r from-pink-200/80 via-fuchsia-200/65 to-purple-200/75'
          }`}
        />

        {/* Lưới ánh sáng tinh tế */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]'
              : 'bg-[radial-gradient(rgba(236,72,153,0.12)_1px,transparent_1px)]'
          } [background-size:28px_28px] opacity-65`}
        />
      </div>

      {/* =====================================================================
          THANH ĐIỀU HƯỚNG NỔI KÍNH LỎNG 3D (LIQUID GLASS CAPSULE NAVBAR)
          ===================================================================== */}
      <header className="sticky top-4 z-40 px-4 sm:px-6 max-w-6xl mx-auto">
        <LiquidGlassCard
          as="nav"
          isDark={isDark}
          glassMode={glassMode}
          aria-label="Điều hướng chính"
          className="rounded-[1.75rem] px-4 sm:px-6 py-3"
        >
          <div className="flex items-center justify-between gap-2">
            {/* Logo / Tên thương hiệu cá nhân */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="liquid-icon-squircle w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-fuchsia-400 to-purple-500 flex items-center justify-center font-extrabold text-sm text-white shadow-lg shadow-pink-500/30 transition-transform duration-300 group-hover:scale-105">
                NS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-base tracking-tight leading-none flex items-center gap-1.5">
                  {config.personal.displayName}
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-400 shadow-[0_0_8px_#f472b6] animate-pulse" />
                </span>
                <span
                  className={`text-[11px] font-semibold ${
                    isDark ? 'text-pink-200/85' : 'text-purple-700'
                  }`}
                >
                  {config.personal.nickname}
                </span>
              </div>
            </a>

            {/* Liên kết các mục trên Desktop */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border border-white/15 bg-white/5">
              {[
                { id: 'hero', label: 'Giới thiệu' },
                { id: 'socials', label: 'Nền tảng' },
                { id: 'about', label: 'Về mình' },
                { id: 'projects', label: 'Dự án' },
                { id: 'contact', label: 'Liên hệ' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isDark
                      ? 'text-zinc-200 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]'
                      : 'text-zinc-700 hover:text-zinc-950 hover:bg-white/70 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Cụm nút điều khiển: Chế độ Kính Lỏng + Tùy chỉnh (Khi bật Admin) + Sáng/Tối */}
            <div className="flex items-center gap-2">
              {/* Nút chuyển đổi độ trong suốt Kính Lỏng: Pha lê lỏng vs Sương mờ */}
              <button
                type="button"
                onClick={() =>
                  setGlassMode((prev) =>
                    prev === 'crystal' ? 'frosted' : 'crystal'
                  )
                }
                className="liquid-btn-secondary px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                title="Chuyển đổi hiệu ứng Kính Lỏng: Pha lê lỏng (Trong suốt cao) / Sương mờ (Mờ dịu)"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="hidden sm:inline">
                  {glassMode === 'crystal'
                    ? 'Kính: Pha lê lỏng'
                    : 'Kính: Sương mờ'}
                </span>
              </button>

              {isAdminMode && (
                <button
                  type="button"
                  onClick={() => setIsStudioOpen(true)}
                  className="liquid-btn-secondary flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold"
                  title="Chỉnh sửa thông tin, ảnh đại diện và các đường dẫn"
                >
                  <Sliders className="w-4 h-4 text-pink-400" />
                  <span className="hidden md:inline">Tùy chỉnh</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label={
                  isDark
                    ? 'Chuyển sang giao diện Sáng'
                    : 'Chuyển sang giao diện Tối'
                }
                className="liquid-btn-secondary p-2.5 rounded-xl"
                title={
                  isDark
                    ? 'Chế độ Sáng (Light Liquid Glass)'
                    : 'Chế độ Tối (Dark Liquid Glass)'
                }
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-300" />
                ) : (
                  <Moon className="w-4 h-4 text-purple-700" />
                )}
              </button>
            </div>
          </div>
        </LiquidGlassCard>
      </header>

      {/* =====================================================================
          NỘI DUNG CHÍNH
          ===================================================================== */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 space-y-24">
        {/* ===================================================================
            A. TRANG GIỚI THIỆU (HERO SECTION — 3D LIQUID GLASS SHOWCASE)
            =================================================================== */}
        <section id="hero" className="relative pt-2 sm:pt-6">
          <LiquidGlassCard
            isDark={isDark}
            glassMode={glassMode}
            className="rounded-[2.5rem] p-6 sm:p-10 md:p-14"
          >
            {/* Các giọt kính lỏng 3D trôi nổi trang trí */}
            <FloatingLiquidDroplets isDark={isDark} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Cột Ảnh đại diện (3D Liquid Droplet Avatar Frame) */}
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="lg:col-span-5 flex flex-col items-center"
              >
                <div className="relative group">
                  {/* Quầng sáng khúc xạ phía sau Avatar */}
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-pink-400 via-fuchsia-400 to-purple-500 opacity-60 blur-2xl group-hover:opacity-90 transition duration-500" />

                  {/* Vòng Kính Lỏng 3D bao quanh Avatar */}
                  <div
                    className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full p-2.5 transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(244,114,182,0.22) 50%, rgba(168,85,247,0.3) 100%)'
                        : 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(251,207,232,0.65) 50%, rgba(233,213,255,0.8) 100%)',
                      backdropFilter: 'blur(20px) saturate(200%)',
                      boxShadow: isDark
                        ? 'inset 0 3px 5px rgba(255,255,255,0.75), inset 0 -4px 12px rgba(244,114,182,0.45), 0 20px 50px rgba(0,0,0,0.6)'
                        : 'inset 0 4px 6px rgba(255,255,255,1), inset 0 -4px 12px rgba(244,114,182,0.4), 0 20px 45px rgba(244,114,182,0.25)',
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full overflow-hidden relative border ${
                        isDark
                          ? 'bg-zinc-950 border-white/30'
                          : 'bg-pink-50 border-white/90'
                      }`}
                    >
                      {resolvedAvatarUrl && !avatarLoadError ? (
                        <img
                          src={resolvedAvatarUrl}
                          alt={config.personal.fullTitle}
                          onError={() => setAvatarLoadError(true)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <DefaultDoliaAvatar />
                      )}

                      {/* Lớp vòm kính bóng ướt phủ lên trên Avatar */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)',
                        }}
                      />

                      {/* Nút phủ đổi ảnh đại diện nhanh (Chỉ hiển thị khi bật Chế độ Chủ sở hữu) */}
                      {isAdminMode && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-xs font-semibold gap-1.5 p-4 text-center"
                        >
                          <Upload className="w-5 h-5 text-pink-300" />
                          <span>Đổi ảnh cá nhân</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Huy hiệu Slogan Kính Lỏng 3D */}
                  <motion.div
                    initial={
                      prefersReducedMotion ? false : { y: 10, opacity: 0 }
                    }
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-5 flex justify-center"
                  >
                    <div className="liquid-btn-secondary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold">
                      <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                      <span
                        className={isDark ? 'text-pink-100' : 'text-pink-800'}
                      >
                        “{config.personal.slogan}”
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Cột Thông tin cá nhân */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:col-span-7 text-center lg:text-left space-y-5"
              >
                {/* Vị trí & Trạng thái dạng viên thuốc Kính Lỏng */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <span className="liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    <span>{config.personal.location}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          isOpenForCollab: !prev.personal.isOpenForCollab,
                        },
                      }))
                    }
                    className="liquid-btn-secondary inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold"
                    title="Nhấn để Bật/Tắt trạng thái hợp tác"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        config.personal.isOpenForCollab
                          ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
                          : 'bg-zinc-400'
                      }`}
                    />
                    <span>
                      {config.personal.isOpenForCollab
                        ? 'Open for collaboration'
                        : 'Hiện đang bận dự án'}
                    </span>
                  </button>
                </div>

                {/* Tên hiển thị nổi bật */}
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                      {config.personal.displayName}
                    </span>
                  </h1>
                  <p
                    className={`text-lg sm:text-2xl font-bold tracking-wide ${
                      isDark ? 'text-purple-200/95' : 'text-purple-800'
                    }`}
                  >
                    ( {config.personal.nickname} )
                  </p>
                </div>

                {/* Dòng chữ nghề nghiệp với hiệu ứng Typing Animation trong khung Kính Lỏng */}
                <div className="liquid-btn-secondary inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl min-h-[2.85rem]">
                  <Video className="w-4 h-4 text-pink-400 shrink-0" />
                  <span
                    className={`font-mono text-xs sm:text-sm md:text-base font-semibold ${
                      isDark ? 'text-pink-200' : 'text-pink-700'
                    }`}
                  >
                    {typingText}
                  </span>
                  <span
                    className="w-0.5 h-4 bg-pink-400 animate-pulse"
                    aria-hidden="true"
                  />
                </div>

                {/* Đoạn giới thiệu ngắn */}
                <p
                  className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 ${
                    isDark ? 'text-zinc-200/90' : 'text-zinc-700'
                  }`}
                >
                  {config.personal.bio}
                </p>

                {/* Hai nút hành động chính (3D Liquid Glass CTA Buttons) */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('socials')}
                    className="liquid-btn-primary group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white active:scale-95"
                  >
                    <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    <span>Khám phá thêm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="liquid-btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm sm:text-base active:scale-95"
                  >
                    <Send className="w-4 h-4 text-pink-400" />
                    <span>Liên hệ với mình</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </LiquidGlassCard>
        </section>

        {/* ===================================================================
            B. CÁC NỀN TẢNG CỦA TÔI (SOCIAL LINKS — 3D LIQUID GLASS BENTO)
            =================================================================== */}
        <section id="socials" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="liquid-btn-secondary inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-pink-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kết nối đa nền tảng</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Các nền tảng của tôi
              </h2>
              <p
                className={`text-sm sm:text-base ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                Chạm vào từng thẻ kính lỏng để kết nối trực tiếp với Nguyên Sang
                trên các nền tảng chính thức.
              </p>
            </div>

            {/* Các nút Thêm, Xóa và Sắp xếp các nền tảng (Chỉ hiển thị khi bật Chế độ Chủ sở hữu) */}
            {isAdminMode && (
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddSocialModal(true)}
                  className="liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold"
                >
                  <Plus className="w-4 h-4 text-pink-400" />
                  <span>Thêm nền tảng</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsManageSocials(!isManageSocials)}
                  className={
                    isManageSocials
                      ? 'liquid-btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white'
                      : 'liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold'
                  }
                >
                  <Edit3 className="w-4 h-4" />
                  <span>
                    {isManageSocials ? 'Hoàn tất sắp xếp' : 'Sửa / Sắp xếp'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Lưới Bento các thẻ mạng xã hội bằng Kính Lỏng 3D (Tự động chia 3 cột cân đối khi có 3 nền tảng) */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              config.socials.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-5`}
          >
            <AnimatePresence mode="popLayout">
              {config.socials.map((social, index) => {
                const targetHref = normalizeSocialHref(
                  social,
                  config.personal.email
                );
                const hasUrl = Boolean(targetHref);
                const isMailLink = targetHref.startsWith('mailto:');
                const displayUrlText = hasUrl
                  ? targetHref
                      .replace(/^https?:\/\/(www\.)?/, '')
                      .replace(/^mailto:/, '')
                  : 'Đang cập nhật';

                return (
                  <motion.div
                    layout
                    key={social.id}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 16 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={
                      prefersReducedMotion || isManageSocials ? {} : { y: -6 }
                    }
                    className="relative group h-full"
                  >
                    {/* Quầng sáng khúc xạ màu thương hiệu phía dưới lớp kính lỏng khi Hover */}
                    <div
                      className="absolute -inset-1 rounded-[2rem] opacity-0 group-hover:opacity-55 blur-xl transition duration-500 pointer-events-none"
                      style={{ backgroundColor: social.brandColor }}
                    />

                    <LiquidGlassCard
                      as="a"
                      isDark={isDark}
                      glassMode={glassMode}
                      brandColor={social.brandColor}
                      tilt={!isManageSocials}
                      href={targetHref || '#socials'}
                      target={hasUrl && !isMailLink ? '_blank' : undefined}
                      rel={
                        hasUrl && !isMailLink
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      onClick={(e) => handleSocialCardClick(social, e)}
                      className="h-full block rounded-[1.85rem] p-6"
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          {/* Hàng trên: Viên nang Icon Kính Lỏng 3D & Nhãn trạng thái */}
                          <div className="flex items-start justify-between gap-3 mb-5">
                            <div
                              className="liquid-icon-squircle w-13 h-13 p-3.5 rounded-2xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110"
                              style={{
                                backgroundColor: social.brandColor,
                                boxShadow: `inset 0 2px 3px rgba(255,255,255,0.9), inset 0 -3px 8px rgba(0,0,0,0.32), 0 12px 24px -6px ${social.brandColor}88`,
                              }}
                            >
                              <BrandIcon
                                type={social.iconType}
                                className="w-6 h-6 relative z-10"
                              />
                            </div>

                            {!isManageSocials && (
                              <div className="flex items-center gap-1.5">
                                {isMailLink && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleCopyEmail(
                                        targetHref.replace(/^mailto:/, '')
                                      );
                                    }}
                                    className="liquid-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold hover:text-pink-400"
                                    title="Sao chép nhanh địa chỉ Email"
                                  >
                                    <Copy className="w-3 h-3 text-pink-400" />
                                    <span>Copy</span>
                                  </button>
                                )}
                                <span
                                  className={`liquid-btn-secondary inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${
                                    hasUrl
                                      ? isDark
                                        ? 'text-emerald-300'
                                        : 'text-emerald-700'
                                      : isDark
                                      ? 'text-zinc-300'
                                      : 'text-zinc-600'
                                  }`}
                                >
                                  {hasUrl ? (
                                    <>
                                      <span>
                                        {isMailLink ? 'Gửi mail' : 'Truy cập'}
                                      </span>
                                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </>
                                  ) : (
                                    <span>Sắp ra mắt</span>
                                  )}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Tên nền tảng & Mô tả ngắn */}
                          <h3 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
                            {social.name}
                          </h3>
                          <p
                            className={`mt-1 text-xs sm:text-sm line-clamp-2 ${
                              isDark ? 'text-zinc-300/90' : 'text-zinc-600'
                            }`}
                          >
                            {social.description}
                          </p>
                        </div>

                        {/* Thanh trạng thái đường dẫn hoặc Nút điều khiển Sắp xếp/Xóa */}
                        {isManageSocials && isAdminMode ? (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between gap-1"
                          >
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => moveSocialItem(index, -1)}
                                disabled={index === 0}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30"
                                title="Di chuyển lên"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveSocialItem(index, 1)}
                                disabled={index === config.socials.length - 1}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30"
                                title="Di chuyển xuống"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveSocialModal(social);
                                  setSocialUrlDraft(social.url || '');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-pink-500/25 text-pink-200 hover:bg-pink-500/35 text-xs font-semibold"
                              >
                                Sửa link
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                deleteSocialItem(social.id, social.name)
                              }
                              className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              title="Xóa nền tảng"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs font-semibold">
                            <span
                              className={`truncate max-w-[230px] ${
                                hasUrl
                                  ? isDark
                                    ? 'text-pink-300'
                                    : 'text-pink-700'
                                  : isDark
                                  ? 'text-zinc-400'
                                  : 'text-zinc-500'
                              }`}
                            >
                              {displayUrlText}
                            </span>
                            <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>
                        )}
                      </div>
                    </LiquidGlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* ===================================================================
            C. GIỚI THIỆU THÊM VỀ TÔI (ABOUT ME — 3D LIQUID GLASS BENTO GRID)
            =================================================================== */}
        <section id="about" className="scroll-mt-24 space-y-8">
          <div className="space-y-2">
            <div className="liquid-btn-secondary inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-purple-400">
              <User className="w-3.5 h-3.5" />
              <span>Hồ sơ sáng tạo</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Giới thiệu thêm về tôi
            </h2>
            <p
              className={`text-sm sm:text-base ${
                isDark ? 'text-zinc-300' : 'text-zinc-600'
              }`}
            >
              Góc nhìn ngắn gọn, trực quan về hành trình sáng tạo và định hướng
              của Nguyên Sang.
            </p>
          </div>

          {/* Bento Grid 5 ô Kính Lỏng 3D */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* 1. Tôi là ai? */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode={glassMode}
                tilt
                className="h-full p-6 sm:p-8 rounded-[2rem]"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white">
                      <User className="w-5 h-5 relative z-10" />
                    </div>
                    <h3 className="text-xl font-extrabold">Tôi là ai?</h3>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-zinc-200/90' : 'text-zinc-700'
                      }`}
                    >
                      {config.about.whoAmI}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-pink-400 font-bold">
                    <span>Biệt danh: {config.personal.nickname}</span>
                    <span>✨ Creative Soul</span>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>

            {/* 2. Công việc hiện tại */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="md:col-span-6"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode={glassMode}
                tilt
                className="h-full p-6 sm:p-8 rounded-[2rem]"
              >
                <div className="flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white">
                      <Briefcase className="w-5 h-5 relative z-10" />
                    </div>
                    <h3 className="text-xl font-extrabold">
                      Công việc hiện tại
                    </h3>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-zinc-200/90' : 'text-zinc-700'
                      }`}
                    >
                      {config.about.currentWork}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-purple-400 font-bold">
                    <span>{config.personal.primaryOccupation}</span>
                    <span>🎬 Post-Production</span>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>

            {/* 3. Những lĩnh vực tôi quan tâm */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-5"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode={glassMode}
                tilt
                className="h-full p-6 sm:p-8 rounded-[2rem]"
              >
                <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center text-white mb-4">
                  <Heart className="w-5 h-5 relative z-10" />
                </div>
                <h3 className="text-xl font-extrabold mb-4">
                  Lĩnh vực quan tâm
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {config.about.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="liquid-btn-secondary px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-semibold"
                    >
                      ✦ {interest}
                    </span>
                  ))}
                </div>
              </LiquidGlassCard>
            </motion.div>

            {/* 4. Kỹ năng nổi bật */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="md:col-span-7"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode={glassMode}
                tilt
                className="h-full p-6 sm:p-8 rounded-[2rem]"
              >
                <div className="liquid-icon-squircle w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white mb-4">
                  <Layers className="w-5 h-5 relative z-10" />
                </div>
                <h3 className="text-xl font-extrabold mb-4">Kỹ năng nổi bật</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.about.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="liquid-btn-secondary p-3.5 rounded-2xl flex items-center justify-between gap-2"
                    >
                      <span className="text-xs sm:text-sm font-bold">
                        {skill.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-500/20 text-pink-400 border border-pink-400/30 shrink-0">
                        {skill.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>
            </motion.div>

            {/* 5. Mục tiêu trong tương lai */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-12"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode={glassMode}
                brandColor="#ec4899"
                className="p-6 sm:p-8 rounded-[2rem]"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  <div className="liquid-icon-squircle w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shrink-0">
                    <Target className="w-6 h-6 relative z-10" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold">
                      Mục tiêu trong tương lai
                    </h3>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-zinc-100' : 'text-zinc-800'
                      }`}
                    >
                      {config.about.futureGoals}
                    </p>
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>
          </div>
        </section>

        {/* ===================================================================
            D. DỰ ÁN NỔI BẬT (FEATURED PROJECTS — 3D LIQUID GLASS CARDS)
            =================================================================== */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="liquid-btn-secondary inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-pink-400">
                <Film className="w-3.5 h-3.5" />
                <span>Sản phẩm sáng tạo</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Dự án nổi bật
              </h2>
              <p
                className={`text-sm sm:text-base ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                Trưng bày các video đã chỉnh sửa, nội dung sáng tạo và dự án cá
                nhân. Hỗ trợ nhúng trực tiếp video YouTube & TikTok.
              </p>
            </div>

            {/* Bộ lọc danh mục + Nút thêm dự án */}
            <div className="flex flex-wrap items-center gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedProjectCategory(cat)}
                  className={
                    selectedProjectCategory === cat
                      ? 'liquid-btn-primary px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white'
                      : 'liquid-btn-secondary px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold'
                  }
                >
                  {cat}
                </button>
              ))}

              {isAdminMode && (
                <button
                  type="button"
                  onClick={() =>
                    setEditingProjectModal({
                      id: `proj-${Date.now()}`,
                      title: '',
                      category: 'Video Editing',
                      description: '',
                      thumbnailUrl: '',
                      projectUrl: '',
                      videoEmbedUrl: '',
                      tags: ['Video Editing', 'Creative'],
                    })
                  }
                  className="liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-pink-400"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm sản phẩm</span>
                </button>
              )}
            </div>
          </div>

          {/* Lưới Card Dự án Kính Lỏng 3D */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const embedInfo = parseVideoEmbed(
                project.videoEmbedUrl || project.projectUrl
              );

              return (
                <motion.div
                  key={project.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="h-full"
                >
                  <LiquidGlassCard
                    as="article"
                    isDark={isDark}
                    glassMode={glassMode}
                    tilt
                    className="group rounded-[2rem] h-full flex flex-col justify-between"
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        {/* Khu vực Thumbnail hoặc Video Nhúng */}
                        <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-pink-500/25 via-purple-500/25 to-indigo-500/25 border-b border-white/15">
                          {project.thumbnailUrl ? (
                            <img
                              src={project.thumbnailUrl}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
                              <div className="liquid-icon-squircle w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500/80 to-purple-500/80 flex items-center justify-center text-white mb-2">
                                <Film className="w-7 h-7 relative z-10" />
                              </div>
                              <span className="text-xs font-semibold opacity-80">
                                {project.category}
                              </span>
                            </div>
                          )}

                          {/* Nhãn Danh mục Kính Lỏng */}
                          <div className="liquid-btn-secondary absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold">
                            {project.category}
                          </div>

                          {/* Nút Sửa nhanh dự án (Chỉ hiển thị khi bật Chế độ Chủ sở hữu) */}
                          {isAdminMode && (
                            <button
                              type="button"
                              onClick={() => setEditingProjectModal(project)}
                              className="liquid-btn-secondary absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                              title="Chỉnh sửa dự án hoặc gắn link video YouTube/TikTok"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Nút Phát video nhúng nếu có link YouTube/TikTok hợp lệ */}
                          {embedInfo && (
                            <button
                              type="button"
                              onClick={() =>
                                setActiveVideoModal({ project, embedInfo })
                              }
                              className="absolute inset-0 bg-black/35 flex items-center justify-center group/play transition-colors hover:bg-black/50"
                            >
                              <div className="liquid-btn-primary w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform group-hover/play:scale-110">
                                <Play className="w-6 h-6 fill-current ml-0.5 relative z-10" />
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Nội dung Card */}
                        <div className="p-6 space-y-3">
                          <h3 className="text-lg font-extrabold leading-snug group-hover:text-pink-400 transition-colors">
                            {project.title}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm leading-relaxed ${
                              isDark ? 'text-zinc-300/90' : 'text-zinc-600'
                            }`}
                          >
                            {project.description}
                          </p>

                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {project.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="liquid-btn-secondary px-2.5 py-0.5 rounded-lg text-[11px] font-semibold"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Chân Card: Liên kết xem sản phẩm hoặc gắn video */}
                      <div className="px-6 pb-6 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                        {embedInfo ? (
                          <button
                            type="button"
                            onClick={() =>
                              setActiveVideoModal({ project, embedInfo })
                            }
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300"
                          >
                            <Play className="w-4 h-4" />
                            <span>
                              Xem Video ({embedInfo.provider.toUpperCase()})
                            </span>
                          </button>
                        ) : project.projectUrl ? (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-pink-400 hover:text-pink-300"
                          >
                            <span>Xem sản phẩm</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : isAdminMode ? (
                          <button
                            type="button"
                            onClick={() => setEditingProjectModal(project)}
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                              isDark
                                ? 'text-zinc-300 hover:text-pink-300'
                                : 'text-zinc-600 hover:text-pink-600'
                            }`}
                          >
                            <LinkIcon className="w-3.5 h-3.5" />
                            <span>Gắn link sản phẩm / YouTube / TikTok</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400/90">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Dự án sáng tạo bởi Nguyên Sang</span>
                          </span>
                        )}

                        {isAdminMode && (
                          <button
                            type="button"
                            onClick={() => setEditingProjectModal(project)}
                            className="text-xs opacity-70 hover:opacity-100 font-semibold"
                          >
                            Tùy chỉnh
                          </button>
                        )}
                      </div>
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===================================================================
            E. LIÊN HỆ (CONTACT SECTION — 3D LIQUID GLASS CONSOLE)
            =================================================================== */}
        <section id="contact" className="scroll-mt-24">
          <LiquidGlassCard
            isDark={isDark}
            glassMode={glassMode}
            className="rounded-[2.5rem] p-6 sm:p-10 md:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Cột trái: Thông tin liên hệ, Email & Trạng thái hợp tác */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <div className="liquid-btn-secondary inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold text-pink-400">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Kết nối & Hợp tác</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Liên hệ với mình
                  </h2>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                  >
                    Bạn có ý tưởng video thú vị, dự án sáng tạo nội dung hoặc
                    lời mời hợp tác? Đừng ngần ngại kết nối với Nguyên Sang nhé!
                  </p>
                </div>

                {/* Trạng thái Open for collaboration có thể bật/tắt */}
                <div className="liquid-btn-secondary p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        config.personal.isOpenForCollab
                          ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]'
                          : 'bg-zinc-500'
                      }`}
                    />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-65">
                        Trạng thái hiện tại
                      </p>
                      <p className="text-sm font-extrabold">
                        {config.personal.isOpenForCollab
                          ? 'Open for collaboration'
                          : 'Tạm ngưng nhận dự án mới'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          isOpenForCollab: !prev.personal.isOpenForCollab,
                        },
                      }))
                    }
                    className="liquid-btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold"
                  >
                    {config.personal.isOpenForCollab ? 'Tắt' : 'Bật'}
                  </button>
                </div>

                {/* Hộp Email & Nút Sao chép / Liên hệ hợp tác */}
                <div className="liquid-btn-secondary p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold opacity-65">
                        Địa chỉ Email
                      </p>
                      <p className="text-sm sm:text-base font-extrabold break-all">
                        {config.personal.email ||
                          'Chưa cấu hình email (Nhấn để thêm)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="liquid-btn-secondary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-pink-400" />
                          <span>Sao chép Email</span>
                        </>
                      )}
                    </button>

                    <a
                      href={
                        config.personal.email
                          ? `mailto:${
                              config.personal.email
                            }?subject=${encodeURIComponent(
                              'Liên hệ hợp tác cùng Nguyên Sang'
                            )}`
                          : '#contact'
                      }
                      onClick={(e) => {
                        if (!config.personal.email) {
                          e.preventDefault();
                          setIsStudioOpen(true);
                          setStudioTab('personal');
                          triggerToast(
                            'Hãy cập nhật địa chỉ Email của bạn trong phần Tùy chỉnh nhé!',
                            'error'
                          );
                        }
                      }}
                      className="liquid-btn-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white"
                    >
                      <Send className="w-4 h-4" />
                      <span>Liên hệ hợp tác</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Cột phải: Form gửi tin nhắn Kính Lỏng có kiểm tra dữ liệu đầu vào */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleContactSubmit}
                  noValidate
                  className="liquid-btn-secondary p-6 sm:p-8 rounded-3xl space-y-4"
                >
                  <h3 className="text-lg font-extrabold">
                    Gửi lời nhắn trực tiếp
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1.5 opacity-85">
                        Tên của bạn *
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => {
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          });
                          if (contactErrors.name)
                            setContactErrors({ ...contactErrors, name: '' });
                        }}
                        placeholder="Nhập họ tên hoặc biệt danh..."
                        className="liquid-input w-full px-4 py-2.5 rounded-xl text-sm"
                      />
                      {contactErrors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {contactErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5 opacity-85">
                        Email liên hệ *
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => {
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          });
                          if (contactErrors.email)
                            setContactErrors({ ...contactErrors, email: '' });
                        }}
                        placeholder="you@example.com"
                        className="liquid-input w-full px-4 py-2.5 rounded-xl text-sm"
                      />
                      {contactErrors.email && (
                        <p className="mt-1 text-xs text-red-400">
                          {contactErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 opacity-85">
                      Chủ đề hợp tác *
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => {
                        setContactForm({
                          ...contactForm,
                          subject: e.target.value,
                        });
                        if (contactErrors.subject)
                          setContactErrors({ ...contactErrors, subject: '' });
                      }}
                      placeholder="VD: Hợp tác chỉnh sửa video / Booking nội dung..."
                      className="liquid-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                    {contactErrors.subject && (
                      <p className="mt-1 text-xs text-red-400">
                        {contactErrors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5 opacity-85">
                      Nội dung chi tiết *
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => {
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        });
                        if (contactErrors.message)
                          setContactErrors({ ...contactErrors, message: '' });
                      }}
                      placeholder="Chia sẻ chi tiết về dự án hoặc lời nhắn của bạn..."
                      className="liquid-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                    {contactErrors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {contactErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={contactStatus === 'submitting'}
                    className="liquid-btn-primary w-full py-3.5 rounded-xl font-bold text-sm text-white"
                  >
                    {contactStatus === 'submitting'
                      ? 'Đang gửi...'
                      : 'Kiểm tra & Gửi tin nhắn'}
                  </button>

                  {/* Thông báo minh bạch khi chưa kết nối dịch vụ Backend xử lý Form */}
                  {contactStatus === 'no-backend' && (
                    <div
                      className={`p-4 rounded-2xl border text-xs space-y-3 ${
                        isDark
                          ? 'bg-amber-500/10 border-amber-400/30 text-amber-200'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>Dữ liệu hợp lệ!</strong> Hiện tại website đang
                          chạy ở chế độ tĩnh (chưa gắn dịch vụ xử lý backend như
                          Formspree). Để đảm bảo tin nhắn thật sự đến tay{' '}
                          <strong>Nguyên Sang</strong>, bạn hãy chọn 1 trong 2
                          cách dưới đây:
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`mailto:${
                            config.personal.email || ''
                          }?subject=${encodeURIComponent(
                            contactForm.subject
                          )}&body=${encodeURIComponent(
                            `Chào Nguyên Sang,\n\nMình là: ${contactForm.name} (${contactForm.email})\n\n${contactForm.message}`
                          )}`}
                          className="px-3.5 py-2 rounded-xl font-bold bg-amber-500 text-black hover:bg-amber-400 transition"
                        >
                          Mở ứng dụng Email để gửi ngay
                        </a>
                        <button
                          type="button"
                          onClick={async () => {
                            await copyTextToClipboard(
                              `Người gửi: ${contactForm.name} (${contactForm.email})\nChủ đề: ${contactForm.subject}\nNội dung: ${contactForm.message}`
                            );
                            triggerToast(
                              'Đã sao chép toàn bộ nội dung tin nhắn!'
                            );
                          }}
                          className="px-3.5 py-2 rounded-xl font-bold border border-amber-400/40 hover:bg-amber-500/10 transition"
                        >
                          Sao chép nội dung tin nhắn
                        </button>
                      </div>
                    </div>
                  )}

                  {contactStatus === 'success' && (
                    <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        Tin nhắn của bạn đã được dịch vụ máy chủ tiếp nhận thành
                        công!
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </LiquidGlassCard>
        </section>
      </main>

      {/* =====================================================================
          F. FOOTER KÍNH LỎNG
          ===================================================================== */}
      <footer className="relative z-10 px-4 sm:px-6 pb-8 max-w-6xl mx-auto">
        <LiquidGlassCard
          isDark={isDark}
          glassMode={glassMode}
          className="rounded-[2rem] px-6 py-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm font-extrabold">
                © 2026 {config.personal.displayName}.
              </p>
              <p
                className={`text-xs flex items-center justify-center sm:justify-start gap-1.5 font-medium ${
                  isDark ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                <span>Made with creativity.</span>
                <span className="text-pink-400">✦</span>
                <span>{config.personal.nickname}</span>
              </p>
            </div>

            {/* Hàng Icon mạng xã hội ở Footer */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {config.socials.map((social) => {
                const targetHref = normalizeSocialHref(
                  social,
                  config.personal.email
                );
                const hasUrl = Boolean(targetHref);
                const isMailLink = targetHref.startsWith('mailto:');
                return (
                  <a
                    key={social.id}
                    href={hasUrl ? targetHref : '#socials'}
                    target={hasUrl && !isMailLink ? '_blank' : undefined}
                    rel={
                      hasUrl && !isMailLink ? 'noopener noreferrer' : undefined
                    }
                    aria-label={social.name}
                    className="liquid-btn-secondary p-2.5 rounded-xl hover:text-pink-400"
                  >
                    <BrandIcon type={social.iconType} className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Cụm nút Đầu trang & Nút bật/tắt chế độ chỉnh sửa dành riêng cho chủ sở hữu */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const next = !isAdminMode;
                  setIsAdminMode(next);
                  if (!next) setIsManageSocials(false);
                  triggerToast(
                    next
                      ? 'Đã mở khóa Chế độ Chủ sở hữu (Cho phép tùy chỉnh)'
                      : 'Đã khóa giao diện ở Chế độ Khách xem (Production)'
                  );
                }}
                className={`liquid-btn-secondary p-2.5 rounded-xl text-xs font-semibold ${
                  isAdminMode
                    ? 'text-pink-400 border-pink-400/50'
                    : 'opacity-50 hover:opacity-100'
                }`}
                title={
                  isAdminMode
                    ? 'Đang bật chế độ chỉnh sửa — Nhấn để khóa lại'
                    : 'Mở khóa chế độ chỉnh sửa dành cho Nguyên Sang'
                }
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  })
                }
                className="liquid-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                <span>Đầu trang</span>
                <ChevronUp className="w-4 h-4 text-pink-400" />
              </button>
            </div>
          </div>
        </LiquidGlassCard>
      </footer>

      {/* =====================================================================
          MODAL 1: GẮN / CẬP NHẬT NHANH LINK MẠNG XÃ HỘI (LIQUID GLASS MODAL)
          ===================================================================== */}
      <AnimatePresence>
        {activeSocialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode="frosted"
                brandColor={activeSocialModal.brandColor}
                className="rounded-3xl p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="liquid-icon-squircle w-11 h-11 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: activeSocialModal.brandColor }}
                    >
                      <BrandIcon
                        type={activeSocialModal.iconType}
                        className="w-5 h-5 relative z-10"
                      />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base">
                        Cập nhật liên kết {activeSocialModal.name}
                      </h3>
                      <p className="text-xs opacity-70">
                        {activeSocialModal.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSocialModal(null)}
                    className="liquid-btn-secondary p-1.5 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveSocialUrl} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">
                      Đường dẫn (URL) chính thức của bạn
                    </label>
                    <input
                      type="text"
                      autoFocus
                      value={socialUrlDraft}
                      onChange={(e) => setSocialUrlDraft(e.target.value)}
                      placeholder={
                        activeSocialModal.iconType === 'email'
                          ? 'VD: nguyensang@gmail.com'
                          : `Dán link ${activeSocialModal.name} thật của bạn vào đây...`
                      }
                      className="liquid-input w-full px-4 py-2.5 rounded-xl text-sm"
                    />
                    <p className="mt-1.5 text-[11px] opacity-70">
                      Mẹo: Sau khi lưu, mỗi lần khách truy cập nhấn vào thẻ{' '}
                      {activeSocialModal.name} sẽ mở trực tiếp trang của bạn
                      trong tab mới.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveSocialModal(null)}
                      className="liquid-btn-secondary px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="liquid-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                    >
                      Lưu đường dẫn
                    </button>
                  </div>
                </form>
              </LiquidGlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 2: THÊM NỀN TẢNG MẠNG XÃ HỘI MỚI
          ===================================================================== */}
      <AnimatePresence>
        {showAddSocialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode="frosted"
                className="rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-lg">Thêm nền tảng mới</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddSocialModal(false)}
                    className="liquid-btn-secondary p-1.5 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddSocialPlatform} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Tên nền tảng *
                    </label>
                    <input
                      type="text"
                      value={newSocialForm.name}
                      onChange={(e) =>
                        setNewSocialForm({
                          ...newSocialForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="VD: Threads, Behance, Bilibili..."
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Mô tả ngắn
                    </label>
                    <input
                      type="text"
                      value={newSocialForm.description}
                      onChange={(e) =>
                        setNewSocialForm({
                          ...newSocialForm,
                          description: e.target.value,
                        })
                      }
                      placeholder="VD: Kênh chia sẻ hậu trường..."
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Biểu tượng
                      </label>
                      <select
                        value={newSocialForm.iconType}
                        onChange={(e) =>
                          setNewSocialForm({
                            ...newSocialForm,
                            iconType: e.target.value,
                          })
                        }
                        className="liquid-input w-full px-3 py-2 rounded-xl text-sm"
                      >
                        <option value="facebook">Facebook</option>
                        <option value="tiktok">TikTok</option>
                        <option value="youtube">YouTube</option>
                        <option value="instagram">Instagram</option>
                        <option value="discord">Discord</option>
                        <option value="zalo">Zalo</option>
                        <option value="github">GitHub</option>
                        <option value="email">Email</option>
                        <option value="custom">Liên kết chung</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Màu nhận diện
                      </label>
                      <input
                        type="color"
                        value={newSocialForm.brandColor}
                        onChange={(e) =>
                          setNewSocialForm({
                            ...newSocialForm,
                            brandColor: e.target.value,
                          })
                        }
                        className="w-full h-9 rounded-xl cursor-pointer bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Đường dẫn (URL)
                    </label>
                    <input
                      type="text"
                      value={newSocialForm.url}
                      onChange={(e) =>
                        setNewSocialForm({
                          ...newSocialForm,
                          url: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSocialModal(false)}
                      className="liquid-btn-secondary px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="liquid-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                    >
                      Thêm vào danh sách
                    </button>
                  </div>
                </form>
              </LiquidGlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 3: XEM VIDEO NHÚNG TRỰC TIẾP (YOUTUBE / TIKTOK EMBED PLAYER)
          ===================================================================== */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-3xl"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode="frosted"
                className="rounded-3xl"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/15">
                  <div>
                    <h3 className="font-extrabold text-base">
                      {activeVideoModal.project.title}
                    </h3>
                    <p className="text-xs opacity-65">
                      Đang phát từ{' '}
                      {activeVideoModal.embedInfo.provider.toUpperCase()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveVideoModal(null)}
                    className="liquid-btn-secondary p-2 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={activeVideoModal.embedInfo.embedUrl}
                    title={activeVideoModal.project.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </LiquidGlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          MODAL 4: CHỈNH SỬA / THÊM DỰ ÁN NỔI BẬT
          ===================================================================== */}
      <AnimatePresence>
        {editingProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode="frosted"
                className="rounded-3xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-lg">
                    Cấu hình Sản phẩm / Dự án
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingProjectModal(null)}
                    className="liquid-btn-secondary p-1.5 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Tên dự án / video *
                    </label>
                    <input
                      type="text"
                      value={editingProjectModal.title}
                      onChange={(e) =>
                        setEditingProjectModal({
                          ...editingProjectModal,
                          title: e.target.value,
                        })
                      }
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Danh mục
                    </label>
                    <input
                      type="text"
                      value={editingProjectModal.category}
                      onChange={(e) =>
                        setEditingProjectModal({
                          ...editingProjectModal,
                          category: e.target.value,
                        })
                      }
                      placeholder="Video Editing / Sáng tạo nội dung / Dự án đã thực hiện"
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Mô tả sản phẩm
                    </label>
                    <textarea
                      rows={3}
                      value={editingProjectModal.description}
                      onChange={(e) =>
                        setEditingProjectModal({
                          ...editingProjectModal,
                          description: e.target.value,
                        })
                      }
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Link nhúng Video YouTube hoặc TikTok (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={editingProjectModal.videoEmbedUrl || ''}
                      onChange={(e) =>
                        setEditingProjectModal({
                          ...editingProjectModal,
                          videoEmbedUrl: e.target.value,
                        })
                      }
                      placeholder="VD: https://www.youtube.com/watch?v=... hoặc link TikTok"
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Hoặc URL hình ảnh Thumbnail (Tùy chọn)
                    </label>
                    <input
                      type="text"
                      value={editingProjectModal.thumbnailUrl || ''}
                      onChange={(e) =>
                        setEditingProjectModal({
                          ...editingProjectModal,
                          thumbnailUrl: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Liên kết xem sản phẩm ngoài (Google Drive / Behance /
                      GitHub...)
                    </label>
                    <input
                      type="text"
                      value={editingProjectModal.projectUrl || ''}
                      onChange={(e) =>
                        setEditingProjectModal({
                          ...editingProjectModal,
                          projectUrl: e.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15">
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteProject(editingProjectModal.id);
                        setEditingProjectModal(null);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Xóa dự án này</span>
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProjectModal(null)}
                        className="liquid-btn-secondary px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="liquid-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                      >
                        Lưu dự án
                      </button>
                    </div>
                  </div>
                </form>
              </LiquidGlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          DRAWER STUDIO: QUẢN LÝ TOÀN BỘ CẤU HÌNH WEBSITE TRỰC QUAN
          ===================================================================== */}
      <AnimatePresence>
        {isStudioOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/65 backdrop-blur-sm">
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-full max-w-xl h-full"
            >
              <LiquidGlassCard
                isDark={isDark}
                glassMode="frosted"
                className="w-full h-full flex flex-col rounded-l-3xl"
              >
                <div className="flex flex-col h-full">
                  {/* Header của Studio */}
                  <div className="p-5 border-b border-white/15 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Wand2 className="w-5 h-5 text-pink-400" />
                      <div>
                        <h2 className="font-extrabold text-base">
                          Trung tâm Tùy chỉnh Portfolio
                        </h2>
                        <p className="text-xs opacity-65">
                          Mọi thay đổi được lưu tự động và có thể xuất ra file
                          cấu hình.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsStudioOpen(false)}
                      className="liquid-btn-secondary p-2 rounded-xl"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Thanh chọn Tab trong Studio */}
                  <div className="flex items-center gap-1.5 p-3 border-b border-white/15 overflow-x-auto">
                    {[
                      { id: 'personal', label: 'Cá nhân & Ảnh' },
                      { id: 'socials', label: 'Link Mạng xã hội' },
                      { id: 'about', label: 'Giới thiệu' },
                      { id: 'export', label: 'Xuất Code / Khôi phục' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setStudioTab(tab.id)}
                        className={
                          studioTab === tab.id
                            ? 'liquid-btn-primary px-3.5 py-2 rounded-xl text-xs font-bold text-white whitespace-nowrap'
                            : 'liquid-btn-secondary px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap'
                        }
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Nội dung từng Tab */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-5">
                    {studioTab === 'personal' && (
                      <div className="space-y-4">
                        <div className="liquid-btn-secondary p-4 rounded-2xl flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-pink-400/40">
                            {config.personal.avatarUrl ? (
                              <img
                                src={config.personal.avatarUrl}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <DefaultDoliaAvatar />
                            )}
                          </div>
                          <div className="space-y-2 flex-1">
                            <p className="text-xs font-bold">
                              Ảnh đại diện cá nhân
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="liquid-btn-primary px-3.5 py-1.5 rounded-xl text-xs font-bold text-white"
                              >
                                Tải ảnh từ máy
                              </button>
                              {config.personal.avatarUrl && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setConfig((prev) => ({
                                      ...prev,
                                      personal: {
                                        ...prev.personal,
                                        avatarUrl: '',
                                      },
                                    }))
                                  }
                                  className="liquid-btn-secondary px-3 py-1.5 rounded-xl text-xs font-semibold"
                                >
                                  Dùng ảnh Dolia mặc định
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Hoặc dán URL ảnh đại diện
                          </label>
                          <input
                            type="text"
                            value={config.personal.avatarUrl}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                personal: {
                                  ...config.personal,
                                  avatarUrl: e.target.value,
                                },
                              })
                            }
                            placeholder="https://..."
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold mb-1">
                              Tên hiển thị
                            </label>
                            <input
                              type="text"
                              value={config.personal.displayName}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  personal: {
                                    ...config.personal,
                                    displayName: e.target.value,
                                  },
                                })
                              }
                              className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold mb-1">
                              Biệt danh
                            </label>
                            <input
                              type="text"
                              value={config.personal.nickname}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  personal: {
                                    ...config.personal,
                                    nickname: e.target.value,
                                  },
                                })
                              }
                              className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Slogan
                          </label>
                          <input
                            type="text"
                            value={config.personal.slogan}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                personal: {
                                  ...config.personal,
                                  slogan: e.target.value,
                                },
                              })
                            }
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Nghề nghiệp hiển thị
                          </label>
                          <input
                            type="text"
                            value={config.personal.primaryOccupation}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                personal: {
                                  ...config.personal,
                                  primaryOccupation: e.target.value,
                                  occupations: [e.target.value],
                                },
                              })
                            }
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Đoạn giới thiệu (Bio)
                          </label>
                          <textarea
                            rows={3}
                            value={config.personal.bio}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                personal: {
                                  ...config.personal,
                                  bio: e.target.value,
                                },
                              })
                            }
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold mb-1">
                              Email liên hệ thật
                            </label>
                            <input
                              type="email"
                              value={config.personal.email}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  personal: {
                                    ...config.personal,
                                    email: e.target.value,
                                  },
                                })
                              }
                              placeholder="nguyensang@email.com"
                              className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold mb-1">
                              Vị trí
                            </label>
                            <input
                              type="text"
                              value={config.personal.location}
                              onChange={(e) =>
                                setConfig({
                                  ...config,
                                  personal: {
                                    ...config.personal,
                                    location: e.target.value,
                                  },
                                })
                              }
                              className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {studioTab === 'socials' && (
                      <div className="space-y-4">
                        <p className="text-xs opacity-75">
                          Dán đường dẫn thật cho từng nền tảng mạng xã hội của
                          bạn tại đây:
                        </p>
                        {config.socials.map((soc, idx) => (
                          <div
                            key={soc.id}
                            className="liquid-btn-secondary p-3.5 rounded-2xl space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span
                                  className="liquid-icon-squircle w-6 h-6 rounded-lg flex items-center justify-center text-white"
                                  style={{ backgroundColor: soc.brandColor }}
                                >
                                  <BrandIcon
                                    type={soc.iconType}
                                    className="w-3.5 h-3.5 relative z-10"
                                  />
                                </span>
                                <span className="font-extrabold text-xs">
                                  {soc.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => moveSocialItem(idx, -1)}
                                  disabled={idx === 0}
                                  className="p-1 rounded hover:bg-white/15 disabled:opacity-30"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveSocialItem(idx, 1)}
                                  disabled={idx === config.socials.length - 1}
                                  className="p-1 rounded hover:bg-white/15 disabled:opacity-30"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <input
                              type="text"
                              value={soc.url}
                              onChange={(e) => {
                                const val = e.target.value;
                                setConfig((prev) => ({
                                  ...prev,
                                  socials: prev.socials.map((item) =>
                                    item.id === soc.id
                                      ? { ...item, url: val }
                                      : item
                                  ),
                                }));
                              }}
                              placeholder={`Nhập URL ${soc.name} của bạn...`}
                              className="liquid-input w-full px-3 py-2 rounded-xl text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {studioTab === 'about' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Tôi là ai?
                          </label>
                          <textarea
                            rows={3}
                            value={config.about.whoAmI}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                about: {
                                  ...config.about,
                                  whoAmI: e.target.value,
                                },
                              })
                            }
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Công việc hiện tại
                          </label>
                          <textarea
                            rows={3}
                            value={config.about.currentWork}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                about: {
                                  ...config.about,
                                  currentWork: e.target.value,
                                },
                              })
                            }
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-1">
                            Mục tiêu tương lai
                          </label>
                          <textarea
                            rows={3}
                            value={config.about.futureGoals}
                            onChange={(e) =>
                              setConfig({
                                ...config,
                                about: {
                                  ...config.about,
                                  futureGoals: e.target.value,
                                },
                              })
                            }
                            className="liquid-input w-full px-3.5 py-2 rounded-xl text-sm"
                          />
                        </div>
                      </div>
                    )}

                    {studioTab === 'export' && (
                      <div className="space-y-4">
                        <div className="liquid-btn-secondary p-4 rounded-2xl space-y-3">
                          <h4 className="font-extrabold text-sm flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-pink-400" />
                            <span>
                              Xuất cấu hình để triển khai Vercel / Netlify
                            </span>
                          </h4>
                          <p className="text-xs opacity-80 leading-relaxed">
                            Sau khi chỉnh sửa trực quan trên web, bạn có thể sao
                            chép hoặc tải đối tượng{' '}
                            <code>DEFAULT_SITE_CONFIG</code> bên dưới:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={async () => {
                                const codeStr = `const DEFAULT_SITE_CONFIG = ${JSON.stringify(
                                  config,
                                  null,
                                  2
                                )};`;
                                await copyTextToClipboard(codeStr);
                                triggerToast(
                                  'Đã sao chép DEFAULT_SITE_CONFIG vào bộ nhớ tạm!'
                                );
                              }}
                              className="liquid-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              <span>Sao chép DEFAULT_SITE_CONFIG</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const codeStr = `const DEFAULT_SITE_CONFIG = ${JSON.stringify(
                                  config,
                                  null,
                                  2
                                )};`;
                                const blob = new Blob([codeStr], {
                                  type: 'text/javascript;charset=utf-8',
                                });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'DEFAULT_SITE_CONFIG.js';
                                a.click();
                                URL.revokeObjectURL(url);
                                triggerToast(
                                  'Đã tải file DEFAULT_SITE_CONFIG.js về máy!'
                                );
                              }}
                              className="liquid-btn-secondary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
                            >
                              <Download className="w-3.5 h-3.5 text-pink-400" />
                              <span>Tải file (.js)</span>
                            </button>
                          </div>

                          <textarea
                            readOnly
                            rows={6}
                            onClick={(e) => e.currentTarget.select()}
                            value={`const DEFAULT_SITE_CONFIG = ${JSON.stringify(
                              config,
                              null,
                              2
                            )};`}
                            className="liquid-input w-full p-3 rounded-xl font-mono text-[11px] leading-relaxed"
                          />
                        </div>

                        <div className="pt-4 border-t border-white/15">
                          <button
                            type="button"
                            onClick={() => {
                              setConfig(DEFAULT_SITE_CONFIG);
                              localStorage.removeItem(STORAGE_KEY);
                              triggerToast('Đã khôi phục toàn bộ cài đặt gốc!');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Khôi phục cấu hình mặc định ban đầu</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          THÔNG BÁO NỔI KÍNH LỎNG (LIQUID GLASS TOAST NOTIFICATION)
          ===================================================================== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-5 right-5 z-50 max-w-sm"
          >
            <LiquidGlassCard
              isDark={isDark}
              glassMode="frosted"
              brandColor={toast.type === 'error' ? '#ef4444' : '#ec4899'}
              className="px-4 py-3 rounded-2xl"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold">
                {toast.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                <span>{toast.message}</span>
              </div>
            </LiquidGlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
