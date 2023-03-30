const Home = () => {
    const { loading, data } = useQuery(QUERY_PROFILES);
    const profiles = data?.profiles || [];
  
    return (
      <main>
        <div className="flex-row justify-center">
          <div className="col-12 col-md-10 my-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ProfileList
                profiles={profiles}
              />
            )}
          </div>
        </div>
      </main>
    );
  };
  
  export default Home;