import Card from './Card';

const SkeletonProfileHeader = () => (
  <Card padded>
    <div className="animate-pulse">
      <div className="shrink-0 w-20 h-20 bg-gray-300 rounded-full mx-auto" />
      <div className="mt-2">
        <div className="w-1/2 h-6 bg-gray-300 rounded-full mx-auto" />
        <div className="w-1/3 h-[30px] bg-gray-300 rounded-lg mt-2 mb-4 mx-auto" />
        <div className="flex gap-4 mt-6">
          <div className="w-full h-4 bg-gray-300 rounded-full" />
          <div className="w-full h-4 bg-gray-300 rounded-full" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  </Card>
)

export default SkeletonProfileHeader;
