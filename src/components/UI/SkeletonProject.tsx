import Card from './Card';

const SkeletonProject = () => (
  <Card padded>
    <div className="animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="shrink-0 w-16 h-16 bg-gray-300 rounded-lg" />
        <div className="space-y-4">
          <div className="w-48 h-[14px] bg-gray-300 rounded-full" />
          <div className="w-12 h-[14px] bg-gray-300 rounded-full" />
        </div>
        <div className="space-y-1 ml-auto px-1">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="w-4 h-4 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="mb-6">
        <div className="w-full h-3 bg-gray-300 rounded-full max-w-[480px] mb-2.5" />
        <div className="w-full h-3 bg-gray-300 rounded-full mb-2.5" />
        <div className="w-full h-3 bg-gray-300 rounded-full max-w-[440px] mb-2.5" />
      </div>
      <div className="flex justify-between">
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-4 h-4 bg-gray-300 rounded" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  </Card>
)

export default SkeletonProject;
