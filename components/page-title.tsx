function PageTitle({ title }: { title: string }) {
  return (
    <div>
      <h1 className="mt-16 mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-600 dark:text-blue-400">
        {title}
      </h1>
    </div>
  );
}
export default PageTitle;
