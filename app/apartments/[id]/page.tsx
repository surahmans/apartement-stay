import ApartmentDetailClient from './ApartementDetailClient'

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ]
}

export default function ApartmentDetailPage({ params }: { params: { id: string } }) {
  return <ApartmentDetailClient apartmentId={params.id} />
}

