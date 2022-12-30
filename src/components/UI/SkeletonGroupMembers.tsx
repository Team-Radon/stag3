import Card from './Card';

const SkeletonGroupMembers = () => (
  <Card padded>
    <div className="animate-pulse divide-y divide-skin-divider">
      <div className="flex items-center space-x-4 py-4">
        <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-full h-5 bg-gray-300 rounded-full" />
        <div className="w-full h-[30px] bg-gray-300 rounded-lg ml-4" />
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-full h-5 bg-gray-300 rounded-full" />
        <div className="w-full h-[30px] bg-gray-300 rounded-lg ml-4" />
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-full h-5 bg-gray-300 rounded-full" />
        <div className="w-full h-[30px] bg-gray-300 rounded-lg ml-4" />
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-full h-5 bg-gray-300 rounded-full" />
        <div className="w-full h-[30px] bg-gray-300 rounded-lg ml-4" />
      </div>
      <div className="flex items-center space-x-4 py-4">
        <div className="shrink-0 w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-full h-5 bg-gray-300 rounded-full" />
        <div className="w-full h-[30px] bg-gray-300 rounded-lg ml-4" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  </Card>
)

export default SkeletonGroupMembers;
