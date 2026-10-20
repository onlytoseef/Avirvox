import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTelegram, FaXTwitter } from "react-icons/fa6";

import { Brand } from "@/components/ui/brand";
import {
  footerContent,
  footerDocuments,
  footerNavigation,
} from "@/lib/content/navigation";
import { socialLinks } from "@/lib/content/social-links";

const socialIcons = {
  X: FaXTwitter,
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Telegram: FaTelegram,
};

type FooterLinkGroupProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h2 className="site-footer-heading">{title}</h2>
      <ul className="site-footer-links">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="site-footer-socials">
      {socialLinks.map(({ label, href }) => {
        const Icon = socialIcons[label];
        return (
          <a
            key={label}
            href={href}
            aria-label={`Avirvox Labs on ${label}`}
            className="site-footer-social-icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <div className="site-footer-columns">
          <div>
            <Brand large />
            <address className="site-footer-address">
              {footerContent.address.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </address>
          </div>

          <FooterLinkGroup title={footerContent.navigationTitle} links={footerNavigation} />
          <FooterLinkGroup title={footerContent.documentsTitle} links={footerDocuments} />

          <div>
            <h2 className="site-footer-heading">{footerContent.contactTitle}</h2>
            <SocialIcons />
            <a
              className="site-footer-email"
              href={`mailto:${footerContent.email}`}
            >
              {footerContent.email}
            </a>
          </div>
        </div>

        <p className="site-footer-disclaimer">
          {footerContent.disclaimer}
        </p>
        <div className="site-footer-divider" />
        <p className="site-footer-copyright">
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
