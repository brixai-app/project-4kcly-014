import { Navigate, useParams } from 'react-router-dom';
import { mockData } from '@/data/mockData';
import { InstrumentDetail } from '@/components/InstrumentDetail';

export function InstrumentPage() {
  const { instrumentId } = useParams<{ instrumentId: string }>();
  const instrument = mockData?.instruments?.find(
    (item) => item?.id === instrumentId || item?.slug === instrumentId
  );

  if (!instrument) {
    return <Navigate to="/catalog" replace />;
  }

  return <InstrumentDetail instrument={instrument} />;
}

export default InstrumentPage;