import DataManager from '@/components/admin/DataManager'

export default async function AdminDataTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  return (
    <div>
      <DataManager type={type} />
    </div>
  )
}
