import { motion } from 'framer-motion';
import ContactDrawer from '@/components/ContactDrawer';

export interface ContactPageProps {
  className?: string;
}

export function ContactPage({ className = '' }: ContactPageProps) {
  return (
    <motion.main
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <ContactDrawer />
    </motion.main>
  );
}

export default ContactPage;