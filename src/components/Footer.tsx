interface FooterProps {
  description: string;
  phone: string;
  email: string;
  address: string;
  social: { linkedin: string; twitter: string };
}

export default function Footer({ description, phone, email, address }: FooterProps) {
  return (
    <footer className="bg-navy-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded flex items-center justify-center">
                <span className="text-navy-900 font-serif font-bold">ABG</span>
              </div>
              <div>
                <p className="text-sm font-serif font-semibold text-white">ABG Abogados</p>
                <p className="text-[8px] text-gold-500 tracking-[3px] uppercase">Estudio Jurídico</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { label: "Servicios", href: "#servicios" },
                { label: "Nosotros", href: "#nosotros" },
                { label: "Equipo", href: "#equipo" },
                { label: "Contacto", href: "#contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-gold-500 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {address}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                {phone}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gold-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {email}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} ABG Abogados. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
