import Button from "@/components/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
          alt="Fashion Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 z-10 flex flex-col justify-center items-center">
          <h1 className="text-6xl md:text-8xl text-white font-bold text-center mb-8">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl text-white text-center mb-12 max-w-2xl">
            Explore the latest trends in fashion and find your perfect look with
            our curated collections.
          </p>
          <Button />
        </div>
      </div>

      {/* Upcoming Fashion Arrivals Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          Upcoming Fashion Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Product Cards */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2"
              alt="Product 1"
              className="w-full h-56 object-cover mb-4 rounded-md"
              width={500}
              height={700}
            />
            <h3 className="text-lg font-semibold mb-2">Stylish Jacket</h3>
            <p className="text-gray-600">
              Stay warm and stylish with this trendy jacket. Perfect for the
              winter season.
            </p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              View Details
            </button> */}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
              alt="Product 2"
              className="w-full h-56 object-cover mb-4 rounded-md"
              width={500}
              height={700}
            />
            <h3 className="text-lg font-semibold mb-2">Elegant Dress</h3>
            <p className="text-gray-600">
              Turn heads with this elegant dress, perfect for any special
              occasion.
            </p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              View Details
            </button> */}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1535008652995-e95986556e32"
              alt="Product 3"
              className="w-full h-56 object-cover mb-4 rounded-md"
              width={500}
              height={700}
            />
            <h3 className="text-lg font-semibold mb-2">Casual Shirt</h3>
            <p className="text-gray-600">
              Keep it casual with this comfortable and stylish shirt.
            </p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              View Details
            </button> */}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1559526324-593bc073d938"
              alt="Product 4"
              className="w-full h-56 object-cover mb-4 rounded-md"
              width={500}
              height={700}
            />
            <h3 className="text-lg font-semibold mb-2">Trendy Sunglasses</h3>
            <p className="text-gray-600">
              Protect your eyes and look stylish with these trendy sunglasses.
            </p>
            {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              View Details
            </button> */}
          </div>
        </div>
      </section>

      {/* New Trends Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">New Trends</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Trend Cards */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
                alt="Trend 1"
                className="w-full h-56 object-cover mb-4 rounded-md"
                width={500}
                height={700}
              />
              <h3 className="text-lg font-semibold mb-2">Streetwear</h3>
              <p className="text-gray-600">
                Stay ahead with the latest streetwear fashion trends.
              </p>
              {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
                Learn More
              </button> */}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2"
                alt="Trend 2"
                className="w-full h-56 object-cover mb-4 rounded-md"
                width={500}
                height={700}
              />
              <h3 className="text-lg font-semibold mb-2">Vintage</h3>
              <p className="text-gray-600">
                Discover the charm of vintage fashion with our exclusive
                collection.
              </p>
              {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
                Learn More
              </button> */}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1535008652995-e95986556e32"
                alt="Trend 3"
                className="w-full h-56 object-cover mb-4 rounded-md"
                width={500}
                height={700}
              />
              <h3 className="text-lg font-semibold mb-2">Minimalist</h3>
              <p className="text-gray-600">
                Embrace simplicity with our minimalist fashion collection.
              </p>
              {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
                Learn More
              </button> */}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1559526324-593bc073d938"
                alt="Trend 4"
                className="w-full h-56 object-cover mb-4 rounded-md"
                width={500}
                height={700}
              />
              <h3 className="text-lg font-semibold mb-2">Athleisure</h3>
              <p className="text-gray-600">
                Combine comfort and style with our athleisure wear.
              </p>
              {/* <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
