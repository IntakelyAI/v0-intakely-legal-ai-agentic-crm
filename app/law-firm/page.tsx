import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LawFirmPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Law Firm Spaces</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Summary of your law firm spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Spaces</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Spaces</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pending Invitations</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across your spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-1">
                <p className="font-medium">Document uploaded to Smith & Associates</p>
                <p className="text-sm text-muted-foreground">Today at 2:30 PM</p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-1">
                <p className="font-medium">New client added to Johnson Legal Group</p>
                <p className="text-sm text-muted-foreground">Yesterday at 11:15 AM</p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-1">
                <p className="font-medium">Billing updated for Williams Law Partners</p>
                <p className="text-sm text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
