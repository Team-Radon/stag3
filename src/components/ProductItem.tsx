import Card from './UI/Card';

export const ProductItem = () => (
  <Card>
    <div className="flex gap-3">
      <div className="relative shrink-0 bg-gray-200 w-14 h-14 lg:w-20 lg:h-20 overflow-hidden" />
      <div>
        <div className="text-xl font-medium mb-2">Project</div>
        <div className="text-sm">Duis quis deserunt adipisicing mollit elit do cillum elit</div>
      </div>
    </div>
    <div className="content mt-6 space-y-6 text-sm">
      Proident reprehenderit id velit commodo. Est commodo labore dolore eu reprehenderit sit. Duis velit tempor officia esse quis laborum aliqua sint voluptate do laborum nulla in. Proident consectetur consequat qui anim amet pariatur excepteur.
    </div>
    <div className="category-chips flex items-center gap-4 mt-4">
      <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">DeFi</div>
      <div className="chips inline-flex px-4 py-1 rounded-full bg-gray-200 text-sm">Gaming</div>
    </div>
  </Card>
);
