import PageContainer from "@/components/container/PageContainer";
import Auth from "@/containers/authentication";

export default function AuthPage() {
  return (
    <PageContainer title="Register Page" description="this is Sample page">
      <Auth />
    </PageContainer>
  );
}
