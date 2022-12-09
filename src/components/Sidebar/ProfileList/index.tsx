import { PlusIcon } from '@heroicons/react/20/solid'

const ProfileList = () => (
  <div className="w-full p-4 sm:p-6 bg-white rounded-xl md:rounded-2xl md:shadow">
    <div className="mt-6 flow-root">
      <ul className="-my-5 divide-y divide-gray-200">
        <li className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
            <a href="#" title="Visit Username" className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 hover:text-indigo-600">Username</p>
              <p className="truncate text-sm text-gray-500">27 Followers</p>
            </a>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Follow
            </button>
          </div>
        </li>
        <li className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
            <a href="#" title="Visit Username" className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 hover:text-indigo-600">Username</p>
              <p className="truncate text-sm text-gray-500">27 Followers</p>
            </a>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Follow
            </button>
          </div>
        </li>
        <li className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
            <a href="#" title="Visit Username" className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 hover:text-indigo-600">Username</p>
              <p className="truncate text-sm text-gray-500">27 Followers</p>
            </a>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Follow
            </button>
          </div>
        </li>
        <li className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
            <a href="#" title="Visit Username" className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 hover:text-indigo-600">Username</p>
              <p className="truncate text-sm text-gray-500">27 Followers</p>
            </a>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Follow
            </button>
          </div>
        </li>
        <li className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-gray-200 rounded-full" />
            </div>
            <a href="#" title="Visit Username" className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900 hover:text-indigo-600">Username</p>
              <p className="truncate text-sm text-gray-500">27 Followers</p>
            </a>
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-500"
            >
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Follow
            </button>
          </div>
        </li>
      </ul>
    </div>
    <div className="mt-6">
      <a
        href="#"
        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-indigo-50 hover:text-indigo-500 hover:border-indigo-500"
      >
        View all
      </a>
    </div>
  </div>
)

export default ProfileList;
