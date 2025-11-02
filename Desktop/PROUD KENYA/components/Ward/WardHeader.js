export default function WardHeader({ wardId }) {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">Ward {wardId}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold">45</h3>
            <p>Total Achievements</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">23</h3>
            <p>Government Projects</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold">22</h3>
            <p>Citizen Stories</p>
          </div>
        </div>
      </div>
    </section>
  );
}
