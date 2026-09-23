'use client';

import { useEffect, useState } from 'react';
import styles from './ServiceCategory.module.css';

export type AccordionService = {
  id: string;
  number: string;
  title: string;
  preview: string;
  paragraphs: string[];
};

type ServiceAccordionProps = {
  services: AccordionService[];
  openLabel: string;
  closeLabel: string;
};

export default function ServiceAccordion({ services, openLabel, closeLabel }: ServiceAccordionProps) {
  const [openId, setOpenId] = useState(services[0]?.id || null);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (services.some(({ id }) => id === hash)) setOpenId(hash);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, [services]);

  const toggleService = (id: string) => {
    const nextId = openId === id ? null : id;
    setOpenId(nextId);
    const nextUrl = nextId ? `${window.location.pathname}#${nextId}` : window.location.pathname;
    window.history.replaceState(null, '', nextUrl);
  };

  return (
    <div className={styles.serviceList}>
      {services.map((service) => {
        const isOpen = openId === service.id;
        const panelId = `${service.id}-panel`;
        const lead = service.paragraphs[0] || service.preview;
        const supporting = service.paragraphs.slice(1);

        return (
          <article className={`${styles.serviceItem} ${isOpen ? styles.serviceItemOpen : ''}`} id={service.id} key={service.id}>
            <button
              type="button"
              className={styles.serviceTrigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleService(service.id)}
            >
              <span className={styles.serviceNumber}>{service.number}</span>
              <span className={styles.serviceTitle}>{service.title}</span>
              <span
                className={`${styles.expandControl} ${isOpen ? styles.expandControlOpen : ''}`}
                aria-hidden="true"
              />
              <span className={styles.visuallyHidden}>{isOpen ? closeLabel : openLabel}</span>
            </button>

            <div
              className={`${styles.servicePanel} ${isOpen ? styles.servicePanelOpen : ''}`}
              id={panelId}
              aria-hidden={!isOpen}
            >
              <div className={styles.panelClip}>
                <div className={styles.panelInner}>
                  <div className={styles.panelLead}>
                    <p className={styles.leadParagraph}>{lead}</p>
                  </div>
                  {supporting.length > 0 && (
                    <div className={styles.supportingContent}>
                      {supporting.map((paragraph, index) => (
                        <p key={`${service.id}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
