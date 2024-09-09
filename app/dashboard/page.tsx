function About() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="mt-4 last:max-w-3xl">
        this page is private. You should only be able to see it if you are
        authenticated.
      </p>
    </div>
  );
}
export default About;
