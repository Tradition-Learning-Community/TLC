import DataManager from '@/components/admin/DataManager'

export default function AdminDataTypePage({ params }: { params: { type: string } }) {
  const { type } = params
  return (
    <div>
      <DataManager type={type} />
    </div>
  )
}
