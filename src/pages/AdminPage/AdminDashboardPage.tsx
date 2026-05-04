import AdminUserDashboard from '@pages/AdminPage/components/AdminDashboardComponents/AdminUserDashboard.tsx';
import AdminSellerDashboard from '@pages/AdminPage/components/AdminDashboardComponents/AdminSellerDashboard.tsx';
import PromptDashboard from '@pages/AdminPage/components/AdminDashboardComponents/PromptDashboard.tsx';

const AdminDashboardPage = () => {
  return (
    <div className="ml-[102px]">
      <div className="text-gray-950 text-3xl my-10">관리자 대시보드</div>
      <div className="flex gap-5">
        <div className="bg-white rounded-xl px-8 py-8">
          <AdminUserDashboard />
          <AdminSellerDashboard />
        </div>
        <div>
          <PromptDashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
