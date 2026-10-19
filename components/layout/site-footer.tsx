import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTelegram, FaXTwitter } from "react-icons/fa6";

import { Brand } from "@/components/ui/brand";
import {
  footerContent,
  footerDocuments,
  footerNavigation,
} from "@/lib/content/navigation";
import styles from "./site-footer.module.css";

type FooterLinkGroupProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
  return (
    <div>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.links}>
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
    <div className={styles.socials}>
      <a
        href={`mailto:${footerContent.email}`}
        aria-label="Email Avirox Labs"
        className={styles.socialIcon}
      >
        <FaTelegram className="size-4" aria-hidden="true" />
      </a>
      <span aria-label="LinkedIn" role="img" className={styles.socialIcon}>
        <FaLinkedinIn className="size-4" aria-hidden="true" />
      </span>
      <span aria-label="X" role="img" className={styles.socialIcon}>
        <FaXTwitter className="size-4" aria-hidden="true" />
      </span>
      <span aria-label="Instagram" role="img" className={styles.socialIcon}>
        <FaInstagram className="size-4" aria-hidden="true" />
      </span>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.columns}>
          <div>
            <Brand large />
            <address className={styles.address}>
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
            <h2 className={styles.heading}>{footerContent.contactTitle}</h2>
            <SocialIcons />
            <a
              className={styles.email}
              href={`mailto:${footerContent.email}`}
            >
              {footerContent.email}
            </a>
          </div>
        </div>

        <p className={styles.disclaimer}>
          {footerContent.disclaimer}
        </p>
        <div className={styles.divider} />
        <p className={styles.copyright}>
          {footerContent.copyright}
        </p>
      </div>
    </footer>
  );
}
