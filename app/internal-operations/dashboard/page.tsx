import InternalLayout from "@/components/internal-operations/layout"

export default function InternalOperationsDashboardPage() {
  return (
    <InternalLayout>
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold text-white">Internal Operations Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">User Overview</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Users</span>
                <span className="text-white font-medium">1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Users</span>
                <span className="text-white font-medium">987</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">New This Month</span>
                <span className="text-white font-medium">68</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">Subscription Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Active Subscriptions</span>
                <span className="text-white font-medium">876</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trial Accounts</span>
                <span className="text-white font-medium">124</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">MRR</span>
                <span className="text-white font-medium">$48,750</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">Support</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Open Tickets</span>
                <span className="text-white font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg. Response Time</span>
                <span className="text-white font-medium">2.4 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Satisfaction Rate</span>
                <span className="text-white font-medium">94%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-800 pb-3">
                <p className="text-white">New law firm onboarded: Johnson Legal Group</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
              <div className="border-b border-gray-800 pb-3">
                <p className="text-white">Subscription upgraded: Smith & Associates</p>
                <p className="text-sm text-gray-400">5 hours ago</p>
              </div>
              <div className="border-b border-gray-800 pb-3">
                <p className="text-white">New support ticket: API integration issue</p>
                <p className="text-sm text-gray-400">Yesterday</p>
              </div>
              <div>
                <p className="text-white">System update completed: v2.4.1</p>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-lg font-medium text-white mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">API Uptime</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-white">99.98%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Database Performance</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-white">Optimal</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Storage Usage</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-white">72%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Memory Usage</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-white">48%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InternalLayout>
  )
}
