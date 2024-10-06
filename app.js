// Example planet data for testing
const exoplanetData = [
    {
        "pl_name": "Kepler-22b",
        "pl_orbper": 289.8623,
        "pl_rade": 2.38,
        "st_dist": 620.0,
        "pl_nnotes": "Possibly habitable",
        "discoverymethod": "Transit"
    },
    {
        "pl_name": "Proxima Centauri b",
        "pl_orbper": 11.186,
        "pl_rade": 1.17,
        "st_dist": 4.24,
        "pl_nnotes": "Closest known exoplanet",
        "discoverymethod": "Radial Velocity"
    },
    {
        "pl_name": "HD 209458 b",
        "pl_orbper": 3.52474859,
        "pl_rade": 1.36,
        "st_dist": 159.0,
        "pl_nnotes": "First exoplanet observed transiting its star",
        "discoverymethod": "Transit"



    }
    ,{
        "pl_name": "GJ 238 b",
        "st_dist": 49.61,
        "pl_rade": 0.126,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Terrestrial"
    },
    {
        "pl_name": "TOI-4527.01",
        "st_dist": 59.07,
        "pl_rade": 0.689,
        "discoverymethod": "Transit",
        "pl_type": "Terrestrial"
    },
    {
        "pl_name": "SPECULOOS-3 b",
        "st_dist": 22153.58,
        "pl_rade": 0.894,
        "discoverymethod": "Transit",
        "pl_type": "Terrestrial"
    },
    {
        "pl_name": "LHS 1678 d",
        "st_dist": 64.83,
        "pl_rade": 0.907,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Terrestrial"
    },
    {
        "pl_name": "Teegarden’s Star d",
        "st_dist": 12.49,
        "pl_rade": 0.82,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Terrestrial"
    },
    {
        "pl_name": "TOI-286 c",
        "st_dist": 193.24,
        "pl_rade": 3.72,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-286 b",
        "st_dist": 193.24,
        "pl_rade": 4.53,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-6255 b",
        "st_dist": 66.24,
        "pl_rade": 1.44,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-1408 c",
        "st_dist": 454.98,
        "pl_rade": 7.6,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-1798.02",
        "st_dist": 369.07,
        "pl_rade": 5.6,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "HD 6061 b",
        "st_dist": 220.41,
        "pl_rade": 10,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-757 b",
        "st_dist": 196.85,
        "pl_rade": 10.5,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "HD 25463 c",
        "st_dist": 148.86,
        "pl_rade": 4.3,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "HIP 8152 c",
        "st_dist": 331.65,
        "pl_rade": 10.7,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-1824 b",
        "st_dist": 193.97,
        "pl_rade": 16,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-1799 b",
        "st_dist": 202.64,
        "pl_rade": 4,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "TOI-1776 b",
        "st_dist": 145.64,
        "pl_rade": 1.4,
        "discoverymethod": "Transit",
        "pl_type": "Super-Earth"
    },
    {
        "pl_name": "HD 222237 b",
        "st_dist": 37.34,
        "pl_rade": 5.19,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "HIP 67522 c",
        "st_dist": 414.95,
        "pl_rade": 0.152,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-4562 c",
        "st_dist": 1107.53,
        "pl_rade": 5.77,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-4914 b",
        "st_dist": 977.98,
        "pl_rade": 0.71422,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-2981 b",
        "st_dist": 1721.12,
        "pl_rade": 2.00737,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-2714 b",
        "st_dist": 1951.86,
        "pl_rade": 0.71737,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "HD 21520 b",
        "st_dist": 258.3,
        "pl_rade": 17.7,
        "discoverymethod": "Radial Velocity",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-3568 b",
        "st_dist": 645.38,
        "pl_rade": 26.4,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-2384 b",
        "st_dist": 624.38,
        "pl_rade": 1.966,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-2379 b",
        "st_dist": 687.94,
        "pl_rade": 5.76,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-6034 b",
        "st_dist": 384.77,
        "pl_rade": 0.798,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TIC 4672985 b",
        "st_dist": 825.88,
        "pl_rade": 12.74,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "OGLE-2017-BLG-0448L b",
        "st_dist": 24559.56,
        "pl_rade": 15.6,
        "discoverymethod": "Microlensing",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-5218 b",
        "st_dist": 1230.92,
        "pl_rade": 2.06715,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "TOI-2529 b",
        "st_dist": 965.97,
        "pl_rade": 2.34,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "Kepler-1996 c",
        "st_dist": 1436.58,
        "pl_rade": 8.3,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "Kepler-1997 b",
        "st_dist": 4900.13,
        "pl_rade": 5.82,
        "discoverymethod": "Transit",
        "pl_type": "Gas Giant"
    },
    {
        "pl_name": "Kepler-1999 b",
        "st_dist": 2286.52
       

    }   
]// Function to find the nearest exoplanet based on input distance
function findNearestExoplanet(inputDistance) {
    let nearestPlanet = null;
    let smallestDistanceDiff = Infinity;

    // Loop through exoplanet data to find the nearest exoplanet
    exoplanetData.forEach(planet => {
        const distanceDiff = Math.abs(planet.st_dist - inputDistance);
        if (distanceDiff < smallestDistanceDiff) {
            smallestDistanceDiff = distanceDiff;
            nearestPlanet = planet;
        }
    });

    return nearestPlanet;
}

// Function for "Know Your Own Exoplanet" form submission
function designExoplanet() {
    const distance = document.getElementById('distance').value;
    const size = document.getElementById('size').value;
    const exoplanetResult = document.getElementById('exoplanetResult');

    // Find the nearest exoplanet
    const nearestPlanet = findNearestExoplanet(distance);

    // Display the nearest exoplanet's details
    if (nearestPlanet) {
        exoplanetResult.innerHTML = `
            The nearest exoplanet is <strong>${nearestPlanet.pl_name}</strong>.<br>
            It is ${nearestPlanet.st_dist} light-years away.<br>
            Its size is ${nearestPlanet.pl_rade} Earth radii.
        `;
    } else {
        exoplanetResult.innerHTML = 'No nearby exoplanet found.';
    }
}