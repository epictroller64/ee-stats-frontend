import Card from "@/components/layout/Card";
import { HiSearch, HiDatabase, HiFolder, HiChartBar } from "react-icons/hi";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card contentClassName="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <HiSearch className="text-4xl text-primary" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Search Company</h2>
            <p className="text-gray-600">Find detailed information about any company by name or registry code.</p>
          </div>
        </div>
      </Card>
      <Card contentClassName="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <HiDatabase className="text-4xl text-primary" />
          <div>
            <h2 className="text-2xl font-bold mb-2">All Companies</h2>
            <p className="text-gray-600">Access our comprehensive database of all registered companies.</p>
          </div>
        </div>
      </Card>
      <Card contentClassName="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <HiFolder className="text-4xl text-primary" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Company Categories</h2>
            <p className="text-gray-600">Explore companies grouped by industry, sector, or other categories.</p>
          </div>
        </div>
      </Card>
      <Card contentClassName="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <HiChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-2xl font-bold mb-2">Financial History</h2>
            <p className="text-gray-600">View detailed financial records and historical data for any company.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}