export default function WorkflowBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
      <div className="relative w-full max-w-3xl h-64">
        {/* Welcome Node */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 rounded-md bg-gray-300 flex items-center p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              W
            </div>
            <div>
              <div className="font-medium">Welcome</div>
              <div className="text-sm text-gray-600">No prompt</div>
            </div>
          </div>
        </div>

        {/* Connecting Lines */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-400"></div>
        <div className="absolute top-44 left-1/2 -translate-x-1/2 w-64 h-0.5 bg-gray-400"></div>
        <div className="absolute top-44 left-[calc(50%-32px)] w-0.5 h-12 bg-gray-400"></div>
        <div className="absolute top-44 left-[calc(50%+32px)] w-0.5 h-12 bg-gray-400"></div>

        {/* Qualification Node */}
        <div className="absolute top-56 left-[calc(50%-96px)] -translate-x-1/2 w-80 h-32 rounded-md bg-gray-300 flex items-center p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              Q
            </div>
            <div>
              <div className="font-medium">Qualification</div>
              <div className="text-sm text-gray-600">No prompt</div>
            </div>
          </div>
        </div>

        {/* Not Qualified Node */}
        <div className="absolute top-56 left-[calc(50%+96px)] -translate-x-1/2 w-80 h-32 rounded-md bg-gray-300 flex items-center p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              N
            </div>
            <div>
              <div className="font-medium">Not Qualified</div>
              <div className="text-sm text-gray-600">No prompt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
