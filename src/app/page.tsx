import LandingPage from "./landingpage/page";

export default function Home({}: {
  params: { id: string };
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div>
      <main>
        <LandingPage />
      </main>
    </div>
  );
}
