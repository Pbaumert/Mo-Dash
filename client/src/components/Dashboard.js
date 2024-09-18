import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BBQ_PACKAGES } from '../utils/queries';

function Dashboard() {
  const { loading, data } = useQuery(GET_BBQ_PACKAGES);
  const packages = data?.getBBQPackages || [];

  return (
    <div>
      <h2>BBQ Packages</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {packages.map((pkg) => (
            <li key={pkg._id}>
              {pkg.name} - ${pkg.price}
              <button>Order Now</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
