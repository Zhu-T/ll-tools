import { useRouter } from 'next/router';

function Dashboard() {
  const router = useRouter()
  return (
    <button type="button" onClick={() => router.push('/ll-tools-formats/lease')}>
      Lease
    </button>
    )
}
export default Dashboard