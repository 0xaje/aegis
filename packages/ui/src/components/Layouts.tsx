import { cn } from '../utils.js';

export interface SidebarProps {
  className?: string;
  logo: React.ReactNode;
  navItems: { label: string; icon: React.ReactNode; active?: boolean; onClick?: () => void }[];
  footer?: React.ReactNode;
}

export function Sidebar({ className, logo, navItems, footer }: SidebarProps) {
  return (
    <aside
      className={cn(
        'w-64 border-r border-slate-800/80 bg-[#07080c] flex flex-col justify-between shrink-0 p-6 gap-6',
        className,
      )}
    >
      <div className="flex flex-col gap-8">
        {/* Logo Slot */}
        <div className="flex items-center gap-3 select-none">{logo}</div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all select-none text-left w-full outline-none focus:outline-none border border-transparent',
                item.active
                  ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20'
                  : 'text-slate-405 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40',
              )}
            >
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Footer Area */}
      {footer && <div className="flex flex-col gap-4 border-t border-slate-900 pt-6">{footer}</div>}
    </aside>
  );
}

export interface HeaderProps {
  className?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ className, title, subtitle, actions }: HeaderProps) {
  return (
    <header
      className={cn(
        'w-full border-b border-slate-800/80 py-3.5 px-6 flex items-center justify-between gap-4 bg-[#07080c]/30 backdrop-blur-sm select-none',
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm font-bold text-slate-100 tracking-tight leading-snug">{title}</h2>
        {subtitle && (
          <p className="text-[11px] text-slate-400 font-sans leading-tight">{subtitle}</p>
        )}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </header>
  );
}
