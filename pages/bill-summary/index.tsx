import { useRouter } from 'next/router';
import { CalculateBill } from '../bill-calculator/calculate';
import { RoomBillType } from '@/components/utils/types';

const BillSummary: React.FC = () => {
  const router = useRouter();
  const params = router.query.data;

  if (!params) {
    return <div>Loading...</div>;
  }

  const data = JSON.parse(decodeURIComponent(params as string));

  console.log(data);
  const result = CalculateBill(data as any);

  console.log(result)
  return <div></div>;
};

export default BillSummary;
