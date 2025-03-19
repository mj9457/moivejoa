const page = () => {
  return (
    <div className="text-white">
      API URL: {process.env.NEXT_PUBLIC_API_BASE_URL}
    </div>
  );
};

export default page;
